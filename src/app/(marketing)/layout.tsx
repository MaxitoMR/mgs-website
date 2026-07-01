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
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActionButtons />
        <ScrollToTop />
      </ScrollNavProvider>
    </QueryProvider>
  );
}
