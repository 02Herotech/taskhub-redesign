"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MarketPlaceHeader = () => {
  const [description, setDescription] = useState("");
  const session = useSession();
  const router = useRouter();

  const userRole = session?.data?.user?.user?.roles;
  const token = session?.data?.user?.accessToken;

  const isServiceProvider = userRole && userRole[0] === "SERVICE-PROVIDER";
  const userState = isServiceProvider ? "Service" : "Task";

  const handleSubmit = (e: any) => {
    e.preventDefault;
    console.log(description);
    if (!token) {
      router.push("/login");
    } else if (isServiceProvider) {
      router.push("/service-provider/provide-service");
    } else {
      router.push("/customer/add-task");
    }
  };
  return (
    <div className={`${styles.headerCover} w-full  py-20 md:mt-16 lg:mt-20`}>
      <div className="mx-auto flex max-w-[400px] flex-col items-center justify-center space-y-8 px-5 text-white md:max-w-full md:px-0  ">
        <div className="flex w-full flex-col justify-center space-y-2 sm:items-start md:items-center ">
          <div className=" mt-10 flex w-full flex-col items-start justify-center md:mt-0 md:flex-row md:items-center md:justify-center ">
            <h1 className="text-[27px]  font-bold md:text-[39px]">
              Put up a {userState}
            </h1>
            <h1 className="text-[27px] font-bold md:text-[39px] ">
              Complete the {userState} at hand.
            </h1>
          </div>
          <p className="font-bold sm:text-start sm:text-[16px] md:text-[18px] lg:text-[20px]">
            Publish a {userState} Complete it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start md:w-[600px] md:flex-row md:items-center md:space-x-2"
        >
          <input
            type="text"
            id="description"
            placeholder="In few words, what do you need?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            className="w-full flex-1 rounded-xl border-[1.5px] border-[#C1BADB] bg-white px-4 py-[13px] text-[13px] text-[#C1BADB] focus:border-[#C1BADB] focus:outline-none md:w-[500px] md:text-[16px]"
          />

          <button
            type="submit"
            className="text[15px] mt-4 rounded-3xl bg-primary px-6 py-3 font-bold hover:bg-status-darkViolet md:text-[18px] lg:mt-0  "
          >
            Add a {userState}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarketPlaceHeader;
