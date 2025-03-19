"use client";
import React from "react";
import Image from "next/image";
import { useGetReceiptsByCustomerIdQuery } from "@/services/bookings";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CgProfile } from "react-icons/cg";

function PaymentHistory() {
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data, isLoading, error } = useGetReceiptsByCustomerIdQuery(
    user?.customerId!,
  );
  return (
    <section className="w-3/5">
      <h3 className="font-semibold mb-1 text-[#0000009E]">Payment History</h3>
      <div className="h-[500px] overflow-y-hidden rounded-2xl border border-[#0000001A]">
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
            {data.length < 1 ? (
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
                <h4 className="mb-3 font-satoshiMedium text-[#756F6F]">
                  Today
                </h4>
                {data?.slice(0, 7).map((payment) => (
                  <li className="flex gap-2" key={Math.random() * 5678}>
                    {/* <Image
                      src="/happy_customer.jpg"
                      alt="Profile picture"
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover object-top md:size-14"
                    /> */}
                    <CgProfile size={30} />
                    <div>
                      <h5 className="font-satoshiBold text-lg font-bold text-[#140B31]">
                        {payment.bookingTitle}
                      </h5>
                      <p className="font-satoshiMedium text-[#716F78]">
                        I need a graphic designer
                      </p>
                    </div>

                    {/* Colors: Successful -> #17A851, Pending -> #FEA621, Failed -> #EA323E */}
                    <div className="ml-auto space-y-2 text-right">
                      <p className="text-sm text-[#5A5960]">10:13 am</p>
                      <p className="text-[#17A851]">Successful</p>
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
