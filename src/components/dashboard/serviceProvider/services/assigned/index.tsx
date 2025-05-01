"use client"
import { useGetAllServiceProviderAcceptedJobsQuery, useGetServiceProviderJobsQuery } from '@/services/bookings'
import Loading from '@/shared/loading'
import React from 'react'
import AssignedTaskCard from './assigned-task-card'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const AssignedTask = () => {
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data, isLoading } = useGetServiceProviderJobsQuery({ serviceProviderId: user?.serviceProviderId }, {
    skip: !user?.serviceProviderId
  })

  const bookings = data?.content?.filter((job) => job.jobInfo.jobStatus === "PENDING")

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {bookings?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to post a new task.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {bookings?.map((booking, index) => (
            <AssignedTaskCard key={index} booking={booking} />
          ))}
        </div>
      )}
      {/* <Pagination pageNumber={data?.pageNumber} setPage={setPage} totalPages={data?.totalPages} />  */}
    </>
  )
}

export default AssignedTask