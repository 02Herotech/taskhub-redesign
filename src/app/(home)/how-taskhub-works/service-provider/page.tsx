import SPExperience from '@/components/HowTaskhubWorks/Service-provider/SPExperience'
import SPGaurantee from '@/components/HowTaskhubWorks/Service-provider/SPGaurantee'
import SPHowItWorks from '@/components/HowTaskhubWorks/Service-provider/SPHowItWorks'
import React from 'react'

const ServiceProvider = () => {
  return (
    <div>
      <SPHowItWorks/>
      <SPGaurantee/>
      <SPExperience/>
    </div>
  )
}

export default ServiceProvider