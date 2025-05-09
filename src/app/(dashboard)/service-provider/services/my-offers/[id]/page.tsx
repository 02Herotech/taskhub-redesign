import React from 'react'
import OffersDetails from '@/components/dashboard/serviceProvider/services/my-offers/offers-details'

const MyOfferDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <OffersDetails params={params} />
  )
}

export default MyOfferDetailsPage