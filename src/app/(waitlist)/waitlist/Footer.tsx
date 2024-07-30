import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="space-y-10 rounded-tl-[5rem] rounded-tr-[5rem] bg-violet-normal px-4 pt-10 text-white md:px-12 lg:px-20 lg:py-20 ">
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-28">
        <div className="space-y-4">
          <h2 className="font-clashSemiBold text-4xl font-semibold">
            Be a part of our online community
          </h2>
          <p className=" text-violet-light">
            Oloja is an AI-driven platform that transcends boundaries,
            connecting diverse communities with a world of authentic products
            and services
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/images/waitlist/instagram.png"
              alt="instagram"
              width={20}
              height={20}
              quality={100}
            />
            <p>Connect with us on instagram</p>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/images/waitlist/twitter.png"
              alt="twitter"
              width={20}
              height={20}
              quality={100}
            />
            <p>Connect with us on x ( formerly twitter)</p>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/images/waitlist/facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              quality={100}
            />
            <p>Connect with us on Facebook</p>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center">
        <button className="rounded-full bg-violet-light bg-opacity-30 px-6 py-3 text-white">
          Back to top
        </button>
      </div>
      <Image
        src={"/assets/images/waitlist/Olojà.png"}
        alt=""
        width={1500}
        height={1500}
        quality={100}
      />
    </footer>
  );
};

export default Footer;
