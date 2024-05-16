import HeroSection from "@/components/homepage/HeroSection";
import SecurityFeatures from "@/components/homepage/SecurityFeatures";
import SPHomepage from "@/components/homepage/ServiceProvider";
import Testimonials from "@/components/homepage/Testimonials";
import WelcomeAboard from "@/components/homepage/WelcomeAboard";

const HomePage = () => {
  return (
    <main className={`min-h-screen `}>
    <div>
      <HeroSection />
    </div>

    <div>
      <SecurityFeatures />
    </div>

    <div>
      <WelcomeAboard />
    </div>

    <div>
      <SPHomepage />
    </div>

    <div>
      <Testimonials />
    </div>
  </main>

  );
};
export default HomePage;
