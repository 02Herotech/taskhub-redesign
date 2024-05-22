import HeroSection from "@/components/homepage/HeroSection";
import SecurityFeatures from "@/components/homepage/SecurityFeatures";
import SPHomepage from "@/components/homepage/ServiceProvider";
import TaskhubCan from "@/components/homepage/TaskhubCan";
import Testimonials from "@/components/homepage/Testimonials";
import WelcomeAboard from "@/components/homepage/WelcomeAboard";

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TaskhubCan />
      <WelcomeAboard />
      <SPHomepage />
      <SecurityFeatures />
      {/* <Testimonials /> */}
    </main>

  );
};
export default HomePage;
