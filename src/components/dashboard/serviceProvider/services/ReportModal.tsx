import Image from "next/image";
import React from "react";
import { BiFlag, BiX } from "react-icons/bi";
import { GrFlagFill } from "react-icons/gr";
import { PiSealCheckFill } from "react-icons/pi";

const ReportModal = () => {
  return (
    <section className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80 ">
      {/* <div className="w-[90vw] max-w-xl space-y-4 rounded-lg bg-violet-light">
        <div className="flex justify-between border-b-2 border-violet-normal p-5 ">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-violet-darker p-3 ">
              <GrFlagFill className="size-3" fill="white" color="white" />
            </span>
            <h2 className="text-xl font-bold text-violet-normal">
              Report Task
            </h2>
          </div>
          <button className=" rounded-full border border-violet-normal p-1 text-violet-normal transition-colors duration-300 hover:bg-violet-200">
            <BiX className="size-8" />
          </button>
        </div>
        <form className="space-y-5 px-5 py-3 text-violet-darker">
          <label className="flex flex-col gap-2">
            <span className="font-bold">Subject</span>
            <select className="rounded-lg border border-violet-darker p-3">
              <option value=""> Select a category </option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-bold">Subject</span>
            <textarea
              className="min-h-32 rounded-lg border border-violet-darker p-3"
              cols={20}
            />
          </label>

          <div className="flex items-center justify-center">
            <button className="mx-auto rounded-full bg-violet-normal p-3 px-10 text-center text-white transition-opacity  duration-300 hover:opacity-90 ">
              Submit
            </button>
          </div>
        </form>
      </div> */}

      {/* <div className="flex w-[90vw] max-w-lg flex-col items-center justify-center gap-4  rounded-lg bg-violet-light p-5">
        <span className="inline-block rounded-full bg-violet-darker p-2">
          <PiSealCheckFill className="size-8" color="white" />
        </span>
        <h2 className="font-satoshiBold text-2xl font-bold text-violet-normal">
          Report Sent
        </h2>
        <p className="text-center font-bold text-violet-darker ">
          Your report has been sent. we would update you via notification on the
          current status.
        </p>
        <div className="flex items-center justify-center">
          <button className="mx-auto rounded-full bg-violet-normal p-3 px-10 text-center text-white transition-opacity  duration-300 hover:opacity-90 font-bold ">
            Submit
          </button>
        </div>
      </div> */}

      <div className="flex w-[90vw] max-w-lg flex-col items-center justify-center gap-4  rounded-lg bg-violet-light p-5">
        <span className="inline-block rounded-full bg-violet-darker p-2">
          <PiSealCheckFill className="size-8" color="white" />
        </span>
        <h2 className="font-satoshiBold text-2xl font-bold text-violet-normal">
          Complete Service?
        </h2>
        <p className="text-center font-bold text-violet-darker ">
          Are you done with the service? Clicking on complete means that you can
          confirm that you are finished with this service.
        </p>
        <div className="flex items-center justify-center gap-10 py-4">
          <button className="text-whi mx-auto rounded-full bg-violet-active p-3 px-10 text-center font-bold  transition-opacity duration-300 hover:opacity-90 ">
            Cancel
          </button>
          <button className="mx-auto rounded-full bg-violet-normal p-3 px-10 text-center font-bold text-white  transition-opacity duration-300 hover:opacity-90">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReportModal;
