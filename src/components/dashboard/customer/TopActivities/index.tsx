import Link from 'next/link'
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoCreditCard } from "react-icons/go";

const TopActivities = () => {
  return (
    <div className='h-full flex flex-col justify-between font-satoshi rounded-xl bg-[#EBE9F4] p-5'>
      <h4 className="text-lg mb-2 lg:text-3xl font-bold text-[#140B31]">Quick Actions</h4>
      <div className="lg:flex lg:space-x-4">
        <Link href="/customer/add-task" className="bg-[#F7DBB2] rounded-2xl p-4 w-full h-full font-bold text-primary flex flex-col space-y-5 max-lg:mb-4">
          <IoIosAddCircleOutline className='size-8'/>
          Add a Task
        </Link>
        <Link href="/customer/payment?tab=paymentHistory" className="bg-[#F7DBB2] rounded-2xl p-4 w-full h-full font-bold text-primary flex flex-col space-y-5">
          <GoCreditCard className='size-8' />
          Payment history
        </Link>
      </div>
    </div>
  )
}

export default TopActivities