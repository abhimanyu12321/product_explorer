"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Product } from "@/lib/types";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/50">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-background/80"
            >
              {product.category}
            </Badge>
          </div>
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300 min-h-14">
            {product.title}
          </h3>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating.rate}</span>
            <span>({product.rating.count})</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              View Details →
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
