import React from 'react'

const OnogoingTaskDetailsPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    return (
        <div className='p-4 lg:px-14 mt-20'>
            <div className="mt-14 mb-8 space-y-8">
                <h4 className='text-[#140B31] font-satoshiBold font-bold text-3xl lg:text-5xl'>{id}</h4>
                <div className='border-2 border-primary' />
            </div>
            <div  className="font-satoshi">
                <div className="flex space-x-4 text-tc-orange">
                    <p className='text-base'>Please Note: Once a task is finished, you have 24 hrs to approve or request a revision, If no action is taken, the system would automatically approve payment and mark as completed.</p>
                </div>
            </div>
        </div>
    )
}

export default OnogoingTaskDetailsPage