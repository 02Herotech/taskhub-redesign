import HeroSection from "@/components/homepage/HeroSection";
import SecurityFeatures from "@/components/homepage/SecurityFeatures";
import SPHomepage from "@/components/homepage/ServiceProvider";
import Testimonials from "@/components/homepage/Testimonials";
import WelcomeAboard from "@/components/homepage/WelcomeAboard";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <SecurityFeatures />
      <WelcomeAboard />
      <SPHomepage />
      <Testimonials />
    </main>

  );
};
export default Home;
