import Image from 'next/image'
import { FC } from 'react'

interface Offer {
    id: string
    user: {
        name: string
        avatar: string
    }
    message: string
    timestamp: string
}

interface OffersProps {
    offers: Offer[]
}

const TaskOffers: FC<OffersProps> = ({ offers }) => {
    return (
        <div className="max-h-96 overflow-y-scroll small-scrollbar pr-5 mt-14">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#E58C06] lg:text-3xl">Offers</h2>
                <button className="text-lg font-bold text-[#E58C06] lg:text-2xl">View all</button>
            </div>
            <div className="space-y-5">
                {offers.map((offer) => (
                    <div key={offer.id} className={`flex ${offer.user.name === 'Jane Doe' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`${offer.user.name === 'Jane Doe' ? 'w-[80%]' : 'w-full'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <Image
                                        src={offer.user.avatar}
                                        alt={offer.user.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full mr-2"
                                    />
                                    <span className="font-semibold">{offer.user.name}</span>
                                </div>
                                <span className="text-primary font-semibold">{offer.timestamp}</span>
                            </div>
                            <div className={`p-3 rounded-lg ${offer.user.name === 'Jane Doe'
                                    ? 'bg-orange-100'
                                    : 'bg-gray-100'
                                }`}>
                                <p>{offer.message}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskOffers