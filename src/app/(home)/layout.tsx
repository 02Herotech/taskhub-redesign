import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/layout/HomeNavigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Oloja",
  description:
    "Olojà is an AI-driven platform that transcends boundaries, connecting diverse communities with a world of authentic products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <HomeNavigation />
      <div className="">{children}</div>
      <Footer />
    </main>
  );
}
