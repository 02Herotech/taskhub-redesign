import { dayOfWeekNames, monthNames } from '@/lib/utils';
import { getBorderColor, getStatusColor } from '@/shared/statusbadge';
import { JobItem } from '@/types/services/jobs';
import { formatDateFromNumberArray } from '@/utils';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CiCalendar, CiLocationOn } from 'react-icons/ci';

const CompletedTaskCard = ({ completedJob }: { completedJob: JobItem }) => {
  const router = useRouter()


  return (
    <>
      <div onClick={() => router.push(`/service-provider/services/completed/${completedJob.jobInfo.id}`)} className={`relative flex flex-col hover:bg-[#E5FAEA] border-l-[12px] cursor-pointer  shadow-[0px_-4px_132px_0px_#00000017] border-green-500  rounded-2xl  bg-white overflow-hidden`}>
        <div className="p-4 pl-5 flex-1">
          <div className="mb-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-500 bg-green-50 ${getStatusColor("COMPLETED")}`}
            >
              {"COMPLETED"}
            </span>
          </div>
          <h3 className="text-xs font-semibold cursor-pointer text-[#0F052E] capitalize">{completedJob.jobInfo.jobTitle}</h3>

          <div className="mt-4 flex justify-between items-end">
            <div className="flex flex-col space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <CiCalendar />
                <span>{formatDateFromNumberArray(completedJob.jobInfo.createdAt)}</span>
              </div>

              {completedJob.jobInfo.jobAddress &&
                <div className="flex items-center gap-1">
                  <CiLocationOn />
                  <span>{completedJob.jobInfo.jobAddress}</span>
                </div>
              }
            </div>

            <div className="text-right">
              <span className="text-3xl font-manrope font-bold text-[#381F8C]">${completedJob.jobInfo.total}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompletedTaskCard