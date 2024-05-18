import React, { Dispatch, SetStateAction } from "react";
import { BiCheck, BiXCircle } from "react-icons/bi";

type ModalPropsTypes = {
  setIsFormModalShown: Dispatch<SetStateAction<boolean>>;
  isFormModalShown: boolean;
};

const EditProfileModal = ({
  setIsFormModalShown,
  isFormModalShown,
}: ModalPropsTypes) => {
  return (
    <section
      className={`fixed left-0 top-0 z-40 flex h-screen items-center justify-center bg-black bg-opacity-60 transition-opacity duration-500 ${isFormModalShown ? "pointer-events-auto opacity-100 " : "pointer-events-none opacity-0"} `}
    >
      <div className="relative w-[90%] max-w-xl  space-y-10 rounded-3xl bg-white p-4  lg:p-10 ">
        <button
          className="bg-violet-light absolute right-6 top-6 rounded-full p-2"
          onClick={() => setIsFormModalShown((prev) => !prev)}
        >
          <BiXCircle className="h-6 w-6 text-violet-normal" />
        </button>
        <h1 className="text-2xl font-bold text-violet-dark">
          Upload a Selfie Image with ID
        </h1>
        <div className="space-y-2">
          <h3 className="text-xl  font-bold text-violet-normal">Quick Tips</h3>
          <p className="flex gap-4">
            <span className="bg-violet-light h-fit w-fit rounded-full p-1 ">
              <BiCheck className="size-4 text-violet-normal" />
            </span>
            <span className="text-sm font-medium text-slate-500">
              Take a picture of yourself holding up your preferred document on
              the left side of your head showing a clear Id number . See example
            </span>
          </p>
          <p className="flex gap-4">
            <span className="bg-violet-light h-fit w-fit rounded-full p-1 ">
              <BiCheck className="size-4 text-violet-normal" />
            </span>
            <span className="text-sm font-medium text-slate-500">
              Selfie should be taken on a mobile phone.
            </span>
          </p>
          <p className="flex gap-4">
            <span className="bg-violet-light h-fit w-fit rounded-full p-1 ">
              <BiCheck className="size-4 text-violet-normal" />
            </span>
            <span className="text-sm font-medium text-slate-500">
              Selfie should be taken in a properly lit room.
            </span>
          </p>
          <p className="flex gap-4">
            <span className="bg-violet-light h-fit w-fit rounded-full p-1 ">
              <BiCheck className="size-4 text-violet-normal" />
            </span>
            <span className="text-sm font-medium text-slate-500">
              Note that, the more documents you input for verification, the
              higher your chances of visibility to potential customers.
            </span>
          </p>
        </div>
        <button className="rounded-full bg-violet-normal px-6 py-3 text-white transition-opacity duration-300 hover:opacity-90 ">
          Continue
        </button>
      </div>
    </section>
  );
};

export default EditProfileModal;
