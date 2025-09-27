import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, ItemGrid, QuantityControl, Select, Modal, WarRewardQuantitySelector, DraggableModal } from '../components/ui';
import { useAppStore } from '../store/store';
import type { Item } from '../types/item';
import { ShipmentType } from '../types/item';
import { commercialItems, rewardItems } from '../data/items';

export default function ShipmentBuilderPage() {
  const navigate = useNavigate();
  const {
    currentShipment,
    setRewardItem,
    setRewardQuantity,
    addShipmentItem,
    updateShipmentItem,
    removeShipmentItem,
    updateItemSimoleonBonus,
  } = useAppStore();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSimoleonBonus, setModalSimoleonBonus] = useState('0');

  // Redirect if no shipment is being built
  useEffect(() => {
    if (!currentShipment) navigate('/');
    
  }, [currentShipment, navigate]);

  if (!currentShipment) return <div>Loading...</div>;

  // Filter reward items by shipment type
  const availableRewardItems = rewardItems.filter(item => item.type === currentShipment.type);

  // Filter commercial items by category for easier browsing
  const categories = Array.from(new Set(commercialItems.map(item => item.category)));

  // Filter items based on selected category
  const filteredItems = selectedCategory
    ? commercialItems.filter(item => item.category === selectedCategory)
    : commercialItems;

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
    setQuantity(1);
    setModalSimoleonBonus('0');
    setIsModalOpen(true);
  };

  const handleAddItem = () => {
    if (selectedItem) {
      if (currentShipment?.type === ShipmentType.WAR_ITEMS) {
        // War items don't have simoleon bonuses
        addShipmentItem({
          item: selectedItem,
          quantity
        });
      } else {
        // Regular shipments have simoleon bonuses
        addShipmentItem({
          item: selectedItem,
          quantity,
          simoleonBonus: parseInt(modalSimoleonBonus) || 0
        });
      }
      setIsModalOpen(false);
      setSelectedItem(null);
      setQuantity(1);
      setModalSimoleonBonus('0');
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setQuantity(1);
    setModalSimoleonBonus('0');
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    const item = currentShipment.items[index];
    updateShipmentItem(index, {
      ...item,
      quantity: newQuantity
    });
  };

  const handleUpdateBonus = (index: number, bonus: string) => {
    const numericBonus = parseInt(bonus) || 0;
    updateItemSimoleonBonus(index, numericBonus);
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  const handleRewardItemChange = (itemId: string) => {
    const selectedReward = rewardItems.find(item => item.id === itemId);
    if (selectedReward) setRewardItem(selectedReward);
  };

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Calculate if shipment is ready to be evaluated
  const canViewResults = currentShipment.items.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Shipment Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Shipment Type */}
          <Card title="Shipment Type" className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">
                  {currentShipment.type === ShipmentType.CARGO && 'Cargo Ship'}
                  {currentShipment.type === ShipmentType.WAR_ITEMS && 'War Deliveries'}
                  {currentShipment.type !== ShipmentType.CARGO && currentShipment.type !== ShipmentType.WAR_ITEMS && 
                    `Airport - ${currentShipment.type.split('_')[1].charAt(0).toUpperCase() + currentShipment.type.split('_')[1].slice(1)}`}
                </h3>
              </div>
              <Button onClick={() => navigate('/')} variant="primary">
                Change
              </Button>
            </div>
          </Card>

          {/* Reward Selection */}
          <Card title="Reward Item" className="mb-6">
            <div className="flex items-center mb-4">
              {currentShipment.selectedRewardItem && (
                <img
                  src={currentShipment.selectedRewardItem.image}
                  alt={currentShipment.selectedRewardItem.name}
                  className="w-14 h-14 object-contain mr-3"
                />
              )}
              <div className="flex-1">
                <Select
                  options={availableRewardItems.map(item => ({
                    value: item.id,
                    label: item.name
                  }))}
                  value={currentShipment.selectedRewardItem.id}
                  onChange={handleRewardItemChange}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* War reward quantity selector */}
            {currentShipment.type === ShipmentType.WAR_ITEMS && (
              <WarRewardQuantitySelector
                value={currentShipment.rewardQuantity || 1}
                onChange={setRewardQuantity}
                className="mt-4"
              />
            )}
          </Card>

          {/* Selected Items */}
          <Card title="Selected Items" className="mb-6">
            {currentShipment.items.length === 0 ? (
              <p className="text-black-500 italic">No items selected yet</p>
            ) : (
              <div className="space-y-4">
                {currentShipment.items.map((shipmentItem, index) => (
                  <div key={`${shipmentItem.item.id}-${index}`} className="flex flex-col border-b pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <img
                          src={shipmentItem.item.image}
                          alt={shipmentItem.item.name}
                          className="w-10 h-10 object-contain mr-3"
                        />
                        <div>
                          <p className="font-bold text-white">{shipmentItem.item.name}</p>
                            <p className="text-sm text-black font-semibold mt-1">
                            Price: {shipmentItem.item.maxPrice * shipmentItem.quantity} simoleons
                            </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <QuantityControl
                          value={shipmentItem.quantity}
                          onChange={(value) => handleUpdateQuantity(index, value)}
                        />

                        <Button
                          onClick={() => removeShipmentItem(index)}
                          variant="danger"
                          className="p-1 px-2 font-bold"
                        >
                          X
                        </Button>
                      </div>
                    </div>

                    {/* Simoleon Bonus for this item - only for non-war items */}
                    {currentShipment.type !== ShipmentType.WAR_ITEMS && 'simoleonBonus' in shipmentItem && (
                      <div className="ml-12">
                        <Input
                          label="Simoleon Bonus"
                          type="number"
                          value={shipmentItem.simoleonBonus.toString()}
                          onChange={(value) => {
                            if (parseInt(value) < 0) {
                              const inputElement = document.querySelector('input[type="number"]');
                              if (inputElement) {
                                inputElement.classList.add('vibrate');
                                setTimeout(() => inputElement.classList.remove('vibrate'), 500);
                              }
                            } else handleUpdateBonus(index, value);
                          }}
                        />

                        <style>
                          {`
                            .vibrate {
                            animation: vibrate 0.2s linear;
                            }
                            @keyframes vibrate {
                            0% { transform: translateX(0); }
                            25% { transform: translateX(-3px); }
                            50% { transform: translateX(3px); }
                            75% { transform: translateX(-3px); }
                            100% { transform: translateX(0); }
                            }
                          `}
                        </style>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-center">
                  <Button
                    onClick={handleViewResults}
                    variant="success"
                    disabled={!canViewResults}
                  >
                    Calculate Profitability
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div>
          {/* Item Browser */}
          <Card title="Add Items" className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-1">
                Select Category
              </label>
              <select
                className="dropdown"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <ItemGrid
              items={filteredItems}
              onSelect={handleItemSelect}
              className="mb-4"
            />
          </Card>
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelModal}
        title="Add Item to Shipment"
      >
        {selectedItem && (
          <div className="space-y-4">
            {/* Item Display */}
            <div className="flex flex-col items-center p-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-24 h-24 object-contain mb-3"
              />
              <div className="text-center">
                <h4 className="font-bold text-xl text-white">{selectedItem.name}</h4>
                <p className="text-sm text-white">
                  Category: {selectedItem.category}
                </p>
                <p className="text-sm text-black font-semibold mt-1">
                  Max Price: {selectedItem.maxPrice * quantity} simoleons
                </p>
              </div>
            </div>

            {/* Quantity Control */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 text-center">
                Quantity
              </label>
              <div className="flex justify-center">
                <QuantityControl
                  value={quantity}
                  onChange={setQuantity}
                  className="mb-2"
                />
              </div>
            </div>

            {/* Simoleon Bonus Input - only for non-war items */}
            {currentShipment.type !== ShipmentType.WAR_ITEMS && (
              <div className="p-2">
                <Input
                  label="Simoleon Bonus"
                  type="number"
                  value={modalSimoleonBonus}
                  onChange={(value) => {
                    if (parseInt(value) < 0) {
                      const inputElement = document.querySelector('input[type="number"]');
                      if (inputElement) {
                        inputElement.classList.add('vibrate');
                        setTimeout(() => inputElement.classList.remove('vibrate'), 500);
                      }
                    } else setModalSimoleonBonus(value);
                  }}
                />
              </div>
            )}

            <style>
              {`
                .vibrate {
                  animation: vibrate 0.2s linear;
                }
                @keyframes vibrate {
                  0% { transform: translateX(0); }
                  25% { transform: translateX(-3px); }
                  50% { transform: translateX(3px); }
                  75% { transform: translateX(-3px); }
                  100% { transform: translateX(0); }
                }
              `}
            </style>

            {/* Modal Actions */}
            <div className="flex justify-center space-x-4 pt-4 border-t border-blue-300">
              <Button
                onClick={handleCancelModal}
                variant="secondary"
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddItem}
                variant="primary"
                className="px-6"
              >
                Add to Shipment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
