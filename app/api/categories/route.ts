import { NextResponse } from "next/server";
import { categories } from "@/lib/data/products";

export async function GET() {
  // Return the static categories data
  return NextResponse.json(categories);
}
