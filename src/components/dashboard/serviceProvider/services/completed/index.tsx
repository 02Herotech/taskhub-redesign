"use client"
import { useGetServiceProviderCompletedTasksQuery, } from '@/services/tasks';
import Loading from '@/shared/loading';
import { RootState } from '@/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Pagination from '@/components/pagination';
import CompletedTaskCard from './completed-task-card';

const CompletedTasksPage = () => {
  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: completedTasks, isLoading, error } = useGetServiceProviderCompletedTasksQuery({ serviceProviderId: user?.serviceProviderId, page: 0 }, {
    skip: !user?.serviceProviderId
  })

  if (!user?.serviceProviderId || isLoading) {
    return <Loading />;
  }

  return (
    <>
      {completedTasks?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to post a new task.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {completedTasks.content?.map((completedTask, index) => (
            <CompletedTaskCard key={index} completedTask={completedTask} />
          ))}
        </div>
      )}
      <Pagination pageNumber={completedTasks?.pageNumber} setPage={setPage} totalPages={completedTasks?.totalPages} />
    </>
  )
}

export default CompletedTasksPage

///api/v1/task/provider-completed-tasks/{serviceProviderId}
// /api/v1/task/provider-ongoing-tasks/{serviceProviderId}