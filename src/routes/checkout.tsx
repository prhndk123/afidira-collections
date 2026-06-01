import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, CheckCircle2, ChevronDown, CreditCard } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Afidira" },
      { name: "description", content: "Selesaikan pesanan Anda." },
    ],
  }),
  component: CheckoutPage,
});

const ONGKIR_GRATIS_MIN = 300000;
const ONGKIR = 25000;

const BANKS = [
  {
    id: "bca",
    name: "BCA",
    noRek: "1234567890",
    atasNama: "Afidira",
    logo: "🏦",
  },
  {
    id: "bri",
    name: "BRI",
    noRek: "0987654321",
    atasNama: "Afidira",
    logo: "🏦",
  },
  {
    id: "mandiri",
    name: "Mandiri",
    noRek: "1122334455",
    atasNama: "Afidira",
    logo: "🏦",
  },
  {
    id: "bni",
    name: "BNI",
    noRek: "5566778899",
    atasNama: "Afidira",
    logo: "🏦",
  },
] as const;

const PROVINSI = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau",
  "Jambi", "Sumatera Selatan", "Bangka Belitung", "Bengkulu", "Lampung",
  "DKI Jakarta", "Jawa Barat", "Banten", "Jawa Tengah", "DI Yogyakarta",
  "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan",
  "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Sulawesi Tengah",
  "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua",
];

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [transferFile, setTransferFile] = useState<File | null>(null);
  const [transferPreview, setTransferPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ongkir = total >= ONGKIR_GRATIS_MIN ? 0 : ONGKIR;
  const totalBayar = total + ongkir;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTransferFile(file);
    setTransferPreview(URL.createObjectURL(file));
  };

  const selectedBankData = BANKS.find((b) => b.id === selectedBank);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBank) {
      alert("Silakan pilih metode pembayaran");
      return;
    }
    if (!transferFile) {
      alert("Silakan upload bukti transfer");
      return;
    }
    setIsSubmitting(true);
    // Simulasi delay submit
    await new Promise((r) => setTimeout(r, 1500));
    clear();
    navigate({ to: "/checkout/success" });
  };

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="eyebrow text-muted-foreground">Checkout</p>
        <h1 className="mt-3 font-serif text-4xl">Keranjang kamu kosong</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Tambahkan produk terlebih dahulu sebelum checkout.
        </p>
        <Button className="mt-8" asChild>
          <a href="/shop">Belanja Sekarang</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mb-10">
        <p className="eyebrow text-muted-foreground">Checkout</p>
        <h1 className="mt-2 font-serif text-3xl md:text-4xl">Selesaikan Pesanan</h1>
      </div>

      <form onSubmit={onSubmit} autoComplete="off">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* SECTION: Informasi Penerima */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Penerima</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="namaLengkap">Nama Lengkap</Label>
                  <Input
                    id="namaLengkap"
                    name="namaLengkap"
                    autoComplete="nope"
                    placeholder="Masukkan nama lengkap"
                    required
                    minLength={3}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="whatsapp">No. WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      autoComplete="nope"
                      placeholder="08xxxxxxxxxx"
                      required
                      minLength={10}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="nope"
                      placeholder="email@kamu.com"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION: Alamat Pengiriman */}
            <Card>
              <CardHeader>
                <CardTitle>Alamat Pengiriman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="alamat">Alamat Lengkap</Label>
                  <Textarea
                    id="alamat"
                    name="alamat"
                    autoComplete="nope"
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan..."
                    required
                    minLength={10}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="kecamatan">Kecamatan</Label>
                    <Input
                      id="kecamatan"
                      name="kecamatan"
                      autoComplete="nope"
                      placeholder="Nama kecamatan"
                      required
                      minLength={3}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="kota">Kota / Kabupaten</Label>
                    <Input
                      id="kota"
                      name="kota"
                      autoComplete="nope"
                      placeholder="Nama kota/kabupaten"
                      required
                      minLength={3}
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="provinsi">Provinsi</Label>
                    <div className="relative">
                      <select
                        id="provinsi"
                        name="provinsi"
                        required
                        autoComplete="nope"
                        className="flex h-11 w-full appearance-none rounded-sm border border-border bg-background px-4 py-2 pr-10 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <option value="">Pilih provinsi</option>
                        {PROVINSI.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="kodePos">Kode Pos</Label>
                    <Input
                      id="kodePos"
                      name="kodePos"
                      autoComplete="nope"
                      placeholder="12345"
                      maxLength={5}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION: Metode Pembayaran */}
            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran — Transfer Bank</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Pilih Bank */}
                <div>
                  <Label className="mb-3 block">Pilih Bank</Label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {BANKS.map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`flex flex-col items-center justify-center gap-1 rounded-sm border-2 py-4 transition-all ${
                          selectedBank === bank.id
                            ? "border-foreground bg-foreground/5"
                            : "border-border hover:border-foreground/50"
                        }`}
                      >
                        <CreditCard className="h-5 w-5" strokeWidth={1.5} />
                        <span className="text-xs font-semibold uppercase tracking-widest">
                          {bank.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Rekening */}
                {selectedBankData && (
                  <div className="rounded-sm bg-surface p-4 text-sm">
                    <p className="eyebrow mb-3 text-muted-foreground">
                      Nomor Rekening {selectedBankData.name}
                    </p>
                    <p className="font-mono text-2xl font-semibold tracking-wider">
                      {selectedBankData.noRek}
                    </p>
                    <p className="mt-1 text-muted-foreground">a/n {selectedBankData.atasNama}</p>
                    <div className="mt-3 flex items-center gap-2 rounded-sm bg-warning/10 px-3 py-2 text-xs text-warning">
                      <span>⚠️</span>
                      <span>
                        Transfer sesuai nominal persis:{" "}
                        <strong>{formatPrice(totalBayar)}</strong>
                      </span>
                    </div>
                  </div>
                )}

                {/* Upload Bukti Transfer */}
                <div className="space-y-1.5">
                  <Label>Upload Bukti Transfer</Label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed transition-colors ${
                      transferPreview
                        ? "border-foreground"
                        : "border-border hover:border-foreground/50"
                    }`}
                  >
                    {transferPreview ? (
                      <div className="relative w-full p-2">
                        <img
                          src={transferPreview}
                          alt="Bukti transfer"
                          className="mx-auto max-h-48 rounded-sm object-contain"
                        />
                        <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>{transferFile?.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center p-6">
                        <Upload className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                        <p className="text-sm text-muted-foreground">
                          Klik untuk upload foto bukti transfer
                        </p>
                        <p className="text-xs text-muted-foreground">JPG, PNG, PDF (maks. 5MB)</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN — Order Summary */}
          <aside className="lg:sticky lg:top-[100px] lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Product list */}
                <ul className="space-y-4 text-sm">
                  {items.map((item) => (
                    <li key={item.slug} className="flex gap-3">
                      <div className="h-16 w-14 flex-shrink-0 overflow-hidden rounded-sm bg-surface">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <p className="font-medium leading-tight">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.fabric}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Qty: {item.qty}</span>
                          <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator className="my-5" />

                {/* Price breakdown */}
                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd>{formatPrice(total)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Ongkos kirim</dt>
                    <dd className={ongkir === 0 ? "text-success font-medium" : ""}>
                      {ongkir === 0 ? "Gratis 🎉" : formatPrice(ongkir)}
                    </dd>
                  </div>
                  {ongkir > 0 && (
                     <p className="text-[11px] text-muted-foreground">
                       Gratis ongkir untuk pembelian ≥ {formatPrice(ONGKIR_GRATIS_MIN)}
                     </p>
                   )}
                  <Separator />
                  <div className="flex justify-between text-base font-semibold">
                    <dt>Total Bayar</dt>
                    <dd>{formatPrice(totalBayar)}</dd>
                  </div>
                </dl>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Kirim Pesanan"}
                </Button>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Pesanan akan dikonfirmasi via WhatsApp dalam 1×24 jam
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </form>
    </div>
  );
}
