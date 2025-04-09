"use client";
import { useGetServiceProviderPaymentHistoryQuery } from "@/services/tasks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MdArrowOutward } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import Link from "next/link";
import { formatTimeFromDate } from "@/utils";

/**Component for payment history for service provider */
function PaymentHistory() {
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data, isLoading } = useGetServiceProviderPaymentHistoryQuery(
    {
      serviceProviderId: user?.serviceProviderId,
    },
    { skip: !user?.serviceProviderId },
  );

  console.log(data)
  // const [data, setData] = useState<undefined | JobsType[]>(undefined);
  // const [isLoading, setIsLoading] = useState(false);
  // const authInstance = useAxios();
  // const { profile: user } = useSelector(
  //   (state: RootState) => state.userProfile,
  // );
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     if (!user) return;
  //     try {
  //       setIsLoading(true);
  //       const url = `booking/job/service-provider/` + user?.serviceProviderId;
  //       const { data } = await authInstance.get(url);
  //       const completedJobs = data.filter(
  //         (job) => job.jobStatus === "COMPLETED",
  //       );
  //       // setData(completedJobs);
  //     } catch (error: any) {
  //       console.error(error.response || error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchJobs();
  // }, [user]);

  function convertMonthInDateArray(dates: number[]) {
    const [year, month, ...rest] = dates;
    return new Date(year, month - 1, ...rest);
  }

  return (
    <section className="hidden w-3/5 md:block">
      <h3 className="mb-1 font-semibold text-[#0000009E]">Payment History</h3>
      <div className="h-[550px] overflow-y-hidden rounded-2xl border border-[#0000001A]">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/assets/images/marketplace/loader.gif"
              alt="loader"
              width={80}
              height={80}
            />
          </div>
        )}
        {data && (
          <>
            {data.content.length < 1 ? (
              <div className="py-10">
                <Image
                  src="/assets/images/dashboard/empty-transaction-history.png"
                  alt="Empty Transaction history"
                  width={958}
                  height={948}
                  className="mx-auto mb-14 w-2/3"
                />
                <p className="text-center font-semibold text-[#2A1769]">
                  You currently have no payment history. Add a task <br /> or
                  find a service provider to initiate a transaction.
                </p>
              </div>
            ) : (
              <ul className="space-y-4 p-3 py-4">
                {/* <h4 className="mb-3 font-satoshiMedium text-[#756F6F]">
                  Today
                </h4> */}
                {data.content.slice(0, 7).map((payment) => (
                  <li className="flex gap-2" key={Math.random() * 5678}>
                    <Image
                      src="/assets/images/placeholder.png"
                      alt="Profile picture"
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover object-top md:size-14"
                    />
                    <div>
                      <h5 className="font-satoshiBold text-lg font-bold text-[#140B31]">
                        {payment.task.taskBriefDescription}
                      </h5>
                      {/* <p className="font-satoshiMedium text-[#716F78]">
                        {payment.task.taskBriefDescription}
                      </p> */}
                    </div>

                    <div className="ml-auto space-y-2 text-right">
                      <p className="text-sm text-[#5A5960]">
                        {formatTimeFromDate(
                          new Date(
                            convertMonthInDateArray(
                              payment.transactionHistory.transactionDate,
                            ),
                          ),
                        )}
                      </p>
                      {/* Colors: Successful -> #17A851, Pending -> #FEA621, Failed -> #EA323E */}
                      {/* <p className="text-[#17A851]">Successful</p> */}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default PaymentHistory;
