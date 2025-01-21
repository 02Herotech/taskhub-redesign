import AboutHeroSection from "@/components/about/Hero";
import Mission from "@/components/about/Mission";
import Values from "@/components/about/Values";
import WhatSetUsApart from "@/components/homepage/WhatSetUsApart";
import Image from "next/image";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";

// const About = () => {
//     return (
//         <main className="mt-20">
//             <AboutHeroSection />
//             <Mission />
//             <Values />
//             <WhatSetUsApart />
//             <div className="pb-28 bg-[#EBE9F4]" />
//         </main>
//     );
// }

const gradient =
  "linear-gradient(180deg, rgba(95, 75, 163, 0.43) 0%, rgba(96, 77, 164, 0.434929) 6.67%, rgba(101, 81, 166, 0.450241) 13.33%, rgba(108, 90, 170, 0.476546) 20%, rgba(118, 101, 176, 0.514024) 26.67%, rgba(132, 116, 184, 0.562112) 33.33%, rgba(147, 134, 193, 0.619174) 40%, rgba(165, 154, 203, 0.682334) 46.67%, rgba(183, 174, 213, 0.747666) 53.33%, rgba(200, 194, 223, 0.810826) 60%, rgba(216, 211, 232, 0.867888) 66.67%, rgba(229, 226, 239, 0.915976) 73.33%, rgba(240, 238, 245, 0.953454) 80%, rgba(247, 246, 249, 0.979759) 86.67%, rgba(251, 251, 252, 0.995071) 93.33%, #FDFDFD 100%)";

const data: { title: string; text: string }[] = [
  {
    title: "Save Time: ",
    text: "Free yourself from the to-do list and focus on what matters.",
  },
  {
    title: "Get More Done:",
    text: "Find the best experts for your tasks quickly and easily",
  },
  {
    title: "Monetize Your Skills:",
    text: "Use your expertise to earn income and build a career on your terms.",
  },
];

const steps = [
  "Find skilled experts to help you get more done.",
  "Turn your skills into a steady source of income.",
  "Explore our business hub to stay thriving in business",
  "Discover how Olójà can help you take control of your time and goals.",
];

function About() {
  return (
    <div className="min-h-screen bg-[#EBE9F4] pt-20">
      <section className="mx-auto max-w-7xl pt-10">
        <div className="mx-auto w-[93%] sm:w-[85%]">
          {/* bg picture and header text  */}
          <header
            className="rounded-3xl bg-cover bg-center bg-no-repeat p-4"
            style={{
              backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.7),rgba(34, 34, 34, 0.7)), url('/assets/images/about/multi-racial-friends.jpg')`,
            }}
          >
            <h1 className="mb-3 mt-44 font-clashSemiBold text-[18px] text-[#E58C06] sm:text-4xl">
              About Olójà
            </h1>
            <p className="font-satoshiMedium text-base text-[#EBE9F4] sm:text-3xl">
              Olójà is a platform built for{" "}
              <span className="text-[#E58C06]">people</span>. We believe that
              everyone deserves the opportunity to make the most of their time
              and talents.
            </p>
          </header>
          <div className="flex flex-col items-stretch gap-3 py-5 font-satoshiMedium text-base sm:py-0 sm:text-2xl md:flex-row md:gap-5">
            <p className="py-2 text-primary sm:py-10">
              For those seeking help or those who are too busy to get day-day
              tasks done, we{" "}
              <span className="font-satoshiBold font-bold text-[#AC6905]">
                connect
              </span>{" "}
              you with trusted individuals to handle your tasks so you can focus
              on what matters most.{" "}
            </p>
            <div className="bg-mobile-bar-gradient md:bg-bar-gradient h-[100] w-full rotate-180 opacity-25 md:w-20" />
            <p className="py-2 text-[#AC6905] sm:py-10">
              And for those ready to showcase their{" "}
              <span className="font-satoshiBold font-bold text-primary">
                expertise,
              </span>{" "}
              we provide the tools to monetize your skills and turn your talents
              into meaningful opportunities, giving you the flexibility to earn
              while doing what you love.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#140B31]">
        <section className="mx-auto max-w-7xl py-10">
          <div className="mx-auto w-[93%] text-[#EBE9f4] sm:w-[85%]">
            <h2 className="mb-3 text-center font-clashSemiBold text-[30px] text-[#E58C06] sm:text-[40px]">
              Our Mission
            </h2>
            <div className="flex flex-col gap-10 md:flex-row">
              {/* Dimension 524 x 385  */}
              <Image
                src="/assets/images/about/handshake.jpg"
                width={524}
                height={385}
                alt="Handshake"
                className="mx-auto w-full max-w-[500px] rounded-3xl object-cover md:w-1/2"
              />
              <div className="w-full md:w-1/2">
                <h3 className="mb-4 text-center font-satoshiBold text-3xl font-bold text-[#EBE9F4B0]">
                  Empowering <span className="text-[#EBE9F4]">People</span> to
                  Achieve More{" "}
                </h3>
                <div className="space-y-4 font-satoshiMedium text-xl sm:text-2xl">
                  <p>
                    Our mission is simple: help people buy back their{" "}
                    <span className="text-[#E58C06]">time</span> and create
                    meaningful opportunities.
                  </p>
                  <p>
                    We connect those who need work done with individuals who are
                    ready to work and showcase their skills.
                  </p>
                  <p>
                    Whether you’re looking for help with everyday tasks,
                    specialized projects, or anything in between, Olójà is your
                    partner in making life easier and more fulfilling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        style={{
          backgroundImage: `${gradient}, url('/assets/images/about/tile.png')`,
        }}
      >
        <section className="mx-auto max-w-7xl py-10">
          <div className="mx-auto w-[93%] sm:w-[85%]">
            <h2 className="mb-4 font-clashSemiBold text-[36px] text-[#2A1769] sm:text-[44px]">
              Why Olójà?
            </h2>
            <ul className="grid grid-cols-1 gap-3 gap-y-8 md:grid-cols-3">
              {data.map((step, i) => (
                <li className="" key={Math.random() * 1234}>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E58C06] font-satoshiBold text-[36px] font-bold text-white sm:h-20 sm:w-20 sm:text-[40px]">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <h4 className="mb-4 font-satoshiBold text-2xl font-bold text-[#140B31] sm:text-3xl">
                    {step.title}
                  </h4>
                  <p className="text-2xl text-[#34313F] sm:text-[32px]">
                    {step.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="bg-white">
        <section className="mx-auto max-w-7xl pb-36 pt-14 lg:pb-14">
          <div className="mx-auto w-[93%] sm:w-[85%]">
            <h2 className="mb-5 text-center font-clashSemiBold text-[36px] text-primary sm:text-[44px]">
              Take the first <br /> <span className="text-[#E58C06]">step</span>{" "}
              today
            </h2>
            <p className="mb-8 text-center font-satoshi text-[20px] text-[#2A1769] sm:text-[32px]">
              Join Olójà and start connecting:
            </p>
            <ul className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li
                  className="bg-blue-black rounded-3xl p-10 sm:p-5"
                  key={Math.random() * 3456}
                >
                  <div className="relative mx-auto mb-4 w-max text-white">
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
                  <p className="font-satoshiMedium text-2xl text-[#EBE9F4]">
                    {step}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/customer/add-task"
              className="mx-auto mb-14 block w-full rounded-full bg-[#381F8C] px-5 py-3 text-center font-satoshiBold font-bold text-[#EBE9F4] sm:mb-20 sm:w-max"
            >
              Post a task for free
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
