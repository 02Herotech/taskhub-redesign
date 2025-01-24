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
import HeroTwo from "@/components/homepage/Hero/HeroTwo";
import PostYourJob from "@/components/homepage/PillarStructure/PostYourJob";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#EBE9F4] pt-16">
      <div className="absolute left-0 top-0">
        <div
          style={{
            position: "relative",
            height: "500px",
            width: "250px",
            float: "left",
            top: "-100px",
            zIndex: "2",
          }}
        >
          <div
            style={{
              height: "500px",
              width: "500px",
              borderRadius: "50%",
              backgroundImage: "radial-gradient(circle, #fac588, transparent)",
              filter: "blur(30px)",
              position: "absolute",
              left: "-250px",
            }}
          ></div>
        </div>
      </div>
      <HeroTwo />
      <PostYourJob />
      <Services />
      <Perks />
      {/* <StoreFront /> */}
      {/* <YouCan /> */}
      <MonetizeSkills />
      <BusinessHub />
      {/* <WhatSetUsApart /> */}
      {/* <FAQ /> */}
    </main>
  );
};
export default HomePage;
