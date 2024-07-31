import React from "react";
import "@/styles/serviceProviderStyles.css";
import WaitlistNavbar from "./WaitlistNavbar";
import WaitlistHeader from "./WaitlistHeader";
import Feature from "./Feature";
import Benefits from "./Benefits";
import FAQ from "./FAQ";
import Footer from "./Footer";

const WaitlistHome = () => {
  return (
    <main>
      <header className=" bg-gradient-to-b from-[#0C012F] to-[#EBE9F4] px-4 md:px-12 lg:px-20 ">
        <WaitlistNavbar />
        <WaitlistHeader />
      </header>
      <section className="px-4 md:px-12 lg:px-20">
        <Feature />
        <Benefits />
        <FAQ />
      </section>
      <Footer />
    </main>
  );
};

export default WaitlistHome;
