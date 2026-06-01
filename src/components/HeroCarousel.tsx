import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const slide = heroSlides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-surface"
      aria-label="Hero carousel"
    >
      {/* Slides — 2-column layout */}
      <div className="relative grid md:grid-cols-2">
        {/* Image side */}
        <div className="relative h-[58vh] min-h-[380px] md:h-[88vh]">
          {heroSlides.map((s, i) => (
            <img
              key={i}
              src={s.image}
              alt={s.headline}
              className={`absolute inset-0 h-full w-full object-cover object-[center_20%] transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          {/* Gradient overlay pada mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
        </div>

        {/* Text side */}
        <div className="relative flex flex-col justify-center px-6 py-14 md:px-16 md:py-24">
          {heroSlides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col justify-center px-6 py-14 md:px-16 md:py-24 transition-all duration-500 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
              }`}
              aria-hidden={i !== current}
            >
              <p className="eyebrow text-muted-foreground">{s.eyebrow}</p>
              <h1 className="mt-5 font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.07]">
                {s.headline}
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.sub}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to={s.cta.to} className="btn-primary">
                  {s.cta.label}
                </Link>
                <Link to={s.ctaSecondary.to} className="btn-outline">
                  {s.ctaSecondary.label}
                </Link>
              </div>
            </div>
          ))}
          {/* spacer agar container punya tinggi */}
          <div className="invisible pointer-events-none px-6 py-14 md:px-16 md:py-24">
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1 className="mt-5 font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.07]">{slide.headline}</h1>
            <p className="mt-5 max-w-md text-sm md:text-base">{slide.sub}</p>
            <div className="mt-10 flex gap-3">
              <span className="btn-primary">{slide.cta.label}</span>
              <span className="btn-outline">{slide.ctaSecondary.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow controls */}
      <button
        aria-label="Slide sebelumnya"
        onClick={prev}
        className="absolute left-4 top-[max(29vh,190px)] -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm transition-all hover:bg-background md:top-1/2 md:left-6"
      >
        <ChevronLeft strokeWidth={1.5} className="h-5 w-5" />
      </button>
      <button
        aria-label="Slide berikutnya"
        onClick={next}
        className="absolute right-4 top-[max(29vh,190px)] -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm transition-all hover:bg-background md:top-1/2 md:right-6"
      >
        <ChevronRight strokeWidth={1.5} className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Pergi ke slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-foreground"
                : "w-2 h-2 bg-foreground/30 hover:bg-foreground/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
