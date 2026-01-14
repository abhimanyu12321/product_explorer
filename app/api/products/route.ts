import { NextResponse } from "next/server";
import { products } from "@/lib/data/products";

export async function GET() {
  // Return the static product data
  return NextResponse.json(products);
}
