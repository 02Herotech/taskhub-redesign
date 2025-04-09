import React from 'react'
import CompletedTaskDetailsPage from '@/components/dashboard/customer/CompletedTasks/completedTasksDetails'

const CompletedTaskDetails = ({ params }: { params: { id: string } }) => {
  return (
    <CompletedTaskDetailsPage params={params} />
  )
}

export default CompletedTaskDetails