import { formatTimeAgo } from '@/lib/utils';
import { BookingRequest } from '@/types/chat';
import Image from 'next/image';
import React from 'react'
import { BeatLoader } from 'react-spinners';

type RequestProps = {
  request: BookingRequest;
  listingId: number;
  refetch: any;
  // isAssigned: boolean;
};
const Request = ({ request, listingId, refetch, }: RequestProps) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image
            src={
              request.service_provider_profile_Image ||
              "/assets/images/placeholder.jpeg"
            }
            width={30}
            height={30}
            alt="Service provder profile picture"
            className="size-[30px] rounded-full object-cover object-top md:size-14"
          />
          <p className="font-satoshiMedium text-lg text-primary ">
            {request.fullName}
          </p>

        </div>
        {request.bookingAmount && (
          <p className="font-satoshiMedium text-sm text-[#E58C06] md:text-xl">
            Price: ${request.bookingAmount}
          </p>
        )}
      </div>

      <div className="w-full my-3 ">
        <button
          type="submit"
          className="block w-full cursor-pointer  text-center rounded-full bg-primary px-5 py-2 font-satoshiBold text-sm font-bold text-white disabled:opacity-50 md:text-base"
        // disabled={isAssigned}
        // onClick={() => handleConfirmAssign()}
        >
          {"Send Custome quote"}
        </button>
      </div>

      <div className="flex-grow">
        <div className="relative rounded-xl bg-[#EBE9F4] p-2 sm:p-3">

          <div className=" flex justify-between items-center">
            <p className=" font-manrope text-sm text-[#140B31] sm:max-w-full sm:text-xl">
              {request.message}
            </p>

            <div className="text-right">
              <p className="block font-satoshiMedium text-xs text-primary sm:text-base">
                {formatTimeAgo(request.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Rest of the thread  */}
        <ul className="mt-5 pl-10 w-full space-y-2">
          {request.bookingThreadList.map((bookingThread) => (
            <li key={Math.random() * 1234}>
              <div className="">
                <div className="flex item-center justify-between">
                  <div className="flex gap-1 items-center">
                    <Image
                      src={
                        bookingThread.userProfileImage ||
                        "/assets/images/placeholder.jpeg"
                      }
                      alt="User profile picture"
                      width={30}
                      height={30}
                      className="size-[30px] rounded-full object-cover object-top md:size-12"
                    />
                    <p className="font-satoshiMedium text-base text-primary">
                      {bookingThread.fullName}
                    </p>
                  </div>
                </div>

                <div className=" w-full  p-2  sm:p-3">
                  <p className=" bg-[#B6A58B] p-3 rounded-xl font-manrope text-sm text-[#140B31] w-full sm:text-xl">
                    {bookingThread.message}
                  </p>
                  <p className="block text-right font-manrope text-xs text-primary sm:text-base">
                    {formatTimeAgo(bookingThread.timeStamp)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Request