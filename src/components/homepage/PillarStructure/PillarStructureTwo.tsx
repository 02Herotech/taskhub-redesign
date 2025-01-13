"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const fadeAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

type Index = 0 | 1;

function PillarStructureTwo() {
  const [index, setIndex] = useState<Index>(0);

  const steps = [
    "Briefly tell us what you require.",
    "Determine how much you want to pay.",
    "Check offers from potential experts.",
    "Pick your own PRO!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((id) => (id == 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="min-h-[1050px] bg-cover bg-center lg:min-h-[680px] xl:min-h-[600px]"
      style={{
        backgroundImage: `url("/assets/images/homepage/pillarStructure/hub-bg.jpeg")`,
      }}
    >
      <div className="relative mx-auto max-w-7xl overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {index == 0 ? (
            <motion.div
              key="post"
            //   {...fadeAnimationProps}
              className="mx-auto flex w-[85%] flex-col justify-center gap-20 py-10 text-white lg:flex-row lg:gap-0"
            >
              <div>
                <h2 className="mb-3 font-clashSemiBold text-[32px] lg:max-w-[320px] xl:text-[40px]">
                  Post your <span className="text-[#E58C06]">job</span> and
                  choose your experts with no delays!
                </h2>
                <p className="mb-5 max-w-[480px] font-satoshi text-2xl text-[#EBE9F4]">
                  Life can get busy, and sometimes you just need an extra set of
                  hands.
                </p>
                <ul className="mb-8 space-y-2">
                  {steps.map((step, i) => (
                    <li
                      className="flex items-center gap-3 text-lg font-bold"
                      key={Math.random() * 2000}
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EBE9F4] font-bold text-[#381F8C]">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <p className="font-satoshiBold">{step}</p>
                    </li>
                  ))}
                </ul>
                <button className="w-[250px] rounded-[50px] bg-primary p-3 font-satoshi text-[16px] font-[700] text-[#EBE9F4] hover:bg-[#25135f] lg:w-[175px] xl:w-[190px]">
                  <Link href="/customer/add-task">Post a task for free</Link>
                </button>
              </div>
              <div className="relative w-full lg:w-1/2">
                <motion.p
                  initial={{ opacity: 0, left: -100 }}
                  whileInView={{ opacity: 1, left: -20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
                  className="absolute bottom-28 w-max rounded-xl border border-[#381F8C] bg-[#EBE9F4] px-3 py-1 font-satoshiBold text-base font-bold text-[#381F8C] sm:bottom-44 sm:text-[20px]"
                >
                  I want my kitchen sink fixed!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, right: -70 }}
                  whileInView={{ opacity: 1, right: 12 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute -top-8 right-3 w-max rounded-xl border border-[#381F8C] bg-[#EBE9F4] px-3 py-1 font-satoshiBold text-base font-bold text-[#381F8C] sm:text-[20px]"
                >
                  John sent you an offer!
                </motion.p>
                <Image
                  src="/assets/images/homepage/businessHub/plumber.jpg"
                  alt="Plumber fixing a sink"
                  className="w-full rounded-2xl border-[12px] border-[#C1BADB]"
                  width={1024}
                  height={706}
                />
                <Link
                  href="/"
                  className="mx-auto mt-5 flex w-max items-center gap-1 rounded-full bg-[#FFFEFE6B] px-4 py-2 font-satoshiBold text-lg font-bold underline sm:text-xl"
                >
                  <span>Explore How OlojaHub works</span>
                  <MdArrowOutward />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="business"
            //   {...fadeAnimationProps}
              className="mx-auto flex w-[85%] flex-col justify-between gap-20 py-10 text-white lg:flex-row"
            >
              <div>
                <h2 className="mb-8 font-clashSemiBold text-[32px] lg:max-w-[200px] xl:text-[40px]">
                  Business <span className="text-[#E58C06]">Hub</span>
                </h2>
                <p className="mb-6 max-w-[400px] font-satoshi text-2xl text-[#EBE9F4]">
                  We offer information on both financial and business literacy ,
                  empowering you with business 101 skills and setting you up for
                  success.
                </p>
                <Link
                  href="/"
                  className="mt-5 flex w-max items-center gap-1 rounded-full border border-[#381F8C] bg-[#EBE9F4] px-4 py-2 font-satoshiBold font-bold text-[#381F8C]"
                >
                  View Business Resources
                </Link>
              </div>
              <div>
                <Image
                  src="/assets/images/homepage/businessHub/business_hub.png"
                  alt="Our business hub page"
                  className="mx-auto rounded-2xl"
                  width={619}
                  height={471}
                />
                <Link
                  href="/"
                  className="mx-auto mt-5 flex w-max items-center gap-1 rounded-full bg-[#FFFEFE6B] px-4 py-2 font-satoshiBold text-lg font-bold underline sm:text-xl"
                >
                  <span>Explore How OlojaHub works</span>
                  <MdArrowOutward />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default PillarStructureTwo;
