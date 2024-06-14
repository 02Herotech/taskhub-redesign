'use client'
import BoxFilter from '@/components/main/marketplace/BoxFilter'
import React from 'react'
import { FaGraduationCap, FaHeartbeat, FaHome, FaImage } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdLocalGroceryStore } from "react-icons/md";
import { useRouter } from "next/navigation";

const categoryIcons = [
  FaHome,
  MdPersonalInjury,
  GrPersonalComputer,
  FaGraduationCap,
  FaImage,
  FaHeartbeat,
  BsCalendar2EventFill,
  MdLocalGroceryStore,
];

const SPCategories = () => {
  const router = useRouter()

  const categories = [
    { id: 1, categoryName: 'Home Service' },

    { id: 2, categoryName: 'Beauty' },

    { id: 3, categoryName: 'Information and Technology' },

    { id: 4, categoryName: 'Events' },

    { id: 5, categoryName: 'Art and Craft' },

    { id: 6, categoryName: 'Petcare' },

    { id: 7, categoryName: 'Custodian' },
    { id: 8, categoryName: 'Grocery' },

  ]
  return (
    <div className="my-10 float-none ">
      <h1 className=" lg:text-[25px] text-[20px] font-bold text-primary font-clashMedium   ">
        Browse our Category
      </h1>
      <div className="my-5 flex flex-wrap gap-3 ">
        {categories.map((item, index) => (
          <span key={item.id} onClick={() => router.push('/marketplace')}>
            <BoxFilter
              key={item.id}
              id={item.id}
              category={item.categoryName}
              Icon={categoryIcons[index]}

            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default SPCategories