"use client";

import { useGetCustomerOngoingTasksQuery } from "@/services/tasks";
import Loading from "@/shared/loading";
import Link from "next/link";
import Button from "@/components/global/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import OngoingTasksCard from "./OngoingTasksCard";
import Pagination from "@/components/pagination";
import { useState } from "react";

const TaskList = () => {
    const [page, setPage] = useState(0)
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const userId = userProfile.profile?.customerId

    // Make the query only when the userId is available
    const { data: tasksData, isLoading } = useGetCustomerOngoingTasksQuery({ customerId: userId!, page }, {
        skip: !userId,
    });

    // Return loading indicator while the session is loading or if the query is loading
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
                        <OngoingTasksCard key={index} task={task} />
                    ))}
                </div>
            )}

            <Pagination pageNumber={tasksData?.pageNumber} setPage={setPage} totalPages={tasksData?.totalPages} />

        </>
    );
};

export default TaskList;
