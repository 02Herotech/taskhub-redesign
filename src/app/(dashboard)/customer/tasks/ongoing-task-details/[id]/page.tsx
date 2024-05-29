"use client"

import Button from '@/components/global/Button';
import { CautionSvg } from '@/lib/svgIcons';
import { formatAmount } from '@/lib/utils';
import { useGetTaskByIdQuery } from '@/services/tasks';
import Loading from '@/shared/loading';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import { IoArrowBackSharp } from "react-icons/io5";

const OnogoingTaskDetailsPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');

    const inspectionTimes = ['1 hour', '3 hours', '5 hours', '24 hours', '3 days', '5 days', '7 days'];

    const { data: task, isLoading } = useGetTaskByIdQuery(id as unknown as number);

    if (!task) {
        return (
            <div className="w-full flex items-center justify-center h-[full]">
                <Loading />
            </div>
        )
    }

    return (
        <div className='p-4 lg:px-14 mt-20'>
            <div className="mt-14 mb-8 space-y-8">
                <h4 className='text-[#140B31] font-satoshiBold font-bold text-3xl lg:text-5xl'>My Tasks</h4>
                <div className='border-2 border-primary' />
            </div>
            <div className="flex items-center space-x-2 mb-5">
                <Button className='px-2' onClick={router.back}>
                    <IoArrowBackSharp className='size-7' />
                </Button>
                <Button>
                    My ongoing task
                </Button>
            </div>
            <div className="font-satoshi">
                <div className="flex items-center space-x-4 text-tc-orange w-full rounded-3xl bg-[#FFF0DA] py-4 px-8">
                    {CautionSvg}
                    <p className='text-base'>Please Note: Once a task is finished, you have 24 hrs to approve or request a revision, If no action is taken, the system would automatically approve payment and mark as completed.</p>
                </div>
            </div>
            <div className="mt-8 lg:flex lg:space-x-8 justify-between border-b border-[#C1BADB] pb-8">
                <div className="space-y-5 flex-1">
                    <h1 className='text-primary font-satoshiBold text-3xl lg:text-4xl'>{task.taskBriefDescription}</h1>
                    <h5 className='text-black text-xl lg:text-2xl'>{task.taskDescription}</h5>
                    <div className="relative">
                        <button
                            className="w-[190px] flex items-center justify-center gap-x-4 rounded-3xl bg-[#F1F1F2] px-4 py-2 text-base font-bold text-[#140B31] transition-colors duration-300"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div
                                className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen ? "block" : "hidden"} `}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            ></div>
                            Inspect task
                            <span>
                                <BsTriangleFill
                                    fill="#140B31"
                                    className="size-2 rotate-[60deg] text-[#140B31]"
                                />
                            </span>
                        </button>
                        <div
                            className={`small-scrollbar absolute top-[calc(100%+0.2rem)] flex max-h-0 w-[190px] flex-col rounded-md bg-[#F1F1F2] transition-all duration-300 ${isDropdownOpen ? "max-h-64 overflow-y-auto" : "max-h-0  overflow-hidden"} `}
                        >
                            <div className="p-5 space-y-3 w-full">
                                {inspectionTimes.map((time, index) => (
                                    <label key={index} className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="inspectionTime"
                                            value={time}
                                            checked={selectedTime === time}
                                            onChange={() => setSelectedTime(time)}
                                            className="form-radio"
                                        />
                                        <span className='lg:text-xl text-primary font-satoshiMedium'>{time}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <h4 className='text-xl text-[#716F78]'>{task.taskTime}</h4>
                    <h2 className="text-2xl font-bold capitalize text-primary lg:text-[22px]">
                        {formatAmount(task.customerBudget, "USD", false)}
                    </h2>
                    <div className="flex items-center justify-end space-x-10 lg:text-xl">
                        <button className='text-tc-orange'>Request Revision</button>
                        <button className='text-[#34A853]'>Approve payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnogoingTaskDetailsPage