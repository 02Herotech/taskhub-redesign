"use client";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  options,
  useCustomerProfileCompletion,
} from "@/hooks/useUserProfileCompletion";
import { usePathname } from "next/navigation";
import useUserProfileData from "@/hooks/useUserProfileData";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProfilePercentage() {
  const userProfileData = useUserProfileData();

  const { profileData, data, completionPercentage } =
    useCustomerProfileCompletion(userProfileData.verificationStatus);

  const pathname = usePathname();
  const shouldRender =
    pathname == "/customer/settings/profile" ||
    pathname == "/customer/settings/profile/public-profile" ||
    pathname == "/customer/settings/profile/private-profile";

  return (
    <>
      {shouldRender && (
        <aside className="hidden max-w-[400px] rounded-xl bg-[#EBE9F4] px-8 py-3 md:block xl:px-20">
          <h2 className="mb-4 text-center text-xl font-medium text-[#E58C06]">
            Complete your profile
          </h2>

          <div className="relative mx-auto my-7 flex max-w-[150px] items-center justify-center">
            <Doughnut data={data} options={options} />
            {/* Animate this with motion.div after reducing cutout */}
            <div className="absolute flex size-[120px] items-center justify-center rounded-full bg-white">
              <p className="text-lg font-semibold text-[#503102]">
                {completionPercentage}%
              </p>
            </div>
          </div>

          {/* Details  */}
          <ul className="space-y-5">
            {profileData.map(({ field, available }) => {
              const iconColor = available ? "#2D1970" : "#BEBECC";
              const textColor = available ? "#140B31" : "#55535A";
              const Icon = available ? IoCheckmarkCircleSharp : MdCancel;
              return (
                <li
                  className="flex items-center gap-4"
                  key={Math.random() * 908654}
                >
                  <Icon color={iconColor} />
                  <p className={`text-[${textColor}] text-lg font-medium`}>
                    {field}
                  </p>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </>
  );
}

export default ProfilePercentage;
