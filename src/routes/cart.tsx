import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Keranjang — Afidira" },
      { name: "description", content: "Periksa kembali keranjang belanjaanmu sebelum checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="eyebrow text-muted-foreground">Keranjang</p>
        <h1 className="mt-3 font-serif text-4xl">Keranjang kamu masih kosong</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Temukan inspirasi gayamu. Lihat koleksi terbaru kami.
        </p>
        <Link to="/shop" className="btn-primary mt-8 inline-flex">Belanja Sekarang</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-16">
      <header className="mb-12">
        <p className="eyebrow text-muted-foreground">Keranjang</p>
        <h1 className="mt-3 font-serif text-4xl">Keranjang Belanja · {items.length} {items.length === 1 ? "produk" : "produk"}</h1>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((i) => (
            <li key={i.slug} className="flex gap-6 py-6">
              <Link
                to="/products/$slug"
                params={{ slug: i.slug }}
                className="h-32 w-24 flex-shrink-0 overflow-hidden bg-surface"
              >
                <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      to="/products/$slug"
                      params={{ slug: i.slug }}
                      className="font-sans text-sm font-medium uppercase tracking-[0.08em] hover:text-accent"
                    >
                      {i.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">{i.fabric}</p>
                  </div>
                  <p className="text-sm">{formatPrice(i.price * i.qty)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center border border-border">
                    <button
                      className="flex h-9 w-9 items-center justify-center hover:bg-surface"
                      onClick={() => setQty(i.slug, i.qty - 1)}
                      aria-label="Kurangi"
                    >
                      <Minus strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm">{i.qty}</span>
                    <button
                      className="flex h-9 w-9 items-center justify-center hover:bg-surface"
                      onClick={() => setQty(i.slug, i.qty + 1)}
                      aria-label="Tambah"
                    >
                      <Plus strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    className="text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
                    onClick={() => remove(i.slug)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="bg-surface p-8">
          <h2 className="eyebrow">Ringkasan Pesanan</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Ongkos Kirim</dt>
              <dd>{total >= 300000 ? "Gratis 🎉" : formatPrice(25000)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
              <dt>Total Bayar</dt>
              <dd>{formatPrice(total >= 300000 ? total : total + 25000)}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="btn-primary mt-8 w-full inline-flex items-center justify-center">Lanjut ke Checkout</Link>
          <Link to="/shop" className="mt-3 block text-center text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
            Lanjut Belanja
          </Link>
        </aside>
      </div>
    </div>
  );
}
