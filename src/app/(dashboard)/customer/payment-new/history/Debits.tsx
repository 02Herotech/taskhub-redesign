import React, { useState } from "react";
import { useGetPaymentHistoryQuery } from "@/services/wallet";
import { useSession } from "next-auth/react";
import { LuDownload } from "react-icons/lu";
import Image from "next/image";
import Loading from "@/shared/loading";
import Pagination from "@/components/main/marketplace/Pagination";

function formatDate(dateInArray: number[]) {
  const [year, month, day] = dateInArray;
  const date = new Date(year, month - 1, day);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
}

function Debits() {
  const [page, setPage] = useState(0);
  const { data: result, isLoading } = useGetPaymentHistoryQuery({
    size: 20,
    pageIndex: page,
  });
  return (
    <div>
      {isLoading && <Loading />}
      {result && (
        <>
          <div className="mb-7 flex items-center justify-between rounded-xl bg-[#EBE9F4] p-3">
            <div>
              <h4 className="mb-2 text-sm sm:text-base">Total debits</h4>
              <p className="text-2xl text-primary sm:text-4xl">$500.35</p>
            </div>
            {/* <div className="flex flex-col items-center text-[#938F8F]">
              <LuDownload size={25} />
              <p className="text-xs text-[#938F8F]">Download History</p>
            </div> */}
          </div>
          <ul>
            <li>
              <div className="flex justify-between rounded-lg px-3 py-2 shadow-lg">
                <div>
                  <p className="font-satoshiMedium text-xs font-medium text-[#9B9AA9]">
                    10 Feb 2025
                  </p>
                  <p className="mb-1 font-satoshiMedium text-sm font-medium">
                    I need a graphic designer{" "}
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src="/happy_customer.jpg"
                      alt="Customer"
                      className="size-8 rounded-full object-cover"
                    />
                    <p className="font-satoshiMedium text-xs text-[#9B9AA9]">
                      Assigned by Jake Paul
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-1 font-satoshiMedium text-xs text-[#9B9AA9]">
                    Debited
                  </p>
                  <p className="text-black">$200</p>
                </div>
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Debits;
