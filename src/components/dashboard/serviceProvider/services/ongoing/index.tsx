"use client"
import { useGetServiceProviderOngoingTasksQuery } from '@/services/tasks';
import Loading from '@/shared/loading';
import { RootState } from '@/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import OngoingTaskCard from './ongoing-task-card';
import Pagination from '@/components/pagination';

const OngoingTasksPage = () => {
  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: ongoingTasks, isLoading, error } = useGetServiceProviderOngoingTasksQuery({ serviceProviderId: user?.serviceProviderId, page: 0 }, {
    skip: !user?.serviceProviderId
  })

  if (!user?.serviceProviderId || isLoading) {
    return <Loading />;
  }

  return (
    <>
      {ongoingTasks?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to post a new task.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {ongoingTasks.content?.map((ongoingTask, index) => (
            <OngoingTaskCard key={index} ongoingTask={ongoingTask} />
          ))}
        </div>
      )}
      <Pagination pageNumber={ongoingTasks?.pageNumber} setPage={setPage} totalPages={ongoingTasks?.totalPages} />
    </>
  )
}

export default OngoingTasksPage