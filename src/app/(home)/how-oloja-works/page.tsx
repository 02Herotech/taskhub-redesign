"use client";
import React, { useState } from "react";
import Link from "next/link";
import Guarantee from "./Guarantee";
import WaveTick from "./WaveTick";
import Wave from "./Wave";
import { motion } from "framer-motion";
import Image from "next/image";
import OrangeTick from "@/components/icons/OrangeTick";

const perks: { title: string; text: string }[] = [
  {
    title: "Low Connection Fee",
    text: "We keep our fees low, so you keep more of what you earn.",
  },
  {
    title: "Work on Your Terms ",
    text: "Found a job that suits your skills and schedule? It’s yours to take. You’re in control every step of the way.",
  },
  {
    title: "Secure Payments, Hassle-Free ",
    text: "We secure customer payments upfront and transfer them to your verified account once the job is complete.",
  },
];

function Page() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="bg-[#EBE9F4] pb-20">
      <header className="mx-auto max-w-7xl pb-10">
        <div className="absolute left-0 top-0 z-10 hidden w-full justify-between overflow-hidden sm:flex">
          <div
            style={{
              position: "relative",
              height: "500px",
              width: "250px",
              float: "left",
              top: "-100px",
              zIndex: "2",
            }}
          >
            <div
              style={{
                height: "500px",
                width: "500px",
                borderRadius: "50%",
                backgroundImage:
                  "radial-gradient(circle, #fac588, transparent)",
                filter: "blur(30px)",
                position: "absolute",
                left: "-250px",
              }}
            ></div>
          </div>

          <div
            style={{
              position: "relative",
              height: "500px",
              width: "250px",
              float: "right",
              top: "-160px",
            }}
          >
            <div
              style={{
                height: "500px",
                width: "500px",
                borderRadius: "50%",
                backgroundImage:
                  "radial-gradient(circle, #856cb7, transparent)",
                filter: "blur(70px)",
                position: "absolute",
                right: "-200px",
              }}
            ></div>
          </div>
        </div>
        <h1 className="mb-10 pt-28 text-center font-clashSemiBold text-3xl text-[#381F8C] sm:text-4xl">
          Get Tasks Done. <br /> Compare Offers. <br /> Save time and energy
        </h1>
        <div className="mx-auto relative z-20 w-max space-x-1 font-satoshiBold sm:space-x-4">
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-[#381F8C] px-3 py-3 font-bold text-[#EBE9F4] sm:px-5"
          >
            Get started now
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-full border-[0.5px] border-[#381F8C] px-3 py-3 font-bold text-[#381F8C] sm:px-5"
          >
            Make money on Oloja
          </Link>
        </div>
      </header>

      <div className="mx-auto mb-10 max-w-7xl">
        <section
          className="relative mx-auto mb-10 w-[93%] overflow-clip rounded-3xl bg-cover bg-no-repeat text-[#EBE9F4] sm:w-[85%]"
          style={{
            backgroundImage: `url("assets/images/how-oloja-works/galaxy-bg.jpg")`,
          }}
        >
          <Wave position="top" />
          <div className="relative left-0 top-0 z-20 h-full w-full bg-[#381F8C] bg-opacity-50 pb-10 pt-1">
            <h3 className="mb-5 mt-5 px-5 text-center font-clashSemiBold text-2xl font-semibold sm:mb-8 sm:mt-8">
              Your Ultimate Guide for getting every{" "}
              <br className="hidden sm:block" /> task done.
            </h3>
            <p className="mb-8 text-center font-satoshiMedium text-base sm:text-xl">
              Fast, easy and stress-free
            </p>
            <ul className="space-y-20 px-5 sm:px-10">
              <li className="mb-4 flex flex-col gap-4 sm:gap-10 lg:flex-row lg:items-center">
                <div className="relative overflow-y-clip rounded-3xl border-x-[12px] border-b-[10px] border-t-[24px] border-[#C1BADB] lg:max-w-[400px]">
                  <div className="overflow-hidden">
                    <Image
                      src="/assets/images/how-oloja-works/step-one.png"
                      alt="Step one"
                      width={918}
                      height={648}
                      className="w-full"
                    />
                  </div>
                  <motion.span
                    initial={{ opacity: 0, right: -100 }}
                    whileInView={{ opacity: 1, right: -32 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="absolute bottom-20 rounded-xl bg-[#E58C06] px-4 py-2 text-xs font-bold text-white"
                  >
                    I need someone to do my cornrows
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, right: -100 }}
                    whileInView={{ opacity: 1, right: -8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="absolute -right-2 bottom-5 rounded-xl bg-[#E58C06] px-4 py-2 text-xs font-bold text-white"
                  >
                    I need authentic local spice
                  </motion.span>
                </div>
                <div>
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-[#E58C06] sm:mb-5 sm:text-3xl">
                    Briefly tell us what you need done
                  </h3>
                  <p className="mb-7 font-satoshiMedium text-xl sm:mb-10 sm:text-2xl">
                    Explain what you require in clear and short sentences.
                  </p>
                  <Link
                    href="/customer/add-task"
                    className="rounded-full border-[0.5px] border-[#381F8C] bg-[#EBE9F4] px-5 py-3 font-satoshiBold font-bold text-[#381F8C]"
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>
              <li className="mb-4 flex flex-col gap-4 sm:gap-10 lg:flex-row-reverse lg:items-center">
                <Image
                  src="/assets/images/how-oloja-works/step-two.png"
                  alt="Step two"
                  width={408}
                  height={324}
                  className="w-full lg:max-w-[400px]"
                />
                <div>
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-[#E58C06] sm:mb-5 sm:text-3xl">
                    Determine how much you want to pay
                  </h3>
                  <p className="mb-7 font-satoshiMedium text-xl sm:mb-10 sm:text-2xl">
                    This is not a set price. You can modify when you find your
                    potential experts if you need to
                  </p>
                  <Link
                    href="/customer/add-task"
                    className="rounded-full border-[0.5px] border-[#381F8C] bg-[#EBE9F4] px-5 py-3 font-satoshiBold font-bold  text-[#381F8C]"
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>
              <li className="mb-4 flex flex-col gap-4 sm:gap-10 lg:flex-row lg:items-center">
                <div className="relative lg:min-w-[400px]">
                  <Image
                    src="/assets/images/how-oloja-works/step-three.png"
                    alt="Step three"
                    width={408}
                    height={324}
                    className="w-full"
                  />
                  <WaveTick />
                </div>

                <div>
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-[#E58C06] sm:mb-5 sm:text-3xl">
                    Pick your own PRO!
                  </h3>
                  <p className="mb-7 font-satoshiMedium text-xl sm:mb-10 sm:text-2xl">
                    The ball’s in your court to hire the best match and get it
                    done your way. Check profiles, ratings, and reviews to guide
                    your choice. After the job, show appreciation by releasing
                    payment and leaving a review to share their great work!
                  </p>
                  <Link
                    href="/customer/add-task"
                    className="rounded-full border-[0.5px] border-[#381F8C] bg-[#EBE9F4] px-5 py-3 font-satoshiBold font-bold text-[#381F8C]"
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className="mx-auto flex flex-col items-center gap-5 bg-[#EBE9F4] py-14 md:flex-row">
            <div className="w-full md:w-1/2">
              <h2 className="mb-4 font-clashSemiBold text-3xl text-primary sm:text-4xl">
                Whether it is a simple task or a complex task!{" "}
              </h2>
              <p className="font-satoshiBold text-lg font-bold text-[#140B31] sm:text-2xl">
                Rest assured Olójà has you covered, Share what{" "}
                <span className="text-[#E58C06]">you need done</span>, choose
                the <span className="text-[#E58C06]">right help</span>. Done,
                just like that. Saving you{" "}
                <span className="text-[#E58C06]">tone of time and energy.</span>
              </p>
            </div>

            <Image
              src="/assets/images/how-oloja-works/users-sp.png"
              alt="Picture of users and service providers"
              width={648}
              height={299}
              className="w-full flex-grow md:w-[57%]"
            />
          </div>

          <div className="relative left-0 top-0 z-20 h-full w-full bg-[#381F8C] bg-opacity-50 pb-10 pt-1">
            <ul className="space-y-20 px-5 py-10 sm:px-10">
              <li className="mb-4 flex flex-col gap-4 sm:gap-10 lg:flex-row lg:items-center">
                <Image
                  src="/assets/images/how-oloja-works/step-four.png"
                  alt="Step Four"
                  width={408}
                  height={324}
                  className="w-full lg:max-w-[400px]"
                />
                <div>
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-[#E58C06] sm:mb-5 sm:text-3xl">
                    Stay Connected with Your Expert Every Step of the way
                  </h3>
                  <p className="mb-7 font-satoshiMedium text-xl sm:mb-10 sm:text-2xl">
                    Find the right expert for your job with no upfront costs.
                    Chat securely, share details, and track progress to ensure
                    your job is done just the way you want.
                  </p>
                  <Link
                    href="/customer/add-task"
                    className="rounded-full border-[0.5px] border-[#381F8C] bg-[#EBE9F4] px-5 py-3 font-satoshiBold font-bold text-[#381F8C]"
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>

              <li className="mb-4 flex flex-col gap-4 sm:gap-10 lg:flex-row-reverse lg:items-center">
                <div className="relative rounded-3xl border-[24px] border-x-[12px] border-b-[10px] border-[#C1BADB] lg:min-w-[400px]">
                  <div className="bg-white pt-3">
                    <Image
                      src="/assets/images/oloja-logo.png"
                      alt="Oloja logo"
                      width={133}
                      height={48}
                      className="mx-auto w-3/12"
                    />
                    <p className="mt-1 pb-40 text-center text-2xl font-black text-primary">
                      Guarantees:
                    </p>
                  </div>
                  <Guarantee
                    text="A simple, safe process that keeps both you and the expert secure."
                    top={90}
                    left={-60}
                    animateTo={-20}
                    delay={1}
                  />
                  <Guarantee
                    text="Your payment is protected until you’re satisfied."
                    top={142}
                    left={-40}
                    animateTo={0}
                    delay={0.8}
                  />
                  <Guarantee
                    text="No cash handling—everything is done online."
                    top={194}
                    left={0}
                    animateTo={20}
                    delay={0.5}
                  />
                </div>
                <div>
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-[#E58C06] sm:mb-5 sm:text-3xl">
                    How we keep your payment safe and easy
                  </h3>
                  <p className="mb-7 font-satoshiMedium text-xl sm:mb-10 sm:text-2xl">
                    Your payment is securely held by Olójà Hub until the job is
                    completed to your satisfaction. Once approved, we transfer
                    it directly to the expert&apos;s verified bank account.
                  </p>
                  <Link
                    href="/customer/add-task"
                    className="rounded-full border-[0.5px] border-[#381F8C] bg-[#EBE9F4] px-5 py-3 font-satoshiBold font-bold text-[#381F8C]"
                  >
                    Post a task in 90 secs
                  </Link>
                </div>
              </li>
            </ul>
            <p className="px-5 pb-24 pt-6 text-center font-satoshiBold text-base font-bold sm:px-10 sm:pb-32 sm:text-2xl">
              Get your job done with peace of mind,{" "}
              <br className="block sm:hidden" /> knowing Olójà{" "}
              <br className="hidden sm:block" /> Hub has your back!
            </p>
          </div>
          <Wave position="bottom" />
        </section>

        {/* New Section One  */}
        <section className="relative mx-auto mb-10 mt-20 w-[93%] overflow-clip rounded-xl bg-[#FAFAFA] px-6 py-10 text-primary sm:mb-20 sm:w-[85%]">
          <h2 className="mb-5 text-center font-clashSemiBold text-2xl sm:text-4xl">
            Olójà Hub Fees & Charges:{" "}
          </h2>
          <p className="mb-5 text-center font-clashMedium text-[18px] sm:text-2xl">
            Fair, Transparent, and Almost Free!
          </p>
          <p className="mx-auto mb-10 max-w-[550px] text-center font-satoshiMedium text-[18px] text-[#4D4B51] sm:text-left sm:text-xl">
            At Olójà Hub, we believe in keeping our fees straightforward and
            affordable, so you get the best value whether you’re hiring or
            offering services.
          </p>

          <div className="flex flex-col justify-between sm:gap-5 md:flex-row">
            <div className="md:w-1/2">
              <h3 className="mb-5 w-max rounded-xl bg-[#2A1769] px-3 py-2 font-clashSemiBold text-lg text-[#EBE9F4] sm:mb-7 sm:text-2xl">
                As a Customer
              </h3>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.3 }}
                className="mb-4 ml-20 flex items-center gap-3 rounded-lg bg-[#EBE9F4] px-3 py-2 text-sm sm:text-xl"
              >
                <Image
                  width={24}
                  height={24}
                  src="/pin-list.svg"
                  alt="Pin Icon"
                />
                <p className="font-satoshiBold font-bold">
                  No Connection Fees.{" "}
                  <span className="font-satoshiMedium">No Service Fees.</span>
                </p>
              </motion.div>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mb-10 ml-20 flex items-center gap-3 rounded-lg bg-[#EBE9F4] px-3 py-2 text-sm sm:mb-14 sm:text-xl"
              >
                {/* 24 x 24  */}
                <Image
                  width={24}
                  height={24}
                  src="/pin-list.svg"
                  alt="Pin Icon"
                />
                <p className="font-satoshiBold font-bold">
                  GST:{" "}
                  <span className="font-satoshiMedium">
                    A small 10% GST fee applies to the agreed task price.
                  </span>
                </p>
              </motion.div>

              <h3 className="mb-5 w-max rounded-xl bg-[#E58C06] px-3 py-2 font-clashSemiBold text-lg text-[#EBE9F4] sm:mb-7 sm:text-2xl">
                As a Service Provider
              </h3>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mb-10 ml-20 flex items-center gap-3 rounded-lg bg-[#EBE9F4] px-3 py-2 text-sm sm:text-xl xl:min-w-[480px]"
              >
                {/* 24 x 24  */}
                <Image
                  width={24}
                  height={24}
                  src="/pin-list.svg"
                  alt="Pin Icon"
                />
                <p className="font-satoshiBold font-bold">
                  Service Fee:{" "}
                  <span className="font-satoshiMedium">
                    Just 7% of the agreed task price—one of the lowest rates in
                    the industry!
                  </span>
                </p>
              </motion.div>
            </div>

            <div className="md:w-1/2">
              <div className="mx-auto flex h-[350px] max-w-[390px] items-center justify-center rounded-full bg-[#FCF4E659] sm:h-[449px]">
                <Image
                  width={500}
                  height={500}
                  src="/assets/images/how-oloja-works/happy-cash.png"
                  alt="Happy cash"
                  className="w-10/12"
                />
              </div>
              <p className="mx-auto mt-6 max-w-[400px] text-center font-satoshiMedium text-lg sm:text-xl md:text-left">
                Even with this, we remain one of the most affordable platforms,
                ensuring a cost-effective solution for all your needs.
              </p>
            </div>
          </div>
        </section>

        {/* New Section two  */}
        <section className="relative mx-auto mb-20 flex w-[93%] flex-col items-end gap-10 sm:w-[85%] md:flex-row">
          <div className="w-full md:w-2/5">
            <h2 className="mb-5 font-clashSemiBold text-2xl text-[#E58C06] sm:text-3xl">
              What Happens Next?
            </h2>
            <p className="mb-10 font-satoshiBold text-lg font-bold text-primary sm:text-2xl">
              We know things don’t always go as planned, so here’s what happens
              if you need to cancel a task:
            </p>
            <Image
              src="/assets/images/how-oloja-works/phone-transaction.png"
              width={486}
              height={456}
              alt="Phone transactions"
            />
          </div>
          <div className="w-full rounded-2xl bg-[#140B31] px-7 py-5 text-[#EBE9F4] sm:py-8 md:w-3/5 md:rounded-l-2xl md:rounded-r-none">
            <h4 className="mb-4 font-clashSemiBold text-2xl text-[#E58C06] sm:text-3xl">
              On Our Refunds
            </h4>
            <ul className="mb-6 space-y-3">
              <li className="flex items-center gap-3">
                <OrangeTick svgWidth="24" svgHeight="24" />
                <p className="font-satoshiBold text-sm font-bold sm:text-lg">
                  Upon cancellation, your payment will be returned either to
                  your Oloja Hub wallet or your original payment method.
                </p>
              </li>
              <li className="flex items-center gap-3">
                <OrangeTick svgWidth="24" svgHeight="24" />
                <p className="font-satoshiBold text-sm font-bold sm:text-lg">
                  If refunded to your wallet, you can use the balance
                  immediately for your next task or request a refund back to
                  your original payment method.
                </p>
              </li>
            </ul>

            <h4 className="mb-4 font-clashSemiBold text-2xl text-[#E58C06] sm:text-3xl">
              Be Advised
            </h4>
            <ul className="mb-6 space-y-3">
              <li className="flex items-center gap-3">
                <OrangeTick svgWidth="24" svgHeight="24" />
                <p className="font-satoshiBold text-sm font-bold sm:text-lg">
                  If you’re deemed responsible for canceling the Task Contract,
                  the 7% service fee will be retained by Oloja Hub.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="mx-auto w-[93%] text-center sm:w-[85%]">
          <p className="mb-7 font-satoshiBold text-base font-bold text-[#E58C06] sm:text-xl">
            Ready to monetize your skills?
          </p>
          <h3 className="mb-3 font-clashSemiBold text-2xl text-primary sm:text-3xl">
            Olójà Hub makes it easy to find customers and
            <br className="hidden sm:block" /> earn money doing what you love
          </h3>
          <p className="mb-10 font-satoshiBold text-base font-bold text-[#221354] sm:text-2xl">
            <span className="text-[#4D4B51]">All while keeping things</span>{" "}
            simple, secure, and flexible.{" "}
            <span className="text-[#4D4B51]">Browse through jobs that</span>{" "}
            <br className="hiddem sm:block" /> match your skills at no cost.
          </p>
          <ul className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-3">
            {perks.map((perk, i) => (
              <li
                className={
                  "relative flex flex-col justify-center gap-4 overflow-clip rounded-3xl bg-[#E1DDEE] px-6 py-10 text-xl shadow-xl " +
                  (hoveredIndex == i ? "text-white" : "text-primary")
                }
                key={Math.random() * 1234}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h4 className="z-20 font-satoshiBold font-bold">
                  {perk.title}
                </h4>
                <p className="z-20 font-satoshiMedium">{perk.text}</p>
                <div
                  className={
                    "absolute bottom-0 right-0 w-full bg-[#EF8C08] transition-all duration-300 ease-in " +
                    (hoveredIndex == i
                      ? "clip-circle-full h-full"
                      : "clip-circle-half h-1/2")
                  }
                />
              </li>
            ))}
          </ul>

          <p className="mb-1 font-satoshiMedium text-xl text-primary sm:text-2xl">
            With Olójà Hub, you focus on what you do best, and we’ll handle the
            rest.
          </p>
          <p className="mb-10 font-satoshiMedium text-xl text-[#E58C06] underline sm:text-2xl">
            Start earning with ease today!
          </p>
          <div className="mx-auto w-max space-x-1 sm:space-x-4">
            <Link
              href="/auth"
              className="rounded-full bg-[#381F8C] px-3 py-3 font-bold text-[#EBE9F4] sm:px-5"
            >
              Get started now
            </Link>
            <Link
              href="/auth/sign-up"
              className="rounded-full border-[0.5px] border-[#381F8C] px-3 py-3 font-satoshiBold font-bold text-[#381F8C] sm:px-5"
            >
              Make money on Oloja
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
