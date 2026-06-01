import heroMain from "@/assets/hero-main.jpg";
import p1 from "@/assets/hijab/Ocean Bloom Series.JPG";
import p2 from "@/assets/hijab/Pasific Bloom Series.JPG";
import p3 from "@/assets/hijab/Korean Pattern Series.JPG";
import p4 from "@/assets/hijab/Mocha Brown.JPG";
import p5 from "@/assets/hijab/Soft Cream.JPG";
import p6 from "@/assets/hijab/Misty Grey.jpg";
import p7 from "@/assets/hijab/Onyx Black.jpg";
import p8 from "@/assets/hijab/Autumn Leaves.JPG";
import p9 from "@/assets/hijab/Lavender Garden.JPG";
import p10 from "@/assets/hijab/Classic Batik Modern.JPG";
import p11 from "@/assets/hijab/Jeblus Daily Basic.PNG";
import p12 from "@/assets/hijab/Jeblus Sporty.PNG";
import p13 from "@/assets/hijab/Jeblus Elegant.PNG";

export type Product = {
  slug: string;
  name: string;
  fabric: string;
  price: number;
  image: string;
  description: string;
  collection: string;
};

export const collections = [
  { slug: "pattern", label: "Pattern Collection", image: p1 },
  { slug: "viscose", label: "Viscose Collection", image: p4 },
  { slug: "segi-empat", label: "Segi Empat Corak", image: p8 },
  { slug: "jeblus", label: "Hijab Jeblus", image: p11 },
] as const;

// Keep fabrics for backward compatibility if needed, or use collections
export const fabrics = collections;

// Hero carousel slides
export const heroSlides = [
  {
    image: p1,
    eyebrow: "Koleksi Pattern Terbaru Afidira · 2026",
    headline: "Hijab yang mencerminkan dirimu.",
    sub: "Koleksi pattern modern dan elegan — dirancang untuk perempuan yang ingin tampil percaya diri di setiap momen, dari keseharian hingga acara spesial.",
    cta: { label: "Jelajahi Koleksi", to: "/shop" },
    ctaSecondary: { label: "Tentang Kami", to: "/about" },
  },
  {
    image: p8,
    eyebrow: "Segi Empat Corak",
    headline: "Elegan, anggun, memukau.",
    sub: "Hijab segi empat dengan berbagai motif elegan yang memberikan kesan anggun dan modern untuk melengkapi outfit andalanmu.",
    cta: { label: "Lihat Koleksi", to: "/shop" },
    ctaSecondary: { label: "Lihat Semua", to: "/shop" },
  },
  {
    image: p4,
    eyebrow: "Viscose Collection",
    headline: "Nyaman sepanjang hari.",
    sub: "Hijab berbahan viscose yang lembut, ringan, dan nyaman digunakan sepanjang hari. Cocok untuk aktivitas kuliah, kerja, maupun hangout.",
    cta: { label: "Lihat Koleksi", to: "/shop" },
    ctaSecondary: { label: "Lihat Semua", to: "/shop" },
  },
  {
    image: p11,
    eyebrow: "Jeblus Instan",
    headline: "Praktis dan tetap rapi.",
    sub: "Hijab instan praktis yang mudah digunakan tanpa peniti. Cocok untuk perempuan aktif yang ingin tampil rapi dalam waktu singkat.",
    cta: { label: "Lihat Koleksi", to: "/shop" },
    ctaSecondary: { label: "Lihat Semua", to: "/shop" },
  },
] as const;

// Harga dalam Rupiah (IDR)
export const products: Product[] = [
  // PATTERN
  {
    slug: "ocean-bloom-series",
    name: "Ocean Bloom Series",
    fabric: "Pattern",
    price: 129000,
    image: p1,
    collection: "pattern",
    description: "Koleksi hijab dengan motif eksklusif dan desain kekinian yang cocok untuk perempuan yang suka tampil fashionable.",
  },
  {
    slug: "pasific-bloom-series",
    name: "Pasific Bloom Series",
    fabric: "Pattern",
    price: 119000,
    image: p2,
    collection: "pattern",
    description: "Koleksi hijab dengan motif eksklusif dan desain kekinian yang cocok untuk perempuan yang suka tampil fashionable.",
  },
  {
    slug: "korean-pattern-series",
    name: "Korean Pattern Series",
    fabric: "Pattern",
    price: 89000,
    image: p3,
    collection: "pattern",
    description: "Koleksi hijab dengan motif eksklusif dan desain kekinian yang cocok untuk perempuan yang suka tampil fashionable.",
  },
  // VISCOSE
  {
    slug: "mocha-brown-viscose",
    name: "Mocha Brown",
    fabric: "Viscose",
    price: 89000,
    image: p4,
    collection: "viscose",
    description: "Hijab berbahan viscose yang lembut, ringan, dan nyaman digunakan sepanjang hari. Cocok untuk aktivitas kuliah, kerja, maupun hangout.",
  },
  {
    slug: "soft-cream-viscose",
    name: "Soft Cream",
    fabric: "Viscose",
    price: 79000,
    image: p5,
    collection: "viscose",
    description: "Hijab berbahan viscose yang lembut, ringan, dan nyaman digunakan sepanjang hari. Cocok untuk aktivitas kuliah, kerja, maupun hangout.",
  },
  {
    slug: "misty-grey-viscose",
    name: "Misty Grey",
    fabric: "Viscose",
    price: 79000,
    image: p6,
    collection: "viscose",
    description: "Hijab berbahan viscose yang lembut, ringan, dan nyaman digunakan sepanjang hari. Cocok untuk aktivitas kuliah, kerja, maupun hangout.",
  },
  {
    slug: "onyx-black-viscose",
    name: "Onyx Black",
    fabric: "Viscose",
    price: 59000,
    image: p7,
    collection: "viscose",
    description: "Hijab berbahan viscose yang lembut, ringan, dan nyaman digunakan sepanjang hari. Cocok untuk aktivitas kuliah, kerja, maupun hangout.",
  },
  // SEGI EMPAT
  {
    slug: "autumn-leaves-segi-empat",
    name: "Autumn Leaves",
    fabric: "Segi Empat",
    price: 119000,
    image: p8,
    collection: "segi-empat",
    description: "Hijab segi empat dengan berbagai motif dan corak elegan yang memberikan kesan anggun dan modern.",
  },
  {
    slug: "lavender-garden-segi-empat",
    name: "Lavender Garden",
    fabric: "Segi Empat",
    price: 99000,
    image: p9,
    collection: "segi-empat",
    description: "Hijab segi empat dengan berbagai motif dan corak elegan yang memberikan kesan anggun dan modern.",
  },
  {
    slug: "classic-batik-modern",
    name: "Classic Batik Modern",
    fabric: "Segi Empat",
    price: 79000,
    image: p10,
    collection: "segi-empat",
    description: "Hijab segi empat dengan berbagai motif dan corak elegan yang memberikan kesan anggun dan modern.",
  },
  // JEBLUS
  {
    slug: "jeblus-daily-basic",
    name: "Jeblus Daily Basic",
    fabric: "Jeblus",
    price: 49000,
    image: p11,
    collection: "jeblus",
    description: "Hijab instan praktis yang mudah digunakan tanpa banyak peniti atau jarum. Cocok untuk perempuan aktif yang ingin tampil rapi dalam waktu singkat.",
  },
  {
    slug: "jeblus-sporty",
    name: "Jeblus Sporty",
    fabric: "Jeblus",
    price: 59000,
    image: p12,
    collection: "jeblus",
    description: "Hijab instan praktis yang mudah digunakan tanpa banyak peniti atau jarum. Cocok untuk perempuan aktif yang ingin tampil rapi dalam waktu singkat.",
  },
  {
    slug: "jeblus-elegant",
    name: "Jeblus Elegant",
    fabric: "Jeblus",
    price: 79000,
    image: p13,
    collection: "jeblus",
    description: "Hijab instan praktis yang mudah digunakan tanpa banyak peniti atau jarum. Cocok untuk perempuan aktif yang ingin tampil rapi dalam waktu singkat.",
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const reviews = [
  {
    title: "Motifnya cantik banget!",
    body: "Akhirnya nemu hijab pattern yang bener-bener unik dan nggak pasaran. Warnanya cocok dipadukan dengan outfit warna apa pun. Langsung repeat order!",
    author: "Rizky A.",
    date: "15 Mei 2026",
    product: "Ocean Bloom Series",
  },
  {
    title: "Hijab koleksi baru saya!",
    body: "Dari semua hijab yang pernah saya beli, Afidira paling unik desainnya. Polanya eksklusif, nggak banyak yang jual. Bahannya juga nyaman banget dipakai kuliah.",
    author: "Salsabila N.",
    date: "2 Mei 2026",
    product: "Korean Pattern Series",
  },
  {
    title: "Kualitas premium, harga terjangkau",
    body: "Awalnya ragu, tapi ternyata kualitasnya di luar ekspektasi. Bahan tidak mudah kusut, warna tidak pudar setelah dicuci, dan motifnya benar-benar cantik.",
    author: "Putri R.",
    date: "20 April 2026",
    product: "Classic Batik Modern",
  },
  {
    title: "Cocok untuk acara spesial",
    body: "Saya pakai untuk kondangan dan banyak yang tanya beli di mana. Pattern-nya elegan dan berbeda dari hijab biasa. Pasti balik beli lagi!",
    author: "Nadia F.",
    date: "10 April 2026",
    product: "Pasific Bloom Series",
  },
  {
    title: "Brand favorit baru!",
    body: "Sudah beli 4 hijab Jeblus dan semuanya nyaman. Suka banget konsep Afidira yang praktis tapi tetap rapi. Recommended banget!",
    author: "Hana W.",
    date: "28 Maret 2026",
    product: "Jeblus Elegant",
  },
];
