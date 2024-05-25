"use client";
import { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MarketPlaceHeader = () => {
  // Setting the add description state
  const [addDescription, setAddDescription] = useState("");

  const session = useSession();
  const router = useRouter();

  const userRole = session?.data?.user?.user?.roles;
  const token = session?.data?.user?.accessToken;

  const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      router.push("/auth/login");
    } else if (isServiceProvider) {
      router.push("/service-provider/provide-service");
    } else {
      router.push("/customer/add-task");
    }
  };
  return (
    <div className={`${styles.headerCover} w-full py-20 md:mt-16 lg:mt-20`}>
      <div className="mx-auto flex flex-col items-center justify-center space-y-8 px-5 text-white md:max-w-full md:px-0  ">
        <div className="flex w-full flex-col justify-center space-y-2 sm:items-start md:items-center ">
          <div className=" mt-10 flex w-full flex-col flex-wrap items-start justify-center gap-3 md:mt-0 md:flex-row md:items-center md:justify-center ">
            <h1 className="text-[27px] font-bold md:text-[39px]">
              {isServiceProvider
                ? "Can provide a Service. Get Connected."
                : "Post it. We Fix it"}
            </h1>
          </div>
          <p className="font-medium sm:text-start sm:text-base  md:text-lg ">
            {isServiceProvider
              ? "Let users know you can Get it done!"
              : "Publish a task. Complete it."}
          </p>
        </div>

        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex w-full flex-col gap-2 md:flex-row md:justify-center "
        >
          <input
            type="text"
            id="description"
            placeholder="In few words, what do you need?"
            value={addDescription}
            onChange={(e) => setAddDescription(e.target.value)}
            name="description"
            className="w-full max-w-lg rounded-xl bg-white px-4 py-3 focus:outline-none "
          />
          <button
            type="submit"
            className=" max-w-fit rounded-3xl bg-primary px-6 py-3 font-bold transition-all duration-300 hover:opacity-90  "
          >
            {isServiceProvider ? "Provide a service" : "Add a task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarketPlaceHeader;
