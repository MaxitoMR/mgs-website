import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButtons } from "@/components/shared/floating-buttons";
import { ScrollToTop } from "@/components/shared/scroll-to-top";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActionButtons />
      <ScrollToTop />
    </>
  );
}
