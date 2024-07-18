import MessageButton from "@/components/global/MessageButton";
import { cn } from "@/lib/utils";
import { formatDateFromNumberArrayToRelativeDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardPropsTypes {
  imageUrl: string | null | undefined;
  fullName: string;
  title: string;
  startDate: number[];
  price: number;
  itemId: number;
  viewJob?: boolean;
  startJob?: () => void;
  reportJob?: () => void;
  completeJob?: () => void;
  sendMessage?: {
    recipientId: string;
    recipientName: string;
    message?: string;
    className?: string;
  };
}

const JobCard = ({
  imageUrl,
  fullName,
  title,
  startDate,
  price,
  itemId,
  viewJob,
  sendMessage,
  reportJob,
  startJob,
  completeJob,
}: CardPropsTypes) => {
  return (
    <div className=" flex gap-3 border-slate-200 py-4  max-md:rounded-xl max-md:border max-md:border-violet-normal max-md:p-4 md:border-b  lg:grid lg:grid-cols-12 lg:items-center lg:px-8 lg:py-4">
      <div className="col-span-2 size-16 flex-shrink-0 overflow-hidden rounded-full border border-violet-normal max-md:hidden lg:size-24 ">
        <Image
          src={imageUrl ?? "/assets/images/serviceProvider/user.jpg"}
          alt={fullName}
          width={200}
          height={200}
          quality={100}
          className="h-full w-full object-cover "
        />
      </div>
      <div className="col-span-10 w-full space-y-4">
        <div className="flex flex-wrap justify-between gap-2 ">
          <div>
            <div className="size-20 overflow-hidden rounded-full border border-violet-normal md:hidden lg:size-24 ">
              <Image
                src={imageUrl ?? "/assets/images/serviceProvider/user.jpg"}
                alt={fullName}
                width={200}
                height={200}
                quality={100}
                className="h-full w-full object-cover "
              />
            </div>
            <p className="text-lg font-semibold text-violet-normal ">
              {fullName}
            </p>
            <p className="text-violet-normal">{title}</p>
          </div>
          <div className="flex flex-col justify-between gap-2 space-y-2">
            <div>
              <p className="text-sm font-bold text-orange-normal first-letter:uppercase">
                {startDate &&
                  formatDateFromNumberArrayToRelativeDate(startDate)}
              </p>
              <p className=" font-bold text-[#28272A]">Total Cost ${price}</p>
            </div>

            {reportJob && (
              <div className="flex justify-end">
                <button
                  className=" rounded-full bg-red-100  px-4 py-2 text-xl font-bold text-red-500 transition-colors duration-300   md:hidden "
                  onClick={reportJob}
                >
                  Report
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex w-full gap-2 max-md:flex-col ">
            {viewJob && (
              <Link
                href={"/service-provider/jobs/" + itemId}
                className="mb-2 whitespace-nowrap rounded-full border border-violet-normal bg-violet-light px-6 py-3 text-center text-sm font-medium text-violet-normal transition-colors duration-300 hover:bg-violet-200 max-md:w-full  max-md:text-xs "
              >
                View Enquiry
              </Link>
            )}
            {startJob && (
              <button
                onClick={startJob}
                className="mb-2 rounded-full border border-violet-normal bg-violet-normal px-6 py-3 text-center text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:w-full  max-md:text-xs "
              >
                Start Service
              </button>
            )}
            {completeJob && (
              <button
                onClick={completeJob}
                className="mb-2 rounded-full border border-violet-normal bg-violet-normal px-6 py-3 text-center text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:w-full  max-md:text-xs "
              >
                Complete Service
              </button>
            )}

            {sendMessage && (
              <MessageButton
                recipientId={sendMessage.recipientId}
                recipientName={sendMessage.recipientName}
                message={sendMessage.message}
                className={cn(
                  "mb-2 rounded-full border border-violet-normal bg-violet-normal px-6 py-3 text-center text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90 max-md:w-full  max-md:text-xs ",
                  sendMessage.className,
                )}
              />
            )}
          </div>

          {reportJob && (
            <div className="flex items-center justify-end">
              <button
                className=" rounded-full px-4  py-2 text-xl font-bold text-red-500 transition-colors duration-300 hover:bg-red-100 max-md:hidden max-md:px-3 max-md:py-1 max-md:text-xs "
                onClick={reportJob}
              >
                Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
