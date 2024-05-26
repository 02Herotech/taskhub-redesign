"use client";

import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

type MarketplaceLayoutProps = {
  children: React.ReactNode;
};

const MarketplaceLayout = ({ children }: MarketplaceLayoutProps) => {
  return (
    <div>
      <Navigation />
      <main className="pt-[20px]">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketplaceLayout;
