//Profile should not show 100% if its not verified
export const profileData: { field: string; available: boolean }[] = [
  { field: "First and last name", available: true },
  { field: "Email", available: true },
  { field: "Bio details", available: false },
  { field: "Picture upload", available: true },
  { field: "Location", available: false },
  { field: "Date of birth", available: true },
  { field: "Phone number", available: false },
  { field: "Identity document", available: true },
  { field: "Verified", available: false },
];

const chartData = {
  total: profileData.length,
  completed: profileData.filter((data) => data.available).length,
};

export const completionPercentage = Math.floor(
  (chartData.completed / chartData.total) * 100,
);

const isComplete = completionPercentage === 100;

export const data = {
  datasets: [
    {
      data: [
        chartData.completed,
        Math.max(chartData.total - chartData.completed, 0),
      ],
      backgroundColor: isComplete
        ? ["#FE9B07", "#FE9B07"]
        : ["#FE9B07", "#D2C3AB"],
      borderWidth: 0,
    },
  ],
  type: "doughnut",
};

export const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  responsive: true,
  maintainAspectRatio: true,
};
