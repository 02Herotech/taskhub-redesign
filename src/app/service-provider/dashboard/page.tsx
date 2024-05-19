"use client";

import Barge from "@/components/serviceProviderDashboard/profile/Barge";
import CompletionRate from "@/components/serviceProviderDashboard/profile/CompletionRate";
import ProfileHeader from "@/components/serviceProviderDashboard/profile/ProfileHeader";
import Wallet from "@/components/serviceProviderDashboard/profile/Wallet";
import React from "react";
import { motion } from "framer-motion";
import ProfileCompletion from "@/components/serviceProviderDashboard/profile/ProfileCompletion";

const page = () => {
  return (
    <main className="space-y-8 p-4 lg:p-8">
      <ProfileHeader />
      <section className=" flex flex-col flex-wrap gap-6 lg:grid lg:grid-cols-12">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.5 }}
        >
          <ProfileCompletion />
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
          className="col-span-5"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 1.5 }}
        >
          <Barge />
        </motion.div>
        <motion.div
          className="col-span-7"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 1.2 }}
        >
          <CompletionRate />
        </motion.div>
      </section>
    </main>
  );
};

export default page;
