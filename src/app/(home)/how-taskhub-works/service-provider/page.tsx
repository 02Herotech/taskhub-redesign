import SPCategories from '@/components/HowTaskhubWorks/Service-provider/SPCategories'
import SPGaurantee from '@/components/HowTaskhubWorks/Service-provider/SPGaurantee'
import SPHowItWorks from '@/components/HowTaskhubWorks/Service-provider/SPHowItWorks'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "How Taskhub works | Service Provider",
};

const ServiceProvider = () => {
  return (
    <div>
      <SPHowItWorks/>
      <SPGaurantee/>
      <SPCategories/>
    </div>
  )
}

export default ServiceProvider