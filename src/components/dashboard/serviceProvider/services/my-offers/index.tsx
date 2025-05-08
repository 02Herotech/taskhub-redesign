import React, { useState } from 'react'
import OfferCard from './offers-card'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetServiceProvidersOfferQuery } from '@/services/chat';
import Loading from '@/shared/loading';
import Pagination from '@/components/pagination';

const MyOffers = () => {

  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: offers, isLoading } = useGetServiceProvidersOfferQuery({ providerId: user?.serviceProviderId, page })

  if (!user?.serviceProviderId || isLoading) {
    return <Loading />;
  }

  return (
    <>
      {offers?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            You haven't made a any offer yet
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {offers?.content?.map((offer, index) => (
            <OfferCard key={index} offer={offer} />
          ))}
        </div>
      )}
      <Pagination pageNumber={offers?.pageNumber} setPage={setPage} totalPages={offers?.totalPages} />
    </>
  )
}

export default MyOffers


