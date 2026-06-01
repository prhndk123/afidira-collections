import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShoppingBag, MessageCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/checkout_/success")({
  head: () => ({
    meta: [
      { title: "Pesanan Berhasil — Afidira" },
      { name: "description", content: "Pesanan Anda telah kami terima." },
    ],
  }),
  component: SuccessPage,
});

function generateOrderNumber() {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `ORD-${date}-${rand}`;
}

function SuccessPage() {
  const orderNumber = generateOrderNumber();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        {/* Header Success */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-success)]/10">
          <CheckCircle2 className="h-10 w-10 text-[var(--color-success)]" strokeWidth={1.5} />
        </div>
        <p className="eyebrow text-[var(--color-success)]">Pembayaran Berhasil</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">Terima kasih atas pesananmu!</h1>
        <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground">
          Pesanan kamu sudah kami terima dan sedang diproses. Kami akan segera mengirimkan update melalui WhatsApp.
        </p>

        {/* Order Card / Receipt */}
        <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-lg border border-border bg-surface text-left shadow-sm">
          {/* Top section: Order Number */}
          <div className="border-b border-border bg-background px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Nomor Pesanan
                </p>
                <p className="mt-1 font-mono text-lg font-bold tracking-widest text-foreground">
                  {orderNumber}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted-foreground transition-colors hover:bg-border hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
                aria-label="Salin nomor pesanan"
                title="Salin nomor pesanan"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {copied && <p className="mt-2 text-xs text-[var(--color-success)]">Nomor pesanan disalin!</p>}
          </div>

          {/* Bottom section: Next Steps */}
          <div className="px-6 py-6">
            <h3 className="mb-5 font-serif text-lg font-medium">Langkah Selanjutnya</h3>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Verifikasi Pembayaran",
                  desc: "Tim Afidira akan memverifikasi pesanan kamu dalam 1×24 jam kerja.",
                },
                {
                  step: "2",
                  title: "Konfirmasi via WhatsApp",
                  desc: "Kami akan mengirimkan detail resi pengiriman melalui WhatsApp yang terdaftar.",
                },
                {
                  step: "3",
                  title: "Pesanan Dikirim",
                  desc: "Koleksi hijab cantikmu sedang dalam perjalanan menuju alamat tujuan.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild className="h-12 px-8">
            <Link to="/shop">
              <ShoppingBag className="mr-2 h-4 w-4" strokeWidth={1.5} />
              Lanjut Belanja
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-12 px-8">
            <a
              href={`https://wa.me/6281234567890?text=Halo%20Afidira,%20saya%20ingin%20konfirmasi%20pesanan%20dengan%20nomor%20${orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" strokeWidth={1.5} />
              Konfirmasi WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
