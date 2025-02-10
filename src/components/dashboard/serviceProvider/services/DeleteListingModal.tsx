"use client";
import { refreshUserProfile } from "@/store/Features/userProfile";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { PiSealCheckFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import useAxios from "@/hooks/useAxios";

interface ModalPropsType {
  isDeleteModalShown: { id: number; isShown: boolean };
  setIsDeleteModalShown: Dispatch<
    SetStateAction<{ id: number; isShown: boolean }>
  >;
}

const DeleteListingModal = ({
  isDeleteModalShown,
  setIsDeleteModalShown,
}: ModalPropsType) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState(false);
  const authInstance = useAxios();

  const handleCloseModal = () => {
    success && dispatch(refreshUserProfile());
    setIsDeleteModalShown({ id: 0, isShown: false });
    setTimeout(() => {
      setSucess(false);
    }, 300);
  };

  const handleDeleteListing = async () => {
    try {
      setLoading(true);
      const url = `listing/delete-listing/` + isDeleteModalShown.id;
      const { data } = await authInstance.delete(url);
      setSucess(true);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`linear fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80 transition-all duration-300 ${isDeleteModalShown.isShown ? " pointer-events-auto opacity-100 " : " pointer-events-none opacity-0 "} `}
    >
      <div
        className="absolute inset-0 -z-20 h-screen  w-screen"
        onClick={handleCloseModal}
      ></div>

      {!success ? (
        <div className="flex w-[90vw] max-w-lg flex-col items-center justify-center gap-4  rounded-lg bg-violet-light p-5">
          <span className="inline-block rounded-full bg-red-300 p-4">
            <BsExclamationTriangle className="size-8 text-red-500 " />
          </span>
          <p className="text-center font-bold text-violet-darker ">
            Are you sure you want to delete this service
          </p>
          <div className="flex items-center justify-center gap-10 py-4">
            <button
              onClick={handleCloseModal}
              className="text-whi mx-auto rounded-full bg-violet-active p-3 px-10 text-center font-bold  transition-opacity duration-300 hover:opacity-90 "
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="mx-auto rounded-full bg-red-500 p-3 px-10 text-center font-bold text-white  transition-opacity duration-300 hover:opacity-90"
              onClick={handleDeleteListing}
            >
              {loading ? (
                <BeatLoader loading={loading} color="white" size={20} />
              ) : (
                " Delete"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-[90vw] max-w-lg flex-col items-center justify-center gap-4  rounded-lg bg-violet-light p-5">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
              <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                <PiSealCheckFill className="size-10 text-green-500" />
              </div>
            </div>
          </div>
          <p className="text-center font-bold text-violet-darker ">
            Service successfully Deleted
          </p>
          <div className="flex items-center justify-center gap-10 py-4">
            <button
              onClick={handleCloseModal}
              className="text-whi mx-auto rounded-full bg-violet-active p-3 px-10 text-center font-bold  transition-opacity duration-300 hover:opacity-90 "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DeleteListingModal;
