import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButtons } from "@/components/shared/floating-buttons";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { ScrollNavProvider } from "@/components/providers/scroll-nav-provider";
import { QueryProvider } from "@/lib/query-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {/* One scroll listener feeds both the header and the floating CTAs. */}
      <ScrollNavProvider>
        {/* First tab stop: lets keyboard/AT users jump the nav. Styles and
            the reveal-on-focus behaviour live in globals.css. */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <Header />
        {/* tabIndex={-1} so the skip link can move focus here, not just scroll. */}
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <FloatingActionButtons />
        <ScrollToTop />
      </ScrollNavProvider>
    </QueryProvider>
  );
}
