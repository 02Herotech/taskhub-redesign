"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

const steps = [
  "Briefly tell us what you require.",
  "Determine how much you want to pay.",
  "Check offers from potential experts.",
  "Pick your own PRO!",
];

const tasks = [
  "I want my kitchen sink fixed!",
  "I need my makeup done!",
  "Painter and interior designer",
  "Cook for a family of four!",
  "I need a furniture mover",
  "I need help with my taxes",
];

const reversedTasks = tasks.reverse();

function PostYourJob() {
  return (
    <div className="mx-auto max-w-7xl">
      <section className="mx-auto flex w-[85%] flex-col items-stretch gap-10 py:14 sm:py-20 md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="mb-3 font-clashSemiBold text-3xl text-[#2A1769] sm:text-5xl md:max-w-[550px]">
            Post your job and choose your experts with no delays!
          </h2>
          <p className="mb-5 font-satoshi text-2xl text-[#190E3F] md:max-w-[450px]">
            Life can get busy, and sometimes you just need an extra set of
            hands.
          </p>
          <ul className="mb-8 space-y-3">
            {steps.map((step, i) => (
              <li
                className="flex items-center gap-3 text-lg font-bold"
                key={Math.random() * 2000}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#55535A] bg-[#EBE9F4] font-bold text-[#140B31]">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <p className="text-base text-[#55535A] sm:text-lg">{step}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/customer/add-task"
            className="block w-full rounded-full bg-[#381F8C] px-4 py-3 text-center font-satoshiBold font-bold text-[#EBE9F4] sm:w-max"
          >
            Post your task for free
          </Link>
        </div>
        <div className="flex w-full flex-col justify-between border md:w-1/2">
          <div className="relative flex max-h-[400px] justify-center gap-2 overflow-clip rounded-2xl bg-[#C1BADB] p-3">
            <motion.ul
              className="space-y-4"
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...tasks, ...tasks, ...tasks].map((task) => (
                <li
                  className="w-11/12 min-w-[250px] rounded-xl border border-primary bg-[#EBE9F4] px-2 sm:px-3 py-2 text-center text-base font-bold text-primary sm:w-max "
                  key={Math.random() * 1234}
                >
                  {task}
                </li>
              ))}
            </motion.ul>
            <motion.ul
              className="hidden space-y-4 sm:block"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...reversedTasks, ...reversedTasks, ...reversedTasks].map(
                (task) => (
                  <li
                    className="w-max min-w-[250px] rounded-xl border border-primary bg-[#EBE9F4] px-3 py-2 text-center text-base font-bold text-primary"
                    key={Math.random() * 1234}
                  >
                    {task}
                  </li>
                ),
              )}
            </motion.ul>
          </div>
          <Link
            href="/how-oloja-works"
            className="mx-auto mt-10 flex w-max items-center gap-1 rounded-full px-4 font-satoshiBold text-xl font-bold text-primary underline md:mt-0"
          >
            <span>Explore How OlojaHub works</span>
            <MdArrowOutward />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default PostYourJob;
