"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductListingClientProps {
  initialProducts: Product[];
  categories: string[];
}

export function ProductListingClient({
  initialProducts,
  categories,
}: ProductListingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Filter products based on search, category, and favorites
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesFavorites =
        !showFavoritesOnly || favorites.includes(product.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [
    initialProducts,
    searchQuery,
    selectedCategory,
    showFavoritesOnly,
    favorites,
  ]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700">
          Discover Amazing Products
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-top-6 duration-700">
          Explore our curated collection of high-quality products from various
          categories
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between animate-in fade-in slide-in-from-top-8 duration-700">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="transition-all duration-300 hover:scale-105"
          >
            <Heart
              className={`h-4 w-4 mr-2 transition-all ${
                showFavoritesOnly ? "fill-current" : ""
              }`}
            />
            {showFavoritesOnly ? "Showing Favorites" : "Show Favorites"}
            {favorites.length > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-background/20 text-xs">
                {favorites.length}
              </span>
            )}
          </Button>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProducts.length} of {initialProducts.length} products
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
