"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getBorderColor, getStatusColor } from '@/shared/statusbadge';
import { dayOfWeekNames, monthNames, suffixes } from '@/lib/utils';
import { JobItem } from '@/types/services/jobs';
import { FaAddressBook } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { formatDateFromNumberArray } from '@/utils';

const jobCard = ({ job }: { job: JobItem }) => {
  const session = useSession();
  const router = useRouter()
  const profileImage = session?.data?.user.user.profileImage;
  const firstName = session?.data?.user.user.firstName;
  const lastName = session?.data?.user.user.lastName;
  const fullName = `${firstName} ${lastName}`;

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

        <div className="mt-4 flex justify-between items-end">
          <div className="flex flex-col space-y-1 text-xs text-gray-500">
            <div className="flex items-center">
              <CiCalendar />
              <span>{formatDateFromNumberArray(job.jobInfo.createdAt)}</span>
            </div>

            {job.jobInfo.jobAddress &&
              <div className="flex items-center">
                <CiLocationOn />
                <span>{job.jobInfo.jobAddress}</span>
              </div>
            }
            <div>
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