import { defaultUserDetails } from "@/data/data";
import Loading from "@/shared/loading";
import { RootState } from "@/store";
import { formatDateFromNumberArray } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiEdit, CiLocationOn } from "react-icons/ci";
import { useSelector } from "react-redux";

const ProfileHeader = () => {
  const [fetchedUserData, setFetchedUserData] = useState(defaultUserDetails);
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const session = useSession();
  const user = session?.data?.user?.user;
  const token = session?.data?.user?.accessToken;
  const userSignUpBonus = (session?.data?.user?.signUpBonusWallet?.balance ?? 0).toFixed(2);
  const isServiceProvider = user?.roles[0] === "SERVICE_PROVIDER";
  const editProfileLink = isServiceProvider
    ? "/service-provider/profile/edit-profile"
    : "/customer/profile/edit-profile";

  const location = user?.address?.state || "Australia";

  //! Data fetch thats not used
  //Todo Re-visit
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/service_provider/profile`;
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setFetchedUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <>
      {!user ? (
        <div className="flex min-h-40 items-center justify-center">
          <Loading />
        </div>
      ) : (
        <header className="flex justify-between gap-2 lg:items-center">
          <div className="flex items-center gap-4 lg:gap-8">
            <Image
              src={
                userProfile?.profile?.profileImage ??
                "/assets/images/serviceProvider/user.jpg"
              }
              alt={user?.firstName ?? "user"}
              width={160}
              height={160}
              quality={100}
              className="max-size-40 size-40 rounded-full object-cover max-md:size-16 max-md:max-w-16"
            />
            {/* <div className="flex flex-col gap-2">
              <h1 className="text-base font-bold text-[#140B31] lg:text-3xl">
                Welcome {user?.firstName} {user?.lastName}
              </h1>
              <p className="font-clashDisplay text-sm text-[#140B31] lg:text-base">
                {user?.emailAddress}
              </p>
            </div> */}

            <div className="flex flex-col gap-2">
              <h1 className="text-base font-bold text-[#140B31] lg:text-3xl">
                Welcome {user?.firstName} {user?.lastName}
              </h1>
              <p className="font-clashDisplay text-sm text-[#140B31] lg:text-base">
                {user?.emailAddress}
              </p>

              {/* Bonus Cards */}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex flex-col items-center justify-center w-28 h-24 bg-[#EBE9F4] rounded-lg shadow-md">
                  <p className="text-3xl font-bold text-orange-normal">${userSignUpBonus}</p>
                  <p className="text-md font-bold text-primary">Bonus credits</p>
                </div>
                <div className="h-24 w-[1px] bg-primary"></div> {/* Separator Line */}
                <div className="flex flex-col items-center justify-center w-28 h-24 bg-[#EBE9F4] rounded-lg shadow-md">
                  <p className="text-3xl font-bold text-orange-normal">0</p>
                  <p className="text-md font-bold text-primary">Points reward </p>
                </div>
              </div>
            </div>

          </div>

          <div className="hidden flex-row gap-4 max-md:justify-between max-md:py-4 lg:flex lg:flex-col lg:items-end">
            <Link
              href={editProfileLink}
              className="text-md font-satoshi font-semibold text-primary underline"
            >
              Edit Account details
            </Link>
            <p className="text-sm font-medium text-[#140B31] flex items-center gap-1">
              <CiLocationOn />
              {location}
            </p>

            <p className="text-sm font-medium text-[#140B31]">
              {/* @ts-expect-error "Type error in the user declaration as number array" */}
              Joined Oloja on {formatDateFromNumberArray(user.registeredAt)}
            </p>
          </div>
          <Link href={editProfileLink} className="lg:hidden">
            <CiEdit className="size-6 text-primary" />
          </Link>
        </header>
      )}
    </>
  );
};

export default ProfileHeader;
