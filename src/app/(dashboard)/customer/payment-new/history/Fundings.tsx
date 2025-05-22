import React, { useState } from "react";
import { useGetFundHistoryQuery } from "@/services/wallet";
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

//Todo
//Empty state
//Error state
//Total credits
function Fundings() {
  const [page, setPage] = useState(0);
  const { data: result, isLoading } = useGetFundHistoryQuery({
    size: 20,
    pageIndex: page,
  });
  const session = useSession();

  const totalCredits = result
    ? result.data.transactions
        .reduce((acc, curr) => {
          const amount = curr.amount - curr.amount * 0.017 - 0.3;
          return acc + amount;
        }, 0)
        .toFixed(2)
    : 0;
  return (
    <div>
      {isLoading && <Loading />}
      {result && (
        <>
          <div className="mb-7 flex items-center justify-between rounded-xl bg-[#EBE9F4] p-3">
            <div>
              <h4 className="mb-2 text-sm sm:text-base">Total credits</h4>
              <p className="text-2xl text-primary sm:text-4xl">
                ${result.data.totalOutgoingAmount}
              </p>
            </div>
            {/* <div className="flex flex-col items-center text-[#938F8F]">
              <LuDownload size={25} />
              <p className="text-xs text-[#938F8F]">Download History</p>
            </div> */}
          </div>
          <ul className="space-y-2 md:space-y-3">
            {result?.data.transactions.map((funding) => (
              <li key={funding.transactionId}>
                <div className="flex justify-between rounded-lg px-3 py-2 shadow-sm">
                  <div>
                    <p className="font-satoshiMedium text-xs font-medium text-[#9B9AA9]">
                      {formatDate(funding.createdAt)}
                    </p>
                    <p className="mb-1 font-satoshiMedium text-sm font-medium">
                      Fund added to wallet{" "}
                    </p>
                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          session.data?.user.user.profileImage ||
                          "/assets/images/serviceProvider/user.jpg"
                        }
                        alt="User profile picture"
                        className="size-5 rounded-full object-cover"
                        width={20}
                        height={20}
                      />
                      <p className="font-satoshiMedium text-xs text-[#9B9AA9]">
                        Credited by me
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-right font-satoshiMedium text-xs text-[#9B9AA9]">
                      Pay-in
                    </p>
                    <p className="text-black">
                      $
                      {(funding.amount - funding.amount * 0.017 - 0.3).toFixed(
                        2,
                      )}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            setPage={setPage}
            pageNumber={result.data.pageIndex}
            totalPages={result.data.totalPages}
          />
        </>
      )}
    </div>
  );
}

export default Fundings;
