import Experience from '@/components/HowTaskhubWorks/customer/Experience'
import Gaurantee from '@/components/HowTaskhubWorks/customer/Gaurantee'
import HowItWorks from '@/components/HowTaskhubWorks/customer/HowItWorks'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "How Taskhub works | Customer",
};

const Customer = () => {
  return (
    <div>
      <HowItWorks/>
      <Gaurantee/>
      <Experience/>
    </div>
  )
}

export default Customer