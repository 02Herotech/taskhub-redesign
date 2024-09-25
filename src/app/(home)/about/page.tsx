import AboutHeroSection from "@/components/about/Hero";
import Mission from "@/components/about/Mission";
import Values from "@/components/about/Values";
import Image from "next/image";

const About = () => {
    return (
        <main className="mt-20">
            <AboutHeroSection />
            <Mission />
            <Values />
        </main>
    );
}

export default About; 