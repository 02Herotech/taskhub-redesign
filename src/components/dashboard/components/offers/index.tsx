// import Offer from '@/app/(dashboard)/customer/tasks/[id]/Offer';
import { useGetTasksOffersQuery } from '@/services/tasks';
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import Offer from './offer';
import { useGetServiceProviderOfferChatsQuery } from '@/services/chat';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


type OffersProps = {
  id: string
  isAssigned: boolean
}
const Offers = ({ id, isAssigned }: OffersProps) => {
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const [viewAll, setViewAll] = useState(false);
  const [showOffers, setShowOffers] = useState(true)
  const { data: offers, isLoading, refetch } = useGetServiceProviderOfferChatsQuery({ taskId: id, serviceProviderId: user?.serviceProviderId }, { skip: !user?.serviceProviderId })

  // const { data: offers, refetch } = useGetTasksOffersQuery(
  //   id as unknown as number,
  // );
  return (
    <div className="mb-4">
      <div className="mt-14 min-h-96">
        <header className="mb-6 mt-10 text-[#E58C06]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-satoshiBold text-xl font-bold lg:text-3xl">
              Offers
            </h2>
            <button
              className="flex items-center gap-3"
              onClick={() => setViewAll(!viewAll)}
            >
              <span className="font-satoshiBold font-bold">
                {viewAll ? "View less" : "View all"}
              </span>
              <FaChevronDown />
            </button>
          </div>
          <p className="font-satoshiBold text-base font-bold text-[#403E44] sm:text-lg">
            <strong className="font-bold text-primary">Note: </strong>
            Before you accept an Offer...
          </p>
          <p className="font-satoshiMedium text-[15px] text-[#55535A] sm:text-lg">
            ✅ Converse with the service provider to ensure they’re the right
            fit.
          </p>
          <p className="font-satoshiMedium text-[15px] text-[#55535A] sm:text-lg">
            ✅{" "}
            <strong className="font-satoshiBold font-bold text-primary">
              Edit your task details
            </strong>{" "}
            (if necessary)—especially the price—to match what you both agreed
            on.
          </p>
        </header>

        <ul className="space-y-3">
          {offers?.map((offer) => (
            <Offer
              key={offer.id}
              offer={offer}
              taskId={Number(id)}
              refetch={refetch}
              isAssigned={isAssigned}
            />
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Offers