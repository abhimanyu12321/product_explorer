import { fetchProductById, fetchProducts } from "@/lib/api";
import { ProductDetail } from "@/components/ProductDetail";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  try {
    const product = await fetchProductById(id);
    return {
      title: `${product.title} - Product Explorer`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: "Product Not Found",
    };
  }
}

async function ProductData({ id }: { id: string }) {
  try {
    const product = await fetchProductById(id);
    return <ProductDetail product={product} />;
  } catch (error) {
    notFound();
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-96 w-full" />
          </div>
        }
      >
        <ProductData id={id} />
      </Suspense>
    </main>
  );
}
