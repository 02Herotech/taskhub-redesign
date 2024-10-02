import AboutHeroSection from "@/components/about/Hero";
import Mission from "@/components/about/Mission";
import Values from "@/components/about/Values";
import WhatSetUsApart from "@/components/homepage/WhatSetUsApart";
import Image from "next/image";

const About = () => {
    return (
        <main className="mt-20">
            <AboutHeroSection />
            <Mission />
            <Values />
            <WhatSetUsApart />
            <div className="pb-28 bg-[#EBE9F4]" />
        </main>
    );
}

export default About; 