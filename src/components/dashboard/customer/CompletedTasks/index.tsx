"use client";

import { useGetCustomerCompletedTasksQuery } from "@/services/tasks";
import { useSession } from "next-auth/react";
import Loading from "@/shared/loading";
import CompletedTasksCard from "../CompletedTasksCard";

const TaskList: React.FC = () => {
    const session = useSession();
    const userId = session.data?.user?.user.id;

    const { data: tasksData, isLoading } = useGetCustomerCompletedTasksQuery(userId!, {
        skip: !userId, // This will skip the query if userId is not available
    });

    if (!userId || isLoading) {
        return <Loading />; // Or any other loading indication while waiting for the userId
    }

    return (
        <>
            {!tasksData?.length && (
                <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
                    <h2 className="text-2xl font-bold text-primary text-center">No tasks completed</h2>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tasksData?.map((task, index) => (
                    <CompletedTasksCard key={index} task={task} />
                ))}
            </div>
        </>
    );
};

export default TaskList;
