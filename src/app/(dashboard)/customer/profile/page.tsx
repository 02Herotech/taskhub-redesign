"use client";
import ProfileHeader from "@/components/serviceProviderDashboard/profile/ProfileHeader";
import { motion } from "framer-motion";
import CustomerProfileCompletion from "@/components/dashboard/customer/ProfileCompletion";
import CustomerBadge from "@/components/dashboard/customer/Badge";
import TopActivities from "@/components/dashboard/customer/TopActivities";
import { defaultUserDetails } from "@/data/data";
import { useEffect, useState } from "react";
import { instance as authInstance } from "@/utils/axiosInterceptor.config";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "@/store/Features/authStatus";
import useAxios from "@/hooks/useAxios";

const CustomerProfilePage = () => {
  const [fetchedUserData, setFetchedUserData] = useState(defaultUserDetails);
  const dispatch = useDispatch();
  const hookInterceptor = useAxios();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await authInstance.get("customer/profile");
        setFetchedUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();

    async function fetchWithHookInterceptor() {
      try {
        const { data } = await hookInterceptor.get("customer/profile");
        console.log("Data from hook axios instance, ", data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWithHookInterceptor();
  }, []);

  return (
    <main className="mt-[5rem] space-y-8 p-4 lg:p-8">
      <ProfileHeader />
      <button
        onClick={() => dispatch(setAuthStatus(true))}
        className="rounded-3xl bg-primary px-4 py-2 font-satoshiMedium text-white"
      >
        Toggle session timeout
      </button>
      <section className="flex flex-col flex-wrap gap-6 lg:grid lg:grid-cols-12">
        <motion.div
          className="w-full lg:col-span-12"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.5 }}
        >
          {fetchedUserData.firstName && (
            <CustomerProfileCompletion fetchedUserData={fetchedUserData} />
          )}
        </motion.div>
        <div className="col-span-6 space-y-5">
          <motion.div
            className=""
            initial={{ opacity: 0, translateY: "5rem" }}
            whileInView={{ opacity: 1, translateY: "0" }}
            transition={{ duration: 1.5 }}
          >
            <CustomerBadge />
          </motion.div>
          {/* <motion.div
            className="flex flex-col justify-between gap-4 overflow-hidden rounded-xl bg-[#EBE9F4] p-20"
            initial={{ opacity: 0, translateY: "5rem" }}
            whileInView={{ opacity: 1, translateY: "0" }}
            transition={{ duration: 1.4 }}
          >
            Refer and Earn
          </motion.div> */}
        </div>
        <motion.div
          className="col-span-6 h-full"
          initial={{ opacity: 0, translateY: "5rem" }}
          whileInView={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 1.2 }}
        >
          <TopActivities />
        </motion.div>
      </section>
    </main>
  );
};

export default CustomerProfilePage;
