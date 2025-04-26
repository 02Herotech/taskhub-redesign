"use client"
import Pagination from '@/components/pagination';
import { useGetAllServicesByServicesProviderQuery } from '@/services/listings';
import Loading from '@/shared/loading';
import { RootState } from '@/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import PostedByMeCard from './posted-by-me-card';

const PostedByMePage = () => {
  const [page, setPage] = useState(0)
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { data: listings, isLoading: listingLoading, error: listingError } = useGetAllServicesByServicesProviderQuery({ page: 0 }, {
    skip: !user?.serviceProviderId
  })

  if (listingLoading) {
    return <Loading />;
  }

  return (
    <>
      {listings?.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 h-[50vh]">
          <h2 className="text-2xl font-bold text-primary text-center">
            No tasks available, please click the button below to post a new task.
          </h2>
        </div>
      ) : (
        <>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {listings?.content?.map((listing, index) => {
              return (
                <PostedByMeCard key={index} listing={listing} />
              )
            })}
          </div>
          <Pagination pageNumber={listings?.pageNumber} setPage={setPage} totalPages={listings?.totalPages} />
        </>
      )}
    </>
  )
}

export default PostedByMePage