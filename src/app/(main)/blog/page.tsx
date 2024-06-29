"use client";
import React, { useEffect } from "react";
import "../../../styles/serviceProviderStyles.css";
import Image from "next/image";
import Link from "next/link";

const blogsData: BlogTypes[] = [
  {
    id: 1,
    bannerImage: "/assets/images/blog/blogImage1.png",
    date: "20th April, 2024",
    title: "How to Start Import Business in Australia in 9 Key Steps",
    readTime: "Read Time: 10 Mins.",
    blogType: "Finance",
    description: `Are you interested in learning how to start import business in Australia? If so, we will provide you with thorough information to answer your question. \n
Before we get started, let's look at why you'd start an import firm in Australia and how the export-import industry works.\n
 In January 2024, Australia's imports climbed by 1.3% over the previous month, reaching a three-month high of AUD 36.48 billion.\n
 The export-import business in Australia entails trading goods and services across borders, with exporters shipping products abroad and importers bringing them into the country.\n
 This trade is backed by agreements, rules, and logistics that ensure smooth transactions while adhering to legal and customs standards.\n
 Furthermore, consumer goods imports increased by 5.2% to AUD 11.69 billion, led by a 17.2% increase in non-industrial transportation equipment and a 2.1% increase in textiles, clothes, and footwear.\n
 These companies purchase a diverse range of products from worldwide vendors to satisfy the needs of Australian consumers. It also demonstrates how import businesses play an important role in giving various options to consumers around the country.\n
Before beginning the importation process, you should be familiar with the following critical procedures:`,

    subheader: "9 Key Steps on How to Start an Import Business in Australia",
    subheaderList: [
      {
        title: "Conduct comprehensive market research.",
        content:
          "The first step in establishing an import business in Australia is to conduct extensive research to find possible items and markets. You should also examine the developments in Australian exports and imports and look into markets where demand exceeds supply.",
      },
      {
        title: "Create a strategic business plan.",
        content:
          "The next step in starting an import business in Australia is to develop a detailed business plan that outlines your company's goals, financial projections, and market strategy. This paper is a valuable tool for attracting possible lenders and investors",
      },
      {
        title: " Decide on Your Legal Structure",
        content: `After developing the business plan, the next stage in starting an import firm in Australia is that entrepreneurs in Australia have the freedom to structure their company in any way they see fit. You can choose a sole proprietorship, in which one individual owns everything. This is a popular choice because it includes liabilities. \n Another option is a partnership, which involves at least two people sharing obligations and earnings. They must submit an agreement with ASIC.`,
      },
    ],
  },
  {
    id: 2,
    bannerImage: "/assets/images/blog/blogImage2.png",
    date: "20th April, 2024",
    title: "How Long Does a Tax Rebate Take? Definition and When to Expect it",
    readTime: "Read Time: 10 Mins.",
    description: `There are several reasons why you may be owed a tax refund, or tax rebate, by HMRC. If you are employed and pay tax through PAYE, it is possible that your tax was calculated improperly, 
or that your self-assessment tax return contained errors, resulting in an overpayment.
If this is the case, you are owed a payback by HMRC. So, let’s dive straight into how long does 
a tax rebate tak`,
    blogType: "Finance",
    subheader: "How Long Does a Tax Rebate Take?: Tax Refund Processing ",
    subheaderList: [
      {
        title: "Times",
        content:
          "The question of how long a tax refund takes is fairly difficult to answer precisely because the main delay between applying for your tax refund and receiving the money is determined by HMRC's current processing times.Most tax rebates are awarded between 8-12 weeks after submitting your application, although this can vary.",
      },
      {
        title: "What is a Tax Refund?",
        content:
          "Whether you have been overtaxed on your income or are entitled to specific tax benefits that can be reimbursed, you can receive a tax refund (or rebate) to recover some of your money. Although the tax system is generally efficient, there will be situations when errors occur and tax refunds are required. So, it's critical to stay on top of your finances and understand your tax situation to avoid paying more than you should. If you believe you have overpaid and have not yet received an automatic rebate, there is a mechanism for requesting a return",
      },
      {
        title: " How is your tax obligation calculated?",
        content: `The most typical reason for a tax relief is having paid too much income tax.
If you earn more than the £12,570 personal tax-free threshold, you will have to pay income tax.
However, personal income includes more than just wages.
'Earned income' includes pension payments, life annuity income, and even investment interest.
So, even if you do not have a high basic wage, your other sources of income may qualify you for
higher tax rates.
With so many different sources of personal income eligible, HMRC relies on your employer to 
provide you with an appropriate tax code and on you to fill out an accurate declaration form to 
calculate how much tax you should be paying.
However, miscalculations do occur, so keep a tight eye on your tax numbers, especially if you 
changed employment during the tax year`,
      },
      {
        title: "How Long for Tax Refund to go into Bank?",
        content: `Most tax refunds are issued within 21 days of filing your federal tax return. To have your refund sent immediately to your bank account, choose the direct deposit option when requested by the tax software`,
      },
    ],
  },
  {
    id: 3,
    bannerImage: "/assets/images/blog/blogImage3.png",
    date: "20th April, 2024",
    title: "How to Maximize Tax Return: 8 Hidden Tips",
    readTime: "Read Time: 10 Mins.",
    blogType: "Business",
    description: `There are several reasons why you may be owed a tax refund, or tax rebate, by HMRC. If you are employed and pay tax through PAYE, it is possible that your tax was calculated improperly, 
or that your self-assessment tax return contained errors, resulting in an overpayment.
If this is the case, you are owed a payback by HMRC. So, let’s dive straight into how long does 
a tax rebate tak`,

    subheader: "How Long Does a Tax Rebate Take?: Tax Refund Processing ",
    subheaderList: [
      {
        title: "Times",
        content:
          "The question of how long a tax refund takes is fairly difficult to answer precisely because the main delay between applying for your tax refund and receiving the money is determined by HMRC's current processing times.Most tax rebates are awarded between 8-12 weeks after submitting your application, although this can vary.",
      },
      {
        title: "What is a Tax Refund?",
        content:
          "Whether you have been overtaxed on your income or are entitled to specific tax benefits that can be reimbursed, you can receive a tax refund (or rebate) to recover some of your money. Although the tax system is generally efficient, there will be situations when errors occur and tax refunds are required. So, it's critical to stay on top of your finances and understand your tax situation to avoid paying more than you should. If you believe you have overpaid and have not yet received an automatic rebate, there is a mechanism for requesting a return",
      },
      {
        title: " How is your tax obligation calculated?",
        content: `The most typical reason for a tax relief is having paid too much income tax.
If you earn more than the £12,570 personal tax-free threshold, you will have to pay income tax.
However, personal income includes more than just wages.
'Earned income' includes pension payments, life annuity income, and even investment interest.
So, even if you do not have a high basic wage, your other sources of income may qualify you for
higher tax rates.
With so many different sources of personal income eligible, HMRC relies on your employer to 
provide you with an appropriate tax code and on you to fill out an accurate declaration form to 
calculate how much tax you should be paying.
However, miscalculations do occur, so keep a tight eye on your tax numbers, especially if you 
changed employment during the tax year`,
      },
      {
        title: "How Long for Tax Refund to go into Bank?",
        content: `Most tax refunds are issued within 21 days of filing your federal tax return. To have your refund sent immediately to your bank account, choose the direct deposit option when requested by the tax software`,
      },
    ],
  },
];

const BlogsAllPage = () => {
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogsData));
  }, []);

  return (
    <main className="container mt-20 min-h-96 max-w-screen-2xl  space-y-8 px-4  py-10 md:px-8 lg:px-16 ">
      <h2 className="text-center font-clashBold text-4xl font-extrabold text-violet-normal">
        BLOG
      </h2>

      <div className=" space-y-16 lg:space-y-32">
        {blogsData.map((blog, index) => (
          <article
            key={index}
            className="grid grid-cols-12 gap-8 px-4 lg:px-12"
          >
            <section className="col-span-2 flex flex-col items-end ">
              <p className="font-clash text-4xl text-violet-normal ">
                {blog.date.substring(0, 2)}
              </p>
              <p className="max-sm:text-md font-clashSemiBold text-lg  font-semibold text-violet-normal ">
                {blog.date.substring(4)}
              </p>
            </section>
            <section className="col-span-10 space-y-6 ">
              <div>
                <Image
                  src={blog.bannerImage}
                  alt={blog.title}
                  quality={100}
                  width={1600}
                  height={1600}
                />
              </div>
              <h2 className=" font-clashBold text-3xl font-bold text-violet-normal max-md:text-xl ">
                {blog.title}
              </h2>
              <p className="text-lg  text-orange-normal">
                Read Time : {blog.readTime}
              </p>
              <h2 className="line-clamp-2   font-semibold text-violet-dark">
                {blog.description}
              </h2>
              <div>
                <Link
                  href={"/blog/" + blog.id}
                  className="rounded-full bg-orange-normal px-6 py-3 text-white transition-opacity duration-300 hover:opacity-90"
                >
                  Read More
                </Link>
              </div>
            </section>
          </article>
        ))}
      </div>
    </main>
  );
};

export default BlogsAllPage;
