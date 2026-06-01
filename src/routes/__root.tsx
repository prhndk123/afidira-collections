import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="mt-4 font-serif text-4xl">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We can't find what you're looking for. Let's get you back to the essentials.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-primary">Back to home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <h1 className="font-serif text-3xl">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head home.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-outline">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Afidira — More Than a Hijab, It's Your Collection" },
      { name: "theme-color", content: "#ffffff" },
      {
        name: "description",
        content:
          "Afidira adalah brand hijab pattern untuk perempuan modern. Temukan koleksi hijab dengan motif eksklusif, warna elegan, dan bahan nyaman yang mengikuti tren fashion terkini.",
      },
      { property: "og:title", content: "Afidira" },
      {
        property: "og:description",
        content:
          "More Than a Hijab, It's Your Collection. Koleksi hijab pattern modern, elegan, dan selalu mengikuti tren fashion muslim.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/afidira-icon.png" }
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { registerPWA } from "../lib/pwa";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    registerPWA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AnnouncementBar />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
}
