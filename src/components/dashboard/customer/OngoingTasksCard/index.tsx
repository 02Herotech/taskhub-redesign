"use client";

import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Button from "@/components/global/Button";
import Link from "next/link";
import { CustomerTasks } from "@/types/services/tasks";

interface TaskCardProps {
    task: CustomerTasks;
}

const OngoingTasksCard = ({ task }: TaskCardProps) => {
    const session = useSession();
    const profileImage = session?.data?.user.user.profileImage;
    const firstName = session?.data?.user.user.firstName;
    const lastName = session?.data?.user.user.lastName;
    const fullName = `${firstName} ${lastName}`;

    const dateArray = task.taskDate;
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

    const day = date.getDate();
    const daySuffix = suffixes[(day % 10) - 1] || suffixes[0];

    const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

    return (
        <div className="lg:rounded-4xl font-satoshi bg-white p-5 mb-4 flex flex-col lg:flex-row lg:justify-between border-b">
            <div className="flex items-center lg:items-start space-x-3 mb-4 lg:mb-0">
                <Image
                    src={profileImage || "/assets/images/placeholder.jpeg"}
                    alt="Profile"
                    className="rounded-full object-cover"
                    width={90}
                    height={90}
                />
                <div className="space-y-2 max-w-full lg:max-w-[60%]">
                    <h2 className="font-satoshiMedium text-primary text-xl">{fullName}</h2>
                    <h2 className="py-4 text-base font-satoshi text-primary break-words">
                        {task.taskBriefDescription}
                    </h2>
                    <Link href={`/customer/tasks/ongoing-task-details/${task.id}`}>
                        <Button theme="outline" className="rounded-full">
                            View Service
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-between lg:text-right text-center items-start lg:items-end">
                <h5 className="text-base text-tc-orange">{formattedDate}</h5>
                <h2 className="font-bold capitalize text-[#28272A] text-base">
                    Total Cost: {formatAmount(task.customerBudget, "USD", false)}
                </h2>
            </div>
        </div>
    );
};

export default OngoingTasksCard;
