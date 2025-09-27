import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { useAppStore } from '../store/store';
import { ShipmentType } from '../types/item';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { currentShipment, calculateProfitability, resetShipment } = useAppStore();

  // Redirect if no shipment is being calculated
  useEffect(() => {
    if (!currentShipment) {
      navigate('/');
    }
  }, [currentShipment, navigate]);

  if (!currentShipment) {
    return <div>Loading...</div>;
  }

  const result = calculateProfitability();

  // Calculate total simoleon bonus from all items (only for non-war items)
  const totalSimoleonBonus = currentShipment.type === ShipmentType.WAR_ITEMS ? 0 : 
    currentShipment.items.reduce((total, item) => {
      return total + ('simoleonBonus' in item ? item.simoleonBonus || 0 : 0);
    }, 0);

  // Calculate the reward item value (total reward value minus simoleon bonuses)
  const rewardQuantity = currentShipment.rewardQuantity || 1;
  const rewardItemUnitValue = result.rewardValue - totalSimoleonBonus;
  const rewardItemValue = rewardItemUnitValue / rewardQuantity; // Per unit value

  const handleNewShipment = () => {
    resetShipment();
    navigate('/');
  };

  const handleEditShipment = () => {
    navigate('/shipment-builder');
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Shipment Results</h1>

      <Card title="Cost Breakdown" className="mb-6">
        <div className="space-y-2">
          {currentShipment.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <span className="font-medium text-white">{item.item.name}</span>
                <span className="text-white"> × {item.quantity}</span>
              </div>
              <div className="text-white">
                {formatNumber(item.item.maxPrice * item.quantity)} simoleons
              </div>
            </div>
          ))}

          <div className="border-t pt-2 font-bold flex justify-between">
            <div>Total Cost:</div>
            <div>{formatNumber(result.cost)} simoleons</div>
          </div>
        </div>
      </Card>

      <Card title="Reward Breakdown" className="mb-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div>
              <span className="font-medium text-white">{currentShipment.selectedRewardItem.name}</span>
              {rewardQuantity > 1 && <span className="text-white"> × {rewardQuantity}</span>}
            </div>
            <div className="text-white">
              {formatNumber(rewardItemUnitValue)} simoleons
            </div>
          </div>

          {/* Only show simoleon bonus for non-war items */}
          {currentShipment.type !== ShipmentType.WAR_ITEMS && totalSimoleonBonus > 0 && (
            <div className="flex justify-between">
              <div>
                <span className="font-medium">Simoleon Bonus</span>
              </div>
              <div>
                {formatNumber(totalSimoleonBonus)} simoleons
              </div>
            </div>
          )}

          <div className="border-t pt-2 font-bold flex justify-between">
            <div>Total Reward Value:</div>
            <div>{formatNumber(result.rewardValue)} simoleons</div>
          </div>
        </div>
      </Card>

      <Card className={`mb-8 ${result.profitable ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">
            {result.profitable ? 'Profitable!' : 'Not Profitable!'}
          </h2>

          <div className="text-lg mb-2">
            <span className="font-medium text-white">Net Profit:</span>{' '}
            <span className={result.profitable ? 'text-green-400' : 'text-red-400'}>
              {result.netProfit >= 0 ? '+' : ''}{formatNumber(result.netProfit)} simoleons
            </span>
          </div>

          <div className="text-lg mb-4">
            <span className="font-medium text-white">Net Profit Margin:</span>{' '}
            <span className={result.profitable ? 'text-green-400' : 'text-red-400'}>
              {result.profitabilityPercentage.toFixed(0)}%
            </span>
          </div>

          <div className="text-xl font-bold text-white">
            Recommendation:{' '}
            <span className={result.profitable ? 'text-green-400' : 'text-red-400'}>
              {result.profitable ? '✅ Fulfill this shipment' : '❌ Skip this shipment'}
            </span>
          </div>
        </div>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button onClick={handleEditShipment} variant="outline">
          Edit Shipment
        </Button>
        <Button onClick={handleNewShipment} variant="primary">
          New Shipment
        </Button>
      </div>
    </div>
  );
}
