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
        content: {
          subtitle: `  The first step in establishing an import business in Australia is to conduct extensive research to find possible items and markets. You should also examine the developments in Australian exports and imports and look into markets where demand exceeds supply.`,
        },
      },
      {
        title: "Create a strategic business plan.",
        content: {
          subtitle:
            "The next step in starting an import business in Australia is to develop a detailed business plan that outlines your company's goals, financial projections, and market strategy. This paper is a valuable tool for attracting possible lenders and investors",
        },
      },
      {
        title: " Decide on Your Legal Structure",
        content: {
          subtitle: `After developing the business plan, the next stage in starting an import firm in Australia is that entrepreneurs in Australia have the freedom to structure their company in any way they see fit. You can choose a sole proprietorship, in which one individual owns everything. This is a popular choice because it includes liabilities. \n Another option is a partnership, which involves at least two people sharing obligations and earnings. They must submit an agreement with ASIC.`,
        },
      },
      {
        title: "Get Legal Permits",
        content: {
          subtitle: `When beginning a business in Australia, you must ensure compliance with rules.
Depending on your product and the industry you wish to join, you may require a variety of licenses or permits.
These permits might range from health and safety permits to environmental permits, depending on the industry in which you work.
Furthermore, if your firm involves the import or export of commodities, you should be familiar with the import-export restrictions enforced by the Australian Border Force and the Department of Agriculture.
`,
        },
      },
      {
        title: "Establish a supply chain.",
        content: {
          subtitle: `The second step in starting an import firm in Australia is to develop a supplier chain. To maintain seamless operations, creating good relationships with vendors and logistics firms is essential for building a solid supply chain.
When selecting supply chain partners, affordability, reliability, and efficiency are all crucial variables to consider.
You may streamline your operations and ensure that goods or services are delivered to your clients on schedule by developing partnerships with dependable vendors and logistics partners.
`,
        },
      },
      {
        title: "Ensure Your Company's Financial Security",
        content: {
          subtitle: `One of the most important components of establishing an import business in Australia is obtaining appropriate financing.
Begin by carefully examining your financial demands and establishing the amount of funding required to efficiently launch your activities.
Additionally, it is critical to investigate the many financing choices available to you in order to meet these requirements. These possibilities may include government grants, investment opportunities from potential investors, or loans designed expressly for international trade businesses.
`,
        },
      },
      {
        title: "Create an effective marketing and sales strategy.",
        content: {
          subtitle: `Creating an efficient marketing and sales strategy is also a critical component of establishing an import business in Australia. Use digital marketing tactics to increase your brand's global reach.
To interact with potential customers across borders, consider using a variety of digital platforms, such as social media, search engine optimization (SEO), content marketing, email marketing, and online advertising.
Furthermore, you might try to use social media platforms to establish a strong online community, engage with your audience, and promote your products or services to a global audience.
`,
        },
      },
      {
        title: "Ensure Legal and Tax Compliance",
        content: {
          subtitle: `These possibilities may include government grants, investment opportunities from potential investors, or loans designed expressly for international trade businesses.`,
        },
      },
      {
        title: "Create an effective marketing and sales strategy.",
        content: {
          subtitle: `Creating an efficient marketing and sales strategy is also a critical component of establishing an import business in Australia. Use digital marketing tactics to increase your brand's global reach.
To interact with potential customers across borders, consider using a variety of digital platforms, such as social media, search engine optimization (SEO), content marketing, email marketing, and online advertising.
Furthermore, you might try to use social media platforms to establish a strong online community, engage with your audience, and promote your products or services to a global audience.
`,
        },
      },
    ],
    isSubheaderListNumbered: true,
    conclusion: `That was a complete description of the nine steps for starting an import business in Australia. We expect it will give you some useful insights into the import business potential.
It is crucial to note that creating a marketing strategy is critical for the success of your import business in Australia.
Implementing a cost-efficient SEO strategy on your company's website is an excellent way to increase your brand's online visibility and potentially increase sales.
`,
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
        content: {
          subtitle:
            "The question of how long a tax refund takes is fairly difficult to answer precisely because the main delay between applying for your tax refund and receiving the money is determined by HMRC's current processing times.Most tax rebates are awarded between 8-12 weeks after submitting your application, although this can vary.",
        },
      },

      {
        title: "What is a Tax Refund?",
        content: {
          subtitle:
            "Whether you have been overtaxed on your income or are entitled to specific tax benefits that can be reimbursed, you can receive a tax refund (or rebate) to recover some of your money. Although the tax system is generally efficient, there will be situations when errors occur and tax refunds are required. So, it's critical to stay on top of your finances and understand your tax situation to avoid paying more than you should. If you believe you have overpaid and have not yet received an automatic rebate, there is a mechanism for requesting a return",
        },
      },
      {
        title: " How is your tax obligation calculated?",
        content: {
          subtitle: `The most typical reason for a tax relief is having paid too much income tax.
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
      },
      {
        title: "How Long for Tax Refund to go into Bank?",
        content: {
          subtitle: `Most tax refunds are issued within 21 days of filing your federal tax return. To have your refund sent immediately to your bank account, choose the direct deposit option when requested by the tax software`,
        },
      },
      {
        title: "Can you Expedite a Tax Rebate?",
        content: {
          subtitle: `Debit card refunds take a few days to process. In actuality, the time range is often between 7 and 10 working days. In the best-case situation, it could take up to three days, depending on your bank.`,
          list: [
            `Ensure that you have all of the necessary information and papers so that HMRC does not have to contact you again to obtain the information they require.`,
            `Avoid submitting your tax refund application during HMRC's busiest seasons, such as the self-assessment deadline in late January and the tax credit renewals due in late July.`,
            `Smaller amounts, such as those under £1,000, are usually handled promptly, while bigger amounts may require more checks, resulting in a longer delay.`,
          ],
        },
      },
      {
        title: "How Can I Track my Tax Refund?",
        content: {
          subtitle: `To learn more about how long it takes to receive a tax refund, you can contact HMRC. However, it is usually not worth contacting them before 5 weeks if you submitted your application online, or 6 weeks if you submitted a paper reimbursement request.`,
        },
      },
      {
        title: "How Long Does it Take to Receive a Tax Rebate?",
        content: {
          subtitle: `How Long Does it Take to Receive a Tax Rebate?`,
          list: [
            `If you get paid straight into your bank account or on your credit or debit card, you will normally receive it within 5 working days`,
            `If you are anticipating a cheque or a 'payable order', you should receive it within 5 weeks.`,
            `If you received a P800 notification stating that you are due a tax refund and that you may claim it online, the money will be deposited immediately into your bank account within 5 working days of the claim being made. If you do not file a claim online within 45 days, you will get a check within 60 days after the date on the P800.`,
            `If you received a P800 notification stating that you will receive a cheque, it will arrive within 14 days after the date on the notice.`,
            `If you believe you are owed a tax rebate, especially if your claim is complex, we recommend hiring an accountant or professional tax advisor to help you compile your rebate form. `,
          ],
        },
      },
    ],
    isSubheaderListNumbered: false,
    conclusion: `The tax system may be confusing, but with the right expertise, you may obtain refunds worth hundreds of pounds.
Unbiased can immediately link you with a certified accountant who can assist you with your tax duties and determine whether you're eligible for a refund.
`,
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

    subheader: "HHow to Maximize Tax Return: 8 Hidden Tips",
    isSubheaderListNumbered: true,
    subheaderList: [
      {
        title: "Determine your tax bracket.",
        content: {
          subtitle: `The first step in maximising your tax return is to correctly calculate your tax band. You won't be able to fully appreciate your tax obligations unless you know your tax bracket.
The tax brackets vary from year to year. Take a few minutes to evaluate the Australian Taxation Office's individual and married income tax rates to determine where you stand. Once you know your tax bracket, you'll be in a better position to review your deductions.
`,
        },
      },
      {
        title: "Create a Receipt System",
        content: {
          subtitle: `You are not alone if you save your receipts in a concealed drawer or a large envelope. That being said, there is a better solution. Receipts are easy to lose, so you must build a system. Also, occasionally the ink fades with time, leaving you with a blank sheet of paper!
Tracking and preserving receipts is one of the most effective strategies to save money during tax season. You would be shocked at how many things you may claim that you were previously unaware of.
Moving ahead, you should strive to save any pertinent receipts and consult with your accountant to see exactly what you can claim. Fortunately, there are now programs that allow you to digitise receipts if you want a more modern approach to keeping them secure.
`,
        },
      },
      {
        title: "Make a charitable payment.",
        content: {
          subtitle: `Doing good is always something to be proud of, but did you know it can also pay you at tax time? Making a charitable contribution is a terrific way to reduce your taxable income while also doing good for others.
To help you get ahead in the next fiscal year, consider making a monthly payment to your preferred charity. It feels fantastic to give back!
`,
        },
      },
      {
        title: "Review Your Deductions",
        content: {
          subtitle: `Although this appears to be some of our most apparent tax return advice, it's shocking how many Australian workers don't claim their deductions. You can claim a variety of things during tax season, including:`,
          list: [
            `Business travel`,
            `Work training events`,
            `ATO interest`,
            `Educational courses`,
            `Work-related supplies`,
          ],
        },
      },
      {
        title: "Home and Car Expenses.",
        content: {
          subtitle: `If you commute to work or work from home, you may be able to claim additional expenses. Why is this happening? When you use your automobile for work or set up a room in your home for an office, you are incurring the costs of running or working for a business.
First, develop a technique for estimating your car allowance. The most frequent technique is to use a mileage tracker app to compute prices and miles over the course of the year. 
Furthermore, you may be able to claim a variety of home office expenses, such as equipment and utilities. Again, documenting and maintaining receipts is critical.
`,
        },
      },
      {
        title: "Travel expenses.",
        content: {
          subtitle: `While you cannot write off your family vacation to the beach, you may be able to deduct some of your travel expenses. Specifically, we're discussing job travel. 
If your company forces you to travel for business, you can deduct a variety of costs, particularly if you stay overnight. You can even deduct meals, as long as your company does not reimburse you. 
`,
        },
      },
      {
        title: "Get Paid to Read News and Magazines",
        content: {
          subtitle: `Do you read any industry magazines or journals online? You might be eligible for a deduction. If you subscribe to an online or offline periodical that helps you stay current in your field of work and can demonstrate a direct link between the subscription and your assessable income, you are likely eligible for a deduction.
For example, a chef or Maître d' who subscribes to a food magazine and a writer or journalist who subscribes to internet news sites would both be eligible. The good news is that if you paid less than $300 for your subscription, you can deduct it immediately.
`,
        },
      },
      {
        title: "Put Your Money in a Super Fund",
        content: {
          subtitle: `Super contributions may be one of the most effective strategies to maximize your tax return. This is especially true for people making less than $52,000 per year. The government will contribute 50 cents for every $1 you put into your super.
Furthermore, if you are married and one partner earns less than $40,000, the higher-earning partner may contribute up to $3000 to the lower-earning partner's super fund. This results in a tax break of 18%. This is the type of savings that really pays off in the long run!

`,
        },
      },
    ],
    conclusion: `All of the strategies discussed above can help you increase the amount of your return. However, they also allow you to do something else you may prefer: earn higher payouts throughout the year.
People enjoy receiving tax returns because it feels like free money that they didn't expect. However, a tax refund indicates money paid to the IRS that you did not have to pay. 
In other words, because you had more tax withheld from your paychecks than you required during the year, you lost the opportunity to use that money sooner. Instead, you had to wait for the IRS to pay you back.
There's nothing wrong with taking these tax-saving steps and then waiting until the next year to reap the benefits with a larger refund when you submit your return. 
However, you can increase your tax withholding to take advantage of those tax savings right away, resulting in larger paychecks.
`,
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
            <section className="col-span-10 space-y-3 lg:space-y-6">
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
