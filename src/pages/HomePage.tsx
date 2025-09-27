import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { ShipmentType } from '../types/item';
import { shipmentTypes } from '../data/items';
import { useAppStore } from '../store/store';

export default function HomePage() {
  const navigate = useNavigate();
  const setShipmentType = useAppStore((state) => state.setShipmentType);

  const handleShipmentTypeSelect = (type: ShipmentType) => {
    setShipmentType(type);
    navigate('/shipment-builder');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        SimCity BuildIt Shipment Profitability Calculator
      </h1>

      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-white">Shipment Type</h2>

        <div className="space-y-4">
          <div>
            <div className="grid grid-cols-1 gap-2">
              <Card className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Cargo Ship</h3>
                    <p className="text-sm text-gray-500 flex flex-wrap">
                      {shipmentTypes
                        .filter(t => t.type === ShipmentType.CARGO)
                        .flatMap(t => t.rewardItems)
                        .map(item =>
                          <img
                            key={item.name}
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-11 object-contain mr-4 my-1"
                          />
                        )
                      }
                    </p>
                    <Button
                      onClick={() => handleShipmentTypeSelect(ShipmentType.CARGO)}
                      variant="primary"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2 text-white">Airport</h3>
            <div className="grid grid-cols-1 gap-2">
              {shipmentTypes
                .filter(type => type.type !== ShipmentType.CARGO && type.type !== ShipmentType.WAR_ITEMS)
                .map(type => (
                  <Card key={type.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{type.name}</h4>
                        <p className="text-sm text-gray-500 flex flex-wrap">
                          {type.rewardItems
                            .map(item =>
                              <img
                                key={item.name}
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-contain mr-3"
                              />
                            )
                          }
                        </p>
                      </div>
                      <Button
                        onClick={() => handleShipmentTypeSelect(type.type)}
                        variant="primary"
                      >
                        Select
                      </Button>
                    </div>
                  </Card>
                ))
              }
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-white">War Items</h3>
            <div className="grid grid-cols-1 gap-2">
              {shipmentTypes
                .filter(type => type.type === ShipmentType.WAR_ITEMS)
                .map(type => (
                  <Card key={type.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 flex flex-wrap">
                          {type.rewardItems
                            .map(item =>
                              <img
                                key={item.name}
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-contain mr-3"
                              />
                            )
                          }
                        </p>
                      </div>
                      <Button
                        onClick={() => handleShipmentTypeSelect(type.type)}
                        variant="primary"
                      >
                        Select
                      </Button>
                    </div>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
