"use client"

import Button from '@/components/global/Button';
import { CautionSvg } from '@/lib/svgIcons';
import { useRouter } from 'next/navigation';
import { IoArrowBackSharp } from "react-icons/io5";

const OnogoingTaskDetailsPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const router = useRouter(); 

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
            <div className="">
                
            </div>
        </div>
    )
}

export default OnogoingTaskDetailsPage