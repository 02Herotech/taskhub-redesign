"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getBorderColor, getStatusColor } from '@/shared/statusbadge';
import { dayOfWeekNames, monthNames, suffixes } from '@/lib/utils';
import { JobItem } from '@/types/services/jobs';
import { FaAddressBook } from 'react-icons/fa6';

const jobCard = ({ job }: { job: JobItem }) => {
  const session = useSession();
  const router = useRouter()
  const profileImage = session?.data?.user.user.profileImage;
  const firstName = session?.data?.user.user.firstName;
  const lastName = session?.data?.user.user.lastName;
  const fullName = `${firstName} ${lastName}`;

  const date = job.jobInfo?.createdAt ? new Date(job.jobInfo.createdAt[0], job.jobInfo.createdAt[1] - 1, job.jobInfo.createdAt[2]) : new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const monthName = monthNames[month];
  const dayOfWeek = date.getDay();
  const dayOfWeekName = dayOfWeekNames[dayOfWeek];
  // Determine the correct suffix for the day
  let daySuffix;
  if (day === 11 || day === 12 || day === 13) {
    daySuffix = "th";
  } else {
    daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
  }

  const formattedDate = `${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;



  return (

    <div onClick={() => router.push(`/service-provider/services/ongoing/${job.jobInfo.id}`)} className={`relative flex flex-col hover:bg-[#F3F0FF] border-l-[12px] cursor-pointer  shadow-[0px_-4px_132px_0px_#00000017] ${getBorderColor("ONGOING")} rounded-2xl shadow-sm bg-white overflow-hidden`}>
      <div className="p-4 pl-5 flex-1">
        <div className="mb-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor("ONGOING")}`}
          >
            {job.jobInfo.jobStatus}
          </span>
        </div>
        <h3 className="text-xs font-semibold text-[#0F052E]">{job.jobInfo.jobTitle}</h3>
        {/* <p className="mt-1 text-sm text-[#110049] line-clamp-3">{job.jobInfo.jobInfo.jobDescription}...</p> */}

        <div className="mt-4 flex justify-between items-end">
          <div className="flex flex-col space-y-1 text-xs text-gray-500">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formattedDate}</span>
            </div>

            {job.jobInfo.jobAddress &&
              <div className="flex items-center">
                <FaAddressBook />
                <span>{job.jobInfo.jobAddress}</span>
              </div>
            }
            <div>
              {/* <span>{job.jobInfo.jobInfo.taskType}</span> */}
            </div>

          </div>

          <div className="text-right">
            <span className="text-3xl font-manrope font-bold text-[#381F8C]">${job.jobInfo.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default jobCard