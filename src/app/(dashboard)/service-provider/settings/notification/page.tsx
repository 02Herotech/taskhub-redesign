import React from "react";
import { BiBell } from "react-icons/bi";

const Notification = () => {
  return (
    <main className="mt-[4rem] p-4 lg:px-14">
      <div className="mb-8 flex  justify-between space-y-8 bg-violet-light px-20 py-10 max-lg:px-10 max-lg:py-6  ">
        <section className="">
          <h4 className="font-satoshiBold text-2xl font-bold text-[#140B31] lg:text-3xl">
            Control how we notify you
          </h4>
          <p>Notify me</p>
        </section>
        <span className="rounded-md bg-white p-4  ">
          {" "}
          <BiBell />{" "}
        </span>
      </div>

      <section></section>
    </main>
  );
};

export default Notification;
