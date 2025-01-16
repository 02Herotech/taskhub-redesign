"use client";
import React from "react";
import Link from "next/link";
import Guarantee from "./Guarantee";
import WaveTick from "./WaveTick";
import Wave from "./Wave";
import { motion } from "framer-motion";
import Image from "next/image";

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
  return (
    <div>
      <header className="mx-auto max-w-7xl pb-10">
        <div className="absolute left-0 top-0 -z-10 flex w-full justify-between overflow-hidden">
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
        <h1 className="mb-10 mt-28 text-center font-clashSemiBold text-3xl text-[#381F8C] sm:text-4xl">
          Get Tasks Done. <br /> Compare Offers. <br /> Save time and energy
        </h1>
        <div className="mx-auto w-max space-x-1 font-satoshiBold sm:space-x-4">
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-[#381F8C] px-3 py-3 font-bold text-[#EBE9F4] sm:px-5"
          >
            Get started now
          </Link>
          <Link
            href="/coming-soon"
            className="rounded-full border-[0.5px] border-[#381F8C] px-3 py-3 font-bold text-[#381F8C] sm:px-5"
          >
            Monetize your skills
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

          <div className="mx-auto flex flex-col items-center gap-5 bg-white py-14 md:flex-row">
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

        <section className="mx-auto w-[93%] text-center sm:w-[85%]">
          <p className="mb-7 font-satoshiBold text-base font-bold text-[#E58C06] sm:text-xl">
            Ready to monetize your skills?
          </p>
          <h3 className="mb-3 font-clashSemiBold text-2xl text-primary sm:text-3xl">
            Oloja Hub makes it easy to find customers and
            <br className="hidden sm:block" /> earn money doing what you love
          </h3>
          <p className="mb-10 font-satoshiBold text-base font-bold text-[#4D4B51] sm:text-2xl">
            All while keeping things simple, secure, and flexible. Browse
            through jobs that <br className="hiddem sm:block" /> match your
            skills at no cost.
          </p>
          <ul className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-3">
            {perks.map((perk) => (
              <li
                className="relative flex flex-col justify-center gap-4 overflow-clip rounded-3xl bg-[#E1DDEE] px-6 py-10 text-xl text-primary shadow-xl "
                key={Math.random() * 1234}
              >
                <h4 className="font-satoshiBold font-bold">{perk.title}</h4>
                <p className="font-satoshiMedium">{perk.text}</p>
                <div className="absolute bottom-0 right-0 h-20 w-20 translate-x-[40%] translate-y-[40%] rounded-full bg-[#EF8C08]" />
              </li>
            ))}
          </ul>
          <p className="mb-1 font-satoshiMedium text-xl text-primary sm:text-2xl">
            With Oloja Hub, you focus on what you do best, and we’ll handle the
            rest.
          </p>
          <p className="mb-10 font-satoshiMedium text-xl text-[#E58C06] underline sm:text-2xl">
            Start earning with ease today!
          </p>
          <div className="mx-auto w-max space-x-1 sm:space-x-4">
            <Link
              href="/auth/sign-up"
              className="rounded-full bg-[#381F8C] px-3 py-3 font-bold text-[#EBE9F4] sm:px-5"
            >
              Get started now
            </Link>
            <Link
              href="/coming-soon"
              className="rounded-full border-[0.5px] border-[#381F8C] px-3 py-3 font-satoshiBold font-bold text-[#381F8C] sm:px-5"
            >
              Monetize your skills
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
