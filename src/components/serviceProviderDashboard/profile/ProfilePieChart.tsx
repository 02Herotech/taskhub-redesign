"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export const data = {
  labels: ["Incomplete", "Complete"],
  datasets: [
    {
      label: "Completion Rate",
      data: [40, 60],
      backgroundColor: ["#fff", "#381F8C"],
    },
  ],
};

const ProfilePieChart = () => {
  return (
    <div className="relative">
      <p className="text-orange-normal absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+0.5rem)] text-xl font-bold">
        60%
      </p>
      <Pie data={data} />;
    </div>
  );
};

export default ProfilePieChart;
