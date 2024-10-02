import Hero from "@/components/homepage/Hero";
import PillarStructure from "@/components/homepage/PillarStructure";
import StoreFront from "@/components/homepage/StoreFront";
import YouCan from "@/components/homepage/YouCan";
import BusinessHub from "@/components/homepage/BusinessHub";
import WhatSetUsApart from "@/components/homepage/WhatSetUsApart";
import FAQ from "@/components/homepage/FAQ";

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <PillarStructure />
      <StoreFront />
      <YouCan />
      <BusinessHub />
      <WhatSetUsApart />
      <FAQ />
    </main>

  );
};
export default HomePage;
