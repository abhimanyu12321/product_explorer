import { Product } from "./types";
import {
  products as staticProducts,
  categories as staticCategories,
} from "./data/products";

/**
 * Fetches all products
 * On server-side: directly returns static data
 * On client-side: calls API route
 */
export async function fetchProducts(): Promise<Product[]> {
  // Server-side: return data directly without HTTP request
  if (typeof window === "undefined") {
    return staticProducts;
  }

  // Client-side: fetch from API route
  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Fetches a single product by ID
 * On server-side: directly finds in static data
 * On client-side: calls API route
 */
export async function fetchProductById(id: string | number): Promise<Product> {
  // Server-side: find product directly
  if (typeof window === "undefined") {
    const product = staticProducts.find((p) => p.id === Number(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  // Client-side: fetch from API route
  try {
    const response = await fetch(`/api/products/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found");
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches all available product categories
 * On server-side: directly returns static data
 * On client-side: calls API route
 */
export async function fetchCategories(): Promise<string[]> {
  // Server-side: return data directly without HTTP request
  if (typeof window === "undefined") {
    return staticCategories;
  }

  // Client-side: fetch from API route
  try {
    const response = await fetch("/api/categories");

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
