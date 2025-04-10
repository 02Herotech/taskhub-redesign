import PostedByMe from '@/components/dashboard/customer/taskmodule/PostedByMe/postedbymeDetails'
import React from 'react'

const PostedByMeDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <PostedByMe params={params} />
  )
}

export default PostedByMeDetailsPage