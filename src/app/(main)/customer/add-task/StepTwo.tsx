import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTaskDetail, resetSavedTask } from "@/store/Features/taskDetails";
import { CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";
import { RootState } from "@/store";
import { formatTimeFromDate, formatDate } from "@/utils";
import { base64ToFile } from "@/lib/utils";
import { StepTwoSchema, stepTwoSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { GrFormCheckmark } from "react-icons/gr";
import useSuburbData, { SurburbInfo } from "@/hooks/useSuburbData";
import { SubmitHandler, useForm } from "react-hook-form";
import useAxios from "@/hooks/useAxios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosCheckmarkCircle, IoMdCheckmark } from "react-icons/io";
import PopupTwo from "@/components/global/Popup/PopupTwo";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/global/loading/page";

type TaskType = "PHYSICAL_SERVICE" | "REMOTE_SERVICE";

function StepTwo() {
  const authInstance = useAxios();
  const dispatch = useDispatch();
  const savedTask = useSelector((state: RootState) => state.taskDetails);
  const [popupState, setPopupState] = useState({ open: false, status: "" });
  const session = useSession();
  const router = useRouter();
  const { customerBudget, taskType } = savedTask;
  const taskTypes = [
    { name: "Physical Service", value: "PHYSICAL_SERVICE" },
    { name: "Remote Service", value: "REMOTE_SERVICE" },
  ];
  const {
    watch,
    reset,
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepTwoSchema>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: { customerBudget: customerBudget as unknown as number },
  });

  const watchForm = watch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  //Set task type and current suburb
  useEffect(() => {
    setValue("taskType", taskType as TaskType);
    if (savedTask.currentSuburb) {
      const currSuburb = savedTask.currentSuburb;
      setCurrentSuburb(currSuburb);
      setValue(
        "suburb",
        `${currSuburb.name}, ${currSuburb.state.abbreviation}, Australia`,
      );
    } else {
      setCurrentSuburb(null);
    }
  }, [savedTask]);

  useEffect(() => {
    if (watchForm.taskType === "REMOTE_SERVICE") {
      setValue("suburb", "");
      clearErrors("suburb");
      setCurrentSuburb(null);
    }
  }, [watchForm.taskType]);

  const [currentSuburb, setCurrentSuburb] = useState<SurburbInfo | null>(null);
  const {
    suburbList,
    setSuburbList,
    error: suburbError,
    isLoading,
  } = useSuburbData(watchForm.suburb!, currentSuburb);

  const timeout = (ms: number) => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out")), ms);
    });
  };

  const submitForm: SubmitHandler<StepTwoSchema> = async (data) => {
    //@ts-ignore
    clearErrors("root");
    if (data.taskType == "PHYSICAL_SERVICE" && !currentSuburb) {
      //@ts-ignore
      setError("root", { message: "Please select a suburb" });
      return;
    }
    // Save all values from this step in browser memory
    dispatch(setTaskDetail({ key: "taskType", value: data.taskType }));
    dispatch(
      setTaskDetail({ key: "customerBudget", value: data.customerBudget }),
    );
    dispatch(setTaskDetail({ key: "currentSuburb", value: currentSuburb }));
    if (data.taskType === "REMOTE_SERVICE") {
      dispatch(setTaskDetail({ key: "currentSuburb", value: null }));
    }
    if (session.status !== "authenticated") {
      setPopupState({ open: true, status: "authentication" });
      return;
    }
    // Information from previous step in redux
    const {
      taskBriefDescription,
      taskDescription,
      taskImage,
      taskDate,
      taskTime,
    } = savedTask;
    // Information in current step from form state
    const { taskType, customerBudget } = data;

    const finalTask = {
      taskBriefDescription,
      taskDescription,
      taskImage: taskImage ? base64ToFile(taskImage, "task-image") : null,
      taskDate: taskDate ? formatDate(new Date(taskDate)) : "",
      taskTime: taskTime ? formatTimeFromDate(new Date(taskTime)) : "",
      taskType,
      suburb: currentSuburb?.name || "",
      state: currentSuburb?.state.name || "",
      postCode: currentSuburb?.postcode || "",
      customerBudget,
      termAccepted: true,
    };
    try {
      await Promise.race([
        authInstance.post("task/post", finalTask, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        timeout(10000),
      ]);
      setPopupState({ open: true, status: "success" });
      reset();
    } catch (error) {
      console.error("Error submitting form: ", error);
      //@ts-ignore
      setError("root", { message: "An error occurred, please try again" });
    }
  };
  return (
    <>
      {isSubmitting && <Loading />}
      <motion.form
        key="step-two"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className="mb-10 space-y-7"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="space-y-5">
          <h2 className="font-satoshiBold text-[13px] font-bold text-status-darkpurple lg:text-[16px]">
            Type of Service{" "}
            <span className="font-extrabold text-[#ff0000]">*</span>
          </h2>
          <div className="flex space-x-4 text-[13px] text-[#221354]">
            {taskTypes.map((type) => (
              <button
                className={`rounded-2xl px-3 py-2 ${
                  watchForm.taskType === type.value
                    ? "bg-status-purpleBase text-white"
                    : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                } outline-none`}
                onClick={() => {
                  clearErrors("taskType");
                  setValue("taskType", type.value as TaskType);
                }}
                key={Math.random() * 1234}
              >
                {type.name}
              </button>
            ))}
          </div>
          {errors.taskType && (
            <div className="text-[#FF0000]">{errors.taskType?.message}</div>
          )}
          {/* Display choice  */}
          {watchForm.taskType === "REMOTE_SERVICE" && (
            <input
              type="text"
              value={
                taskTypes.find((type) => type.value === watchForm.taskType)
                  ?.name
              }
              readOnly
              className="rounded-2xl bg-[#EBE9F4] p-3 outline-none"
            />
          )}
          {watchForm.taskType === "PHYSICAL_SERVICE" && (
            <div className="relative !mt-4 w-full">
              <label
                htmlFor="suburb"
                className="mb-2 block font-satoshiBold text-[13px] font-bold text-status-darkpurple lg:text-[16px]"
              >
                Where do you need this done{" "}
                <span className="font-extrabold text-[#ff0000]">*</span>
              </label>
              <div
                className={
                  "flex items-center rounded-lg bg-[#EBE9F4] px-3 pl-2 focus-within:bg-white " +
                  (errors.suburb
                    ? "border border-[#ff0000] outline-[#FF0000]"
                    : "border-primary outline-none focus-within:border")
                }
              >
                <CiLocationOn fill="#76757A61" size={22} />
                <input
                  id="suburb"
                  type="text"
                  className="-ml-2 block w-full appearance-none bg-transparent p-3 placeholder-[#76757A61] outline-none placeholder:font-satoshiMedium"
                  placeholder="Enter a suburb"
                  autoComplete="off"
                  {...register("suburb", {
                    onChange: (e) => {
                      if (currentSuburb) {
                        setCurrentSuburb(null);
                        const enteredInput = e.target.value.slice(-1);
                        e.target.value = enteredInput;
                        setValue("suburb", enteredInput);
                      }
                      setValue("suburb", e.target.value);
                    },
                  })}
                />
              </div>
              <div className="absolute left-0 z-10 w-full bg-white">
                {isLoading && (
                  <p className="py-2 text-center font-satoshiMedium text-[#76757A61]">
                    Loading...
                  </p>
                )}
                {suburbError && !isLoading && (
                  <p className="py-2 text-center font-satoshiMedium text-red-600">
                    Error occured while loading suburb data
                  </p>
                )}
                {suburbList.length > 1 && (
                  <ul className="roundeed-lg max-h-52 overflow-y-auto overflow-x-hidden">
                    {suburbList.map((suburb) => (
                      <li
                        className="flex cursor-pointer items-center gap-1 bg-white px-4 py-3 text-[13px]"
                        key={Math.random() * 12345}
                        onClick={() => {
                          setCurrentSuburb(suburb);
                          setValue(
                            "suburb",
                            `${suburb.name}, ${suburb.state.abbreviation}, Australia`,
                          );
                          setSuburbList([]);
                        }}
                      >
                        <CiLocationOn
                          stroke="#0F052E"
                          size={20}
                          strokeWidth={1}
                        />
                        <span className="text-[#0F052E]">
                          {suburb.name},{" "}
                          {suburb.locality ? `${suburb.locality},` : ""}{" "}
                          {suburb.state.name}, AUS
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="relative grid space-y-4 font-bold text-status-darkpurple">
          <div className="flex items-center justify-between">
            <label className="text-[13px] lg:text-[16px]">
              Budget <span className="font-extrabold text-[#ff0000]">*</span>
            </label>
            {!isNaN(watchForm.customerBudget) && (
              <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                <GrFormCheckmark />
              </div>
            )}
          </div>
          <input
            type="number"
            min={1}
            {...register("customerBudget", { valueAsNumber: true })}
            placeholder="500"
            className={`appearance-none rounded-2xl bg-[#EBE9F4] p-3 pl-6 placeholder:font-bold ${
              errors.customerBudget
                ? "border border-[#ff0000] outline-[#FF0000]"
                : "border-none outline-none"
            }`}
          />
          <p className="absolute left-3 top-8 md:top-9">$</p>
        </div>

        <div className="flex flex-wrap-reverse justify-between gap-3">
          <button
            type="submit"
            className="w-full rounded-3xl bg-primary py-2 text-white lg:w-[200px]"
          >
            Confirm Task
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(setTaskDetail({ key: "currentStep", value: 1 }));
            }}
            className="w-full rounded-3xl bg-[#EBE9F4] p-2 text-[14px] font-bold outline-none hover:bg-status-violet hover:text-white lg:w-[100px]"
          >
            Back
          </button>
        </div>
        {/* @ts-ignore  */}
        {errors.root && (
          // @ts-ignore
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </motion.form>
      <PopupTwo
        isOpen={popupState.open && popupState.status === "authentication"}
        onClose={() => setPopupState({ open: false, status: "" })}
      >
        <div className="relative max-h-[700px] min-w-[320px] max-w-[700px] bg-white p-5 sm:min-w-[560px]">
          <div className="mx-auto mb-7 w-max rounded-full bg-[#C1F6C399] p-[10px]">
            <div className="rounded-full bg-[#A6F8AA] p-[5px]">
              <div className="relative w-max text-white">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 2.74667L25.36 0L28.6267 5.05778L34.64 5.36L34.9422 11.3733L40 14.64L37.2533 20L40 25.36L34.9422 28.6267L34.64 34.64L28.6267 34.9422L25.36 40L20 37.2533L14.64 40L11.3733 34.9422L5.36 34.64L5.05778 28.6267L0 25.36L2.74667 20L0 14.64L5.05778 11.3733L5.36 5.36L11.3733 5.05778L14.64 0L20 2.74667Z"
                    fill="#4CAF50"
                  />
                </svg>
                <IoMdCheckmark
                  size={20}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>
          <h3 className="mb-3 mt-2 text-center font-clashSemiBold text-2xl text-[#2A1769] sm:text-4xl">
            You’re almost there!
          </h3>
          <p className="md::text-xl mx-auto mb-5 max-w-[320px] text-center font-satoshiMedium text-base text-[#140B31] sm:text-lg">
            Complete sign up to add and manage all your tasks.
          </p>
          <Link
            href="/auth/sign-up"
            className="relative z-10 mx-auto block w-max rounded-full bg-[#EBE9F4] px-4 py-2 font-satoshiBold font-bold text-primary md:px-6"
          >
            Sign up
          </Link>
          <Image
            src="/assets/icons/popup-image-two.png"
            alt="Icon"
            width={170}
            height={310}
            className="absolute -left-20 top-5 aspect-auto h-full w-10/12 -rotate-12 sm:-left-10 sm:w-5/12 sm:rotate-0"
          />
          <Image
            src="/assets/icons/popup-image-two.png"
            alt="Icon"
            width={170}
            height={310}
            className="absolute -right-20 top-5 aspect-auto h-full w-10/12 rotate-12 scale-x-[-1] sm:-right-10 sm:w-5/12 sm:rotate-0"
          />
        </div>
      </PopupTwo>
      <PopupTwo
        isOpen={popupState.open && popupState.status === "success"}
        onClose={() => {
          dispatch(resetSavedTask());
          router.push("/customer/tasks");
          setPopupState({ open: false, status: "" });
        }}
      >
        <div className="relative max-h-[700px] min-w-[320px] max-w-[700px] bg-white p-5 sm:min-w-[560px]">
          <IoIosCheckmarkCircle className="mx-auto" size={50} fill="#FE9B07" />
          <h3 className="mb-3 mt-2 text-center font-clashSemiBold text-2xl text-[#2A1769] sm:text-4xl">
            Congratulations!!
          </h3>
          <p className="md::text-xl mx-auto mb-5 max-w-[383px] text-center font-satoshiMedium text-base text-[#140B31] sm:text-lg">
            Your task is posted! 📣 Ready to get matched with an expert who can
            slay? Check out your task or browse our marketplace for some fire
            talent.
          </p>
          <div className="flex justify-center gap-3 sm:gap-5">
            <Link
              href="/customer/tasks"
              onClick={() => dispatch(resetSavedTask())}
              className="rounded-full border-[0.5px] border-primary bg-[#EBE9F4] px-3 py-2 font-bold text-primary"
            >
              View Tasks
            </Link>
            <Link
              onClick={() => dispatch(resetSavedTask())}
              href="/marketplace"
              className="rounded-full bg-[#381F8C] px-3 py-2 font-bold text-[#EBE9F4]"
            >
              Explore Marketplace
            </Link>
          </div>
          <Image
            src="/assets/icons/popup-design.png"
            width={263}
            height={626}
            alt="Icon"
            className="absolute -left-10 top-5 h-full w-3/12 sm:left-0"
          />
          <Image
            src="/assets/icons/popup-design.png"
            width={263}
            height={626}
            alt="Icon"
            className="absolute -right-10 top-5 aspect-auto h-full w-3/12 scale-x-[-1] sm:right-0"
          />
        </div>
      </PopupTwo>
    </>
  );
}

export default StepTwo;
