"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const fadeAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

type Index = 0 | 1;

function Services() {
  const [index, setIndex] = useState<Index>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((id) => (id == 0 ? 1 : 0));
    }, 3200);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="bg-[#EBE9F4]] py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto w-[85%]">
          <h2 className="mb-8 text-left font-clashSemiBold text-4xl font-semibold text-[#2A1769] sm:text-center xl:text-5xl">
            Whatever You Need, <br /> We’ve Got it covered.
          </h2>
          <p className="mb-10 text-left font-satoshiBold text-lg font-bold text-[#5B556E] sm:text-center sm:text-xl">
            Explore a range of services you can get done easily on Olójà Hub.{" "}
          </p>
          <div
            className="mx-auto min-h-[500px] w-full rounded-3xl border-[12px] border-[#E1DDEE] bg-cover sm:w-4/5"
            style={{
              backgroundImage: `url('/assets/images/homepage/${index == 0 ? "services" : "tasks"}.png')`,
            }}
          />
          <p className="my-8 text-left font-satoshiBold text-xl font-bold text-[#190E3F] sm:text-center">
            See something you need? <br className="block sm:hidden" /> Start
            now!
          </p>
          <button className="mx-auto block min-w-[300px] rounded-[50px] bg-primary p-3 font-satoshi text-[16px] font-[700] text-[#EBE9F4] hover:bg-[#25135f] lg:w-[175px] xl:w-[190px]">
            <Link href="/customer/add-task">Post your first task for free</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;
