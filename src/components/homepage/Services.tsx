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
    <section className="bg-[#E1DDEE] py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto w-[85%]">
          <h2 className="mb-8 text-center font-clashSemiBold text-[30px] font-semibold text-[#140B31] xl:text-[40px]">
            Whatever You Need, <br /> We’ve Got it{" "}
            <span className="text-[#E58C06]">covered.</span>
          </h2>
          <p className="mb-10 text-center font-satoshiBold text-lg font-bold text-[#5B556E] sm:text-xl">
            Explore a range of services you can get done easily on Oloja Hub.{" "}
          </p>
          <div className="mx-auto w-full overflow-clip rounded-3xl border-8 border-[#381F8C] sm:w-4/5 sm:border-[12px]">
            <AnimatePresence mode="wait">
              {index == 0 ? (
                <motion.div key="services">
                  <Image
                    src="/assets/images/homepage/services.png"
                    alt="#"
                    className="w-full"
                    width={1092}
                    height={638}
                  />
                </motion.div>
              ) : (
                <motion.div key="tasks">
                  <Image
                    src="/assets/images/homepage/tasks.png"
                    alt="#"
                    className="w-full"
                    width={1092}
                    height={638}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="my-8 text-center font-satoshiBold text-xl font-bold">
            See something you need? Start now!
          </p>
          <button className="mx-auto block w-[250px] rounded-[50px] bg-primary p-3 font-satoshi text-[16px] font-[700] text-[#EBE9F4] hover:bg-[#25135f] lg:w-[175px] xl:w-[190px]">
            <Link href="/customer/add-task">Post a task for free</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;
