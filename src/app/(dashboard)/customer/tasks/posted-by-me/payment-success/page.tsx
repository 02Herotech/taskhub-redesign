"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const PaymenntSuccess = () => {
  const router = useRouter()
  return (
    <div className='max-w-[700px] mx-auto h-full'>
      <div>
        <Image src="/assets/images/paymentsuccess.png" alt="Successfull Payment" width={300} height={200} className='mx-auto' />
      </div>

      <h1 className='text-primary text-3xl font-bold my-4 text-center'>Way to go!!</h1>
      <p className='text-primary font-medium text-center max-w-[600px] mx-auto text-xl'>Your payment has been processed successfully. Now relax while we inform the service provider to begin your task.</p>

      <div className='mt-4'>
        <button onClick={() => router.back()} className='bg-primary text-center text-white px-8 py-2 rounded-[50px]'>
          Done
        </button>
      </div>
    </div>
  )
}

export default PaymenntSuccess