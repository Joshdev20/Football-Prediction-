# FootPredict - AI Football Prediction App

A modern football prediction web application that provides AI-powered insights and betting suggestions for upcoming matches.

## Features

- 🎯 Advanced prediction algorithm using statistical analysis
- 📊 Team form and head-to-head comparison
- 💰 Intelligent betting suggestions with confidence ratings
- 📈 Performance statistics and trends
- 🎮 Modern, responsive dark-mode UI

## Tech Stack

- React + TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Recharts for data visualization

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:5000](http://localhost:5000)

## Project Structure

- `/client/src/components` - React components
- `/client/src/data` - Mock data and prediction algorithms
- `/client/src/pages` - Page components
- `/client/src/lib` - Utility functions and configurations

## Prediction Algorithm

The prediction system uses multiple factors:
- Recent team performance with weighted scoring
- Head-to-head records
- Goal scoring and conceding patterns
- Home/Away advantage
- Form analysis with exponential decay

## License

MIT License
