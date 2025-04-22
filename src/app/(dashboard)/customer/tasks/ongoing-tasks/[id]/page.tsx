import React from 'react'
import OnogoingTaskDetailsPage from '@/components/dashboard/customer/taskmodule/OngoingTasks/ongoingTaskDetails'

const OnogoingTaskDetails = ({ params }: { params: { id: string } }) => {
  return (
    <OnogoingTaskDetailsPage params={params} />
  )
}

export default OnogoingTaskDetails;