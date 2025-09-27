import { Item, RewardItem, ShipmentType } from '../types/item.ts';

// Dynamically import all item images
const importAllImages = () => {
  const images: Record<string, string> = {};

  const imageModules = import.meta.glob('/src/assets/items/*.png', { eager: true });

  // Populate the images object with the file names as keys and paths as values
  for (const path in imageModules) {
    const fileName = path.split('/').pop()?.split('.')[0]; // Extract the file name without extension
    if (fileName) {
      images[fileName] = path;
    }
  }

  return images;
};

const itemImages = importAllImages();

// Commercial and factory items
export const commercialItems: Item[] = [
  { id: 'metal', name: 'Metal', category: 'Factory', maxPrice: 10, image: itemImages['Metal'] },
  { id: 'wood', name: 'Wood', category: 'Factory', maxPrice: 20, image: itemImages['Wood'] },
  { id: 'plastic', name: 'Plastic', category: 'Factory', maxPrice: 25, image: itemImages['Plastic'] },
  { id: 'seeds', name: 'Seeds', category: 'Factory', maxPrice: 30, image: itemImages['Seeds'] },
  { id: 'minerals', name: 'Minerals', category: 'Factory', maxPrice: 40, image: itemImages['Minerals'] },
  { id: 'chemicals', name: 'Chemicals', category: 'Factory', maxPrice: 60, image: itemImages['Chemicals'] },
  { id: 'textiles', name: 'Textiles', category: 'Factory', maxPrice: 90, image: itemImages['Textiles'] },
  { id: 'sugar_and_spices', name: 'Sugar and Spices', category: 'Factory', maxPrice: 110, image: itemImages['Sugarspices'] },
  { id: 'glass', name: 'Glass', category: 'Factory', maxPrice: 120, image: itemImages['Glass'] },
  { id: 'animal_feed', name: 'Animal Feed', category: 'Factory', maxPrice: 140, image: itemImages['Animalfeed'] },
  { id: 'electrical_components', name: 'Electrical Components', category: 'Factory', maxPrice: 160, image: itemImages['Electrical_Components'] },
  { id: 'coconut', name: 'Coconuts', category: 'Tropical Products', maxPrice: 30, image: itemImages['Coconut'] },

  // Building Supplies Store
  { id: 'nails', name: 'Nails', category: 'Building Supplies Store', maxPrice: 80, image: itemImages['Nails'] },
  { id: 'planks', name: 'Planks', category: 'Building Supplies Store', maxPrice: 120, image: itemImages['Planks'] },
  { id: 'bricks', name: 'Bricks', category: 'Building Supplies Store', maxPrice: 190, image: itemImages['Bricks'] },
  { id: 'cement', name: 'Cement', category: 'Building Supplies Store', maxPrice: 440, image: itemImages['Cement'] },
  { id: 'glue', name: 'Glue', category: 'Building Supplies Store', maxPrice: 440, image: itemImages['Glue'] },
  { id: 'paint', name: 'Paint', category: 'Building Supplies Store', maxPrice: 320, image: itemImages['Paint'] },

  // Hardware Store
  { id: 'hammer', name: 'Hammer', category: 'Hardware Store', maxPrice: 90, image: itemImages['Hammer'] },
  { id: 'measuring_tape', name: 'Measuring Tape', category: 'Hardware Store', maxPrice: 110, image: itemImages['Measuring_Tape'] },
  { id: 'shovel', name: 'Shovel', category: 'Hardware Store', maxPrice: 150, image: itemImages['Shovel'] },
  { id: 'cooking_utensils', name: 'Cooking Utensils', category: 'Hardware Store', maxPrice: 250, image: itemImages['Cooking_Utensils'] },
  { id: 'ladder', name: 'Ladder', category: 'Hardware Store', maxPrice: 420, image: itemImages['Ladder'] },
  { id: 'drill', name: 'Drill', category: 'Hardware Store', maxPrice: 590, image: itemImages['Drill'] },

  // Farmer's Market
  { id: 'vegetables', name: 'Vegetables', category: 'Farmer\'s Market', maxPrice: 160, image: itemImages['Vegetables'] },
  { id: 'flour_bag', name: 'Flour Bag', category: 'Farmer\'s Market', maxPrice: 570, image: itemImages['Flour_Bag'] },
  { id: 'fruit_and_berries', name: 'Fruit and Berries', category: 'Farmer\'s Market', maxPrice: 730, image: itemImages['Fruit_and_Berries'] },
  { id: 'cream', name: 'Cream', category: 'Farmer\'s Market', maxPrice: 440, image: itemImages['Cream'] },
  { id: 'corn', name: 'Corn', category: 'Farmer\'s Market', maxPrice: 280, image: itemImages['Corn'] },
  { id: 'cheese', name: 'Cheese', category: 'Farmer\'s Market', maxPrice: 660, image: itemImages['Cheese'] },
  { id: 'beef', name: 'Beef', category: 'Farmer\'s Market', maxPrice: 860, image: itemImages['Beef'] },

  // Furniture Store
  { id: 'chairs', name: 'Chairs', category: 'Furniture Store', maxPrice: 300, image: itemImages['Chairs'] },
  { id: 'tables', name: 'Tables', category: 'Furniture Store', maxPrice: 500, image: itemImages['Tables'] },
  { id: 'home_textiles', name: 'Home Textiles', category: 'Furniture Store', maxPrice: 610, image: itemImages['Home_Textiles'] },
  { id: 'cupboard', name: 'Cupboard', category: 'Furniture Store', maxPrice: 900, image: itemImages['Cupboard'] },
  { id: 'couch', name: 'Couch', category: 'Furniture Store', maxPrice: 1810, image: itemImages['Couch'] },

  // Gardening Supplies
  { id: 'grass', name: 'Grass', category: 'Gardening Supplies', maxPrice: 310, image: itemImages['Grass'] },
  { id: 'tree_saplings', name: 'Tree Saplings', category: 'Gardening Supplies', maxPrice: 420, image: itemImages['Tree_Saplings'] },
  { id: 'garden_furniture', name: 'Garden Furniture', category: 'Gardening Supplies', maxPrice: 820, image: itemImages['Garden_Furniture'] },
  { id: 'fire_pit', name: 'Fire Pit', category: 'Gardening Supplies', maxPrice: 1740, image: itemImages['Fire_Pit'] },
  { id: 'lawn_mower', name: 'Lawn Mower', category: 'Gardening Supplies', maxPrice: 840, image: itemImages['Lawn_Mower'] },
  { id: 'garden_gnomes', name: 'Garden Gnomes', category: 'Gardening Supplies', maxPrice: 1600, image: itemImages['Garden_Gnomes'] },

  // Donut Shop
  { id: 'donuts', name: 'Donuts', category: 'Donut Shop', maxPrice: 950, image: itemImages['Donuts'] },
  { id: 'green_smoothie', name: 'Green Smoothie', category: 'Donut Shop', maxPrice: 1150, image: itemImages['Green_Smoothie'] },
  { id: 'bread_roll', name: 'Bread Roll', category: 'Donut Shop', maxPrice: 1840, image: itemImages['Bread_Roll'] },
  { id: 'cherry_cheesecake', name: 'Cherry Cheesecake', category: 'Donut Shop', maxPrice: 2240, image: itemImages['Cherry_Cheesecake'] },
  { id: 'frozen_yogurt', name: 'Frozen Yogurt', category: 'Donut Shop', maxPrice: 1750, image: itemImages['Frozen_Yogurt'] },
  { id: 'coffee', name: 'Coffee', category: 'Donut Shop', maxPrice: 750, image: itemImages['Coffee'] },

  // Fashion Store
  { id: 'cap', name: 'Cap', category: 'Fashion Store', maxPrice: 600, image: itemImages['Cap'] },
  { id: 'shoes', name: 'Shoes', category: 'Fashion Store', maxPrice: 980, image: itemImages['Shoes'] },
  { id: 'watch', name: 'Watch', category: 'Fashion Store', maxPrice: 580, image: itemImages['Watch'] },
  { id: 'business_suits', name: 'Business Suits', category: 'Fashion Store', maxPrice: 1170, image: itemImages['Business_Suits'] },
  { id: 'backpack', name: 'Backpack', category: 'Fashion Store', maxPrice: 430, image: itemImages['Backpack'] },

  // Fast Food Restaurant
  { id: 'ice_cream_sandwich', name: 'Ice Cream Sandwich', category: 'Fast Food Restaurant', maxPrice: 2560, image: itemImages['Ice_Cream_Sandwich'] },
  { id: 'pizza', name: 'Pizza', category: 'Fast Food Restaurant', maxPrice: 2560, image: itemImages['Pizza'] },
  { id: 'burgers', name: 'Burgers', category: 'Fast Food Restaurant', maxPrice: 3620, image: itemImages['Burgers'] },
  { id: 'cheese_fries', name: 'Cheese Fries', category: 'Fast Food Restaurant', maxPrice: 1050, image: itemImages['Cheese_Fries'] },
  { id: 'lemonade_bottle', name: 'Lemonade Bottle', category: 'Fast Food Restaurant', maxPrice: 1690, image: itemImages['Lemonade_Bottle'] },
  { id: 'popcorn', name: 'Popcorn', category: 'Fast Food Restaurant', maxPrice: 1250, image: itemImages['Popcorn'] },

  // Home Appliances
  { id: 'bbq_grill', name: 'BBQ Grill', category: 'Home Appliances', maxPrice: 530, image: itemImages['BBQ_Grill'] },
  { id: 'refrigerator', name: 'Refrigerator', category: 'Home Appliances', maxPrice: 1060, image: itemImages['Refrigerator'] },
  { id: 'lighting_system', name: 'Lighting System', category: 'Home Appliances', maxPrice: 890, image: itemImages['Lighting_System'] },
  { id: 'tv', name: 'TV', category: 'Home Appliances', maxPrice: 1280, image: itemImages['TV'] },
  { id: 'microwave_oven', name: 'Microwave Oven', category: 'Home Appliances', maxPrice: 480, image: itemImages['Microwave_Oven'] },
];

// Reward items with their default values
export const rewardItems: RewardItem[] = [
  // Golden Key (default value to be set by user in settings)
  { id: 'golden_key', name: 'Golden Key', defaultValue: 2000, image: itemImages['Golden_Keys'], type: ShipmentType.CARGO },

  // Storage (650 each)
  { id: 'storage_camera', name: 'Storage Camera', defaultValue: 650, image: itemImages['Storage_Camera'], type: ShipmentType.CARGO },
  { id: 'storage_lock', name: 'Storage Lock', defaultValue: 650, image: itemImages['Storage_Lock'], type: ShipmentType.CARGO },
  { id: 'storage_bars', name: 'Storage Bars', defaultValue: 650, image: itemImages['Storage_Bars'], type: ShipmentType.CARGO },

  // City Expansion (800 each)
  { id: 'dozer_blade', name: 'Dozer Blade', defaultValue: 800, image: itemImages['Dozer_Blade'], type: ShipmentType.CARGO },
  { id: 'dozer_exhaust', name: 'Dozer Exhaust', defaultValue: 800, image: itemImages['Dozer_Exhaust'], type: ShipmentType.CARGO },
  { id: 'dozer_wheel', name: 'Dozer Wheel', defaultValue: 800, image: itemImages['Dozer_Wheel'], type: ShipmentType.CARGO },

  // Beach (1500 each)
  { id: 'lifebelt', name: 'Lifebelt', defaultValue: 1500, image: itemImages['Lifebelt'], type: ShipmentType.CARGO },
  { id: 'ships_wheel', name: 'Ship\'s Wheel', defaultValue: 1500, image: itemImages['Ship27s_Wheel'], type: ShipmentType.CARGO },
  { id: 'scuba_mask', name: 'Scuba Mask', defaultValue: 1500, image: itemImages['Scuba_Mask'], type: ShipmentType.CARGO },

  // Mountain (1500 each)
  { id: 'compass', name: 'Compass', defaultValue: 1500, image: itemImages['Compass'], type: ShipmentType.CARGO },
  { id: 'snowboard', name: 'Snowboard', defaultValue: 1500, image: itemImages['Snowboard'], type: ShipmentType.CARGO },
  { id: 'winter_cap', name: 'Winter Cap', defaultValue: 1500, image: itemImages['Winter_Cap'], type: ShipmentType.CARGO },

  // Airport: Paris (1800 each)
  { id: 'fashion_clothes', name: 'Fashion Clothes', defaultValue: 1800, image: itemImages['Fashion_Clothes'], type: ShipmentType.AIRPORT_PARIS },
  { id: 'la_baguette', name: 'La Baguette', defaultValue: 1800, image: itemImages['La_Baguette'], type: ShipmentType.AIRPORT_PARIS },
  { id: 'luxury_bag', name: 'Luxury Bag', defaultValue: 1800, image: itemImages['Luxury_Bag'], type: ShipmentType.AIRPORT_PARIS },

  // Airport: London (2000 each)
  { id: 'bobbys_helmet', name: 'Bobby\'s Helmet', defaultValue: 2000, image: itemImages['Bobby27s_Helmet'], type: ShipmentType.AIRPORT_LONDON },
  { id: 'teapot', name: 'Teapot', defaultValue: 2000, image: itemImages['Teapot'], type: ShipmentType.AIRPORT_LONDON },
  { id: 'telephone_box', name: 'Telephone Box', defaultValue: 2000, image: itemImages['Telephone_Box'], type: ShipmentType.AIRPORT_LONDON },

  // Airport: Tokyo (2200 each)
  { id: 'bonsai_tree', name: 'Bonsai Tree', defaultValue: 2200, image: itemImages['Bonsai_Tree'], type: ShipmentType.AIRPORT_TOKYO },
  { id: 'lantern', name: 'Lantern', defaultValue: 2200, image: itemImages['Lantern'], type: ShipmentType.AIRPORT_TOKYO },
  { id: 'lucky_cat', name: 'Lucky Cat', defaultValue: 2200, image: itemImages['Lucky_Cat'], type: ShipmentType.AIRPORT_TOKYO },

  // War items
  { id: 'Ammo', name: 'Ammo', defaultValue: 3000, image: itemImages['Ammo'], type: ShipmentType.WAR_ITEMS },
  { id: 'Anvil', name: 'Anvil', defaultValue: 1000, image: itemImages['Anvil'], type: ShipmentType.WAR_ITEMS },
  { id: 'Binoculars', name: 'Binoculars', defaultValue: 1000, image: itemImages['Binoculars'], type: ShipmentType.WAR_ITEMS },
  { id: 'Gasoline', name: 'Gasoline', defaultValue: 1000, image: itemImages['Gasoline'], type: ShipmentType.WAR_ITEMS },
  { id: 'Pliers', name: 'Pliers', defaultValue: 1000, image: itemImages['Pliers'], type: ShipmentType.WAR_ITEMS },
  { id: 'Propeller', name: 'Propeller', defaultValue: 1000, image: itemImages['Propeller'], type: ShipmentType.WAR_ITEMS },
  { id: 'Fire Hydrant', name: 'Fire Hydrant', defaultValue: 1000, image: itemImages['Fire_Hydrant'], type: ShipmentType.WAR_ITEMS },
  { id: 'Megaphone', name: 'Megaphone', defaultValue: 1000, image: itemImages['Megaphone'], type: ShipmentType.WAR_ITEMS },
  { id: 'Plunger', name: 'Plunger', defaultValue: 1000, image: itemImages['Plunger'], type: ShipmentType.WAR_ITEMS },
  { id: 'Rubber Boots', name: 'Rubber Boots', defaultValue: 1000, image: itemImages['Rubber_Boots'], type: ShipmentType.WAR_ITEMS },
  { id: 'Rubber Duck', name: 'Rubber Duck', defaultValue: 1000, image: itemImages['Rubber_Duck'], type: ShipmentType.WAR_ITEMS },
  { id: 'Medkit', name: 'Medkit', defaultValue: 1000, image: itemImages['MedKit'], type: ShipmentType.WAR_ITEMS },
];

// Shipment type groups
export const shipmentTypes = [
  { id: 'cargo_golden_key', name: 'Cargo - Golden Key', type: ShipmentType.CARGO, rewardItems: rewardItems.filter(item => item.id === 'golden_key') },
  { id: 'cargo_storage', name: 'Cargo - Storage', type: ShipmentType.CARGO, rewardItems: rewardItems.filter(item => item.id.includes('storage_')) },
  { id: 'cargo_city', name: 'Cargo - City Expansion', type: ShipmentType.CARGO, rewardItems: rewardItems.filter(item => item.id.includes('dozer_')) },
  { id: 'cargo_beach', name: 'Cargo - Beach', type: ShipmentType.CARGO, rewardItems: rewardItems.filter(item => ['lifebelt', 'ships_wheel', 'scuba_mask'].includes(item.id)) },
  { id: 'cargo_mountain', name: 'Cargo - Mountain', type: ShipmentType.CARGO, rewardItems: rewardItems.filter(item => ['compass', 'snowboard', 'winter_cap'].includes(item.id)) },
  { id: 'airport_paris', name: 'Paris', type: ShipmentType.AIRPORT_PARIS, rewardItems: rewardItems.filter(item => item.type === ShipmentType.AIRPORT_PARIS) },
  { id: 'airport_london', name: 'London', type: ShipmentType.AIRPORT_LONDON, rewardItems: rewardItems.filter(item => item.type === ShipmentType.AIRPORT_LONDON) },
  { id: 'airport_tokyo', name: 'Tokyo', type: ShipmentType.AIRPORT_TOKYO, rewardItems: rewardItems.filter(item => item.type === ShipmentType.AIRPORT_TOKYO) },
  { id: 'war_items', name: 'War Items', type: ShipmentType.WAR_ITEMS, rewardItems: rewardItems.filter(item => item.type === ShipmentType.WAR_ITEMS) },
];
