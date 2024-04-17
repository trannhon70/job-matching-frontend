import { Footer, Header, MobileHeader } from "@/components/common";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MobileHeader />
      {children}
      <Footer />
    </>
  );
}
