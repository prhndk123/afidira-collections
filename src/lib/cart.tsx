import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./data";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  fabric: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (p: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "culture-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    return {
      items,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (p, qty = 1) => {
        setItems((prev) => {
          const existing = prev.find((i) => i.slug === p.slug);
          if (existing) {
            return prev.map((i) => (i.slug === p.slug ? { ...i, qty: i.qty + qty } : i));
          }
          return [
            ...prev,
            { slug: p.slug, name: p.name, price: p.price, image: p.image, fabric: p.fabric, qty },
          ];
        });
        setOpen(true);
      },
      remove: (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug)),
      setQty: (slug, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => i.slug !== slug)
            : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
        ),
      clear: () => setItems([]),
      total,
      count,
    };
  }, [items, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
