import { defaultUserDetails } from "@/data/data";
import Loading from "@/shared/loading";
import { formatDateFromNumberArray } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfileHeader = () => {
  const [fetchedUserData, setFetchedUserData] = useState(defaultUserDetails);

  const session = useSession();
  const user = session?.data?.user?.user;
  const token = session?.data?.user?.accessToken;
  const isServiceProvider = user?.roles[0] === "SERVICE_PROVIDER";
  const editProfileLink = isServiceProvider
    ? "/service-provider/profile/edit-profile"
    : "/customer/profile/edit-profile";

  const location = user?.address?.state || "Australia";

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const url =
          "https://smp.jacinthsolutions.com.au/api/v1/service_provider/profile";
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
        <header className="flex items-center justify-between gap-2 max-md:flex-col">
          <div className="flex items-center gap-8">
            <Image
              src={
                fetchedUserData?.profileImage ??
                user?.profileImage ??
                "/assets/images/serviceProvider/user.jpg"
              }
              alt={user?.firstName ? user?.firstName : "user"}
              width={160}
              height={160}
              className="max-siz-40 size-40 rounded-full object-cover max-md:size-24 max-md:max-w-24"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-[#140B31] lg:text-4xl">
                Welcome {user?.firstName} {user?.lastName}
              </h1>
              <p className="font-clashDisplay text-[#140B31]">
                {user?.emailAddress}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-4 max-md:justify-between max-md:py-4 lg:flex-col lg:items-end">
            <Link
              href={editProfileLink}
              className="text-md font-satoshi font-semibold text-primary underline"
            >
              Edit Account Details
            </Link>
            <p className="text-sm font-medium text-[#140B31]">
              {/* @ts-expect-error "Type error in the user declaration as number array" */}
              A member since {formatDateFromNumberArray(user.registeredAt)}
            </p>
            <p className="text-sm font-medium text-[#140B31]">{location}</p>
          </div>
        </header>
      )}
    </>
  );
};

export default ProfileHeader;
