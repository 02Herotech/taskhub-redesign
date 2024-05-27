import Loading from "@/shared/loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileHeader = () => {
  const session = useSession();
  const user = session?.data?.user?.user;
  const isServiceProvider = user?.roles[0] === "SERVICE_PROVIDER";
  const editProfileLink = isServiceProvider ? "/service-provider/dashboard/profile/edit-profile" : "/customer/profile/edit-profile";

  return (
    <>
      {!user ? (
        <div className="flex min-h-40 items-center justify-center ">
          <Loading />
        </div>
      ) : (
        <header className="flex items-center justify-between gap-2 max-md:flex-col">
          <div className="flex items-center gap-8">
            <Image
              src={
                user?.profileImage
                  ? user?.profileImage
                  : "/assets/images/serviceProvider/user.jpg"
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
              <p className="font-clashDisplay text-[#140B31] ">
                {user?.emailAddress}
              </p>
            </div>
          </div>

          <div className="flex gap-4 max-md:justify-between max-md:py-4 flex-row lg:flex-col lg:items-end">
            <Link
              href={editProfileLink}
              className="border-b text-sm font-medium text-[#381F8C] "
            >
              Edit Account Details
            </Link>
            <p className="text-sm font-medium text-[#140B31] ">
              A member since 
            </p>
            <p className="text-sm font-medium text-[#140B31] ">
              {user?.address?.state}
            </p>
          </div>
        </header>
      )}
    </>
  );
};

export default ProfileHeader;
