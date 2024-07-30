"use client";

import "../../../styles/serviceProviderStyles.css";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from 'react';
import { BlogPost } from "@/types/blog/post";
import PostCard from "@/components/blog/PostCard";
import { useRouter } from "next/navigation";

const blogsData: BlogTypes[] = [
  {
    id: 1,
    bannerImage: "/assets/images/blog/blogImage1.png",
    date: "20th April, 2024",
    title: "How to Start Import Business in Australia in 9 Key Steps",
    readTime: "10 Mins.",
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
    readTime: "10 Mins.",
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
    readTime: "10 Mins.",
    blogType: "Business",
    description: `There are several reasons why you may be owed a tax refund, or tax rebate, by HMRC. If you are employed and pay tax through PAYE, it is possible that your tax was calculated improperly, 
or that your self-assessment tax return contained errors, resulting in an overpayment.
If this is the case, you are owed a payback by HMRC. So, let’s dive straight into how long does 
a tax rebate tak`,

    subheader: "How to Maximize Tax Return: 8 Hidden Tips",
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
  {
    id: 4,
    bannerImage: "/assets/images/blog/blogImage4.jpg",
    date: "20th April, 2024",
    title: "How to start a car rental business in Australia",
    readTime: "10 Mins.",
    blogType: "Business",
    description: `Car rental companies rent out automobiles, trucks, vans, and buses. When starting this type of business, you must first identify your specialization.

Which type of automobile rental business would you be comfortable with? Would you register drivers on your digital platform so that clients can book rides using your app? Would you rather have a physical site where people can come and hire the automobile for themselves?

Or do you simply want to provide business transportation for firms that may require it? Knowing your specialization will allow you to set up your firm more effectively.

\t <strong style="font-size: 24px;" className= "text-2xl font-bold font-satoshiBold">Types of Car Hire Business</strong>

There are two types of automobile rental businesses you can operate: daily hire, which involves individuals renting a car for a short amount of time. Then there's contract hire, in which business groups rent the cars for a much longer period.

Conducting a thorough feasibility analysis and creating a business strategy are also necessary for this type of venture. It will be easier to run your business if you know where you're headed and what you've already planned for.

You must conduct a study to understand the benefits and drawbacks of what you are about to embark on; nevertheless, it is sometimes safer to simply be honest with yourself and determine whether this is the right business for you.

You would also need to insure your vehicles and devise innovative marketing strategies because the competition in this industry is fierce.

Except that you have chosen to purchase a franchise, which does not protect you from competition but does allow you to focus solely on operations. However, if you are starting from scratch, it will be difficult to grow your firm into a profitable venture.

Another thing to consider are the government laws, licenses, and permits that come with starting a firm.
Of course, registering your business is crucial, as is drafting a proper agreement between clients and you. Such an agreement would have clearly defined terms and conditions that could be put into force if something happened.

A website is required for any business, regardless of how it is conducted. Businesses use websites and mobile applications to keep up with their clients' ever-changing needs. If you ignore the power of the internet, you risk losing a large number of customers. Security for this type of firm should also be taken seriously.

`,

    subheader: "Steps for Starting a Car Rental Business in Australia.",
    isSubheaderListNumbered: true,
    subheaderList: [
      {
        title: "Understand the industry.",
        content: {
          subtitle: `This industry is exposed to the ever-changing trend of consumer demands. It is not unfamiliar with the few structural challenges faced in the more sophisticated transportation industry. The government's involvement in this industry differs significantly from its involvement in other areas of the transportation industry.

While rental rates and other types of services provided by the industry have increased profitability, the industry can still be negatively impacted by certain factors, both internal and external, such as the difficulty encountered when attempting to penetrate certain regions.

Other elements that can have an impact on this industry include the rate at which money is made, as well as general pricing and costs.

Australia's car rental industry has generated up to $1 billion in revenue, with yearly growth of slightly more than 2% between 2012 and 2017. This growth rate has been fueled by an increase in international travel to Australia.

Because of the rise in this industry, more than a thousand businesses have been documented in the country, with over 3,000 personnel working in automobile rental facilities around the region. The majority of this type of commerce takes place in big states such as Victoria, Queensland, and New South Wales.

This industry thrives or suffers depending on the place in which it chooses to nest. Airports have been a major contributor to the success of the vehicle rental industry. As previously noted, the high number of international passengers entering the country generated significant revenue for this industry.

Because of the rise in this industry, more than a thousand businesses have been documented in the country, with over 3,000 personnel working in automobile rental facilities around the region. The majority of this type of commerce takes place in big states such as Victoria, Queensland, and New South Wales.

This industry thrives or suffers depending on the place in which it chooses to nest. Airports have been a major contributor to the success of the vehicle rental industry. As previously noted, the high number of international passengers entering the country generated significant revenue for this industry.

`,
        },
      },
      {
        title: "Conduct Market Research and Feasibility Studies ",
        content: {
          subtitle: `The majority of those who will use this type of service are foreign or even local travelers. International tourists, because they are entering a new country, will most likely not have relatives or friends to assist them with their commuting; thus, they will require the services of a car rental company.

When we talk about travelers, we don't simply mean individuals who are visiting the country or traveling worldwide; we also mean locals. 

Again, some businesses may want to hire a huge number of automobiles for their marketers during a marketing campaign drive. Perhaps a really important person needs to be brought throughout town.

`,
        },
      },
      {
        title: "Decide Which Niche to Concentrate On",
        content: {
          subtitle: `One strategy to establish this niche is to target businesses that require the services you offer. Another area you may concentrate on is a commercial automobile rental business where anyone with the means can book a ride from one section of the city to another.

You might also target those who plan events such as weddings, parties, vacations, and so on. 
Strictly focusing on your specialization can help you provide more effective service to your clientele. You might also provide your services to hotels and hospitals, as well as businesses that require the transportation of sensitive products throughout town.

`,
        },
      },
      {
        title: "Know Your Major Competitors in the Industry",
        content: {
          subtitle: `In any industry, some brands have remained consistent in providing services to their customers. They have overcome numerous obstacles and conditions that might have caused others to give up. These brands have established themselves as noteworthy force in their respective industries.

It would be wise to identify these brands to mimic their excellent organizational practices while also innovating around their unfavorable features. Some of the well-known brands in the automobile rental business in Australia are listed below:
`,
          list: [
            `Hertz`,
            `Avis`,
            `Europca`,
            `National`,
            `Thrifty`,
            `FireFly Car Rental`,
            `Alpha Car Hire`,
            `Economic Analysis`,
          ],
        },
      },
    ],
    conclusion: `This article has taught you all you need to know about starting a car rental business in Australia. 

Starting a car rental firm in Australia with the assistance of Taskhub might be a profitable endeavor. You may build a successful and profitable business by completing extensive market research, following regulatory regulations, efficiently managing your fleet, and using Taskhub's resources. 

To remain competitive, focus on providing outstanding customer service and consistently improving your processes. With proper planning and execution, your vehicle rental business may succeed in the competitive Australian market.

Finally, we'll leave you with Ronnie's advice for entrepreneurs wishing to enter the industry:

<em className="text-slate-600" >“Bend all the rules. Don’t take no for an answer. Every day, get up and go as hard as you can. There’ll be so many failures and everyone is closer to success. Every day, start off trying to achieve more than the day before”</em>



`,
  },
  {
    id: 5,
    bannerImage: "/assets/images/blog/blogImage5.jpg",
    date: "20th April, 2024",
    title: "How to start a cleaning business in Australia",
    readTime: "10 Mins.",
    blogType: "Business",
    description: `Do you want to start a cleaning business in Australia? Here's a thorough guide to doing it, covering everything from legal requirements to marketing ideas.

Starting a cleaning business in Australia may be a lucrative and rewarding experience. With the increasing daily demand for janitorial and specialty cleaning services, there is plenty of space for growth and success. 

Starting a cleaning service, like starting any other business, takes some basic strategy, inquisitive research, and aggressive execution.

This article presents a detailed guide to starting a cleaning business in Australia.

We'll go over everything from legal requirements and pricing to marketing techniques and customer service, providing you with all the knowledge and skills you need to start a successful cleaning business.

\t <strong style="font-size: 24px;" className= "text-2xl font-bold font-satoshiBold">Benefits of Running a Cleaning Business</strong>

There are numerous perks to starting a cleaning business. Some include...

    ●	 Cleaning services are a growing industry with high demand for labor services.
    ●	 No qualifications are required. 
    ●	 Acquiring the necessary skills is simple.
    ●	 Offering a wide range of general and specialized cleaning services allows for a high return on investment and low start-up costs.
    ●	 Being your boss allows for flexibility in scheduling.
    `,

    subheader: "How to start a cleaning business in Australia",
    isSubheaderListNumbered: true,
    subheaderList: [
      {
        title: "Prepare a business plan.",
        content: {
          subtitle: `Before you start your cleaning firm, you need to have a plan to guide it in the appropriate route. 
Here are some of the essential factors to consider:

`,
          list: [
            `Financial Information: Details regarding your financial situation, how you receive money and capital`,
            `Goals and Mission Statements: These might be your business values, which will keep you motivated and on track.`,
            `Market research: Understand your competition, who your target audience will be, and how you can offer something unique.`,
          ],
        },
      },
      {
        title: "Define your cleaning services.",
        content: {
          subtitle: `First-time business owners may underestimate the importance of selecting the correct business structure for their new commercial cleaning service.

The most popular business structures in Australia are:`,
          list: [
            `Sole traders: Sole traders are legally accountable for all aspects of their businesses, including debts and losses, as well as day-to-day business choices.`,
            `Partnership: A partnership is a system in which two or more people share their profits and losses.`,
            `Company: A company is a legal entity distinct from the business owner as an individual.`,
          ],
        },
      },
      {
        title: "Register your business",
        content: {
          subtitle: `As the owner of your cleaning service, do you intend to hire employees or operate under a business name (either now or in the future)? If so, you may need to register your business through the appropriate procedures.

The Australian Government's Business Register website is where you can register your business as a company, as well as register for GST and any other tax-related duties that your commercial cleaning firm may have.
`,
        },
      },
      {
        title: "Cleaning License",
        content: {
          subtitle: `In general, cleaners and cleaning organizations in Australia do not need specific licensing to provide commercial cleaning services. If you wish to learn more about licenses and commercial cleaning, contact the Australian Business Licence and Information Service.
`,
        },
      },
      {
        title: "Training for commercial cleaners",
        content: {
          subtitle: `There are no formal training or certification requirements for commercial cleaners in Australia. However, as the dedicated owner and operator of a commercial cleaning company, it goes without saying that cultivating a reputation for providing excellent service consistently can help your business. To advance your commercial cleaning business, try earning a Certificate III in Cleaning Operations.
`,
        },
      },
      {
        title: "Find high-quality cleaning products and equipment.",
        content: {
          subtitle: `While starting a commercial cleaning service does not need a huge initial expenditure, there are some items that you will want to have in your cleaning arsenal from the beginning. You are most likely to require the following:
`,
          list: [
            `Rubber gloves`,
            `Face masks`,
            `Garbage bags`,
            `Paper towels`,
            `Sponges`,
            `Microfiber cloths`,
            `Scrubbing brushes`,
            `Duster`,
            `Vacuum cleaner`,
            `Broom and dustpan`,
            `Mop and bucket`,
            `Bleach or disinfectant`,
            `Toilet cleaner`,
            `Glass cleaner.`,
          ],
        },
      },
      {
        title: "Marketing your cleaning business",
        content: {
          subtitle: `You may be an expert in commercial cleaning, but marketing is critical for the growth and sustainability of any firm. You are unlikely to be the only commercial cleaner in your area, so make an effort to stand out and provide your clients with something unique.
`,
        },
      },
      {
        title: "Get commercial cleaning business insurance.",
        content: {
          subtitle: `One final thing you need to do before you pick up that mop and bucket is to have your business insurance in order. For a commercial cleaning company, this may include options such as basic public liability, portable equipment insurance, and personal accident and illness coverage. Having these policies in place will give you peace of mind if the unexpected occurs.
`,
        },
      },
    ],
    conclusion: `Starting a cleaning business requires hard work, dedication, and perseverance. When things don't go as planned, it's critical not to give up on your dreams and to keep moving forward. 

To make money in Australia as a cleaner, you can leverage Taskhub. Taskhub has a variety of cleaning services for clients. All you need to do is sign up to become a cleaning service provider and complete your profile.

As you develop and learn, your cleaning business will become more satisfying and profitable. 
We hope that the steps in this comprehensive guide will help you get your new cleaning business off to a good start and set you up for success.
`,
  },
  {
    id: 6,
    bannerImage: "/assets/images/blog/blogImage6.jpg",
    date: "20th April, 2024",
    title: "How to Start a Business in Australia With no Money",
    readTime: "10 Mins.",
    blogType: "Business",
    description: `Despite the struggles of the last year, the Australian government has provided small company owners with a variety of grants and incentives. 

As a result, there has been an increase in entrepreneurship, with many Australians seeing small business ownership as a way to achieve financial independence and personal happiness. 

So, if you've been thinking about starting your own business with no money, now is the moment to make it happen.
`,

    subheader: "How To Start A Business In Australia With No Money",
    isSubheaderListNumbered: true,
    subheaderList: [
      {
        title: "Write a business plan.",
        content: {
          subtitle: `A business plan is the road map to success. Outline your business's objectives, target market, revenue streams, and marketing methods. It is your guiding paper to help you stay on track and achieve your goals!!
Include financial estimates, spending budgets, sales forecasts, and a break-even analysis in your business plan. You may not have a lot of money right now to start your business, but let's make sure it's a financially feasible idea that will last and make you money! 
A financial projections plan can help you determine the financial viability of your company. Consider other company expenses such as stationery, insurance, registration, and equipment.`,
        },
      },
      {
        title: "Network Building.",
        content: {
          subtitle: `Engage with local entrepreneur communities by attending meetups, workshops, and networking events. Learn from other people's experiences and seek guidance. Most Australian municipalities may link you to free local business networking organizations, or you can check it up online. `,
        },
      },
      {
        title: "Online Platforms",
        content: {
          subtitle: `With like-minded people and gather insights. Determine which businesses you support and which you oppose. We don't want you to replicate someone else's business, but noticing similarities in what you like or dislike can help shape your business plan.`,
        },
      },
      {
        title: "Select a Business Name.",
        content: {
          subtitle: `Your business name is critical. Ensure that it represents your brand identity, resonates with your target audience, and is legally available. Check with the Australian Business Register to confirm its availability, and obtain an ABN.`,
        },
      },
      {
        title: "Trademark Consideration",
        content: {
          subtitle: `Consider trademarking your business name to prevent it from being used by others in your sector. Recognize that this is an expense, so if you're wondering how to establish a business in Australia with no money, you might want to wait till you have some funds to invest in this!
`,
        },
      },
      {
        title: "Create a brand.",
        content: {
          subtitle: `Create a brand identity, which includes a logo, color scheme, and brand voice. We like to establish a branding document to follow so that our colors, typefaces, and voice all match. Consistency across all platforms improves brand identification.
`,
        },
      },
      {
        title: "Brand messaging",
        content: {
          subtitle: `Create captivating brand messaging that speaks to your audience's wants and emotions. What do you hope to accomplish, what are your objectives and ambitions? 
Clearly define your value proposition so that when it comes time to write material for social media, advertising, or your website, you know exactly what you're delivering.

`,
        },
      },
      {
        title: "Engage with social media",
        content: {
          subtitle: `Determine your target audience's preferred social media channels, including age, gender, location, and income. Create interesting content that delivers value and connects with your target audience.
`,
        },
      },
      {
        title: "Community Engagement",
        content: {
          subtitle: `Develop a community around your brand. Engage with your audience, answer questions, and spark discussions. To start, you may use "coming soon" sneak peeks to generate buzz and interest on your social media channels. 
Social networking is an excellent instrument for learning how to start a business in Australia with no money - it requires an investment of your time and thoughts, but no capital!
`,
        },
      },
      {
        title: "Launch a website.",
        content: {
          subtitle: `Your website serves as your online storefront, providing most of your clients with their initial impression of who you are and what you have to offer. Make sure it's easy to use, mobile-responsive, and effectively displays your products or services. 

Also, refer back to your branding document to ensure that your design for social media and any product packaging conveys a clear message to your clients.

Pay attention to even the smallest details - spelling errors, broken links, or a cumbersome user experience all give the message that you're either unskilled or a potential scammer, and all of these negative first impressions can harm your conversion rates!`,
        },
      },
      {
        title: "SEO Optimisation",
        content: {
          subtitle: `Ahhh, now we're speaking our language! Implement SEO tactics to increase your website's visibility in search engines. Use keywords that are relevant to your industry and audience. If you're establishing a business on a shoestring budget, consider investing in a "How To Do SEO Course" - it will help you to self-manage your SEO in the near term and start receiving organic traffic!
`,
        },
      },
      {
        title: "Validate Ideas With Preorders",
        content: {
          subtitle: `Offer preorders or early bird promotions to evaluate interest and validate your business concept. It's a great method to gauge demand before a full-scale debut and generate some buzz and enthusiasm.
`,
        },
      },
      {
        title: "Feedback Collection",
        content: {
          subtitle: `Encourage input from early adopters. Use their feedback to improve your product or service offerings. Don't be discouraged or upset by constructive criticism. Business owners must have a thick skin, and any ideas or advice will come from a position of love. View them as an opportunity to develop, not as a personal attack 
`,
        },
      },
      {
        title: "Educate Yourself Through Free Training",
        content: {
          subtitle: `Use free internet resources, webinars, and courses. If you're wondering how to establish a small business in Australia without money, education is the answer. 
A small business owner must wear multiple hats, including social media management, bookkeeping, product testing and packaging, and administration. Invest some time in learning about each of these areas, mastering one at a time, to improve your business's chances of success.

`,
        },
      },
      {
        title: "Reinvest to grow.",
        content: {
          subtitle: `Consider reinvesting profits as they come in. Investigate expansion opportunities, new goods, and marketing strategies. Even updating equipment can help you finish chores faster, giving you more time to earn money elsewhere!
`,
        },
      },
      {
        title: "Team Building",
        content: {
          subtitle: `If possible, consider outsourcing to assist scale operations. Creating a competent staff increases your company's basis. We propose outsourcing anything that can be done by someone else so that you can focus on the areas that will generate revenue!
`,
        },
      },
    ],
    conclusion: `Starting a business in Australia with no money needs commitment, enthusiasm, and a strategic mindset. 

If you're wondering how to start a small business in Australia with no money, we highly recommend starting with Taskhub, as you may establish a firm foundation for your entrepreneurial path and position yourself for success.

With Taskhub, you can select your business type whether remote or in-person. You can also add your geographical information and budget, and your first task is created!

`,
  },
  {
    id: 7,
    bannerImage: "/assets/images/blog/blogImage7.png",
    date: "20th April, 2024",
    title: "ABN Registration Australia: Everything You Should",
    readTime: "10 Mins.",
    blogType: "Finance",
    description: `Anyone who has started a business or opted to go it alone as a sole trader understands that there can be an infinite mountain of paperwork and forms to fill out, and it can be tempting to skip or postpone what you can.

Registering for an Australian Business Number (ABN) is quick and uncomplicated, and there are several strong reasons to do it right away.

Here's what you should know about ABN registration Australia, obtaining an ABN and why it's important for business owners and single traders.
`,

    subheader: "",
    isSubheaderListNumbered: false,
    subheaderList: [
      {
        title: "What is an Australian Business Number (ABN)?",
        content: {
          subtitle: `An Australian Business Number (ABN) is a unique 11-digit number that identifies Australian enterprises and serves a variety of tax and business functions. The Australian Business Register (ABR) issues ABNs, which are controlled by the Australian Taxation Office (ATO). 

The Australian Business Number (ABN) system was launched in July 2000 as part of the Australian Government's tax reform plan, which also included the implementation of the goods and services tax.
The ABN was a significant step toward streamlining Australia's taxation and company regulation processes; the country had over 2.5 million active trading entities as of June 2023. 

Before the ABN system, Australian businesses had to utilize many identification numbers for various government offices and agencies, resulting in a cumbersome and inefficient system. 

The ABN system was created to simplify these exchanges, making it easier for enterprises to engage with the government.
`,
        },
      },
      {
        title: "When should I get an ABN?",
        content: {
          subtitle: `If your firm has annual sales of $75,000 or more, you are required by law to obtain an Australian Business Number.

Businesses with an annual income of less than $75,000 are not required to get an ABN; nonetheless, there are compelling reasons why they should.

If you don't have an ABN, other businesses that do business with you are required to withhold tax from any payments they make to you - a significant incentive at a rate of 47%.

Having an ABN also allows your firm to register to claim back GST credits, claim fuel tax credits if eligible, use the pay-as-you-go withholding system, and give fringe benefits to employees, among other benefits.

Having an Australian Business Number simplifies interactions with government agencies and other enterprises. 
`,
        },
      },
      {
        title: "How can a Business Apply for an ABN?",
        content: {
          subtitle: `Obtaining an ABN for your Australian business is simple. The ATO and ABR websites provide comprehensive information and resources to help you through the ABN registration process. 

          If you are unsure about what is required, you can seek advice from a licensed tax or business activity statement (BAS) agent. Professional assistance may be especially beneficial if you have a complex business structure.

The application process is outlined below.
`,
          list: [
            `Check your eligibility: First, determine your eligibility for an ABN. The Australian Business Register website provides useful information for determining your eligibility, so check it beforehand to avoid superfluous applications and associated legal consequences. You may face legal action if you seek an ABN, register for GST, and collect GST credits when you are ineligible. To register for a ".au" domain name, carry out business activities (even part-time), register for GST (if your expected annual turnover exceeds $75,000, before GST), or receive payments from other businesses requiring an ABN, you must have an ABN.`,
            `Gather necessary information: To apply, you'll need personal information like your full name, date of birth, residential address, and contact information, as well as business information like your legal name, business structure (sole trader, partnership, or company), start date, business activities, and estimated annual turnover. Certain business structures, such as partners in a partnership or directors in a company, will also require you to submit information about your colleagues, so double-check your business structure's specific requirements before commencing the application. You will normally be required to provide proof of identity, such as an Australian passport, driver's license, birth certificate, or Medicare card.`,
            `Choose your application method: You can obtain your ABN online in one of two ways. If you already have a myGovID account linked to your Australian Taxation Office (ATO) profile, the quickest and easiest way to apply is through myGovID. You can also apply directly through the Australian Business Register (ABR) website; however, you must first register an ABR account. `,
            `Complete the application: Follow the steps on your preferred platform, accurately entering the collected data. Double-check all details before submitting the application to avoid delays or denials due to errors. Once you're pleased, submit your application.`,
            `Verify ABR details: After your ABN is assigned, your information will be added to the ABR. You can request privacy settings for specific business information if necessary, and you should keep the ABR current on any changes to your company's information, structure, or contact information.`,
            `Determine the GST obligations: Obtaining an ABN does not require you to register for GST. Determine your duties depending on your anticipated turnover and activities.`,
          ],
        },
      },
    ],
    conclusion: `The ABN serves multiple uses. Businesses identify themselves in contacts with both the government and other businesses using their ABN, which improves business efficiency by providing a unique identification for confirming business facts. 

Businesses also use their ABN to register for GST and file income tax returns, which simplifies the tax filing procedure. 

Having a single company identification number has streamlined many commercial transactions across Australia.


`,
  },
];

const AllBlogsPage = () => {
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogsData));
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("")
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  console.log("posts", posts)

  const handleSearch = (searchTerm: string) => {
    router.push(`/blog/results?query=${encodeURIComponent(searchTerm)}`)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const categories = ["Afrik immigrant", "Business & Finance", "Housing & Accommodation", "Medical & Education", "Career & Transports"]

  return (
    <main className="container mt-20 min-h-96 max-w-screen-xl space-y-14 px-4 py-10">
      <div className="relative w-full mb-14">
        <div className="flex items-center justify-center">
          <Image
            src="/assets/images/blog/blog_banner.png"
            alt="Blog banner"
            width={1200}
            quality={100}
            height={202}
            className="rounded-3xl"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1/2 max-w-md text-[#C1BADB]">
          <form className="relative w-full flex" onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchTerm);
          }}>
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
              <CiSearch className="size-5" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 rounded-l-2xl drop-shadow-lg bg-[#EEEEEF] appearance-none outline-none border-none placeholder:text-[#C1BADB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 rounded-r-2xl"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center flex-wrap max-lg:gap-4 lg:justify-center lg:space-x-4 mb-14">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog/category/${category}`}
            className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-primary font-semibold cursor-pointer hover:scale-105 transition-all py-2 px-6 bg-[#F1F1F2]"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Link>
        ))}
      </div>

      <hr className="border-[1.5px] border-[#CACACC]" />

      {/* Featured Post */}
      <div className="lg:flex lg:space-x-4 max-sm:space-y-4 w-full mb-14">
        <div className="flex-shrink-0">
          <Image
            src="/assets/images/blog/blogImage1.png"
            alt="blog.title"
            quality={100}
            width={590}
            height={790}
            className="h-full object-cover rounded-2xl"
          />
        </div>
        <div className="lg:px-5 lg:py-2 space-y-4">
          <h3 className="text-tc-orange text-base lg:text-xl font-satoshiBold font-bold">Career & Transportations</h3>
          <h1 className="text-primary text-xl lg:text-3xl font-clashSemiBold font-semibold">How to Start Import Business in Australia in 9 Key Steps</h1>
          <h3 className="text-tc-orange font-satoshi text-sm lg:text-lg">Read Time: 10 Mins</h3>
          <p className="text-[#140B31] font-satoshi text-sm lg:text-lg line-clamp-2">Are you interested in learning how to start import business in Australia? If so, we will provide you with thorough information to answer your questionnnsss</p>
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/images/blog/blogImage1.png"
              alt="blog.title"
              width={66}
              height={66}
              className="rounded-full object-cover size-14"
            />
            <div className="">
              <h5 className="text-sm lg:text-base text-[#381F8C] font-satoshiBold font-bold">Posted by admin</h5>
              <h5 className="text-sm lg:text-base text-[#262528]">20 of April,2024</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </div>
    </main>
  );
};

export default AllBlogsPage;



