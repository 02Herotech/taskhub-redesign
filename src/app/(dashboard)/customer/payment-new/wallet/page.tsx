"use client";
import React from "react";
import { FiAlertOctagon } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { useEffect } from "react";
import { useGetWalletBalanceQuery } from "@/services/wallet";
import Link from "next/link";
import { getDaySuffix } from "@/utils";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date,
  );
  const day = date.getDate();
  return `${month} ${day}${getDaySuffix(day)}`;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  cutout: "30%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  responsive: true,
  maintainAspectRatio: true,
};

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadCrumbs({
        header: "Wallet",
        links: [{ url: "#", text: "Wallet" }],
      }),
    );
  }, []);

  const { data: result } = useGetWalletBalanceQuery();

  const rewardPoints = result ? parseInt(result.data.rewardPoints) : 0;

  const data = {
    datasets: [
      {
        data: [rewardPoints, 200],
        backgroundColor:
          rewardPoints === 200
            ? ["#FE9B07", "#FE9B07"]
            : ["#FE9B07", "#FDF4EA"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <section className="w-full pb-10">
      <div className="mb-14 flex flex-col gap-3 md:flex-row md:gap-2">
        {/* Balance  */}
        <div className="w-full rounded-2xl bg-white p-3 text-white shadow-md md:w-1/2">
          <div className="relative mb-4 overflow-hidden rounded-2xl bg-primary p-2">
            <h3 className="mb-10 font-satoshiBold font-bold">Total Balance</h3>
            <p className="mr-4 text-right font-clash text-lg">AUD$</p>
            <p className="mb-5 mr-4 text-right text-6xl font-semibold">
              {result ? result.data.balance : 0}
            </p>
            <svg
              width="460"
              height="198"
              viewBox="0 0 460 198"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 w-[120%] md:w-full"
            >
              <path
                d="M-19.9043 -84.6496C-3.66094 -76.7537 137.483 170.189 268.297 65.529C364.598 -11.5177 452.728 80.23 494.476 145.021C444.343 185.683 276.637 235.046 288.135 144.495C299.634 53.9439 176.799 108.525 194.247 84.871"
                stroke="#C1BADB"
                strokeOpacity="0.32"
                strokeWidth="20"
              />
            </svg>
          </div>
          <div className="flex justify-between">
            <Link
              href="/customer/payment-new/methods/fund"
              className="w-full rounded-full bg-[#FE9B07] px-8 py-2 text-center font-semibold sm:w-max"
            >
              Fund wallet
            </Link>
            {/* <Link
              href="/customer/payment-new/update/receive/withdraw"
              className="hidden rounded-full border border-[#F6921E] bg-[#FCF4E6] px-8 py-2 text-[#F6921E] sm:block"
            >
              Withdraw
            </Link> */}
          </div>
        </div>

        {/* Credit points  */}
        <div className="w-full rounded-2xl bg-white p-3 shadow-md md:w-1/2">
          <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#F6F3FF] p-2">
            <h3 className="mb-5 font-satoshiBold font-bold text-[#221354]">
              Task credits
            </h3>
            <div className="mb-7 flex items-center justify-evenly">
              <FaStar size={100} fill="#C1BADB" />
              {/* <FaStar size={100} fill='#2D1970' /> */}
              <div className="text-center">
                <p className="mb-3 text-5xl font-bold">
                  ${result ? parseInt(result.data.signUpBonus) : 0}
                </p>
                {result?.data.signUpBonusExpiryDate && (
                  <p className="text-sm font-medium text-[#000000B0]">
                    Valid until{" "}
                    <span className="text-[#2A1962]">
                      {formatDate(result.data.signUpBonusExpiryDate)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiAlertOctagon strokeWidth={2.5} color="#FE9B07" />
            <p className="font-semibold ">What can I use my credit for?</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/12">
        <h4 className="font-bold text-[#221354]">Task points</h4>
        <div className="relative mx-auto mb-5 mt-6 flex max-w-[170px] items-center justify-center">
          <Doughnut data={data} options={options} />
          <div className="absolute flex size-[110px] items-center justify-center rounded-full bg-white">
            <p className="text-center text-lg font-semibold">
              <span className="mb-2 block text-3xl font-bold text-[#140B31]">
                {rewardPoints}
              </span>
              <span className="text-sm font-semibold text-[#140B3191]">
                of 200 pts
              </span>
            </p>
          </div>
        </div>
        <p className="mb-5 text-center font-bold text-[#000000B0] md:text-left">
          Next: $10 task credit reward
        </p>
        <div className="mb-4 space-y-2 rounded-lg bg-[#EBE9F4] p-3">
          <div className="flex items-center gap-2">
            <FiAlertOctagon strokeWidth={2} color="#FE9B07" />
            <p className="text-sm font-semibold text-primary">
              What are points used for?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FiAlertOctagon strokeWidth={2} color="#FE9B07" />
            <p className="text-sm font-semibold text-primary">
              How can I get more points
            </p>
          </div>
        </div>

        <button className="w-full rounded-2xl bg-primary py-2 text-white">
          Share referral links
        </button>
      </div>
    </section>
  );
}

export default Page;
