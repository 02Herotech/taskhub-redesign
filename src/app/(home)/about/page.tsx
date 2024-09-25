import AboutHeroSection from "@/components/about/Hero";
import Mission from "@/components/about/Mission";
import Image from "next/image";

const About = () => {
    return (
        <main className="mt-20">
            <AboutHeroSection />
            <Mission />
        </main>
    );
}

export default About; 