"use client"
import { marketPlaceModalIcon } from '@/lib/svgIcons';
import { useGetAllServicesByServicesProviderQuery } from '@/services/listings';
import { useGetAllTaskByServiceProviderQuery } from '@/services/tasks'
import { RootState } from '@/store';
import Link from 'next/link';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AllServicesCard from './all-services-card';
import Pagination from '@/components/pagination';
import Loading from '@/shared/loading';

const AllServicesPage = () => {
  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: listings, isLoading: listingLoading, error: listingError } = useGetAllServicesByServicesProviderQuery({ page: 0 }, {
    skip: !user?.serviceProviderId
  })

  const { data: allServices, isLoading, error } = useGetAllTaskByServiceProviderQuery({ serviceProviderId: user?.serviceProviderId, page: 0 }, {
    skip: !user?.serviceProviderId
  })


  if (isLoading) {
    return <Loading />;
  }


  return (
    <>
      {allServices?.content?.length === 0 ?

        <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 p-4 ">
          <span className="size-64">{marketPlaceModalIcon}</span>
          <p className="text-xl font-medium text-violet-normal">
            No active Listing
          </p>
          <Link href="/provide-service" className="rounded-full bg-violet-normal px-6 py-2 text-white transition-all hover:opacity-90">
            Provide Service
          </Link>
        </div> : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {allServices?.content?.map((service, index) => {
                return (
                  <AllServicesCard key={index} service={service} />
                )

              })}
            </div>
            <Pagination pageNumber={allServices?.pageNumber} setPage={setPage} totalPages={allServices?.totalPages} />
          </>

        )
      }
    </>

  )
}

export default AllServicesPage  