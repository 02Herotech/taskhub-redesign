"use client";

import { useGetCustomerOngoingTasksQuery } from "@/services/tasks";
import { useSession } from "next-auth/react";
import Loading from "@/shared/loading";
import Link from "next/link";
import Button from "@/components/global/Button";
import OngoingTasksCard from "../OngoingTasksCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const TaskList = () => {
    const { data: sessionData, status: sessionStatus } = useSession();
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const userId = userProfile.profile?.customerId

    // Make the query only when the userId is available
    const { data: tasksData, isLoading, error } = useGetCustomerOngoingTasksQuery(userId!, {
        skip: !userId,
    });

    // Return loading indicator while the session is loading or if the query is loading
    if (sessionStatus === "loading" || !userId || isLoading) {
        return <Loading />;
    }

    console.log(tasksData)

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
                <div className="space-y-5">
                    {tasksData?.map((task, index) => (
                        <OngoingTasksCard key={index} task={task} />
                    ))}
                </div>
            )}
        </>
    );
};

export default TaskList;
