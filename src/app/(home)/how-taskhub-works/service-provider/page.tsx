import SPCategories from '@/components/HowTaskhubWorks/Service-provider/SPCategories'
import SPGaurantee from '@/components/HowTaskhubWorks/Service-provider/SPGaurantee'
import SPHowItWorks from '@/components/HowTaskhubWorks/Service-provider/SPHowItWorks'
import React from 'react'

const ServiceProvider = () => {
  return (
    <div>
      <SPHowItWorks/>
      <SPGaurantee/>
      {/* <div className='border-b-[#140B31] border'></div> */}
      <SPCategories/>
    </div>
  )
}

export default ServiceProvider