import { createFileRoute, Link } from "@tanstack/react-router";
import brandMission from "@/assets/about-mission-custom1.PNG";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Afidira" },
      {
        name: "description",
        content:
          "Afidira adalah brand hijab pattern untuk perempuan modern yang gemar mengoleksi hijab dan mengikuti tren fashion terkini.",
      },
      { property: "og:title", content: "Tentang Kami — Afidira" },
      {
        property: "og:description",
        content: "More Than a Hijab, It's Your Collection.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="container-page py-20 text-center md:py-28 reveal">
        <p className="eyebrow text-accent">Kisah Afidira</p>
        <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight md:text-6xl md:leading-[1.1]">
          Menemani setiap langkahmu dengan{" "}
          <span className="italic text-accent">anggun</span> & percaya diri.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Afidira hadir dari pemahaman bahwa hijab bukan hanya sekadar pakaian,
          melainkan identitas dan cara seorang perempuan mengekspresikan
          dirinya. Kami menggabungkan tren fashion modern dengan material
          premium untuk menciptakan koleksi yang istimewa.
        </p>
      </section>

      <section className="container-page pb-24">
        <div className="tile-image aspect-[16/9] w-full shadow-2xl rounded-lg overflow-hidden">
          <img
            src={brandMission}
            alt="Perempuan modern mengenakan hijab Afidira"
            className="w-full h-full object-cover object-[center_20%]"
          />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-foreground text-background py-16 mb-24">
        <div className="container-page grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-12">
          <div>
            <p className="font-serif text-4xl md:text-5xl">50+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
              Motif Eksklusif
            </p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl">100%</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
              Premium Material
            </p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl">10K+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
              Pelanggan Puas
            </p>
          </div>
          <div>
            <p className="font-serif text-4xl md:text-5xl">1</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
              Tujuan Utama
            </p>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 pb-24 md:grid-cols-3 md:gap-16">
        {[
          {
            t: "Pattern yang Eksklusif",
            b: "Setiap motif dirancang dengan penuh perhatian — dari pattern floral lembut hingga geometris bold — untuk melengkapi setiap gaya dan suasana hati.",
            icon: "✨",
          },
          {
            t: "Mengikuti Tren Fashion",
            b: "Koleksi Afidira selalu update mengikuti perkembangan fashion muslim terkini, sehingga kamu selalu tampil relevan dan fashionable di mana pun.",
            icon: "📈",
          },
          {
            t: "Nyaman Sepanjang Hari",
            b: "Mengutamakan kualitas bahan yang premium, adem, dan mudah dibentuk. Sangat cocok untuk berbagai aktivitas dari pagi hingga malam.",
            icon: "☁️",
          },
        ].map((b) => (
          <div
            key={b.t}
            className="flex flex-col items-center text-center p-6 border border-border/50 bg-surface/50 hover:bg-surface transition-colors"
          >
            <div className="text-3xl mb-4">{b.icon}</div>
            <h3 className="font-serif text-2xl">{b.t}</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {b.b}
            </p>
          </div>
        ))}
      </section>

      {/* QUOTE SECTION */}
      <section className="container-page pb-24 text-center">
        <div className="mx-auto max-w-3xl border-y border-border py-12">
          <p className="font-serif text-2xl md:text-4xl italic leading-relaxed">
            "Hijab is our crown, and we want every woman to wear it with
            absolute confidence and style."
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            — Tim Desainer Afidira
          </p>
        </div>
      </section>

      <section className="bg-surface py-24 text-center">
        <div className="container-page max-w-2xl">
          <p className="eyebrow text-accent mb-4">Bergabung bersama kami</p>
          <h2 className="font-serif text-3xl md:text-5xl">
            Percaya Diri + Fashionable
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Kami percaya setiap perempuan memiliki karakter yang unik.
            Eksplorasi beragam koleksi kami dan temukan gaya hijab yang paling
            mewakili dirimu.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/shop" className="btn-primary w-full sm:w-auto">
              Lihat Koleksi Baru
            </Link>
            <Link to="/contact" className="btn-outline w-full sm:w-auto">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
