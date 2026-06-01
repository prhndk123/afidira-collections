import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col"
    >
      <div className="tile-image aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-sm font-medium uppercase tracking-[0.08em]">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.fabric}</p>
        </div>
        <p className="text-sm">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
