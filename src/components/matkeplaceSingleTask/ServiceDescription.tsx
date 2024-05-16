import Image from "next/image";
import React from "react";
import { BiCalendar, BiLocationPlus } from "react-icons/bi";
import { BsArrowUp } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const ServiceDescription = () => {
  return (
    <article className="lg:col-span-6 space-y-4">
      <p className="font-medium">Recently Added</p>
      <h3 className="font-extrabold text-4xl"> Baby Sitting Service</h3>
      <p className="font-medium underline">Service Purpose</p>
      <p className="font-medium">
        I do this for the love of children and also i also admire the role we
        play in the growth of the children.
      </p>
      <h4 className="font-extrabold text-3xl">Location</h4>
      <p className="flex gap-2 items-center text-slate-500 ">
        <span>
          <BiLocationPlus />
        </span>
        <span>Ashgrove QLD</span>
      </p>
      <p className="text-sm underline flex items-center gap-2 ">
        View Maps <BsArrowUp className="rotate-45" />
      </p>
      <h4 className="font-extrabold text-3xl">Date and Time</h4>
      <p className="flex gap-2 items-center text-slate-500 ">
        <span>
          <BiCalendar />
        </span>
        <span>On Sat, June 8th</span>
      </p>
      <p className="flex gap-2 items-center text-slate-500 ">
        <span>
          <CiClock2 />
        </span>
        <span>Midday</span>
      </p>
      <div className="space-y-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Image
              src="/assets/images/marketplace/singleTask/oluchi.png"
              alt="User"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="space-y-2">
              <p className="text-xl font-medium">Daniels Oluchi</p>
              <div>
                <p className="text-xs text-slate-300 "> 4.5 </p>
                <div className="flex items-center gap-2">
                  <FaStar fill="gold" />
                  <FaStar fill="gold" />
                  <FaStar fill="gold" />
                  <FaStar fill="gold" />
                  <FaStar fill="rgb(203 213 225)" color="rgb(203 213 225)" />
                </div>
              </div>
            </div>
          </div>
          <button className="py-3 px-6 text-white rounded-full bg-[#381F8C]">
            Message
          </button>
        </div>
        <p className="font-medium">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
          reiciendis totam, nobis harum eius quidem cum, consequuntur,
          perspiciatis cumque molestias fugiat tempora amet praesentium quas sed
          quos sunt perferendis odit in voluptates magnam reprehenderit.
          <br />
          <br />
          Iure in omnis fugiat dolorem dolor voluptates nisi consectetur, fuga
          molestiae similique perspiciatis totam odio sit!
        </p>
      </div>
    </article>
  );
};

export default ServiceDescription;
