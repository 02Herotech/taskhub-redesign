import Image from 'next/image'
import React from 'react'

interface MissionItem {
    icon: string;
    title: string;
    description: string;
}

const data: MissionItem[] = [
    {
        icon: "/assets/images/about/mission.png",
        title: "Our Mission",
        description: "We bridge cultural gaps, support community building, and enhance immigrants' economic participation to help them thrive in their new home."
    },
    {
        icon: "/assets/images/about/vision.png",
        title: "Our Vision",
        description: "Empowering immigrants in Australia with seamless access to business education, literacy, and a platform for trade and commerce to foster prosperity."
    },
    {
        icon: "/assets/images/about/goal.png",
        title: "Our Goal",
        description: "This platform aims to help immigrants succeed in the Australian economy by providing resources and opportunities."
    },
]

const Mission: React.FC = () => {
    return (
        <div className='bg-[#FCF5FE]'>
            <div className="container">
                <div className="text-center py-3 lg:py-5">
                    <h3 className='text-primary text-lg lg:text-2xl font-clashBold'>Empowering your Success</h3>
                    <h2 className='text-tc-orange font-clashBold text-xl lg:text-3xl'>Our Mission, Vision and Goal</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-6">
                    {data.map((item, index) => (
                        <div key={index} className="bg-[#EBE9F4] p-4 rounded-3xl space-y-3">
                            <Image
                                src={item.icon}
                                height={500}
                                width={500}
                                alt={item.title}
                                className='rounded-full size-[61px] lg:size-[80px]'
                            />
                            <h3 className="font-clashBold text-lg lg:text-xl text-primary">{item.title}</h3>
                            <p className="text-sm lg:text-base text-[#381F8C]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Mission