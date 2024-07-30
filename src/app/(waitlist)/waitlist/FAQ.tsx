import Image from "next/image";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsChevronCompactUp } from "react-icons/bs";
import { PiTagChevronFill } from "react-icons/pi";

const faqlists: { question: string; answer: string }[] = [
  {
    question: "What is Olojà?",
    answer:
      "Oloja is an AI-driven platform that transcends boundaries, connecting diverse communities with a world of authentic products and services.",
  },
  {
    question: "Are there fees for using Olojà?",
    answer: "",
  },
  {
    question: "Are my transactions safe?",
    answer: "",
  },
  {
    question: "Can i list all my products on Olojà?",
    answer: "",
  },
  {
    question: "Are there ways to verify service providers on your platform?",
    answer: "",
  },
];

const FAQ = () => {
  return (
    <section className="space-y-4 py-10">
      <h4 className="font-satoshiMedium text-lg ">
        Frequently Asked Questions
      </h4>
      <article className="grid lg:grid-cols-2">
        <section>
          <h3 className="font-clashSemiBold text-4xl font-semibold">
            Everything you need to know.
          </h3>
          <Image
            src={"/assets/images/waitlist/hugeicons_question.png"}
            alt="icon"
            width={400}
            height={400}
            quality={100}
          />
        </section>
        <section className="flex flex-col gap-2">
          {faqlists.map((faq) => (
            <button
              key={faq.question}
              className="flex flex-col gap-2 rounded-lg border border-orange-normal bg-[#FBEEDA] p-3"
            >
              <span className="flex w-full items-center justify-between gap-5">
                <span className="text-left font-satoshiBold text-2xl font-bold">
                  {faq.question}
                </span>
                <span>
                  <BiChevronDown fill="black" />
                </span>
              </span>
              <span className="text-left font-satoshiMedium text-lg">
                {faq.answer}
              </span>
            </button>
          ))}
        </section>
      </article>
    </section>
  );
};

export default FAQ;
