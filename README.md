# Product Explorer Dashboard

A modern, responsive product listing application built with Next.js and shadcn/ui.

## Setup Instructions

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features Implemented

- **Product Listing** - Browse products from the FakeStore API
- **Search** - Real-time client-side search by product name
- **Category Filtering** - Filter products by category
- **Favorites** - Mark/unmark products as favorites with localStorage persistence
- **Favorites Filter** - View only favorited products
- **Product Details** - Individual product pages with full information
- **Responsive Design** - Mobile-first design with glassmorphism effects
- **Loading & Error States** - Proper handling of async states

## Assumptions / Trade-offs

- **Client-side filtering** - All filtering happens on the client for better UX, assuming the product dataset is manageable
- **localStorage for favorites** - Simple persistence solution; data is browser-specific and not synced across devices
- **Static category list** - Categories are derived from the API response rather than hardcoded
