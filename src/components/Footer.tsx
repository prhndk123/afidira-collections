import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 md:mt-24 bg-surface">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <span className="font-sans text-2xl font-black uppercase tracking-[-0.01em]">Afidira<span className="ml-1 text-accent">·</span></span>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Koleksi hijab pattern modern dan elegan untuk perempuan yang ingin tampil percaya diri di setiap momen.
            </p>
          </div>

          <FooterCol title="Koleksi">
            <FLink to="/shop">Semua Hijab</FLink>
            <FLink to="/shop">Koleksi Terbaru</FLink>
            <FLink to="/shop">Pattern Eksklusif</FLink>
            <FLink to="/shop">Spesial Acara</FLink>
          </FooterCol>

          <FooterCol title="Layanan Pelanggan">
            <FLink to="/contact">Hubungi Kami</FLink>
            <FLink to="/contact">Pengiriman</FLink>
            <FLink to="/contact">Pengembalian</FLink>
            <FLink to="/contact">FAQ</FLink>
          </FooterCol>

          <FooterCol title="Ikuti Kami">
            <a href="https://www.instagram.com/afidira.id" target="_blank" rel="noopener noreferrer" className="footer-link inline-flex items-center gap-2">
              <Instagram strokeWidth={1.5} className="h-4 w-4" /> Instagram
            </a>
            <a href="#" className="footer-link inline-flex items-center gap-2">
              <Youtube strokeWidth={1.5} className="h-4 w-4" /> TikTok / YouTube
            </a>
            <a
              href="mailto:hello@afidira.id"
              className="footer-link inline-flex items-center gap-2"
            >
              <Mail strokeWidth={1.5} className="h-4 w-4" /> hello@afidira.id
            </a>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Afidira. Seluruh hak cipta dilindungi.</p>
          <p className="uppercase tracking-[0.16em]">More Than a Hijab, It’s Your Collection</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="eyebrow mb-5">{title}</h4>
      <div className="flex flex-col gap-3 text-sm">{children}</div>
    </div>
  );
}

function FLink({ to, children }: { to: "/shop" | "/about" | "/contact"; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-foreground transition-colors hover:text-accent">
      {children}
    </Link>
  );
}
