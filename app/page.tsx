import { fetchProducts, fetchCategories } from "@/lib/api";
import { ProductListingClient } from "@/components/ProductListingClient";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Suspense } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const dynamic = "force-dynamic";

async function ProductsData() {
  try {
    const [products, categories] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);

    return (
      <ProductListingClient
        initialProducts={products}
        categories={categories}
      />
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Products</AlertTitle>
          <AlertDescription>
            We couldn't load the products. Please check your internet connection
            and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4 py-8 mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Discover Amazing Products
              </h1>
              <p className="text-lg text-muted-foreground">
                Loading products...
              </p>
            </div>
            <LoadingSkeleton />
          </div>
        }
      >
        <ProductsData />
      </Suspense>
    </main>
  );
}
