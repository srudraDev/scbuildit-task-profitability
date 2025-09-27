import { create } from 'zustand';
import type { CalculationResult, RewardItem, Shipment, ShipmentItem, WarItem, UserSettings } from '../types/item.ts';
import { ShipmentType } from '../types/item.ts';
import { rewardItems } from '../data/items.ts';

interface AppState {
  // Current shipment being built
  currentShipment: Shipment | null;

  // User settings
  userSettings: UserSettings;

  // Methods
  setShipmentType: (type: ShipmentType) => void;
  setRewardItem: (item: RewardItem) => void;
  setRewardQuantity: (quantity: number) => void;
  addShipmentItem: (item: ShipmentItem | WarItem) => void;
  updateShipmentItem: (index: number, item: ShipmentItem | WarItem) => void;
  removeShipmentItem: (index: number) => void;
  updateItemSimoleonBonus: (index: number, bonus: number) => void;
  calculateProfitability: () => CalculationResult;
  resetShipment: () => void;
  updateRewardValue: (itemId: string, value: number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentShipment: null,
  userSettings: {
    rewardValues: rewardItems.reduce((acc, item) => {
      acc[item.id] = item.defaultValue;
      return acc;
    }, {} as Record<string, number>),
  },

  setShipmentType: (type) => {
    set({
      currentShipment: {
        id: `shipment-${Date.now()}`,
        type,
        selectedRewardItem: rewardItems.find(item => item.type === type) || rewardItems[0],
        rewardQuantity: type === ShipmentType.WAR_ITEMS ? 1 : 1, // Default to 1, but for war items it can be 1-3
        items: []
      }
    });
  },

  setRewardItem: (item) => {
    set((state) => ({
      currentShipment: state.currentShipment ? {
        ...state.currentShipment,
        selectedRewardItem: item
      } : null
    }));
  },

  setRewardQuantity: (quantity) => {
    set((state) => ({
      currentShipment: state.currentShipment ? {
        ...state.currentShipment,
        rewardQuantity: quantity
      } : null
    }));
  },

  addShipmentItem: (item) => {
    set((state) => {
      if (!state.currentShipment) return state;

      // Check if we already have 3 distinct items
      if (state.currentShipment.items.length >= 3 &&
        !state.currentShipment.items.some(i => i.item.id === item.item.id)) {
        return state; // Can't add more than 3 distinct items
      }

      // Check if this item already exists, if so update quantity
      const existingItemIndex = state.currentShipment.items.findIndex(i => i.item.id === item.item.id);

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.currentShipment.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };

        return {
          currentShipment: {
            ...state.currentShipment,
            items: updatedItems
          }
        };
      } else {
        // Add new item
        return {
          currentShipment: {
            ...state.currentShipment,
            items: [...state.currentShipment.items, item]
          }
        };
      }
    });
  },

  updateShipmentItem: (index, item) => {
    set((state) => {
      if (!state.currentShipment) return state;

      const updatedItems = [...state.currentShipment.items];
      updatedItems[index] = item;

      return {
        currentShipment: {
          ...state.currentShipment,
          items: updatedItems
        }
      };
    });
  },

  removeShipmentItem: (index) => {
    set((state) => {
      if (!state.currentShipment) return state;

      const updatedItems = state.currentShipment.items.filter((_, i) => i !== index);

      return {
        currentShipment: {
          ...state.currentShipment,
          items: updatedItems
        }
      };
    });
  },

  updateItemSimoleonBonus: (index, bonus) => {
    set((state) => {
      if (!state.currentShipment) return state;
      
      // War items don't have simoleon bonuses
      if (state.currentShipment.type === ShipmentType.WAR_ITEMS) return state;

      const updatedItems = [...state.currentShipment.items];
      const item = updatedItems[index];
      
      // Only update if it's a ShipmentItem (has simoleonBonus property)
      if ('simoleonBonus' in item) {
        updatedItems[index] = {
          ...item,
          simoleonBonus: bonus
        };
      }

      return {
        currentShipment: {
          ...state.currentShipment,
          items: updatedItems
        }
      };
    });
  },

  calculateProfitability: () => {
    const { currentShipment, userSettings } = get();

    if (!currentShipment) {
      return {
        cost: 0,
        rewardValue: 0,
        netProfit: 0,
        profitabilityPercentage: 0,
        profitable: false
      };
    }

    // Calculate the cost (sum of item quantities * max price)
    const cost = currentShipment.items.reduce((total, item) => {
      return total + (item.quantity * item.item.maxPrice);
    }, 0);

    // Get the reward value from user settings and multiply by quantity
    const rewardItemValue = userSettings.rewardValues[currentShipment.selectedRewardItem.id];
    const rewardQuantity = currentShipment.rewardQuantity || 1;
    const totalRewardItemValue = rewardItemValue * rewardQuantity;

    // Calculate total simoleon bonus (sum of all item bonuses) - only for non-war items
    const totalSimoleonBonus = currentShipment.items.reduce((total, item) => {
      // War items don't have simoleon bonuses
      if (currentShipment.type === ShipmentType.WAR_ITEMS) {
        return total;
      }
      // Check if item has simoleonBonus property (ShipmentItem vs WarItem)
      return total + ('simoleonBonus' in item ? item.simoleonBonus || 0 : 0);
    }, 0);

    // Calculate reward value (reward item value * quantity + total simoleon bonus)
    const rewardValue = totalRewardItemValue + totalSimoleonBonus;

    // Calculate net profit
    const netProfit = rewardValue - cost;

    // Calculate profitability percentage
    const profitabilityPercentage = cost > 0 ? ((rewardValue / cost) - 1) * 100 : 0;

    return {
      cost,
      rewardValue,
      netProfit,
      profitabilityPercentage,
      profitable: netProfit > 0
    };
  },

  resetShipment: () => {
    set({
      currentShipment: null
    });
  },

  updateRewardValue: (itemId, value) => {
    set((state) => ({
      userSettings: {
        ...state.userSettings,
        rewardValues: {
          ...state.userSettings.rewardValues,
          [itemId]: value
        }
      }
    }));
  }
}));
