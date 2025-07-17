# MoBoe - Movie Discovery App

A modern React application for discovering and managing movies, built for the hackathon.

## Team Members
- Youssef Charroud (Team Leader)
- Amine Haddade  
- Assia Boukdir

## Features
- 🎬 Movie discovery with beautiful cards
- 📱 Responsive design
- ⭐ Movie ratings and reviews
- 🔍 Search and filtering
- 💾 Watchlist management
- 🎨 Modern UI with Tailwind CSS

## Tech Stack
- React 19
- Vite
- Tailwind CSS
- Shadcn/ui Components
- Lucide React Icons
- React Router

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure
```
src/
├── components/
│   ├── ui/           # Shadcn UI components
│   └── MovieCard.jsx # Movie card component
├── data/
│   └── movies.json   # Movie data
├── layouts/
│   ├── Default.jsx   # Default layout
│   └── Guest.jsx     # Guest layout
├── pages/
│   └── LandingPageComplete.jsx # Main landing page
├── App.jsx
├── main.jsx
└── router.jsx
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
