import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  return (
    <section className="bg-status-lightViolet py-10 px-10 space-y-8  ">
      <h1 className="max-w-screen-sm text-center text-4xl font-bold mx-auto">
        Reviews/Testimonials from Satisfied Customer
      </h1>
      <form className="flex gap-4 items-center justify-center  ">
        <input
          type="text"
          placeholder="Let the provider know you feel..."
          className=" p-3 max-w-sm w-screen rounded-2xl border border-slate-300"
        />
        <button className="px-6 py-3 rounded-full bg-[#381F8C] text-white hover:opacity-90 transition-colors duration-300">
          Add Review
        </button>
      </form>
      <article className="flex items-center justify-center gap-8">
        <div className="flex flex-col gap-6 max-w-lg w-full ">
          <div className="flex items-center gap-2">
            <FaStar fill="gold" />
            <FaStar fill="gold" />
            <FaStar fill="gold" />
            <FaStar fill="gold" />
            <FaStar fill="rgb(203 213 225)" color="rgb(203 213 225)" />
          </div>
          <p className="font-medium ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ea,
            aliquam alias facere ipsa quasi et hic quos ab, labore ipsum tempora
            modi numquam unde obcaecati asperiores dolor ratione voluptas,
            assumenda a necessitatibus culpa inventore? Iusto porro eaque sint
            illum.
          </p>
          <div className="flex gap-3 items-center">
            <Image
              src="/assets/images/marketplace/singleTask/oluchi.png"
              alt="user"
              width={70}
              height={70}
            />
            <div className="flex flex-col ">
              <p className="text-lg font-medium">Customer Name</p>
              <p className="text-slate-600">Date of review drop</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 max-w-lg w-full ">
          <div className="flex items-center gap-2">
            <FaStar fill="gold" />
            <FaStar fill="gold" />
            <FaStar fill="gold" />
            <FaStar fill="gold" />
            <FaStar fill="rgb(203 213 225)" color="rgb(203 213 225)" />
          </div>
          <p className="font-medium ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ea,
            aliquam alias facere ipsa quasi et hic quos ab, labore ipsum tempora
            modi numquam unde obcaecati asperiores dolor ratione voluptas,
            assumenda a necessitatibus culpa inventore? Iusto porro eaque sint
            illum.
          </p>
          <div className="flex gap-3 items-center">
            <Image
              src="/assets/images/marketplace/singleTask/oluchi.png"
              alt="user"
              width={70}
              height={70}
            />
            <div className="flex flex-col ">
              <p className="text-lg font-medium">Customer Name</p>
              <p className="text-slate-600">Date of review drop</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Reviews;
