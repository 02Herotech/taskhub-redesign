import Image from "next/image";
import Link from "next/link";
import React from "react";

const userdata = {
  name: "John Doe",
  email: "user@gmail.com",
  image: "/assets/images/marketplace/singleTask/oluchi.png",
  joinedDate: "2023 ",
};

const ProfileHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2 max-md:flex-col">
      <div className="flex items-center gap-8">
        <Image
          src={userdata.image}
          alt={userdata.name}
          width={160}
          height={160}
          className="max-w-40 rounded-full max-md:max-w-24"
        />
        <div className="flex flex-col gap-2  ">
          <h1 className="text-3xl font-bold text-[#140B31] lg:text-4xl">
            Welcome {userdata.name}
          </h1>
          <p className="font-clashDisplay text-[#140B31] ">{userdata.email}</p>
        </div>
      </div>

      <div className="flex gap-4 max-md:justify-between max-md:py-4 lg:flex-col lg:items-end">
        <Link
          href="/service-provider/dashboard/profile/edit-profile"
          className="border-b text-sm font-medium text-[#381F8C] "
        >
          Edit Account Details
        </Link>
        <p className="text-sm font-medium text-[#140B31] ">
          A member since {userdata.joinedDate}
        </p>
        <p className="text-sm font-medium text-[#140B31] ">Location</p>
      </div>
    </header>
  );
};

export default ProfileHeader;
