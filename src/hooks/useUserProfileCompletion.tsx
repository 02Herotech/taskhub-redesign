import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useUserProfileData from "./useUserProfileData";

export const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  responsive: true,
  maintainAspectRatio: true,
};

export function useCustomerProfileCompletion(verificationState?: string) {
  const { profile } = useSelector((state: RootState) => state.userProfile);
  const userProfileData = useUserProfileData();

  const profileData: { field: string; available: boolean }[] = [
    {
      field: "First and last name",
      available: Boolean(profile?.firstName) && Boolean(profile?.lastName),
    },
    { field: "Email", available: Boolean(profile?.emailAddress) },
    // { field: "Bio details", available: false },
    { field: "Picture upload", available: Boolean(profile?.profileImage) },
    { field: "Location", available: Boolean(profile?.address.state) },
    {
      field: "Date of birth",
      available: Boolean(userProfileData?.dateOfBirth),
    },
    { field: "Phone number", available: Boolean(profile?.phoneNumber) },
    {
      field: "Identity document",
      available: Boolean(userProfileData?.idImageFront),
    },
    {
      field: "Verified",
      available: userProfileData.verificationStatus === "VERIFIED",
    },
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
