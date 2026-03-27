import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButtons } from "@/components/shared/floating-buttons";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { QueryProvider } from "@/lib/query-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActionButtons />
      <ScrollToTop />
    </QueryProvider>
  );
}
