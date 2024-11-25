"use client";
import Link from "next/link";
import { Exit, Planning, Finance, Immigrant, Product } from "./svg";
import { Marketing, Register, Online, Risk, Legal } from "./svg";

type Category = { icon: () => React.JSX.Element; link: "#"; text: string };

const categories: Category[] = [
  { icon: Planning, link: "#", text: "Planning" },
  { icon: Finance, link: "#", text: "Finance" },
  { icon: Immigrant, link: "#", text: "Immmigrant" },
  { icon: Marketing, link: "#", text: "Marketing" },
  { icon: Register, link: "#", text: "Registration" },
  { icon: Online, link: "#", text: "Online & Digital" },
  { icon: Product, link: "#", text: "Products & Services" },
  { icon: Risk, link: "#", text: "Risk Management" },
  { icon: Legal, link: "#", text: "Legal" },
  { icon: Exit, link: "#", text: "Exiting" },
];

function Categories() {
  return (
    <div className="bg-[#D5BDDE]">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-20 md:py-16">
        <h2 className="mb-4 text-center font-clashSemiBold text-3xl text-[#2A1769] sm:text-left md:text-4xl">
          Our Categories
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((link) => {
            return (
              <Link
                href="#"
                className="flex items-center gap-1 rounded-lg bg-[#F8E9FE] p-1 sm:p-2 sm:gap-3"
                key={Math.floor(Math.random() * 12000)}
              >
                <div className="w-max rounded-lg bg-[#381F8C] p-2">
                  <link.icon />
                </div>
                <span className="font-clashSemiBold text-primary ">
                  {link.text}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Categories;
