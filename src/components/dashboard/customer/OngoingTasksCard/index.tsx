"use client";

import { dayOfWeekNames, formatAmount, monthNames } from "@/lib/utils";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Button from "@/components/global/Button";
import Link from "next/link";
import { Task } from "@/types/services/tasks";

interface TaskCardProps {
    task: Task;
}

const OngoingTasksCard = ({ task }: TaskCardProps) => {
    const session = useSession();
    const profileImage = session?.data?.user.user.profileImage;

    // const date = new Date(task.time);
    // const day = date.getDate();
    // const suffixes = ["st", "nd", "rd", "th"];
    // const daySuffix = suffixes[(day - 1) % 10] || suffixes[3];
    // const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

    return (
        <div className="lg:rounded-4xl font-satoshi bg-white p-5 mb-4 flex justify-between border-b">
            <div className="flex items-center space-x-3">
                <Image
                    src={profileImage || "/assets/images/placeholder.jpeg"}
                    alt="Profile"
                    className="size-[90px] rounded-full object-cover"
                    width={90}
                    height={90}
                />
                {/* <div className="space-y-2">
                    <h2 className="font-satoshiMedium text-primary text-xl">{task.serviceProvider}</h2>
                    <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-base font-satoshi text-primary">
                        {task.taskTitle}
                    </h2>
                    <Link href={`/customer/tasks/ongoing-task-details/${task.taskTitle}`}>
                        <Button theme="outline" className="rounded-full">
                            View Service
                        </Button>
                    </Link>
                </div> */}
            </div>
            <div className="flex flex-col justify-between">
                {/* <h5 className="text-base text-tc-orange">{formattedDate}</h5>
                <h2 className="font-bold capitalize text-[#28272A] text-base">
                    Total Cost: {formatAmount(task.price, "USD", false)}
                </h2> */}
            </div>
        </div>
    );
};

export default OngoingTasksCard;
