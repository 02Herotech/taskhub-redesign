"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProfilePieChartPropType {
  chartData: { total: number; completed: number };
}

const ProfilePieChart = ({ chartData }: ProfilePieChartPropType) => {
  const completionPercentage = Math.floor((chartData.completed / chartData.total) * 100);
  const isComplete = completionPercentage === 100;

  const data = {
    datasets: [
      {
        data: [chartData.completed, Math.max(chartData.total - chartData.completed, 0)],
        backgroundColor: isComplete ? ['#381F8C', '#381F8C'] : ['#381F8C', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="relative size-40">
      <Pie data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-2xl font-bold text-orange-normal">
          {completionPercentage}%
        </p>
      </div>
    </div>
  );
};

export default ProfilePieChart;