import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import HomeNavigation from "@/components/layout/HomeNavigation";

function NotFound() {
  return (
    <div>
      <HomeNavigation />
      <section className="relative mx-auto flex h-screen max-h-[1200px] min-h-[700px] max-w-[1700px] flex-col-reverse gap-10 overflow-x-hidden px-5 py-20 sm:px-10 md:flex-row md:gap-0">
        <div className="bg-404-not-found absolute inset-0 -z-10 hidden h-full w-full bg-cover bg-center bg-no-repeat opacity-5 sm:block" />
        <div className="bg-404-not-found absolute inset-0 -z-10 block h-full w-full -rotate-[60deg] bg-contain bg-center bg-no-repeat opacity-5 outline-dotted sm:hidden" />
        {/* <img
          src='/not-found-404.png'
          alt='#'
          className='opacity-5 absolute right-0 top-10 w-full scale-[2] -rotate-[60deg] object-contain block sm:hidden'
        /> */}
        {/* Texts and CTA  */}
        <div className="flex h-full w-full flex-col justify-center md:w-1/2">
          <h2 className="mb-4 text-4xl font-semibold text-[#381F8C]">
            Hi there! <span className="text-5xl">👋</span>
          </h2>
          <p className="mb-6 text-xl font-medium text-[#140B31] sm:text-3xl">
            Thank you for your patience while we put this in the best shape for
            you.
          </p>
          <Link
            href="/"
            className="flex w-max gap-2 rounded-full bg-[#E58C06] px-4 py-3"
          >
            <div className="rounded-full bg-white p-1">
              <FaArrowLeft className="rotate-45 text-[#E58C06]" />
            </div>
            <span className="font-bold text-white">Back Home</span>
          </Link>
        </div>

        {/* Images  */}
        <div className="relative flex flex-grow items-center justify-center">
          {/* Dimension width={399} height={503}  */}
          <img
            src="/assets/images/404-guy.png"
            alt="#"
            className="w-9/12 max-w-[350px] md:w-full"
          />
          <div className="absolute w-11/12">
            <svg
              width="649"
              height="254"
              viewBox="0 0 649 254"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -z-10 w-full"
            >
              <path
                d="M452.234 32.7815C672.113 -13.039 616.811 62.0113 555.178 102.711C592.658 93.165 695.6 115.587 624.639 147.777C553.678 179.966 577.167 182.186 613.646 205.496C650.126 228.806 597.654 251.45 478.22 250.34C358.786 249.23 462.73 172.196 315.311 215.486C167.892 258.776 133.41 274.316 120.917 215.486C-4.0141 224.366 55.8845 168.877 52.4556 147.777C50.7761 137.441 144.604 123.532 67.4473 90.7227C-46.5876 42.2321 -7.51215 38.1094 120.917 25.8996C169.39 -36.704 194.451 35.9149 290.824 20.1272C343.735 11.4595 427.613 -22.0671 452.234 32.7815Z"
                fill="url(#paint0_linear_6558_13610)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_6558_13610"
                  x1="649"
                  y1="127"
                  x2="0"
                  y2="127"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#A3A9DE" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#FFDD77" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              width="649"
              height="254"
              viewBox="0 0 649 254"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -z-20 w-full translate-y-10"
            >
              <path
                d="M452.234 32.7815C672.113 -13.039 616.811 62.0113 555.178 102.711C592.658 93.165 695.6 115.587 624.639 147.777C553.678 179.966 577.167 182.186 613.646 205.496C650.126 228.806 597.654 251.45 478.22 250.34C358.786 249.23 462.73 172.196 315.311 215.486C167.892 258.776 133.41 274.316 120.917 215.486C-4.0141 224.366 55.8845 168.877 52.4556 147.777C50.7761 137.441 144.604 123.532 67.4473 90.7227C-46.5876 42.2321 -7.51215 38.1094 120.917 25.8996C169.39 -36.704 194.451 35.9149 290.824 20.1272C343.735 11.4595 427.613 -22.0671 452.234 32.7815Z"
                fill="#D9D9D9"
                fillOpacity="0.2"
              />
              <path
                d="M452.234 32.7815C672.113 -13.039 616.811 62.0113 555.178 102.711C592.658 93.165 695.6 115.587 624.639 147.777C553.678 179.966 577.167 182.186 613.646 205.496C650.126 228.806 597.654 251.45 478.22 250.34C358.786 249.23 462.73 172.196 315.311 215.486C167.892 258.776 133.41 274.316 120.917 215.486C-4.0141 224.366 55.8845 168.877 52.4556 147.777C50.7761 137.441 144.604 123.532 67.4473 90.7227C-46.5876 42.2321 -7.51215 38.1094 120.917 25.8996C169.39 -36.704 194.451 35.9149 290.824 20.1272C343.735 11.4595 427.613 -22.0671 452.234 32.7815Z"
                fill="url(#paint0_linear_6558_13609)"
                fillOpacity="0.5"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_6558_13609"
                  x1="649"
                  y1="127"
                  x2="0"
                  y2="127"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F5DDFC" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#9D6FFA" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <p className="absolute bottom-0 left-1/2 mt-5 -translate-x-1/2 pb-5 text-base font-bold sm:text-xl">
          Need help?{" "}
          <Link href="/contact" className="text-[#E58C06] underline">
            Contact us
          </Link>
        </p>
      </section>
    </div>
  );
}

export default NotFound;
