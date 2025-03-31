import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/layout/HomeNavigation";

//Todo Add meta-data description
export const metadata: Metadata = {
  title: "Oloja Business HUB",
  description: "",
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
