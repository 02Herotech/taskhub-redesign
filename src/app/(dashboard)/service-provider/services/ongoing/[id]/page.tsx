import OngoingTask from '@/components/dashboard/serviceProvider/services/ongoing/ongoing-task/page'
import React from 'react'

const OngoingTaskPage = ({ params }: { params: { id: string } }) => {
  return (
    <OngoingTask params={params} />
  )
}

export default OngoingTaskPage