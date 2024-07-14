"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProfilePieChartPropType {
  chartData: { total: number; completed: number };
}

const ProfilePieChart = ({ chartData }: ProfilePieChartPropType) => {
  const data = {
    datasets: [
      {
        data: [chartData.completed, chartData.total - chartData.completed],
        backgroundColor: ["#381F8C", "#fff"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        enabled: false, // Disable the tooltip
      },
    },
  };

  return (
    <div className="relative">
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+0.5rem)] text-xl font-bold text-orange-normal">
        {Math.floor((chartData.completed / chartData.total) * 100)}%
      </p>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProfilePieChart;
