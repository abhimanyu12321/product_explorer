"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { Card } from "./ui/card";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-6 group hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Button>
        </Link>

        {/* Product Detail Card */}
        <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted/30 group">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Information */}
            <div className="space-y-6 flex flex-col justify-center">
              {/* Category Badge */}
              <Badge variant="secondary" className="w-fit capitalize text-sm">
                {product.category}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">
                  {product.rating.rate}
                </span>
                <span className="text-muted-foreground">
                  ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="py-4 border-y">
                <span className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
