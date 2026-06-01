import { createFileRoute, Link } from "@tanstack/react-router";
import brandMission from "@/assets/brand-mission-custom.png";
import videoThumbnail from "@/assets/video-thumbnail.png";
import { collections, reviews } from "@/lib/data";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Star } from "lucide-react";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Afidira — More Than a Hijab, It's Your Collection" },
      {
        name: "description",
        content:
          "Temukan koleksi hijab pattern eksklusif Afidira. Desain modern, warna elegan, dan bahan nyaman untuk setiap aktivitas — kuliah, bekerja, hingga acara spesial.",
      },
      { property: "og:title", content: "Afidira" },
      {
        property: "og:description",
        content: "More Than a Hijab, It's Your Collection.",
      },
    ],
  }),
  component: Home,
}));

function Home() {
  return (
    <div>
      {/* HERO CAROUSEL */}
      <HeroCarousel />

      {/* SHOP BY CATEGORY */}
      <section className="container-page py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow text-muted-foreground">Kategori Koleksi</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Pilih Gaya Hijabmu</h2>
          </div>
          <Link to="/shop" className="hidden text-link md:inline-block">
            Lihat semua
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              className="group flex flex-col"
              aria-label={`Belanja ${c.label}`}
            >
              <div className="tile-image aspect-[3/4]">
                <img src={c.image} alt={c.label} loading="lazy" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="eyebrow">{c.label}</h3>
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                  Lihat →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-page max-w-3xl text-center">
          <p className="eyebrow text-muted-foreground">Dibuat untuk kamu</p>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl">Ekspresikan dirimu melalui hijab.</h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Dari pattern bunga yang lembut hingga motif geometris yang bold, setiap koleksi Afidira dirancang
            untuk membantu kamu tampil percaya diri — untuk aktivitas harian, kuliah, bekerja, maupun acara spesial.
          </p>
          <div className="mt-10">
            <Link to="/shop" className="btn-primary">
              Jelajahi Koleksi
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container-page py-20 md:py-28">
        <div className="mb-10 text-center">
          <p className="eyebrow text-muted-foreground">Apa kata mereka</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Ribuan perempuan sudah memilih Afidira.
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} fill="currentColor" strokeWidth={0} className="h-4 w-4 text-accent" />
            ))}
            <span className="ml-2">4.9 / 5 · Ribuan ulasan terverifikasi</span>
          </div>
        </div>
        <div className="-mx-6 overflow-hidden px-6">
          <div className="group flex gap-6 md:gap-8 pb-2">
            {[1, 2].map((listKey) => (
              <div
                key={listKey}
                className="flex shrink-0 gap-6 md:gap-8 animate-marquee group-hover:[animation-play-state:paused]"
                aria-hidden={listKey === 2 ? "true" : undefined}
              >
                {reviews.map((r, i) => (
                  <article
                    key={i}
                    className="flex w-[300px] shrink-0 flex-col border border-border bg-surface p-6 md:w-[340px]"
                  >
                    <div className="flex gap-1 text-accent">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} fill="currentColor" strokeWidth={0} className="h-3.5 w-3.5" />
                      ))}
                    </div>
                    <h3 className="mt-4 font-sans text-base font-semibold">{r.title}</h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{r.body}</p>
                    <div className="mt-6 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {r.author} · {r.date}
                    </div>
                    <div className="mt-1 text-xs text-foreground">pada {r.product}</div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* VIDEO */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-page">
          <div className="mb-10 text-center">
            <p className="eyebrow text-muted-foreground">Inspirasi gaya</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Styling guide & koleksi terbaru</h2>
          </div>
          <div className="mx-auto aspect-video w-full max-w-4xl overflow-hidden bg-foreground/5 relative">
            <iframe
              src="https://www.youtube.com/embed/XzbKA3yQqVY?rel=0"
              title="Tutorial Styling Hijab Afidira"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-muted-foreground">Jadilah bagian dari Afidira</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">Daftar · Diskon 10% untuk order pertama</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Koleksi terbaru, inspirasi styling, dan penawaran eksklusif member. Tanpa spam.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* BRAND MISSION */}
      <section className="container-page pb-8 md:pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="tile-image aspect-[5/4]">
            <img
              src={brandMission}
              alt="Perempuan percaya diri mengenakan hijab Afidira"
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Visi & Misi kami</p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">Tampil Percaya Diri + Ekspresikan Diri</h2>
            <p className="mt-6 text-base text-muted-foreground md:text-lg">
              Afidira hadir dari pemahaman bahwa hijab bukan hanya kebutuhan, tetapi juga bagian dari gaya hidup.
              Kami menghadirkan koleksi hijab pattern yang modern, elegan, dan selalu mengikuti tren fashion muslim.
            </p>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Ada pertanyaan atau kolaborasi?{" "}
              <a href="mailto:hello@afidira.id" className="text-foreground underline">
                hello@afidira.id
              </a>
              .
            </p>
            <div className="mt-8">
              <Link to="/about" className="text-link">
                Baca cerita kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
