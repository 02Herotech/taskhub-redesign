import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  responsive: true,
  maintainAspectRatio: true,
};

/*
!Bio details not come from server yet
!Phone number doesnt come from server yet
*/
export function useCustomerProfileCompletion() {
  const { profile } = useSelector((state: RootState) => state.userProfile);

  const profileData: { field: string; available: boolean }[] = [
    {
      field: "First and last name",
      available: Boolean(profile?.firstName) && Boolean(profile?.lastName),
    },
    { field: "Email", available: Boolean(profile?.emailAddress) },
    { field: "Bio details", available: false },
    { field: "Picture upload", available: Boolean(profile?.profileImage) },
    { field: "Location", available: Boolean(profile?.address.state) },
    //@ts-ignore
    { field: "Date of birth", available: Boolean(profile?.dateOfBirth) },
    { field: "Phone number", available: false },
    { field: "Identity document", available: profile?.enabled },

    //! CHECK THE VERIFIED STATE WHETHER IT'S FROM EMAIL OR ID
    { field: "Verified", available: profile?.accountState === "VERIFIED" },
  ];

  const chartData = {
    total: profileData.length,
    completed: profileData.filter((data) => data.available).length,
  };

  const completionPercentage = Math.floor(
    (chartData.completed / chartData.total) * 100,
  );

  const isComplete = completionPercentage === 100;

  const data = {
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
  return { profileData, completionPercentage, data };
}

export function useServiceProviderProfileCompletion() {
  return {};
}
