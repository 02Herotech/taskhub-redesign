import Image from "next/image";
import React from "react";
import { BiCalendar, BiLocationPlus, BiStar } from "react-icons/bi";
import { BsArrowUp, BsTriangleFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const page = () => {
  return (
    <main className="pt-16 text-[#221354]   ">
      <header className="py-10  mx-auto px-10 bg-slate-200 rounded-br-[5rem] rounded-bl-[5rem] ">
        <Image
          src="/assets/images/marketplace/singleTask/marketPlace banner.png"
          alt="banner"
          width={800}
          height={500}
          className="w-full max-w-screen-xl "
        />
      </header>
      <section className="grid lg:grid-cols-12  gap-16 py-10  mx-auto  px-10 max-w-screen-xl ">
        <article className="lg:col-span-6 space-y-4">
          <p className="font-medium">Recently Added</p>
          <h3 className="font-extrabold text-4xl"> Baby Sitting Service</h3>
          <p className="font-medium underline">Service Purpose</p>
          <p className="font-medium">
            I do this for the love of children and also i also admire the role
            we play in the growth of the children.
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
                      <FaStar
                        fill="rgb(203 213 225)"
                        color="rgb(203 213 225)"
                      />
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
              perspiciatis cumque molestias fugiat tempora amet praesentium quas
              sed quos sunt perferendis odit in voluptates magnam reprehenderit.
              <br />
              <br />
              Iure in omnis fugiat dolorem dolor voluptates nisi consectetur,
              fuga molestiae similique perspiciatis totam odio sit!
            </p>
          </div>
        </article>
        <article className="lg:col-span-5 lg:col-start-8 ">
          <div className="py-10 px-8 rounded-2xl border-2 border-[#381F8C] text-[#381F8C]">
            <div className="py-4 border-b-2 border-[#381F8C]">
              <h1 className="text-4xl font-extrabold">Pricing Details </h1>
            </div>

            <div className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-extrabold  flex flex-col ">
                  A$ 30
                  <span className="text-slate-500 font-normal text-base  ">
                    1.5 hours
                  </span>
                </h2>
                <button className="py-3 px-6 rounded-full bg-[#381F8C] text-white hover:opacity-90 ">
                  Book Task
                </button>
              </div>
              <button className="w-full font-normal flex text-slate-500 justify-between gap-2  ">
                Lorem ipsum dolor sit amet elit jkl aols ...
                <span className="pt-2">
                  <BsTriangleFill
                    size={12}
                    fill="[#381F8C]"
                    className="rotate-[60deg]"
                  />
                </span>
              </button>
            </div>
            <div className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-extrabold  flex flex-col ">
                  A$ 30
                  <span className="text-slate-500 font-normal text-base  ">
                    1.5 hours
                  </span>
                </h2>
                <button className="py-3 px-6 rounded-full bg-[#381F8C] text-white hover:opacity-90 ">
                  Book Task
                </button>
              </div>
              <button className="w-full font-normal flex text-slate-500 justify-between gap-2  ">
                Lorem ipsum dolor sit amet elit jkl aols ...
                <span className="pt-2">
                  <BsTriangleFill
                    size={12}
                    fill="[#381F8C]"
                    className="rotate-[60deg]"
                  />
                </span>
              </button>
            </div>
            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-extrabold  flex flex-col ">
                  A$ 30
                  <span className="text-slate-500 font-normal text-base  ">
                    1.5 hours
                  </span>
                </h2>
                <button className="py-3 px-6 rounded-full bg-[#381F8C] text-white hover:opacity-90 ">
                  Book Task
                </button>
              </div>
              <button className="w-full font-normal flex text-slate-500 justify-between gap-2  ">
                Lorem ipsum dolor sit amet elit jkl aols ...
                <span className="pt-2">
                  <BsTriangleFill
                    size={12}
                    fill="[#381F8C]"
                    className="rotate-[60deg]"
                  />
                </span>
              </button>
            </div>
          </div>
        </article>
      </section>

      <section className="py-10  mx-auto px-10 ">
        <Image
          src="/assets/images/marketplace/singleTask/googlemap.png"
          alt="googlemap"
          width={800}
          height={500}
          className="w-full max-w-screen-xl "
        />
      </section>

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
              aliquam alias facere ipsa quasi et hic quos ab, labore ipsum
              tempora modi numquam unde obcaecati asperiores dolor ratione
              voluptas, assumenda a necessitatibus culpa inventore? Iusto porro
              eaque sint illum.
            </p>
            <div className="flex gap-3 items-center">
              <Image
                src="/assets/images/marketplace/singleTask/oluchi.png"
                alt="user"
                width={70}
                height={70}
              />
              <div className="flex flex-col ">
                <p className="text-lg font-medium">Customer's Name</p>
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
              aliquam alias facere ipsa quasi et hic quos ab, labore ipsum
              tempora modi numquam unde obcaecati asperiores dolor ratione
              voluptas, assumenda a necessitatibus culpa inventore? Iusto porro
              eaque sint illum.
            </p>
            <div className="flex gap-3 items-center">
              <Image
                src="/assets/images/marketplace/singleTask/oluchi.png"
                alt="user"
                width={70}
                height={70}
              />
              <div className="flex flex-col ">
                <p className="text-lg font-medium">Customer's Name</p>
                <p className="text-slate-600">Date of review drop</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default page;
