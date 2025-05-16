import CompletedTaskDetails from '@/components/dashboard/serviceProvider/services/completed/completed-task-details'
import React from 'react'

const CompletedTasksPage = ({ params }: { params: { id: string } }) => {
  return (
    <CompletedTaskDetails params={params} />
  )
}

export default CompletedTasksPage