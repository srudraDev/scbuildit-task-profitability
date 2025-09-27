// Enum for shipment types
export enum ShipmentType {
  CARGO = 'cargo',
  AIRPORT_PARIS = 'airport_paris',
  AIRPORT_LONDON = 'airport_london',
  AIRPORT_TOKYO = 'airport_tokyo',
  WAR_ITEMS = 'war'
}

// Interface for commercial or factory item
export interface Item {
  id: string;
  name: string;
  category: string;
  maxPrice: number;
  image: string;
}

// Interface for a reward item (Golden Key, expansion item, etc.)
export interface RewardItem {
  id: string;
  name: string;
  defaultValue: number;
  image: string;
  type: ShipmentType;
}

// Interface for a shipment item selection (item + quantity)
export interface ShipmentItem {
  item: Item;
  quantity: number;
  simoleonBonus: number;
}

export interface WarItem {
  item: Item;
  quantity: number;
}

// Interface for a shipment
export interface Shipment {
  id: string;
  type: ShipmentType;
  selectedRewardItem: RewardItem;
  rewardQuantity?: number; // For war items (1-3), defaults to 1 for others
  items: (ShipmentItem | WarItem)[];
  totalSimoleonBonus?: number; // phasing it out
}

// Interface for calculation result
export interface CalculationResult {
  cost: number;
  rewardValue: number;
  netProfit: number;
  profitabilityPercentage: number;
  profitable: boolean;
}

// Interface for user settings
export interface UserSettings {
  rewardValues: Record<string, number>;
}
