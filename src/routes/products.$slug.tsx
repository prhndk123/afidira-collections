import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Truck, RotateCcw, Sparkles } from "lucide-react";
import { productBySlug, products } from "@/lib/data";
import { formatPrice, useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Afidira` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-serif text-3xl">Produk tidak ditemukan</h1>
      <Link to="/shop" className="text-link mt-6 inline-block">Kembali ke koleksi</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="container-page py-12 md:py-16">
      <nav className="mb-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Beranda</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">Koleksi</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="tile-image aspect-[3/4]">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="md:pt-6">
          <p className="eyebrow text-muted-foreground">{product.fabric}</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-md text-base text-muted-foreground">{product.description}</p>

          <div className="mt-10 flex items-end gap-4">
            <div>
              <label className="eyebrow mb-2 block text-muted-foreground">Jumlah</label>
              <div className="inline-flex items-center border border-border">
                <button
                  className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-surface"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Kurangi"
                >
                  <Minus strokeWidth={1.5} className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{qty}</span>
                <button
                  className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-surface"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Tambah"
                >
                  <Plus strokeWidth={1.5} className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button
              className="btn-primary flex-1"
              onClick={() => add(product, qty)}
            >
              Tambah ke Keranjang · {formatPrice(product.price * qty)}
            </button>
          </div>

          <ul className="mt-10 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Truck strokeWidth={1.5} className="h-4 w-4 text-foreground" />
              Gratis ongkir dengan min. pembelian Rp300.000
            </li>
            <li className="flex items-center gap-3">
              <RotateCcw strokeWidth={1.5} className="h-4 w-4 text-foreground" />
              Garansi tukar apabila cacat
            </li>
            <li className="flex items-center gap-3">
              <Sparkles strokeWidth={1.5} className="h-4 w-4 text-foreground" />
              Dibuat dengan bahan premium berkualitas
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="mb-10 font-serif text-2xl md:text-3xl">Mungkin kamu juga suka</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
