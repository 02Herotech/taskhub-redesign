import Hero from "@/components/homepage/Hero";
import PillarStructure from "@/components/homepage/PillarStructure";
import StoreFront from "@/components/homepage/StoreFront";
import YouCan from "@/components/homepage/YouCan";
import BusinessHub from "@/components/homepage/BusinessHub";
import WhatSetUsApart from "@/components/homepage/WhatSetUsApart";
import FAQ from "@/components/homepage/FAQ";
import PillarStructureTwo from "@/components/homepage/PillarStructure/PillarStructureTwo";
import Services from "@/components/homepage/Services";
import Perks from "@/components/homepage/Perks";
import MonetizeSkills from "@/components/homepage/MonetizeSkills";

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* <PillarStructure /> */}
      <PillarStructureTwo />
      <Services />
      <Perks />
      {/* <StoreFront /> */}
      {/* <YouCan /> */}
      <BusinessHub />
      <MonetizeSkills />
      {/* <WhatSetUsApart /> */}
      {/* <FAQ /> */}
    </main>
  );
};
export default HomePage;
