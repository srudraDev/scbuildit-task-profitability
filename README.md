# SimCity BuildIt Shipment Profitability Calculator

This is a simple React application that helps SimCity BuildIt players calculate whether fulfilling Cargo Ship, Airport, or War shipments are profitable.

## Features

- Select shipment type (Cargo Ship, Airport, or War)
- Choose from different reward items
- Add up to 3 distinct commercial/factory items
- Enter simoleon bonus from the game
- View profitability calculation and recommendation
- Customize reward item values in settings

## How to Use

1. **Home Page**: Select a shipment type (Cargo Ship, Airport, or War).
2. **Shipment Builder**: 
   - Select a reward item
   - Add commercial/factory items
   - Adjust quantities
   - Enter simoleon bonus
3. **Results Page**: View the profitability calculation and recommendation.
4. **Settings Page**: Customize the valuation of reward items.

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## Technologies Used

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Zustand for state management
- React Router for navigation

## Based on PRD

This application was built according to the PRD (Product Requirements Document) that specified:

- Modern, minimalistic, mobile-first design
- Card-based layout with intuitive grouping
- Item selection with images
- Automatic value lookup based on max Trade Depot price
- Profitability calculation and recommendation output

## License

This project is licensed under the MIT License.