"use client";

import Barge from "@/components/serviceProviderDashboard/profile/Barge";
import CompletionRate from "@/components/serviceProviderDashboard/profile/CompletionRate";
import ProfileHeader from "@/components/serviceProviderDashboard/profile/ProfileHeader";
import ProfilePieChart from "@/components/serviceProviderDashboard/profile/ProfilePieChart";
import Wallet from "@/components/serviceProviderDashboard/profile/Wallet";
import Image from "next/image";
import React from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import ProfileCompletion from "@/components/serviceProviderDashboard/profile/ProfileCompletion";

const page = () => {
  return (
    <main className="space-y-8 p-4 lg:p-8">
      <ProfileHeader />
      <section className="grid gap-6 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.5 }}
        >
          {/* <div className="lg:col-span-7"> */}
          <ProfileCompletion />
        </motion.div>
        {/* </div> */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.5 }}
        >
          <Wallet />
        </motion.div>

        <motion.div
          className="col-span-5"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.5 }}
        >
          <Barge />
        </motion.div>
        <motion.div
          className="col-span-7"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.5 }}
        >
          <CompletionRate />
        </motion.div>
      </section>
    </main>
  );
};

export default page;
