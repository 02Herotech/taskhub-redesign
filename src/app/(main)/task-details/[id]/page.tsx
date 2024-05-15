import Button from '@/components/global/Button'
import React from 'react'

const TaskDetailsPage = () => {
    return (
        <section className="pt-7 container">
            <div className='flex items-center justify-between'>
                <Button theme="secondary" className="hidden px-5 h-[24px] lg:h-[49px] rounded-full text-white font-bold bg-tc-orange lg:flex items-center justify-center">
                    Budget: $3000
                </Button>
                <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border mr-3 border-green-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 p-1" />
                    </div>
                    <p className='text-sm font-bold'>
                        Available
                    </p>
                </div>
            </div>
            <h2 className="text-2xl lg:text-[32px] text-primary font-bold">Plumber Service Needed  at
                Office Kitchen</h2>
        </section>
    )
}

export default TaskDetailsPage