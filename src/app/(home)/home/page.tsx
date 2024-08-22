import Hero from "@/components/homepage/Hero";
import PillarStructure from "@/components/homepage/PillarStructure";
import StoreFront from "@/components/homepage/StoreFront";
import YouCan from "@/components/homepage/YouCan";
import BusinessHub from "@/components/homepage/BusinessHub";
import WhatSetUsApart from "@/components/homepage/WhatSetUsApart";


import HeroSection from "@/components/homepage/HeroSection";
import SecurityFeatures from "@/components/homepage/SecurityFeatures";
import SPHomepage from "@/components/homepage/ServiceProvider";
import Taskhub from "@/components/homepage/TaskhubCan";
//import Testimonials from "@/components/homepage/Testimonials";
import WelcomeAboard from "@/components/homepage/WelcomeAboard";

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <PillarStructure />
      <StoreFront />
      <YouCan />
      <BusinessHub />
      <WhatSetUsApart />



      {/* <HeroSection /> */}
      {/* <Taskhub /> */}
      {/* <WelcomeAboard /> */}
      {/* <SPHomepage />
      <SecurityFeatures /> */}
      {/* <Testimonials /> */}
    </main>

  );
};
export default HomePage;
