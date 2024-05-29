"use client";

import { useGetTaskByCustomerIdQuery } from "@/services/tasks";
import NewTasksCard from "../NewTasksCard";
import { useSession } from "next-auth/react";
import Loading from "@/shared/loading";
import Link from "next/link";
import Button from "@/components/global/Button";

const TaskList = () => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const userId = sessionData?.user?.user.id;

  // Make the query only when the userId is available
  const { data: tasksData, isLoading, error } = useGetTaskByCustomerIdQuery(userId!, {
    skip: !userId,
  });

  // Return loading indicator while the session is loading or if the query is loading
  if (sessionStatus === "loading" || !userId || isLoading) {
    return <Loading />;
  }

  return (
    <>
      {tasksData?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to add a new task.
          </h2>
          <Link href="/customer/add-task">
            <Button className="rounded-full">Add new task</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasksData?.map((task, index) => (
            <NewTasksCard key={index} task={task} />
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList;
