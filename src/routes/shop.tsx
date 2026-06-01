import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, collections } from "@/lib/data";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Koleksi — Afidira" },
      { name: "description", content: "Jelajahi koleksi hijab eksklusif: Pattern, Viscose, Segi Empat, dan Jeblus." },
      { property: "og:title", content: "Koleksi — Afidira" },
      { property: "og:description", content: "Koleksi hijab premium Afidira untuk gaya elegan setiap hari." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [filter, setFilter] = useState<string>("all");
  const visible =
    filter === "all" ? products : products.filter((p) => p.collection === filter);

  return (
    <div className="container-page py-16 md:py-20">
      <header className="mb-12 text-center">
        <p className="eyebrow text-muted-foreground">Koleksi</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Semua Hijab</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Temukan hijab yang paling sesuai dengan gaya dan aktivitasmu.
        </p>
      </header>

      <div className="-mx-6 mb-10 flex items-center gap-2 overflow-x-auto px-6 no-scrollbar">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          Semua
        </FilterPill>
        {collections.map((c) => (
          <FilterPill
            key={c.slug}
            active={filter === c.slug}
            onClick={() => setFilter(c.slug)}
          >
            {c.label}
          </FilterPill>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-pill border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
        active
          ? "border-foreground bg-foreground text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );
}
