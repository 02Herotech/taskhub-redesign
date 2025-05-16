import PostedByMeDetails from '@/components/dashboard/serviceProvider/services/posted-by-me/posted-by-me-details'
import React from 'react'

const PostedByMeDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <PostedByMeDetails params={params} />
  )
}

export default PostedByMeDetailsPage