"use client";

import React from "react";
import { useGetCustomerOngoingTasksQuery } from "@/services/tasks";
import { useSession } from "next-auth/react";
import Loading from "@/shared/loading";
import Link from "next/link";
import Button from "@/components/global/Button";
import OngoingTasksCard from "../OngoingTasksCard";

const TaskList: React.FC = () => {
    const session = useSession();
    const userId = session.data?.user?.user.id;

    const { data: tasksData, isLoading, refetch } = useGetCustomerOngoingTasksQuery(userId!, {
        skip: !userId, // This will skip the query if userId is not available
    });

    if (!userId || isLoading) {
        return <Loading />; // Or any other loading indication while waiting for the userId
    }

    return (
        <>
            {!tasksData?.content?.length && (
                <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
                    <h2 className="text-2xl font-bold text-primary text-center">No tasks in progress, please click to button below to add a new task.</h2>
                    <Link href="/customer/add-task">
                        <Button className="rounded-full">Add new task</Button>
                    </Link>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tasksData?.content?.map((task, index) => (
                    <OngoingTasksCard key={index} task={task} />
                ))}
            </div>
        </>
    );
};

export default TaskList;
