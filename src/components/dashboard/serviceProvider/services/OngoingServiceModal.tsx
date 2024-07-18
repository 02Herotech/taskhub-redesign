"use client";
import { fetchAllMarketplaseCategories } from "@/lib/marketplace";
import { RootState } from "@/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiFlag, BiX } from "react-icons/bi";
import { BsExclamationTriangle, BsTriangleFill } from "react-icons/bs";
import { GrFlagFill } from "react-icons/gr";
import { PiSealCheckFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

interface ModalType {
  modalData: ModalDataType;
  setModalData: Dispatch<SetStateAction<ModalDataType>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const OngoingServiceModal = ({
  modalData,
  setModalData,
  setRefresh,
}: ModalType) => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [completeJobState, setCompleteJobState] = useState({
    message: "",
    loading: false,
  });
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formState, setFormState] = useState({
    category: "Select a category",
    message: "",
    loading: false,
    jobId: modalData.message,
    isReportSent: false,
  });

  const handleCloseModal = () => {
    setModalData({
      isModalShown: false,
      message: "",
      isStartService: false,
      error: "",
      isCompleteService: false,
      isReportService: false,
    });
    setRefresh((prev) => !prev);
    setFormState({
      category: "Select a category",
      message: "",
      loading: false,
      jobId: modalData.message,
      isReportSent: false,
    });
  };

  const handleCompleteService = async () => {
    try {
      setCompleteJobState({ ...completeJobState, loading: true });
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/complete-task?jobId=" +
        modalData.message;
      const body = { jobId: modalData.message };
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalData((prev) => ({
        ...prev,
        isStartService: true,
        isCompleteService: false,
        message: data.message,
      }));
    } catch (error: any) {
      setModalData((prev) => ({
        ...prev,
        isStartService: true,
        isCompleteService: false,
        error: "Kindly check your network connection",
      }));
    } finally {
      setCompleteJobState({ ...completeJobState, loading: false });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryData: CategoryType[] =
        await fetchAllMarketplaseCategories();
      setCategories(categoryData);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleSubmitReport = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      setFormState((prev) => ({ ...prev, loading: true }));
      const body = {
        subject: formState.category,
        description: formState.message,
      };
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/job/report/" +
        modalData.message;
      const { data } = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormState((prev) => ({ ...prev, isReportSent: true }));
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <section
      className={`linear fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80 transition-all duration-300 ${modalData.isModalShown ? " pointer-events-auto opacity-100 " : " pointer-events-none opacity-0 "} `}
    >
      <div
        className="absolute inset-0 -z-20 h-screen  w-screen"
        onClick={handleCloseModal}
      ></div>
      {modalData.isStartService ? (
        <div className="flex w-[90vw] max-w-lg flex-col items-center justify-center gap-4  rounded-lg bg-violet-light p-5">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
            <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
              <PiSealCheckFill className="size-10 text-green-500" />
            </div>
          </div>
          <h2 className="font-satoshiBold text-2xl font-bold text-violet-normal">
            Report Sent
          </h2>
          <p className="text-center font-bold text-violet-darker ">
            {modalData.message}
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={handleCloseModal}
              className="mx-auto rounded-full bg-violet-normal p-3 px-10 text-center font-bold text-white  transition-opacity duration-300 hover:opacity-90 "
            >
              View my services
            </button>
          </div>
        </div>
      ) : modalData.isCompleteService ? (
        <div className="flex w-[90vw] max-w-lg flex-col items-center justify-center gap-4  rounded-lg bg-violet-light p-5">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
            <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
              <PiSealCheckFill className="size-10 text-green-500" />
            </div>
          </div>
          <h2 className="font-satoshiBold text-2xl font-bold text-violet-normal">
            Complete Service?
          </h2>
          <p className="text-center font-bold text-violet-darker ">
            Are you done with the service? Clicking on complete means that you
            can confirm that you are finished with this service.
          </p>
          <div className="flex items-center justify-center gap-10 py-4">
            <button
              onClick={handleCloseModal}
              className="text-whi mx-auto rounded-full bg-violet-active p-3 px-10 text-center font-bold  transition-opacity duration-300 hover:opacity-90 "
            >
              Cancel
            </button>
            <button
              disabled={completeJobState.loading}
              className="mx-auto rounded-full bg-violet-normal p-3 px-10 text-center font-bold text-white  transition-opacity duration-300 hover:opacity-90"
              onClick={handleCompleteService}
            >
              {completeJobState.loading ? (
                <BeatLoader
                  loading={completeJobState.loading}
                  color="white"
                  size={20}
                />
              ) : (
                " Submit"
              )}
            </button>
          </div>
        </div>
      ) : (
        modalData.isReportService &&
        (!formState.isReportSent ? (
          <div className="w-[90vw] max-w-xl space-y-4 rounded-lg bg-violet-light">
            <div className="flex justify-between border-b-2 border-violet-normal p-5 ">
              <div className="flex items-center gap-3">
                <span className="inline-block rounded-full bg-violet-darker p-3 ">
                  <GrFlagFill className="size-3" fill="white" color="white" />
                </span>
                <h2 className="text-xl font-bold text-violet-normal">
                  Report Task
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className=" rounded-full border border-violet-normal p-1 text-violet-normal transition-colors duration-300 hover:bg-violet-200"
              >
                <BiX className="size-8" />
              </button>
            </div>
            <form
              onSubmit={(event) => handleSubmitReport(event)}
              className="space-y-5 px-5 py-3 text-violet-darker"
            >
              <div className="relative flex flex-col gap-2 ">
                <span className="font-bold">Subject</span>
                <button
                  className="flex items-center justify-between gap-2 rounded-md border border-violet-darker bg-white px-4 py-2 text-base font-bold text-violet-darker transition-colors duration-300 hover:bg-violet-100 lg:pr-6 "
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formState.category}
                  <div
                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen ? "block" : "hidden"} `}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  ></div>
                  <span>
                    <BsTriangleFill
                      fill="rgb(56 31 140)"
                      className="size-2 rotate-[60deg] text-violet-normal"
                    />
                  </span>
                </button>

                <div
                  className={`small-scrollbar absolute top-[calc(100%+1rem)] z-50 flex max-h-0 min-w-full flex-col rounded-md bg-white transition-all duration-300 ${isDropdownOpen ? "max-h-64 overflow-y-auto border border-slate-100 " : "max-h-0  overflow-hidden "} `}
                >
                  {categories.map((item) => (
                    <button
                      type="button"
                      className=" relative whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                      key={item.id}
                      onClick={() => {
                        setFormState((prev) => ({
                          ...prev,
                          category: item.categoryName,
                        }));
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.categoryName}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-bold">Describe the problem</span>
                <textarea
                  className="min-h-32 rounded-lg border border-violet-darker p-3"
                  cols={20}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      message: event.target.value,
                    }))
                  }
                />
              </label>

              <div className="flex items-center justify-center">
                <button
                  disabled={formState.loading}
                  className="mx-auto rounded-full bg-violet-normal p-3 px-10 text-center text-white transition-opacity  duration-300 hover:opacity-90 "
                >
                  {formState.loading ? (
                    <BeatLoader
                      loading={formState.loading}
                      color="white"
                      size={20}
                    />
                  ) : (
                    " Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex w-[90vw] max-w-lg flex-col items-center justify-center gap-4  rounded-lg bg-violet-light p-5">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
              <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                <PiSealCheckFill className="size-10 text-green-500" />
              </div>
            </div>
            <h2 className="font-satoshiBold text-2xl font-bold text-violet-normal">
              Report Sent
            </h2>
            <p className="text-center font-bold text-violet-darker ">
              Your report has been sent. we would update you via notification on
              the current status.
            </p>
            <div className="flex items-center justify-center">
              <button
                onClick={handleCloseModal}
                className="mx-auto rounded-full bg-violet-normal p-3 px-10 text-center font-bold text-white  transition-opacity duration-300 hover:opacity-90 "
              >
                View Jobs
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default OngoingServiceModal;
