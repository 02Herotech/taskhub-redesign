import Image from "next/image";
import React from "react";

const userdata = {
  name: "John Doe",
  email: "user@gmail.com",
  image: "/assets/images/marketplace/singleTask/oluchi.png",
  joinedDate: "2023 ",
};

const ProfileHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-8">
        <Image
          src={userdata.image}
          alt={userdata.name}
          width={160}
          height={160}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-[#140B31]"> Welcome {userdata.name} </h1>
          <p className="text-[#140B31]"> {userdata.email} </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4">
        <button className="border-b text-sm text-[#381F8C] ">
          Edit Account Details
        </button>
        <p className="text-sm text-[#140B31]  ">
          A member since {userdata.joinedDate}{" "}
        </p>
        <p className="text-sm text-[#140B31] ">Location</p>
      </div>
    </header>
  );
};

export default ProfileHeader;
