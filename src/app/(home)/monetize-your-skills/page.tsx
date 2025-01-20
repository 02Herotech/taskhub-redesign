import Link from "next/link";
import Wave from "../how-oloja-works/Wave";
import Image from "next/image";

type Step = {
  imageSrc: string;
  title: string;
  text: string;
  width: number;
  height: number;
};

const data: Step[] = [
  {
    imageSrc: "/assets/images/monetize-skills/money-bag.png",
    title: "Low Connection Fees",
    text: "Keep more of what you earn.",
    width: 456,
    height: 456,
  },
  {
    imageSrc: "/assets/images/monetize-skills/people-network.png",
    title: "Explore jobs for free.",
    text: "Find work tailored to your skills for free.",
    width: 456,
    height: 456,
  },
  {
    imageSrc: "/assets/images/monetize-skills/woman-yoga.png",
    title: "Work on Your Terms",
    text: "Choose jobs that fit your schedule and enjoy the freedom of flexibility.",
    width: 652,
    height: 456,
  },
  {
    imageSrc: "/assets/images/monetize-skills/bar-chart.png",
    title: "Grow Your Business, Your Way",
    text: "Build a steady client base.",
    width: 102,
    height: 73,
  },
  {
    imageSrc: "/assets/images/monetize-skills/target.png",
    title: "Focus on Your Craft, Not Marketing",
    text: "No need to spend on ads or websites.",
    width: 476,
    height: 456,
  },
  {
    imageSrc: "/assets/images/monetize-skills/tick-shield.png",
    title: "Secure Payments",
    text: "Your earnings are protected. Receive payments in your nominated bank account.",
    width: 420,
    height: 456,
  },
];

function Page() {
  return (
    <div className="bg-[#EBE9F4]">
      <div className="absolute left-0 top-0 z-10 flex w-full justify-between overflow-hidden">
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
              backgroundImage: "radial-gradient(circle, #fac588, transparent)",
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
              backgroundImage: "radial-gradient(circle, #856cb7, transparent)",
              filter: "blur(70px)",
              position: "absolute",
              right: "-200px",
            }}
          ></div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl pt-32">
        <section
          className="relative mx-auto mb-10 w-[93%] overflow-clip rounded-3xl bg-cover bg-no-repeat text-[#EBE9F4] sm:w-[85%]"
          style={{
            backgroundImage: `url("assets/images/how-oloja-works/galaxy-bg.jpg")`,
          }}
        >
          <Wave position="top" />
          <Wave position="bottom" />
          <div className="relative left-0 top-0 z-20 h-full w-full bg-[#381F8C] bg-opacity-50 pb-10 pt-1">
            <h1 className="mb-7 mt-20 text-center font-clashSemiBold text-3xl sm:text-5xl">
              <span className="mb-5 hidden font-satoshiBold text-xl font-black italic sm:inline-block">
                Learn How To:
              </span>{" "}
              <span className="mb-3 inline-block rounded-full bg-[#E1DDEE] px-3 py-2 font-satoshiBold text-sm font-bold text-primary sm:hidden">
                Learn How To
              </span>{" "}
              <br />
              <span className="text-[#E58C06]">Earn</span> while doing <br />{" "}
              what <span className="text-[#E58C06]">you love</span>
            </h1>

            <p className="mx-auto mb-10 max-w-[1000px] px-8 text-center font-satoshiMedium text-base sm:text-2xl">
              Your skills are valuable, and it’s time to turn them into income.
              At Olójà Hub, we connect{" "}
              <span className="font-satoshiBold font-bold">
                talented individuals
              </span>{" "}
              like you with people who need your expertise. Whether you’re a
              handyman, a tax expert, a removalist, or a hairdresser, there’s
              someone out there looking for what you do best and we’re here to
              help you find them.
            </p>

            <Link
              href="/auth"
              className="mx-auto mb-14 block w-max rounded-full bg-[#381F8C] px-5 py-3 font-bold text-[#EBE9F4] sm:mb-20"
            >
              Join Olójà Hub
            </Link>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 -translate-y-1 sm:translate-y-0 md:translate-y-5 lg:translate-y-9">
          <Image
            width={2880}
            height={361}
            src="/assets/images/monetize-skills/angular.png"
            alt="#"
            className="w-full"
          />
          <svg
            width="1440"
            height="133"
            viewBox="0 0 1440 133"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-5 w-full sm:top-0 md:top-5 lg:top-10"
          >
            <path
              d="M-84.0995 129.79C275.752 -63.9904 1389.66 -21.8352 1523.9 132.21L-84.0995 129.79Z"
              fill="#EBE9F4"
            />
          </svg>
        </div>
      </div>
      <div className="bg-[#EBE9F4]">
        <div className="mx-auto max-w-7xl py-10">
          <section className="mx-auto w-[93%] sm:w-[85%]">
            <h2 className="mb-10 text-center font-clashSemiBold text-3xl text-primary sm:text-5xl">
              Why You Will Love It Here
            </h2>
            <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-3">
              {data.map((perk) => (
                <li className="pr-10" key={Math.random() * 1234}>
                  <div className="mb-4 w-max rounded-2xl bg-[#E1DDEE] p-2">
                    <Image
                      src={perk.imageSrc}
                      width={perk.width}
                      height={perk.height}
                      alt="Icon"
                      className="w-10"
                    />
                  </div>
                  <h5 className="mb-4 font-satoshiBold text-xl font-bold text-primary sm:text-2xl">
                    {perk.title}
                  </h5>
                  <p className="font-satoshiMedium text-xl text-[#190E3F] sm:text-[22px]">
                    {perk.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className="bg-[#E3DCFB4D]">
        <div className="mx-auto max-w-7xl py-28">
          <section className="mx-auto min-h-screen w-[93%] sm:w-[85%]">
            <ul className="space-y-20 sm:space-y-24">
              <li className="flex flex-col-reverse items-center justify-between gap-7 md:flex-row md:gap-4">
                <div className="md:w-1/2 md:max-w-[400px]">
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-primary sm:text-3xl">
                    Explore Job listings at no cost
                  </h3>
                  <p className="mb-6 font-satoshiMedium text-base text-primary sm:text-xl">
                    Create your profile and start exploring jobs right away.
                    Remember to stay ahead by enabling notifications on the
                    Olójà Hub app to get real-time updates on tasks that align
                    with your skills and interests.
                  </p>
                  <Link
                    href="/auth"
                    className="rounded-full bg-[#E58C06] px-5 py-3 font-satoshiBold font-bold text-[#EBE9F4]"
                  >
                    Get started on Olójà Hub
                  </Link>
                </div>
                <div className="max-x-[450px] relative aspect-video w-full rounded-2xl bg-[#E58C06] md:w-1/2 ">
                  <div className="absolute -bottom-2 -left-3 z-20 h-1/4 w-[104%] rounded-b-2xl bg-image-gradient sm:-bottom-5 sm:-left-5" />
                  <Image
                    src="/assets/images/monetize-skills/profile-interface.png"
                    alt="Profile interface"
                    width={2864}
                    height={1604}
                    className="absolute right-2 top-2 h-full w-full rounded-2xl object-cover sm:right-5 sm:top-5"
                  />
                </div>
              </li>

              <li className="flex flex-col-reverse items-center justify-between gap-7 md:flex-row-reverse md:gap-4">
                <div className="md:w-1/2 md:max-w-[400px]">
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-primary sm:text-3xl">
                    Decide your Fee
                  </h3>
                  <p className="mb-6 font-satoshiMedium text-base text-primary sm:text-xl">
                    See a job that suits you? Jump in, decide your rate, and
                    send your offer. Need to modify the price? No worries—you
                    can fine-tune and discuss the details with the client later.
                  </p>
                  <Link
                    href="/auth"
                    className="rounded-full bg-[#E58C06] px-5 py-3 font-satoshiBold font-bold text-[#EBE9F4]"
                  >
                    Join Olójà Hub
                  </Link>
                </div>
                <div className="max-x-[450px] relative aspect-video w-full rounded-2xl bg-[#321C7E] md:w-1/2 ">
                  <div className="absolute -bottom-2 -right-3 z-20 h-1/4 w-[104%] rounded-b-2xl bg-image-gradient sm:-bottom-5 sm:-right-5" />
                  <Image
                    src="/assets/images/monetize-skills/offer-interface.png"
                    width={1994}
                    height={1238}
                    alt="Profile interface"
                    className="absolute left-2 top-2 h-full w-full rounded-2xl object-cover sm:left-5 sm:top-5"
                  />
                </div>
              </li>

              <li className="flex flex-col-reverse items-center justify-between gap-7 md:flex-row md:gap-4">
                <div className="md:w-1/2 md:max-w-[400px]">
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-primary sm:text-3xl">
                    Wrap Up and Get Paid Fast. Simple
                  </h3>
                  <p className="mb-6 font-satoshiMedium text-base text-primary sm:text-xl">
                    After completing a job and you mark as done, the client is
                    notified to confirm the work is done. Once approved, your
                    payment is released directly to you—smooth and
                    straightforward.
                  </p>
                  <Link
                    href="/auth"
                    className="rounded-full bg-[#E58C06] px-5 py-3 font-satoshiBold font-bold text-[#EBE9F4]"
                  >
                    Get started on Olójà Hub
                  </Link>
                </div>
                <div className="max-x-[450px] relative aspect-video w-full rounded-2xl bg-[#E58C06] md:w-1/2 ">
                  <div className="absolute -bottom-2 -left-3 z-20 h-1/4 w-[104%] rounded-b-2xl bg-image-gradient sm:-bottom-5 sm:-left-5" />
                  <Image
                    src="/assets/images/monetize-skills/payment-interface.png"
                    alt="Profile interface"
                    width={1952}
                    height={1124}
                    className="absolute right-2 top-2 h-full w-full rounded-2xl object-cover sm:right-5 sm:top-5"
                  />
                </div>
              </li>

              <li className="flex flex-col-reverse items-center justify-between gap-7 md:flex-row-reverse md:gap-4">
                <div className="md:w-1/2 md:max-w-[400px]">
                  <h3 className="mb-3 font-clashSemiBold text-2xl text-primary sm:text-3xl">
                    Set up your profile and explore job opportunities
                  </h3>
                  <p className="mb-6 font-satoshiMedium text-base text-primary sm:text-xl">
                    Sign up for free in under a minute and start discovering
                    jobs that match your skills.
                  </p>
                  <Link
                    href="/provide-service"
                    className="rounded-full bg-[#E58C06] px-5 py-3 font-satoshiBold font-bold text-[#EBE9F4]"
                  >
                    Post a Listing now
                  </Link>
                </div>
                <div className="max-x-[450px] relative aspect-video w-full rounded-2xl bg-[#321C7E] md:w-1/2 ">
                  <div className="absolute -bottom-2 -right-3 z-20 h-1/4 w-[104%] rounded-b-2xl bg-image-gradient sm:-bottom-5 sm:-right-5" />
                  <Image
                    src="/assets/images/monetize-skills/listing-interface.png"
                    alt="Listing interface"
                    width={2864}
                    height={1698}
                    className="absolute left-2 top-2 h-full w-full rounded-2xl object-cover sm:left-5 sm:top-5"
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div className="bg-[#EBE9F4]">
        <svg
          width="1440"
          height="80"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full -translate-y-4 sm:translate-y-0"
        >
          <path
            d="M1299.87 68.9104C1358.84 64.7 1394.51 54.1463 1426.65 33.1897C1470.19 4.79733 1426.65 -53 1426.65 -53H21.9563C21.9563 -53 -79.3893 72.4571 40.7279 74.8638C122.481 76.5019 97.8068 8.76949 201.122 18.8473C304.438 28.9251 340.44 53.7302 429.708 76.0816C518.976 98.433 584.818 17.8242 709.623 18.8471C814.693 19.7082 846.474 66.355 950.75 60.9273C1017.36 57.4603 1036.02 29.7792 1102.98 27.7775C1188.83 25.2109 1215.04 74.9674 1299.87 68.9104Z"
            fill="#290D3A"
            fillOpacity="0.23"
          />
          <path
            d="M1299.87 68.9104C1358.84 64.7 1394.51 54.1463 1426.65 33.1897C1470.19 4.79733 1426.65 -53 1426.65 -53H21.9563C21.9563 -53 -79.3893 72.4571 40.7279 74.8638C122.481 76.5019 97.8068 8.76949 201.122 18.8473C304.438 28.9251 340.44 53.7302 429.708 76.0816C518.976 98.433 584.818 17.8242 709.623 18.8471C814.693 19.7082 846.474 66.355 950.75 60.9273C1017.36 57.4603 1036.02 29.7792 1102.98 27.7775C1188.83 25.2109 1215.04 74.9674 1299.87 68.9104Z"
            fill="url(#paint0_angular_6714_12403)"
            fillOpacity="0.6"
          />
          <defs>
            <radialGradient
              id="paint0_angular_6714_12403"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(714 13.5) scale(732 66.5)"
            >
              <stop offset="0.087956" stopColor="#6E05B8" />
              <stop offset="0.395" stopColor="#FFA439" />
              <stop offset="0.63" stopColor="#6E05B8" />
              <stop offset="0.855" stopColor="#FFA439" />
            </radialGradient>
          </defs>
        </svg>
        <div className="mx-auto max-w-7xl sm:py-10">
          <section className="mx-auto flex w-[93%] flex-col items-start justify-between gap-4 sm:w-[85%] md:flex-row md:items-center">
            <h4 className="w-1/2 font-clashSemiBold text-3xl text-primary sm:text-5xl">
              Your Talent, <br /> Your Income
            </h4>
            <p className="max-w-[650px] font-satoshiBold text-lg font-bold sm:text-2xl md:w-1/2">
              Olójà Hub helps you focus on your craft by handling marketing,
              payments, and more. Turn your skills into steady income, grow your
              clients, and take control of your career effortlessly.
            </p>
          </section>
        </div>
        <svg
          width="1440"
          height="80"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full translate-y-4 rotate-180 sm:translate-y-0"
        >
          <path
            d="M1299.87 68.9104C1358.84 64.7 1394.51 54.1463 1426.65 33.1897C1470.19 4.79733 1426.65 -53 1426.65 -53H21.9563C21.9563 -53 -79.3893 72.4571 40.7279 74.8638C122.481 76.5019 97.8068 8.76949 201.122 18.8473C304.438 28.9251 340.44 53.7302 429.708 76.0816C518.976 98.433 584.818 17.8242 709.623 18.8471C814.693 19.7082 846.474 66.355 950.75 60.9273C1017.36 57.4603 1036.02 29.7792 1102.98 27.7775C1188.83 25.2109 1215.04 74.9674 1299.87 68.9104Z"
            fill="#290D3A"
            fillOpacity="0.23"
          />
          <path
            d="M1299.87 68.9104C1358.84 64.7 1394.51 54.1463 1426.65 33.1897C1470.19 4.79733 1426.65 -53 1426.65 -53H21.9563C21.9563 -53 -79.3893 72.4571 40.7279 74.8638C122.481 76.5019 97.8068 8.76949 201.122 18.8473C304.438 28.9251 340.44 53.7302 429.708 76.0816C518.976 98.433 584.818 17.8242 709.623 18.8471C814.693 19.7082 846.474 66.355 950.75 60.9273C1017.36 57.4603 1036.02 29.7792 1102.98 27.7775C1188.83 25.2109 1215.04 74.9674 1299.87 68.9104Z"
            fill="url(#paint0_angular_6714_12403)"
            fillOpacity="0.6"
          />
          <defs>
            <radialGradient
              id="paint0_angular_6714_12403"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(714 13.5) scale(732 66.5)"
            >
              <stop offset="0.087956" stopColor="#6E05B8" />
              <stop offset="0.395" stopColor="#FFA439" />
              <stop offset="0.63" stopColor="#6E05B8" />
              <stop offset="0.855" stopColor="#FFA439" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default Page;
