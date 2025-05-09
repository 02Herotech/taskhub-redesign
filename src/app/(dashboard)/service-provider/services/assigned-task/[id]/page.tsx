import AssignedTaskDetails from '@/components/dashboard/serviceProvider/services/assigned/assigned-task-details'
import React from 'react'

const AssignedTaskDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <AssignedTaskDetails params={params} />
  )
}

export default AssignedTaskDetailsPage