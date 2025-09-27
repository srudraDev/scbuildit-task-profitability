import { useState, useEffect, useRef } from 'react';
import { Button, Card, Input } from '../components/ui';
import { useAppStore } from '../store/store';
import { rewardItems } from '../data/items';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { useUnsavedChanges } from '../context/UnsavedChangesContext';

export default function SettingsPage() {
  const { userSettings, updateRewardValue } = useAppStore();
  const [values, setValues] = useState(userSettings.rewardValues);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingItemChange, setPendingItemChange] = useState<{itemId: string, value: string} | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const saveButtonRef = useRef<HTMLDivElement>(null);
  const { setHasUnsavedChanges } = useUnsavedChanges();
  
  // Track user activity
  const trackActivity = () => {
    setLastActivityTime(Date.now());
  };
  
  // Add event listeners for user activity
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'mousemove', 'touchstart'];
    
    const handleUserActivity = () => {
      trackActivity();
    };
    
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  const handleSave = () => {
    // Update each reward value in the store
    Object.entries(values).forEach(([itemId, value]) => {
      updateRewardValue(itemId, value);
    });

    alert('Settings saved!');
  };

  const handleValueChange = (itemId: string, valueStr: string) => {
    // For Golden Keys, allow direct changes
    if (itemId === 'golden_key') {
      const value = parseInt(valueStr) || 0;
      setValues({
        ...values,
        [itemId]: value
      });
      setHasChanges(true);
      trackActivity();
      return;
    }
    
    // For other items, show confirmation modal
    setPendingItemChange({ itemId, value: valueStr });
    setModalOpen(true);
    trackActivity();
  };
  
  const handleConfirmValueChange = (newValue: number) => {
    if (pendingItemChange) {
      const { itemId } = pendingItemChange;
      
      setValues({
        ...values,
        [itemId]: newValue
      });
      
      setModalOpen(false);
      setPendingItemChange(null);
      setHasChanges(true);
      trackActivity();
    }
  };

  // Sync local hasChanges state with the global UnsavedChanges context
  useEffect(() => {
    setHasUnsavedChanges(hasChanges);
    
    // Clean up when component unmounts
    return () => {
      setHasUnsavedChanges(false);
    };
  }, [hasChanges, setHasUnsavedChanges]);
  
  // Auto-scroll to save button after inactivity
  useEffect(() => {
    if (!hasChanges) return;
    
    const checkInactivity = () => {
      const inactivityTime = Date.now() - lastActivityTime;
      const inactivityThreshold = 2000; // 2 seconds
      
      if (inactivityTime >= inactivityThreshold && saveButtonRef.current) {
        saveButtonRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Don't reset hasChanges here anymore, as we need to keep track of unsaved changes
      }
    };
    
    const timer = setInterval(checkInactivity, 500);
    return () => clearInterval(timer);
  }, [hasChanges, lastActivityTime]);
  
  // Reset hasChanges when saving
  const handleSaveClick = () => {
    handleSave();
    setHasChanges(false);
    // This will also update the context through the effect
  };

  // Find the pending item name for the modal
  const getPendingItemName = () => {
    if (!pendingItemChange) return '';
    const item = rewardItems.find(item => item.id === pendingItemChange.itemId);
    return item ? item.name : '';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Settings</h1>

      <Card title="Reward Item Values" className="mb-8">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4 rounded-lg mb-4 border border-blue-700">
          <p className="text-white mb-2">
            <span className="font-bold">Golden Keys</span> can have their value freely adjusted as their perceived value varies widely among players.
          </p>
          <p className="text-white">
            All other reward item values are locked to prevent accidental changes, but can be modified if necessary (for example, after game updates).
          </p>
        </div>

        <div className="space-y-4">
          {rewardItems.map(item => (
            <div key={item.id} className={`flex items-center p-3 rounded-lg ${item.id === 'golden_key' ? 'bg-blue-900/30 border-l-4 border-yellow-500' : ''}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-contain mr-3"
              />

              <div className="flex-1">
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-xs text-white">Default: {item.defaultValue} simoleons</p>
                {item.id === 'golden_key' ? (
                  <p className="text-xs text-yellow-400 mt-1">★ This value can be customized freely</p>
                ) : (
                  <p className="text-xs text-red-900 mt-1">Click Edit to modify value</p>
                )}
              </div>

              {item.id === 'golden_key' ? (
                <Input
                  type="number"
                  value={values[item.id]}
                  onChange={(value) => handleValueChange(item.id, value)}
                  className="w-32"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="text-center text-white font-medium w-16 bg-blue-900/50 py-1 px-2 rounded">
                    {values[item.id]}
                  </div>
                  <Button
                    onClick={() => {
                      setPendingItemChange({ itemId: item.id, value: values[item.id].toString() });
                      setModalOpen(true);
                    }}
                    variant="primary"
                    className="py-1 px-3 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div ref={saveButtonRef} className="mt-6 text-center relative">
          {hasChanges && (
            <div className="absolute -top-6 left-0 w-full text-yellow-400 text-sm animate-bounce">
              ↓ Don't forget to save your changes ↓
            </div>
          )}
          <Button 
            onClick={handleSaveClick} 
            variant="primary" 
            className={hasChanges ? "animate-pulse shadow-lg shadow-blue-500/50" : ""}
          >
            Save Settings
          </Button>
        </div>
      </Card>

      <Card title="About" className="mb-6">
        <p className="text-blue-900">
          SimCity BuildIt Shipment Profitability Calculator helps you decide whether to fulfill Cargo Ship or Airport shipments by comparing the cost of items to their opportunity cost.
        </p>
      </Card>
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmValueChange}
        itemName={getPendingItemName()}
        currentValue={pendingItemChange ? parseInt(pendingItemChange.value) || 0 : 0}
      />
    </div>
  );
}
