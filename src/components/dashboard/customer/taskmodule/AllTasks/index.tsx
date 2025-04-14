"use client";

import { useGetAllTaskByCustomerIdQuery, useGetTaskByCustomerIdQuery } from "@/services/tasks";
import Loading from "@/shared/loading";
import Link from "next/link";
import Button from "@/components/global/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AllTasksCard from "../AllTasksCard";
import Pagination from "@/components/pagination";
import { useEffect, useState } from "react";

const TaskList = () => {
  const [page, setPage] = useState(1)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const userId = user?.customerId

  // Make the query only when the userId is available
  const { data: tasksData, isLoading, error } = useGetAllTaskByCustomerIdQuery({ customerId: userId!, page }, {
    skip: !userId,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);


  if (!userId || isLoading) {
    return <Loading />;
  }

  console.log(tasksData, "task")
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
          <>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {tasksData?.content?.map((task, index) => {
                const isDeleted = task.deleted;
                if (!isDeleted) {
                  return (
                    <AllTasksCard key={index} task={task} />
                  )
                }
              })}
            </div>
            <Pagination pageNumber={tasksData?.pageNumber} setPage={setPage} pageSize={5} totalPages={tasksData?.totalPages} />
          </>
      )}
    </>
  );
};

export default TaskList;
