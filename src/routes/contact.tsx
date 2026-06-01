import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Truck } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — Afidira" },
      { name: "description", content: "Hubungi tim Afidira — brand hijab pattern untuk perempuan modern Indonesia." },
      { property: "og:title", content: "Kontak — Afidira" },
      { property: "og:description", content: "Kami senang mendengar dari kamu. hello@afidira.id" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container-page py-16 md:py-24">
      <header className="mb-16 text-center">
        <p className="eyebrow text-muted-foreground">Kontak</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Kami siap membantu.</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
          Kami akan membalas dalam 1 hari kerja. Untuk pertanyaan pesanan, sertakan nomor pesanan kamu.
        </p>
      </header>

      <div className="grid gap-16 md:grid-cols-[1fr_360px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nama">
              <input required className="form-input" />
            </Field>
            <Field label="Email">
              <input type="email" required className="form-input" />
            </Field>
          </div>
          <Field label="Subjek">
            <input className="form-input" />
          </Field>
          <Field label="Pesan">
            <textarea required rows={6} className="form-input resize-y" />
          </Field>
          <button type="submit" className="btn-primary">Kirim Pesan</button>
          {sent && (
            <p className="text-sm text-[color:var(--color-success)]">
              Terima kasih! Kami akan membalas dalam 1 hari kerja.
            </p>
          )}
        </form>

        <aside className="space-y-6">
          <Info icon={<Mail strokeWidth={1.5} className="h-5 w-5" />} title="Email">
            <a href="mailto:hello@afidira.id" className="underline">
              hello@afidira.id
            </a>
          </Info>
          <Info icon={<MessageCircle strokeWidth={1.5} className="h-5 w-5" />} title="Chat & DM">
            Senin–Jumat, 09.00–17.00 WIB
          </Info>
          <Info icon={<Truck strokeWidth={1.5} className="h-5 w-5" />} title="Pengiriman">
            Gratis ongkir untuk pembelian di atas Rp 200.000. Pengiriman ke seluruh Indonesia.
          </Info>
        </aside>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          font: inherit;
          color: inherit;
          outline: none;
          transition: border-color 200ms;
        }
        textarea.form-input { padding: 12px 14px; height: auto; }
        .form-input:focus { border-color: var(--color-foreground); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="eyebrow">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
