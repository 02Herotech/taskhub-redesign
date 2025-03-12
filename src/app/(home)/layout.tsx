import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/layout/HomeNavigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Oloja",
  description: "Get your tasks done in a few clicks with Olójà Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-w-80">
      <HomeNavigation />
      <div className="">{children}</div>
      <Footer />
    </main>
  );
}
