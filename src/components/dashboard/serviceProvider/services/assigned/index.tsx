"use client"
import { useGetServiceProviderAssignedJobsQuery, useGetServiceProviderJobsQuery } from '@/services/bookings'
import Loading from '@/shared/loading'
import React, { useState } from 'react'
import AssignedTaskCard from './assigned-task-card'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Pagination from '@/components/pagination'

const AssignedTask = () => {
  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data, } = useGetServiceProviderJobsQuery({ serviceProviderId: user?.serviceProviderId, page }, {
    skip: !user?.serviceProviderId
  })
  const { data: assignedJobs, isLoading, isError } = useGetServiceProviderAssignedJobsQuery({ serviceProviderId: user?.serviceProviderId, page }, {
    skip: !user?.serviceProviderId
  })

  console.log(assignedJobs, "assigned Jobs")

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
      <h2 className="text-2xl font-bold text-primary text-center">
        No jobs found for this service provider </h2>
    </div>

  }

  return (
    <>
      {assignedJobs?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to post a new task.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {assignedJobs?.content?.map((booking, index) => (
            <AssignedTaskCard key={index} booking={booking} />
          ))}
        </div>
      )}
      <Pagination pageNumber={assignedJobs?.pageNumber} setPage={setPage} totalPages={assignedJobs?.totalPages} /> 
    </>
  )
}

export default AssignedTask