import { NextResponse } from "next/server";
import { products } from "@/lib/data/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Find the product by ID
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
