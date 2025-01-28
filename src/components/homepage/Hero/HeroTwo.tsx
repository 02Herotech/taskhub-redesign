"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

function HeroTwo() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl">
      <section className="mx-auto flex w-[85%] flex-col-reverse items-center gap-12 py-20 lg:flex-row lg:gap-0">
        <div className="w-full lg:w-1/2">
          <h1 className="mb-5 font-clashSemiBold text-[44px] leading-tight text-primary sm:mb-10 sm:text-6xl lg:max-w-[500px] xl:text-7xl">
            GET TASKS{" "}
            <span className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
              >
                DONE
              </motion.span>{" "}
              <div className="absolute left-0 top-0 -z-10 h-full w-full -rotate-[2deg] bg-[#FE9B07] opacity-20" />
            </span>{" "}
            IN A FEW <span className="font-clash">CLICKS.</span>{" "}
          </h1>
          <p className="mb-10 text-center font-satoshiMedium text-xl text-[#444248] sm:text-left lg:max-w-[500px]">
            Whether you need tasks handled, want to earn{" "}
            <br className="hidden sm:block" /> doing what you love, or learn to
            start your business, Olójà is your platform to succeed.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/customer/add-task"
              className="rounded-full bg-[#381F8C] px-4 py-3 text-center font-satoshiBold font-bold text-[#EBE9F4]"
            >
              Post a task for free
            </Link>
            <Link
              href="/monetize-your-skills"
              className="rounded-full bg-[#FE9B07] px-4 py-3 text-center font-satoshiBold font-bold text-[#EBE9F4]"
            >
              Monetize your skills
            </Link>
          </div>
        </div>
        <div className="relative mr-auto h-[400px] w-full max-w-[450px] rounded-xl bg-primary sm:h-[500px] lg:mx-auto lg:w-1/2">
          <motion.div
            className="mx-auto h-full w-11/12"
            initial={{ y: -300, opacity: 0, rotate: -12 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
          >
            <Image
              src="/assets/images/homepage/hero/plumber-fixing.png"
              alt="Technician with a Customer"
              width={468}
              height={498}
              className="h-full w-full -translate-y-10 rounded-xl object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, left: -100 }}
            whileInView={{ opacity: 1, left: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="absolute bottom-5 left-5 mt-3 flex w-[200px] flex-wrap items-center justify-between gap-1 overflow-x-hidden rounded-xl bg-white px-3 py-2"
          >
            <p className="font-satoshiMedium text-black">Plumber Needed</p>
            <span className="font-satoshiMedium text-sm text-black">$80</span>
            <hr className="-mx-3 w-[120%]" />
            <p className="font-satoshiMedium text-sm text-[#0000007A]">
              Brisbane
            </p>
            <div className="rounded-full bg-[#EBE9F480] p-1 text-[#FE9B07] ">
              <FaStar />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HeroTwo;
