# Glowy - Cosmetic Products Review Platform

A comprehensive SolidJS web application for Glowy, a cosmetic company specializing in reliable product information, reviews, and personalized recommendations.

## 🌟 Features

- **Product Catalog**: Browse cosmetic products with detailed information
- **User Reviews**: Read and write authentic user reviews with ratings
- **Influencer Reviews**: Expert reviews from verified beauty influencers with social media integration
- **Price Comparison**: Compare prices across multiple online retailers
- **Personalized Recommendations**: Get product suggestions based on your skin type and concerns
- **Advanced Filtering**: Filter products by category, skin type, and specific concerns
- **User Profiles**: Rich user profiles with skin type, concerns, and preferences

## 🚀 Technology Stack

- **Frontend**: SolidJS with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)
- **Package Manager**: npm

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Building for Production

Build the app for production to the `dist` folder:

```bash
npm run build
```

It correctly bundles Solid in production mode and optimizes the build for the best performance.

## 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation header with search
│   ├── ProductCard.tsx  # Product display card
│   └── ReviewSection.tsx # Reviews display component
├── pages/               # Application pages
│   ├── HomePage.tsx     # Main product listing page
│   └── ProductDetail.tsx # Detailed product view
├── stores/              # State management
│   └── appStore.ts      # Global application state
├── types/               # TypeScript type definitions
│   └── index.ts         # All application types
├── utils/               # Utility functions and mock data
│   └── mockData.ts      # Sample data for demonstration
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

## 🎨 Key Features

### Product Catalog

- Browse products by categories (skincare, makeup, haircare, etc.)
- Filter by skin type and concerns
- Search functionality with real-time results

### Review System

- **User Reviews**: Authentic reviews with ratings and pros/cons
- **Influencer Reviews**: Verified experts with social media integration
- Video review links and engagement metrics

### Personalization

- User profiles with skin type, tone, and concerns
- Personalized product recommendations
- Tailored filtering based on individual needs

### Price Comparison

- Real-time price comparison across multiple retailers
- Availability status and shipping information
- Direct links to purchase

## 🌈 Supported Categories

- **Skincare**: Serums, moisturizers, cleansers
- **Makeup**: Foundation, lipstick, eyeshadow
- **Haircare**: Shampoos, treatments, styling products
- **Fragrance**: Perfumes, body sprays
- **Body Care**: Lotions, scrubs, treatments
- **Tools & Accessories**: Brushes, sponges, devices

## Learn More

- [Solid Website](https://solidjs.com)
- [Vite Documentation](https://vite.dev/guide/static-deploy.html)
