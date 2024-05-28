"use client";

import ProfileHeader from "@/components/serviceProviderDashboard/profile/ProfileHeader";
import { motion } from "framer-motion";
import CustomerProfileCompletion from "@/components/dashboard/customer/ProfileCompletion";
import CustomerBadge from "@/components/dashboard/customer/Badge";
import TopActivities from "@/components/dashboard/customer/TopActivities";

const CustomerProfilePage = () => {
  return (
    <main className="space-y-8 p-4 lg:p-8 mt-20">
      <ProfileHeader />
      <section className="flex flex-col flex-wrap gap-6 lg:grid lg:grid-cols-12">
        <motion.div
          className="w-full lg:col-span-12"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.5 }}
        >
          <CustomerProfileCompletion />
        </motion.div>
        <div className="col-span-5 space-y-5">
          <motion.div
            className=""
            initial={{ opacity: 0, translateY: "5rem" }}
            whileInView={{ opacity: 1, translateY: "0" }}
            transition={{ duration: 1.5 }}
          >
            <CustomerBadge />
          </motion.div>
          <motion.div
            className="flex flex-col justify-between gap-4 overflow-hidden rounded-xl bg-[#EBE9F4] p-20"
            initial={{ opacity: 0, translateY: "5rem" }}
            whileInView={{ opacity: 1, translateY: "0" }}
            transition={{ duration: 1.4 }}
          >
            Refer and Earn
          </motion.div>
        </div>
        <motion.div
          className="col-span-7 h-full"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 1.2 }}
        >
          <TopActivities />
        </motion.div>
      </section>
    </main>
  )
}

export default CustomerProfilePage