"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Reviews = () => {
  const session = useSession();
  const isAuth = session?.data?.user?.accessToken;

  return (
    <section className="space-y-8 bg-status-lightViolet p-4 lg:p-10  ">
      <h1 className="mx-auto text-center text-2xl font-bold lg:text-4xl">
        Reviews/Testimonials from Satisfied Customer
      </h1>
      {/* <form className="flex items-center justify-center gap-4  ">
        <input
          type="text"
          placeholder="Let the provider know you feel..."
          className=" w-screen max-w-sm rounded-2xl border border-slate-300 p-3"
        />
        <button className=" whitespace-nowrap rounded-xl bg-violet-normal px-4 py-3 text-white transition-colors duration-300 hover:opacity-90 max-md:text-sm lg:rounded-full">
          Add Review
        </button>
      </form> */}
      <div className="flex min-h-40 items-center justify-center">
        <p className="animate-pulse text-lg font-medium">
          No current review ...
        </p>
      </div>
      {/* <article className="flex flex-wrap items-center justify-center gap-8">
        <div className="flex w-full max-w-lg flex-col gap-6 ">
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
          <div className="flex items-center gap-3">
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
        <div className="flex w-full max-w-lg flex-col gap-6 ">
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
          <div className="flex items-center gap-3">
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
      </article> */}

      {/* <section className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
        {
          !isAuth && 
            <div className="p-6 rounded-lg flex items-center justify-center flex-col gap-5">
              <p>Kindly signin to leave a review</p>
            </div>

          
        }
      </section> */}
    </section>
  );
};

export default Reviews;
