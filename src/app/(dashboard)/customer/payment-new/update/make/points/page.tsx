"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadCrumbs } from "@/store/Features/breadcrumbs";
import { FiAlertOctagon } from "react-icons/fi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetWalletBalanceQuery } from "@/services/wallet";

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
        header: "Task points",
        links: [
          {
            url: "/customer/payment-new/update/make",
            text: "Make payments",
          },
          { url: "#", text: "Task points" },
        ],
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
    <section className="flex min-h-[55vh] items-center justify-center">
      <div className="w-full space-y-4 p-2 sm:w-10/12 sm:p-4">
        <h4 className="text-center text-lg font-bold text-[#221354]">
          Task points
        </h4>
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
        <p className="mb-5 text-center font-bold text-[#000000B0]">
          Next: $10 task credit reward
        </p>
        <div className="mx-auto mb-20 w-full space-y-2 rounded-lg bg-[#EBE9F4] p-3 px-7 sm:w-max">
          <div className="flex items-center gap-2">
            <FiAlertOctagon strokeWidth={2} color="#FE9B07" />
            <p className="text-lg font-semibold text-primary">
              What are points used for?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FiAlertOctagon strokeWidth={2} color="#FE9B07" />
            <p className="text-lg font-semibold text-primary">
              How can I get more points
            </p>
          </div>
        </div>

        <div className="mt-10">
          <button className="rounded-2xl bg-primary px-5 py-2 text-white">
            Share referral links
          </button>
        </div>
      </div>
    </section>
  );
}

export default Page;
