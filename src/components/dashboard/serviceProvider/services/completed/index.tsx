"use client"
import { useGetServiceProviderCompletedTasksQuery, } from '@/services/tasks';
import Loading from '@/shared/loading';
import { RootState } from '@/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { useGetServiceProviderCompletedJobsQuery } from '@/services/bookings';
import CompletedTaskCard from './completed-task-card';
import Pagination from '@/components/pagination';

const CompletedTasksPage = () => {
  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: completedJobs, isLoading: isLoadingjobs } = useGetServiceProviderCompletedJobsQuery({ providerId: user?.serviceProviderId, page }, {
    skip: !user?.serviceProviderId
  })


  if (!user?.serviceProviderId || isLoadingjobs) {
    return <Loading />;
  }


  return (
    <>

      {completedJobs?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to post a new task.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {completedJobs?.content?.map((completedJob, index) => (
              <CompletedTaskCard key={index} completedJob={completedJob} />
          ))}
        </div>
      )}
      <Pagination pageNumber={completedJobs?.pageNumber} setPage={setPage} totalPages={completedJobs?.totalPages} />
    </>
  )
}

export default CompletedTasksPage

