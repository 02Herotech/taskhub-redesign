"use client";
import { IconType } from "react-icons";
import { FaDollarSign } from "react-icons/fa";
import { MdCreditCardOff } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoMdThumbsUp } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

type Perk = { icon: IconType; title: string; desc: string };

const perks: Perk[] = [
  {
    icon: FaDollarSign,
    title: "Secure Payments",
    desc: "No scams, no worries. Your payment is held securely until the job is completed to your satisfaction. Release it only when you’re happy.",
  },
  {
    icon: MdCreditCardOff,
    title: "No fees for changing your mind",
    desc: "Accepted a task but decided not to proceed? No problem—there’s zero fee for that.",
  },
  {
    icon: MdOutlineConnectWithoutContact,
    title: "Zero Connection Fees",
    desc: "Chat with experts and find the right person for your job without paying a connection fee.",
  },
  {
    icon: FaStar,
    title: "Ratings & Reviews",
    desc: "Make informed decisions with real reviews and ratings from other users who’ve worked with the experts.",
  },
];

function Perks() {
  return (
    <section className="overflow-x-hidden bg-[#EBE9F4] py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex w-[85%] flex-col-reverse gap-10 lg:flex-row">
          <div
            className="relative h-[550px] w-full rounded-3xl border-[15px] border-[#E1DDEE] bg-cover bg-no-repeat lg:w-1/2"
            style={{
              backgroundImage: `url("/assets/images/homepage/happy_customer.jpg")`,
              backgroundPositionX: "30%",
            }}
          >
            <motion.div
              initial={{ opacity: 0, right: -40 }}
              whileInView={{ opacity: 1, right: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
              className="absolute bottom-24 right-10 flex w-max items-center gap-2 rounded-xl border border-[#381F8C] bg-[#EBE9F4] px-3 py-1 text-[#381F8C]"
            >
              <IoMdThumbsUp />
              <p className="font-satoshiBold text-base font-bold sm:text-lg">
                Task Completed
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, right: -80 }}
              whileInView={{ opacity: 1, right: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute bottom-10 right-0 flex w-max items-center gap-2 rounded-xl border border-[#381F8C] bg-[#EBE9F4] px-3 py-1 text-[#381F8C]"
            >
              <FaCircleCheck />
              <p className="font-satoshiBold text-base font-bold sm:text-lg">
                Payment approved
              </p>
            </motion.div>
          </div>
          <div>
            <h2 className="mb-5 max-w-[500px] font-clashSemiBold text-3xl text-[#381F8C] xl:text-4xl">
              A Safe and <span className="text-[#E58C06]">Scam-Free</span> Zone
              for Getting Things Done
            </h2>
            <p className="mb-8 font-satoshiMedium text-xl font-medium text-[#2A1769] sm:text-2xl">
              Oloja Hub allows you to confidently connect and get things done,
              hassle-free:
            </p>
            <ul className="mb-8 space-y-3">
              {perks.map((perk) => (
                <li
                  className="flex max-w-[550px] flex-wrap items-center gap-2"
                  key={Math.random() * 2000}
                >
                  <div className="w-max rounded-xl bg-[#381F8C] p-2 text-white">
                    <perk.icon size={23} />
                  </div>
                  <h4 className="font-satoshiBold text-lg font-bold text-[#381F8C]">
                    {perk.title}:
                  </h4>
                  <p className="-mt-2 pl-12 font-satoshiMedium text-[#000000BA]">
                    {perk.desc}
                  </p>
                </li>
              ))}
            </ul>
            <button className="min-w-[250px] rounded-[50px] bg-primary p-3 font-satoshi text-[16px] font-[700] text-[#EBE9F4] hover:bg-[#25135f] lg:w-[175px] xl:w-[190px]">
              <Link href="/customer/add-task">
                Post your first task for free
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Perks;
