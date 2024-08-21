import Hero from "@/components/homepage/Hero";
import Hub from "@/components/homepage/PillarStructure";
import PillarStructure from "@/components/homepage/PillarStructure";
import StoreFront from "@/components/homepage/StoreFront";

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



      {/* <HeroSection /> */}

  



      {/* <Taskhub /> */}
      {/* <WelcomeAboard /> */}
      <SPHomepage />
      <SecurityFeatures />
      {/* <Testimonials /> */}
    </main>

  );
};
export default HomePage;
