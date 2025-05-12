"use client";

import Barge from "@/components/serviceProviderDashboard/profile/Barge";
import CompletionRate from "@/components/serviceProviderDashboard/profile/CompletionRate";
import ProfileHeader from "@/components/serviceProviderDashboard/profile/ProfileHeader";
import Wallet from "@/components/serviceProviderDashboard/profile/Wallet";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileCompletion from "@/components/serviceProviderDashboard/profile/ProfileCompletion";
import { defaultUserDetails } from "@/data/data";
import useAxios from "@/hooks/useAxios";

const Page = () => {
  const [fetchedUserData, setFetchedUserData] = useState(defaultUserDetails);
  const authInstance = useAxios();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await authInstance.get("service-provider/profile");
        setFetchedUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <main className="space-y-8 p-4 max-md:pt-10 lg:p-8">
      <ProfileHeader />
      <section className=" flex flex-col flex-wrap gap-6 lg:grid lg:grid-cols-12">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.5 }}
        >
          {fetchedUserData.firstName && (
            <ProfileCompletion fetchedUserData={fetchedUserData} />
          )}
        </motion.div>
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 1 }}
        >
          <Wallet />
        </motion.div>
        <motion.div
          className="col-span-5 max-md:hidden"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 1.5 }}
        >
          <Barge />
        </motion.div>
        <motion.div
          className="col-span-7 max-md:hidden"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 1.2 }}
        >
          <CompletionRate />
        </motion.div>

        <div className="flex w-full items-center gap-6 overflow-auto md:hidden">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, translateY: "5rem" }}
            whileInView={{ opacity: 1, translateY: "0" }}
            transition={{ duration: 1.5 }}
          >
            <Barge />
          </motion.div>
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, translateY: "5rem" }}
            whileInView={{ opacity: 1, translateY: "0" }}
            transition={{ duration: 1.2 }}
          >
            <CompletionRate />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Page;
