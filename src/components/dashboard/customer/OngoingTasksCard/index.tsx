"use client";

import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Button from "@/components/global/Button";
import Link from "next/link";
import { OngoingTask, TaskDetails } from "@/types/services/tasks";

interface TaskCardProps {
    task: TaskDetails;
}

const OngoingTasksCard = ({ task }: TaskCardProps) => {
    const session = useSession();
    const profileImage = session?.data?.user.user.profileImage;
    const firstName = session?.data?.user.user.firstName;
    const lastName = session?.data?.user.user.lastName;
    const fullName = `${firstName} ${lastName}`;

    function formatDateString(isoString: string): string {
        const date = new Date(isoString);

        const day = date.getDate();
        const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

        const getSuffix = (n: number): string => {
            if (n >= 11 && n <= 13) return 'th';
            const lastDigit = n % 10;
            return ['th', 'st', 'nd', 'rd'][lastDigit] || 'th';
        };

        return `${dayOfWeek}, ${month} ${day}${getSuffix(day)}`;
    }


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
                <h5 className="text-base text-tc-orange">{formatDateString(task.createdAt)}</h5>
                <h2 className="font-bold capitalize text-[#28272A] text-base">
                    Total Cost: {formatAmount(task.total, "USD", false)}
                </h2>
            </div>
        </div>
    );
};

export default OngoingTasksCard;