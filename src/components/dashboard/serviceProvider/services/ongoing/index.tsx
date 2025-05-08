"use client"
import Loading from '@/shared/loading';
import { RootState } from '@/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import OngoingTaskCard from './ongoing-task-card';
import Pagination from '@/components/pagination';
import { useGetServiceProviderOngoingJobsQuery } from '@/services/bookings';

const OngoingTasksPage = () => {
  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const { data: ongoingJobs, isLoading: isLoadingjobs } = useGetServiceProviderOngoingJobsQuery({ providerId: user?.serviceProviderId, page }, {
    skip: !user?.serviceProviderId
  })


  if (!user?.serviceProviderId || isLoadingjobs) {
    return <Loading />;
  }



  return (
    <>
      {ongoingJobs?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No Task assigned to you yet
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {ongoingJobs?.content?.map((job, index) => (
              <OngoingTaskCard key={index} job={job} />
          ))}
        </div>
      )}
      <Pagination pageNumber={ongoingJobs?.pageNumber} setPage={setPage} totalPages={ongoingJobs?.totalPages} />
    </>
  )
}

export default OngoingTasksPage