"use client";

import { useGetCustomerCompletedTasksQuery } from "@/services/tasks";
import Loading from "@/shared/loading";
import CompletedTasksCard from "../CompletedTasksCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const TaskList: React.FC = () => {
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const userId = userProfile.profile?.customerId

    const { data: tasksData, isLoading } = useGetCustomerCompletedTasksQuery(userId!, {
        skip: !userId, // This will skip the query if userId is not available
    });

    console.log('tasksData', tasksData);

    if (!userId || isLoading) {
        return <Loading />; 
    }

    return (
        <>
            {!tasksData?.length && (
                <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
                    <h2 className="text-2xl font-bold text-primary text-center">No tasks completed</h2>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {tasksData?.map((task, index) => (
                    <CompletedTasksCard key={index} task={task} />
                ))}
            </div>
        </>
    );
};

export default TaskList;
