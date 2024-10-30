"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { FiCalendar, FiClock } from "react-icons/fi";
import Button from "@/components/global/Button";
import { ShareModal } from "@/components/dashboard/general/ShareModal";
import ShareTask from "@/components/dashboard/general/ShareTask";
import Loading from "@/shared/loading";
import {
    dayOfWeekNames,
    formatAmount,
    formatTime24Hour,
    monthNames,
    suffixes,
} from "@/lib/utils";
import { setCookie } from "cookies-next";
import { ShareSvg } from "@/lib/svgIcons";

// Types
interface Category {
    id: number;
    categoryName: string;
}

interface Task {
    taskId: number;
    taskBriefDescription: string;
    taskDescription: string;
    taskImage: string;
    taskDate: [number, number, number]; // [year, month, day]
    customerBudget: number;
    taskType: string;
    taskTime: [number, number]; // [hour, minute]
    category: Category;
}

interface TaskDetailsPageProps {
    params: {
        id: string;
    };
}

const TaskDetailsPage = ({ params }: TaskDetailsPageProps) => {
    const [task, setTask] = useState<Task | null>(null);
    const [email, setEmail] = useState('');
    const [isInviteLoading, setIsInviteLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inviteError, setInviteError] = useState<string | null>(null);
    const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
    const [authModal, setAuthModal] = useState(false)
    const router = useRouter()
    const pathname = usePathname();
    const id = params.id;

    useEffect(() => {
        const fetchTaskDetails = async () => {
            if (!id) return;

            try {
                setIsLoading(true);
                setError(null);

                const response = await axios.get<Task>(
                    `${process.env.NEXT_PUBLIC_API_URL}/task/fetch/no-auth/${id}`
                );

                setTask(response.data);
            } catch (err) {
                const error = err as AxiosError;
                console.error('Error fetching task details:', error);

                setError(
                    error.response?.status === 404
                        ? 'Task not found'
                        : 'Failed to load task details. Please try again later.'
                );

                setTask(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTaskDetails();
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInviteError(null);

        if (!email) {
            setInviteError('Please enter an email address');
            return;
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setInviteError('Please enter a valid email address');
            return;
        }

        try {
            setInviteError('');
            setIsInviteLoading(true);

            const subject = encodeURIComponent('Check out this task on Oloja');
            const body = encodeURIComponent(`I thought you might be interested in this: ${pathname}`);
            const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
            setEmail('');
            setShareDropdownOpen(false);
        } catch (err) {
            setInviteError('Failed to send invite. Please try again.');
        } finally {
            setIsInviteLoading(false);
        }
    };

    const formatTaskDate = (taskDate: [number, number, number]) => {
        const date = new Date(taskDate[0], taskDate[1] - 1, taskDate[2]);
        const day = date.getDate();
        const month = date.getMonth();
        const monthName = monthNames[month];
        const dayOfWeek = date.getDay();
        const dayOfWeekName = dayOfWeekNames[dayOfWeek];

        const daySuffix = (day === 11 || day === 12 || day === 13)
            ? "th"
            : suffixes[day % 10] || suffixes[0];

        return `${dayOfWeekName}, ${monthName} ${day}${daySuffix}`;
    };

    if (isLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (!task) {
        return (
            <div className="flex h-[50vh] flex-col w-full items-center justify-center">
                <h2 className="text-xl lg:text-3xl font-satoshiBold font-bold text-primary">
                    Task not found!
                </h2>
                <p className="text-lg lg:text-xl font-satoshiMedium text-[#140B31]">
                    Something went wrong, please try again later.
                </p>
            </div>
        );
    }

    const formattedDate = task.taskDate ? formatTaskDate(task.taskDate) : '';

    const handleSignUpNavigation = () => {
        setCookie("redirectToExploreDetail", pathname, { maxAge: 40000 });
        router.push(
            `/auth/sign-upfrom=/explore/task-details/${id}`,
        );
    };

    return (
        <>
            <section className="container py-20 font-satoshi">
                <div className="mt-10 grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:space-x-5">
                    <div className="space-y-7 font-satoshi lg:space-y-10">
                        <h2 className="text-lg font-black text-primary lg:text-4xl">
                            {task.taskBriefDescription}
                        </h2>

                        <div className="space-y-3">
                            <h2 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                                Task Description
                            </h2>
                            <p className="font-satoshiMedium text-xl font-medium text-[#221354]">
                                {task.taskDescription}
                            </p>
                        </div>

                        {/* Share Service */}
                        <div className="bg-[#F8F7FA] px-5 py-3 rounded-xl lg:flex items-center justify-between w-full">
                            <ShareTask pathname={pathname} title={task.taskBriefDescription} description={task.taskDescription} image={task.taskImage} />
                            <div className="relative max-sm:my-3">
                                {/* <Button
                                    theme="secondary"
                                    className="w-[152px] font-satoshiMedium text-white rounded-full"
                                    onClick={() => setShareDropdownOpen(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setShareDropdownOpen(!shareDropdownOpen);
                                        }
                                    }}
                                    aria-expanded={shareDropdownOpen}
                                    aria-haspopup="true"
                                >
                                    Send Invite
                                </Button> */}
                                <div
                                    onClick={() => setShareDropdownOpen(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setShareDropdownOpen(!shareDropdownOpen);
                                        }
                                    }}
                                    className="cursor-pointer transform transition-transform duration-300 group-hover:scale-110"
                                >
                                    {ShareSvg}
                                </div>

                                <ShareModal
                                    isOpen={shareDropdownOpen}
                                    onClose={() => setShareDropdownOpen(false)}
                                    pathname="/current-path"
                                >
                                    <h5 className="text-start">Invite more friends to join</h5>
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="email"
                                            placeholder="Enter e-mail address"
                                            className="mt-4 px-4 py-2 w-full bg-[#EEEEEF] outline-none rounded-lg"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={isInviteLoading}
                                            aria-label="Email address"
                                            aria-describedby={inviteError ? "email-error" : undefined}
                                        />
                                        {inviteError && (
                                            <p id="email-error" className="text-sm text-red-500 mt-1">
                                                {inviteError}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-center mt-5 mb-3">
                                            <Button
                                                theme="secondary"
                                                className="font-satoshiMedium text-white rounded-full"
                                                size="sm"
                                                type="submit"
                                                disabled={isInviteLoading}
                                                loading={isInviteLoading}
                                            >
                                                Send Invite
                                            </Button>
                                        </div>
                                    </form>
                                </ShareModal>
                            </div>
                        </div>

                        {/* <div className="space-y-5">
                                <h4 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                                Location
                                </h4>
                                <div className="flex w-full items-center space-x-2 text-[#716F78]">
                                    <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                                    <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                                    {task.state
                                            ? `${task.postCode}, ${task.suburb}, ${task.state}`
                                            : "Remote"}
                                            </h5>
                                </div>
                                </div> */}

                        <div className="space-y-5">
                            <h4 className="font-satoshiMedium font-bold text-primary lg:text-2xl">
                                Date and Time
                            </h4>
                            <div className="flex items-center space-x-3 text-[#716F78] max-lg:text-xs">
                                <FiCalendar className="h-6 w-6" />
                                <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                                    On {formattedDate}
                                </h5>
                            </div>
                            <div className="flex items-center space-x-3 text-[#716F78] max-lg:text-xs">
                                <FiClock className="h-6 w-6" />
                                <h5 className="font-satoshiMedium text-[15px] font-medium lg:text-xl">
                                    {formatTime24Hour(task.taskTime) || "Flexible"}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-7 lg:space-y-10">
                        <div className="rounded-[20px] border-2 border-primary px-5 py-8">
                            <h2 className="font-satoshi text-lg font-bold text-primary lg:text-3xl">
                                Budget Details
                            </h2>
                            <div className="mb-6 mt-4 border-2 border-primary" />
                            <div className="flex w-full items-center justify-between">
                                <h2 className="font-satoshi text-lg font-bold text-primary lg:text-3xl">
                                    AUD {formatAmount(task.customerBudget, "USD", false)}
                                </h2>
                                <Button
                                    aria-haspopup="true"
                                    className="rounded-full"
                                    onClick={() => setAuthModal(true)}
                                >
                                    Make an offer
                                </Button>
                            </div>
                        </div>

                        <h2 className="text-lg font-bold text-primary lg:text-xl">
                            Reference Images
                        </h2>
                        {task.taskImage ? (
                            <Image
                                src={task.taskImage}
                                width={200}
                                height={100}
                                alt="Explore task"
                                className="h-52 object-cover"
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                </div>
            </section>
            <section
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${authModal ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
            >
                <div
                    className="absolute inset-0 -z-10 h-screen w-screen"
                    onClick={() => setAuthModal(false)}
                ></div>
                <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 bg-violet-light p-3 px-4 lg:space-y-4 lg:p-10">
                    <div className="clip-triangle absolute left-0 top-0 h-full w-full bg-violet-active"></div>
                    <div className="relative flex flex-col items-center justify-center gap-4 bg-white p-6 lg:px-12 ">
                        <Image
                            src="/assets/images/marketplace/singleTask/Frame 1000003668.png"
                            alt="icon"
                            width={100}
                            height={100}
                            className="size-14 object-contain"
                        />
                        <p className="text-center text-xl font-bold text-violet-normal">
                            Sorry! you are not logged in. Please login or create an account to continue
                        </p>
                        <div className="flex items-center gap-4 !mt-5">
                            <Button
                                onClick={() => router.push(`/auth/login?from=/explore/task-details/${id}`)}
                                className="rounded-full"
                                theme="outline"
                                size="sm"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={handleSignUpNavigation}
                                className="rounded-full"
                                size="sm"
                            >
                                Sign up
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TaskDetailsPage;