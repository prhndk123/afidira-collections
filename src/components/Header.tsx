import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const navItems = [
  { to: "/shop", label: "Koleksi" },
  { to: "/about", label: "Tentang Kami" },
  { to: "/contact", label: "Kontak" },
] as const;

export function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-background transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_6px_rgba(0,0,0,0.06)]" : ""
        }`}
      >
        <div className="container-page">
          <div className="flex h-[72px] items-center justify-between md:h-[88px]">

            {/* LEFT: Logo + Nav */}
            <div className="flex items-center gap-8">
              {/* Mobile menu button */}
              <button
                aria-label="Open menu"
                className="md:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu strokeWidth={1.5} className="h-6 w-6" />
              </button>

              {/* CULTURE logo — kiri, bold */}
              <Link
                to="/"
                aria-label="Afidira — kembali ke beranda"
                className="flex items-baseline gap-0.5 select-none"
              >
                <span className="font-sans text-[22px] font-black uppercase leading-none tracking-[-0.01em] text-foreground md:text-[28px]">
                  Afidira
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden items-center gap-7 md:flex">
                {navItems.map((n) => (
                  <Link key={n.to} to={n.to} className="nav-link">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* RIGHT: icons */}
            <div className="flex items-center gap-5">
              <button aria-label="Search" className="hidden md:inline-flex">
                <Search strokeWidth={1.5} className="h-5 w-5" />
              </button>
              <Link to="/about" aria-label="Account" className="hidden md:inline-flex">
                <User strokeWidth={1.5} className="h-5 w-5" />
              </Link>
              <button aria-label="Open cart" className="relative" onClick={open}>
                <ShoppingBag strokeWidth={1.5} className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-pill bg-foreground px-1 text-[10px] font-semibold leading-none text-primary-foreground">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-in nav */}
      <div
        className={`fixed inset-0 z-50 transition ${mobileOpen ? "visible" : "invisible"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-foreground/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-background p-6 shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-10 flex items-center justify-between">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <span className="font-sans text-xl font-black uppercase tracking-[-0.01em]">
                Afidira
              </span>
            </Link>
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X strokeWidth={1.5} className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="nav-link text-base"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="nav-link text-base"
            >
              Keranjang
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
}
