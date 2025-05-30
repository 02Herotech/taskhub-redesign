"use client";

import { useGetTaskByCustomerIdQuery } from "@/services/tasks";
import Loading from "@/shared/loading";
import Link from "next/link";
import Button from "@/components/global/Button";
import NewTasksCard from "../NewTasksCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Pagination from "@/components/pagination";
import { useState } from "react";

const TaskList = () => {
  const [page, setPage] = useState(0)

  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const userId = user?.customerId

  // Make the query only when the userId is available
  const { data: tasksData, isLoading, error } = useGetTaskByCustomerIdQuery({ customerId: userId!, page }, {
    skip: !userId,
  });

  if (!userId || isLoading) {
    return <Loading />;
  }

  return ( 
    <>
      {tasksData?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to post a new task.
          </h2>
          <Link href="/customer/add-task">
            <Button className="rounded-full">Add new task</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {tasksData?.content?.map((task, index) => (
            <NewTasksCard key={index} task={task} />
          ))}
        </div>
      )}
      <Pagination pageNumber={tasksData?.pageNumber} setPage={setPage} totalPages={tasksData?.totalPages} />
    </>
  );
};

export default TaskList;
