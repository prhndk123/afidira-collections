import { Link, useNavigate } from "@tanstack/react-router";
import { X, Minus, Plus } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart";
import { useEffect, useRef } from "react";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, total } = useCart();
  const navigate = useNavigate();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    // Move focus to close button when drawer opens to prevent focus trap
    const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <div
      className={`fixed inset-0 transition-all duration-300 ${isOpen ? "z-50 visible opacity-100" : "-z-10 invisible opacity-0 pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-foreground/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-background shadow-[-4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="eyebrow">Your Cart</h2>
          <button ref={closeButtonRef} aria-label="Close cart" onClick={close}>
            <X strokeWidth={1.5} className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="font-serif text-2xl">Keranjang kamu kosong</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Mulai dengan arrivals terbaru kami — kelembutan yang bisa kamu rasakan.
            </p>
            <button className="btn-primary mt-8" onClick={close}>
              Lanjut Belanja
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="divide-y divide-border">
                {items.map((i) => (
                  <li key={i.slug} className="flex gap-4 py-5">
                    <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-surface">
                      <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">{i.name}</p>
                          <p className="text-xs text-muted-foreground">{i.fabric}</p>
                        </div>
                        <p className="text-sm">{formatPrice(i.price * i.qty)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="inline-flex items-center border border-border">
                          <button
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-surface"
                            onClick={() => setQty(i.slug, i.qty - 1)}
                          >
                            <Minus strokeWidth={1.5} className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">{i.qty}</span>
                          <button
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-surface"
                            onClick={() => setQty(i.slug, i.qty + 1)}
                          >
                            <Plus strokeWidth={1.5} className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          className="text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
                          onClick={() => remove(i.slug)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="eyebrow">Subtotal</span>
                <span className="text-base font-medium">{formatPrice(total)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Ongkos kirim dihitung saat checkout. Gratis ongkir untuk pembelian ≥ Rp 300.000.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <button
                  className="btn-primary w-full"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                    close();
                    navigate({ to: "/checkout" });
                  }}
                >
                  Checkout
                </button>
                <Link to="/cart" onClick={close} className="btn-outline w-full">
                  Lihat Keranjang
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
