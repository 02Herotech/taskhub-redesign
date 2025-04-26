import { dayOfWeekNames, monthNames } from '@/lib/utils';
import { getBorderColor, getStatusColor } from '@/shared/statusbadge';
import { Task } from '@/types/services/serviceprovider'
import React from 'react'

const CompletedTaskCard = ({ completedTask }: { completedTask: Task }) => {

  const dateArray = completedTask.createdAt;
  const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  const day = date.getDate();
  function getOrdinalSuffix(day: any) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const daySuffix = getOrdinalSuffix(day);
  const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;
  return (
    <>
      <div className={`relative flex flex-col hover:bg-[#E5FAEA] border-l-[12px] cursor-pointer  shadow-[0px_-4px_132px_0px_#00000017] ${getBorderColor(completedTask.taskStatus)} rounded-2xl shadow-sm bg-white overflow-hidden`}>
        <div className="p-4 pl-5 flex-1">
          <div className="mb-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(completedTask.taskStatus)}`}
            >
              {completedTask.taskStatus}
            </span>
          </div>
          <h3 className="text-xs font-semibold cursor-pointer text-[#0F052E]">{completedTask.taskBriefDescription}</h3>

          <div className="mt-4 flex justify-between items-end">
            <div className="flex flex-col space-y-2 text-xs text-gray-500">
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

              {completedTask.state &&
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{completedTask.state}</span>
                </div>
              }


            </div>

            <div className="text-right">
              <span className="text-3xl font-manrope font-bold text-[#381F8C]">${completedTask.customerBudget}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompletedTaskCard