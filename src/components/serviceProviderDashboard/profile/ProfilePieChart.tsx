"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

interface ProfilePieChartPropType {
  chartData: { total: number; completed: number };
}

const ProfilePieChart = ({ chartData }: ProfilePieChartPropType) => {
  const data = {
    labels: ["Complete", "Incomplete"],
    datasets: [
      {
        label: "Completion Rate",
        data: [chartData.completed, chartData.total - chartData.completed],
        backgroundColor: ["#381F8C", "#fff"],
      },
    ],
  };
  return (
    <div className="relative">
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+0.5rem)] text-xl font-bold text-orange-normal">
        {Math.floor((chartData.completed / chartData.total) * 100)}
      </p>
      <Pie data={data} />;
    </div>
  );
};

export default ProfilePieChart;
