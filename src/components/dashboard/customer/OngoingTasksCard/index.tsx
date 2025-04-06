"use client";

import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Button from "@/components/global/Button";
import Link from "next/link";
import { TaskDetails } from "@/types/services/tasks";

interface TaskCardProps {
    task: TaskDetails;
}

const OngoingTasksCard = ({ task }: TaskCardProps) => {
    const session = useSession();
    const profileImage = session?.data?.user.user.profileImage;
    const firstName = session?.data?.user.user.firstName;
    const lastName = session?.data?.user.user.lastName;
    const fullName = `${firstName} ${lastName}`;

    const date = task?.createdAt ? new Date(task.createdAt[0], task.createdAt[1] - 1, task.createdAt[2]) : new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const monthName = monthNames[month];
    const dayOfWeek = date.getDay();
    const dayOfWeekName = dayOfWeekNames[dayOfWeek];

    // Determine the correct suffix for the day
    let daySuffix;
    if (day === 11 || day === 12 || day === 13) {
        daySuffix = "th";
    } else {
        daySuffix = suffixes[day % 10] || suffixes[0]; // Default to "th" if suffix is undefined
    }

    const formattedDate = `${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;



    return (
        <div className="lg:rounded-4xl font-satoshi bg-white py-5 mb-4 flex flex-col lg:flex-row lg:justify-between border-b">
            <div className="lg:mr-5">
                <Image
                    src={profileImage || "/assets/images/placeholder.jpeg"}
                    alt="Profile"
                    className="object-cover rounded-full w-24 h-24 border border-gray-300"
                    width={100}
                    height={100}
                />
            </div>
            <div className="space-y-1 w-full flex-1">
                <h2 className="font-satoshiMedium text-primary text-xl">{fullName}</h2>
                <h2 className="pb-4 text-base font-satoshi text-primary">
                    {task.jobDescription}
                </h2>
                <Link href={`/customer/tasks/ongoing-task-details/${task.id}`}>
                    <Button theme="outline" className="rounded-full">
                        View Service
                    </Button>
                </Link>
            </div>
            <div className="flex flex-row max-sm:w-full lg:flex-col max-sm:!mt-4 lg:space-y-2 lg:text-right items-center justify-between text-center lg:items-end">
                <h5 className="text-base text-tc-orange">{formattedDate}</h5>
                <h2 className="font-bold capitalize text-[#28272A] text-base">
                    Total Cost: {formatAmount(task.total, "USD", false)}
                </h2>
            </div>
        </div>
    );
};

export default OngoingTasksCard;