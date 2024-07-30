import Image from "next/image";
import React from "react";

const WaitlistHeader = () => {
  return (
    <header className="space-y-10 pt-10">
      <h2 className=" text-center font-clashSemiBold text-5xl text-orange-normal">
        Every Immigrant needs a <span className="text-white">Product</span>
      </h2>
      <p className="mx-auto max-w-2xl text-center text-2xl text-white">
        We provide a dynamic AI enabled platform that bridges the gap between
        individuals, businesses, and services, Fostering connections, driving
        growth and empowering communities.
      </p>
      <div className="mx-auto flex w-fit gap-6">
        <button className="rounded-full border border-violet-normal bg-violet-normal px-6 py-3 font-satoshiMedium text-sm font-bold text-white transition-opacity duration-300 hover:opacity-90 ">
          Join Waitlist
        </button>
        <button className="rounded-full border border-violet-normal bg-white px-6 py-3 font-satoshiMedium text-sm font-bold text-violet-normal  transition-colors duration-300 hover:bg-violet-100">
          Learn More
        </button>
      </div>

      <section className="mx-auto max-w-screen-lg rounded-3xl bg-gradient-to-b from-violet-light to-transparent p-10">
        <Image
          src="/assets/images/waitlist/Waitlist.png"
          alt=""
          width={1200}
          height={1200}
          quality={100}
          className=""
        />
      </section>
    </header>
  );
};

export default WaitlistHeader;
