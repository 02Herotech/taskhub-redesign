import Image from "next/image";
import Link from "next/link";
import React from "react";
import TypedAnimation from "./TypedAnimation";

const WaitlistHeader = () => {
  return (
    <header className="space-y-10 pt-10">
      <h2 className=" text-center font-clashSemiBold text-4xl text-orange-normal md:text-5xl">
        Every Immigrant needs a{" "}
        <span className="text-white">
          <TypedAnimation />
        </span>
      </h2>
      <p className="mx-auto max-w-2xl text-center text-xl text-white md:text-2xl">
        We provide a dynamic AI enabled platform that bridges the gap between
        individuals, businesses, and services, where you can buy, sell and gain
        business education.
      </p>
      <div className="mx-auto flex w-fit gap-6">
        <Link
          href={"/waitlist-join"}
          className="rounded-full border border-violet-normal bg-violet-normal px-6 py-3 font-satoshiMedium text-sm font-bold text-white transition-opacity duration-300 hover:opacity-90 "
        >
          Join Waitlist
        </Link>
        <Link
          href={"https://www.instagram.com/oloja_au?igsh=NTFoZ2s5YTY0aXdt"}
          target="_blank"
          className="rounded-full border border-violet-normal bg-white px-6 py-3 font-satoshiMedium text-sm font-bold text-violet-normal  transition-colors duration-300 hover:bg-violet-100"
        >
          Learn More
        </Link>
      </div>

      <section className="relative mx-auto max-w-screen-lg rounded-3xl bg-gradient-to-b from-violet-light to-transparent p-10">
        <Image
          src={"/assets/images/waitlist/PF - Oloja 240731 - Logo Watermark.png"}
          alt="olojà"
          width={160}
          height={160}
          className=" absolute left-20 top-[5.5rem] max-w-20 rounded-sm max-sm:left-16 max-sm:top-14 max-sm:w-8"
        />
        <Image
          src="/assets/images/waitlist/Waitlistaaaa.png"
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
