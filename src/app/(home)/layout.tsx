import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/layout/HomeNavigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Oloja",
  description: "Oloja is a task management and booking app built with Next.js.",
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
