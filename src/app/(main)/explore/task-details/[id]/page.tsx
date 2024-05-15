import Button from '@/components/global/Button'
import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FiCalendar } from "react-icons/fi";
import Image from 'next/image';
import { FaChevronLeft } from 'react-icons/fa6';
import Link from 'next/link';

const TaskDetailsPage = () => {
    return (
        <section className="pt-14 container">
            <div className="space-y-7 lg:space-y-10">
                <Link href="/explore" className="flex items-center space-x-5 lg:space-x-10 text-primary ">
                    <FaChevronLeft />
                    <h2 className='font-bold text-lg lg:text-2xl font-clashDisplay'>Job Details</h2>
                </Link>
                <hr />
                <div className='flex items-center justify-between'>
                    <Button theme="secondary" className="px-5 h-[24px] lg:h-[49px] rounded-lg lg:rounded-2xl text-white font-bold bg-tc-orange flex items-center justify-center">
                        Budget: $3000
                    </Button>
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full border mr-3 border-[#34A853] flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[#34A853] p-1" />
                        </div>
                        <p className='text-sm font-bold'>
                            Available
                        </p>
                    </div>
                </div>
                <h2 className="text-lg lg:text-[32px] text-primary font-bold">Plumber Service Needed  at
                    Office Kitchen
                </h2>
                <div className="flex items-center space-x-2 w-full text-primary">
                    <HiOutlineLocationMarker className="h-6 w-6 font-bold" />
                    <h5 className="max-lg:text-[9px] text-[15px] lg:text-xl">New Sdyney land</h5>
                </div>
                <div className="space-y-3">
                    <h2 className='text-xs lg:text-2xl text-primary'>Description</h2>
                    <p className='text-xs lg:text-xl text-status-darkViolet'>We are currently experiencing issues with the pipes in our office and are in need of professional plumbing services.</p>
                </div>
                <div className="">
                    <h4 className='text-xs lg:text-xl text-dark font-medium mb-2'>Date</h4>
                    <div className="flex items-center space-x-3">
                        <FiCalendar className="h-6 w-6 font-bold text-tc-orange" />
                        <div className="max-lg:text-xs ">
                            <h5 className="font-medium text-primary">TO BE DONE ON</h5>
                            <h5>Before Mon, 22 July (Midday) (10am - 2pm)</h5>
                        </div>
                    </div>
                </div>
                <h2 className='text-primary font-bold text-lg lg:text-2xl'>Reference Images</h2>
                <Image src="/assets/images/task.jpg" width={200} height={125} alt="Explore task" />
                <Button className='rounded-full max-lg:text-sm'>
                    Make an offer
                </Button>
            </div>
        </section>
    )
}

export default TaskDetailsPage