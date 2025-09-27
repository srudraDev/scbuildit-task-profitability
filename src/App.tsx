import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import ShipmentBuilderPage from './pages/ShipmentBuilderPage'
import ResultsPage from './pages/ResultsPage'
import SettingsPage from './pages/SettingsPage'
import { UnsavedChangesProvider, useUnsavedChanges } from './context/UnsavedChangesContext'
import { Modal, Button } from './components/ui'

const NavBar = () => {
  const { hasUnsavedChanges } = useUnsavedChanges();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (to: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    
    if (hasUnsavedChanges && location.pathname !== to) {
      setPendingNavigation(to);
      setShowConfirmation(true);
    } else {
      navigate(to);
    }
  };
  
  const confirmNavigation = () => {
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
      setShowConfirmation(false);
    }
  };
  
  const cancelNavigation = () => {
    setPendingNavigation(null);
    setShowConfirmation(false);
  };

  return (
    <>
      <nav className={`shadow-sm bg-white border-b ${hasUnsavedChanges ? 'border-red-500 pt-4' : 'border-gray-200'} relative`}>
        {hasUnsavedChanges && (
          <div className="absolute left-0 top-0 w-full bg-red-500 text-white text-xs text-center py-0.5">
            You have unsaved changes - Save before navigating away
          </div>
        )}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold">
              <div className="relative group">
                <a 
                  href="/"
                  onClick={(e) => handleNavigation('/', e)}
                  className={`${hasUnsavedChanges ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  Home
                </a>
                {hasUnsavedChanges && (
                  <div className="absolute hidden group-hover:block bg-red-600 text-white text-xs rounded p-2 z-10 -bottom-10 left-1/2 transform -translate-x-1/2 w-56 text-center">
                    Save your changes before leaving this page
                  </div>
                )}
              </div>
            </div>
            <div>
              <a 
                href="/settings"
                onClick={(e) => handleNavigation('/settings', e)}
                className="text-gray-600 hover:text-blue-600"
              >
                Settings
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Navigation Confirmation Modal */}
      <Modal isOpen={showConfirmation} onClose={cancelNavigation} title="Unsaved Changes">
        <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
          <p className="text-center text-gray-800 mb-4">
            You have unsaved changes. If you leave this page, your changes will be lost.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={cancelNavigation} variant="primary">
              Stay on this Page
            </Button>
            <Button onClick={confirmNavigation} variant="danger">
              Discard Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

function App() {
  return (
    <Router>
      <UnsavedChangesProvider>
        <div className="min-h-screen">
          <NavBar />
        
        <div className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shipment-builder" element={<ShipmentBuilderPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
      </UnsavedChangesProvider>
    </Router>
  )
}

export default App;
