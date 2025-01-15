"use client";
import { IoMdCheckmark } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

type Perk = { title: string; desc: string };

const perks: Perk[] = [
  {
    title: "Low Connection Fees:",
    desc: "Keep more of what you earn—our fees are among the lowest, so you get the most out of your hard work.",
  },
  {
    title: "Explore Jobs for Free:",
    desc: "Find work tailored to your skills without paying any subscription or hidden fees.",
  },
  {
    title: "Work on Your Terms:",
    desc: "Choose jobs that fit your schedule and enjoy the freedom of flexibility.",
  },
  {
    title: "Grow Your Business, Your Way.",
    desc: "Build a steady client base and create an income doing what you’re great at.",
  },
  {
    title: "Focus on Your Craft, Not Marketing:",
    desc: "No need to spend on ads or websites—clients are ready and waiting for you.",
  },
];

function MonetizeSkills() {
  return (
    <section className="overflow-x-hidden bg-[#140B31] py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex w-[85%] flex-col-reverse gap-10 pb-40 lg:flex-row">
          <div
            className="relative h-[620px] rounded-xl px-4 py-3 lg:w-[45%] "
            style={{
              backgroundImage: `url('/assets/images/homepage/mover.jpg')`,
              backgroundPositionX: "50%",
            }}
          >
            <motion.div
              initial={{ opacity: 0, right: -100 }}
              whileInView={{ opacity: 1, right: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
              className="absolute ml-auto flex w-max items-center gap-3 rounded-3xl bg-white px-3 py-1"
            >
              <p className="font-satoshiMedium">Payment received</p>
              <span className="font-satoshiMedium text-sm text-[#000000BA]">
                $40
              </span>
              <div className="rounded-full bg-[#EBE9F480] p-1 text-[#FE9B07] ">
                <FaStar />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, left: -100 }}
              whileInView={{ opacity: 1, left: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute -bottom-2 -left-2 mt-3 flex w-[200px] flex-wrap justify-between gap-1 overflow-x-hidden rounded-xl bg-white px-3 py-2"
            >
              <p className="font-satoshiMedium text-black">Mover</p>
              <span className="font-satoshiMedium text-black">$40</span>
              <hr className="-mx-3 w-[120%]" />
              <p className="font-satoshiMedium text-[#0000007A]">Brisbane</p>
              <div className="rounded-full bg-[#EBE9F480] p-1 text-[#FE9B07] ">
                <FaStar />
              </div>
            </motion.div>
          </div>
          <div className="text-white">
            <h2 className="mb-5 font-clashSemiBold text-3xl lg:max-w-[200px] xl:text-4xl">
              Monetize your <span className="text-[#E58C06]">skills!</span>
            </h2>
            <p className="mb-5 max-w-[500px] font-satoshi text-xl text-[#A29EB2] md:text-3xl">
              Have you thought about earning{" "}
              <span className="font-satoshiBold font-bold text-white">
                money
              </span>{" "}
              while doing what you love?
            </p>
            <p className="mb-5 max-w-[540px] font-satoshiMedium text-base sm:text-[18px]">
              If you’ve got talents to offer, whether it’s filing taxes, fixing
              pipes, moving furniture, or laying the groundwork, Oloja Hub is
              your platform to connect with real opportunities and start
              earning.
            </p>
            <ul className="mb-5 max-w-[550px] space-y-3">
              {perks.map((perk) => (
                <li
                  className="flex items-center gap-3"
                  key={Math.random() * 1234}
                >
                  <div className="relative w-max text-white">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 2.74667L25.36 0L28.6267 5.05778L34.64 5.36L34.9422 11.3733L40 14.64L37.2533 20L40 25.36L34.9422 28.6267L34.64 34.64L28.6267 34.9422L25.36 40L20 37.2533L14.64 40L11.3733 34.9422L5.36 34.64L5.05778 28.6267L0 25.36L2.74667 20L0 14.64L5.05778 11.3733L5.36 5.36L11.3733 5.05778L14.64 0L20 2.74667Z"
                        fill="#FE9B07"
                      />
                    </svg>
                    <IoMdCheckmark className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div>
                    <h4 className="font-satoshiBold text-lg font-bold text-[#EBE9F4] sm:text-xl">
                      {perk.title}
                    </h4>
                    <p className="font-satoshi text-sm text-[#FFFFFFC9] sm:text-base">
                      {perk.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="block rounded-[50px] bg-[#FE9B07] py-3 px-6 font-satoshiBold font-bold text-base text-white hover:bg-[#e79823]">
              <Link href="/coming-soon">Monetize your skills</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MonetizeSkills;
