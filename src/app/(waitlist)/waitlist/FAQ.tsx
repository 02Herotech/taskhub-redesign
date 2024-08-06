"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const faqlists: { question: string; answer: string }[] = [
  {
    question: "What is Olojà?",
    answer:
      "Oloja is an AI-driven platform that transcends boundaries, connecting diverse communities with a world of authentic products and services.",
  },
  {
    question: "Are there fees for using Olojà?",
    answer: "Oloja Hub charges fees for renting a shop and service listings.",
  },
  {
    question: "Are my transactions safe?",
    answer:
      "Yes, your transactions are safe. We use industry-standard encryption and secure payment processing to protect your data. Our payment system is PCI compliant, and we regularly monitor and update our security measures to ensure your information remains secure.",
  },
  {
    question: "Can I list all my products on Olojà?",
    answer:
      "Yes, you can showcase your entire range of legally permitted products on Oloja Hub via your personalized virtual store.",
  },
  {
    question: "Are there ways to verify service providers on your platform?",
    answer: "Pending",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [height, setHeight] = useState<Record<number, number>>({});
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    faqlists.forEach((faq, index) => {
      if (contentRefs.current[index]) {
        setHeight((prev) => ({
          ...prev,
          [index]: contentRefs.current[index]!.scrollHeight,
        }));
      }
    });
  }, []);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    contentRefs.current[index] = el;
  };

  const handleShowFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          {faqlists.map((faq, index) => (
            <button
              key={faq.question}
              className="flex flex-col gap-2 rounded-lg border border-orange-normal bg-[#FBEEDA] p-3"
              onClick={() => handleShowFaq(index)}
            >
              <span className="flex w-full items-center justify-between gap-5">
                <span className="text-left font-satoshiBold text-2xl font-bold">
                  {faq.question}
                </span>
                <span>
                  <BiChevronDown fill="black" />
                </span>
              </span>
              <div
                className="overflow-hidden text-left font-satoshiMedium text-lg transition-all duration-300 ease-out"
                style={{
                  maxHeight: openIndex === index ? `${height[index]}px` : "0px",
                  opacity: openIndex === index ? 1 : 0,
                }}
                ref={setRef(index)}
              >
                {faq.answer}
              </div>
            </button>
          ))}
        </section>
      </article>
    </section>
  );
};

export default FAQ;
