import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { stepOneSchema, StepOneSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { GrFormCheckmark } from "react-icons/gr";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import DatePicker from "react-datepicker";
import { CustomDateInput, CustomTimeInput } from "./DateInputs";
import { getImageUrl } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setTaskDetail } from "@/store/Features/taskDetails";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import Button from "@/components/global/Button";
import { useSearchParams } from "next/navigation";

function StepOne() {
  const searchParams = useSearchParams();
  const [wordCount, setWordCount] = useState({ title: 0, description: 0 });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const savedTask = useSelector((state: RootState) => state.taskDetails);
  const { taskBriefDescription, taskDescription, isFlexible } = savedTask;
  const { taskDate, taskTime, taskImage } = savedTask;
  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
    setValue: setFormData,
  } = useForm<StepOneSchema>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      taskBriefDescription:
        searchParams.get("marketplaceDescription") || taskBriefDescription,
      taskDescription,
      isFlexible,
      taskDate,
      taskImage,
      taskTime,
    },
  });

  const watchForm = watch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (typeof watchForm.taskImage == "string") {
      setImageUrl(watchForm.taskImage);
    } else if (watchForm.taskImage instanceof File) {
      setImageUrl(getImageUrl(watchForm.taskImage));
    } else {
      setImageUrl("");
    }
  }, [watchForm.taskImage, savedTask.taskImage]);

  useEffect(() => {
    if (watchForm.isFlexible) {
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData("taskDate", "");
      setFormData("taskTime", "");

      //Reset state saved in browser engine when flexible is true
      dispatch(setTaskDetail({ key: "taskDate", value: "" }));
      dispatch(setTaskDetail({ key: "taskTime", value: "" }));
    }
  }, [watchForm.isFlexible]);

  const dispatch = useDispatch();

  const submitForm: SubmitHandler<StepOneSchema> = (data) => {
    if (data.taskImage && data.taskImage?.length === undefined) {
      // Convert image to base 64 string and add to index DB using redux
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          setTaskDetail({ key: "taskImage", value: reader.result as string }),
        );
      };
      reader.readAsDataURL(data.taskImage);
    }

    const { taskBriefDescription, taskDescription, taskDate, taskTime } = data;
    dispatch(
      setTaskDetail({
        key: "taskBriefDescription",
        value: taskBriefDescription,
      }),
    );
    dispatch(setTaskDetail({ key: "taskDescription", value: taskDescription }));
    if (taskDate && taskTime) {
      dispatch(setTaskDetail({ key: "taskDate", value: taskDate }));
      dispatch(setTaskDetail({ key: "taskTime", value: taskTime }));
    }
    dispatch(
      setTaskDetail({ key: "isFlexible", value: Boolean(data.isFlexible) }),
    );

    // Set form step to next step
    dispatch(setTaskDetail({ key: "currentStep", value: 2 }));
  };

  return (
    <motion.form
      key="step-one"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="mb-10 space-y-10 font-medium text-status-darkpurple"
      onSubmit={handleSubmit(submitForm)}
    >
      {/* Task title  */}
      <div className="grid space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
            Write a short title for the task you need done{" "}
            <span className="font-extrabold text-[#ff0000]">*</span>
          </label>
        </div>
        <textarea
          className={`h-full w-full rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB]  ${
            errors.taskBriefDescription
              ? "border border-[#ff0000] outline-[#FF0000]"
              : "border-none outline-none"
          }`}
          placeholder="e.g, I need a junior league coach."
          {...register("taskBriefDescription")}
          style={{ resize: "none", overflow: "hidden" }}
        ></textarea>
        {errors.taskBriefDescription && (
          <div className="text-sm text-status-error-100">
            {errors.taskBriefDescription?.message}
          </div>
        )}
      </div>

      {/* Task description  */}
      <div className="relative grid space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex text-[13px] font-semibold lg:text-[16px]">
            Give a description of your task {""}{" "}
            <span className="font-extrabold text-[#ff0000]">*</span>
          </label>
        </div>
        <textarea
          className={` h-[150px] rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB] ${
            errors.taskDescription
              ? "border border-[#ff0000] outline-[#FF0000]"
              : "border-none outline-none"
          }`}
          placeholder="Arts and Craft"
          {...register("taskDescription")}
        ></textarea>
        {errors.taskDescription && (
          <div className="text-sm text-status-error-100">
            {errors.taskDescription?.message}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <label className="font-satoshiBold text-[13px] font-bold text-status-darkpurple lg:text-[16px]">
          Upload an Image (Optional)
        </label>
        {imageUrl ? (
          <div className="flex items-end ">
            <div className="relative flex h-48 w-1/2 items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4]">
              <img
                src={imageUrl}
                alt="Uploaded Task"
                className="h-full w-full max-w-[350px] object-cover"
                width="100%"
                height="100%"
              />
            </div>
            <button
              type="button"
              className="rounded-lg bg-tc-gray px-3 py-1 text-white"
              onClick={() => {
                setFormData("taskImage", null);
                clearErrors("taskImage");
                dispatch(setTaskDetail({ key: "taskImage", value: "" }));
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#a3a1ac] p-4 "
          >
            <PiFileArrowDownDuotone className="text-xl text-[#a3a1ac]" />
            <span className="text-center font-bold text-[#a3a1ac]">
              File Upload supports: JPG, PNG.
            </span>
            <input
              id="file-upload"
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              className="hidden"
              {...register("taskImage")}
              onChange={(e) => {
                clearErrors("taskImage");
                setFormData("taskImage", e.target.files?.[0], {
                  shouldValidate: true,
                });
              }}
            />
          </label>
        )}
        {errors.taskImage && (
          <div className="font-bold text-red-500">
            {errors.taskImage?.message?.toString()}
          </div>
        )}
      </div>

      <div className="space-y-5 ">
        <label
          htmlFor="taskTime"
          className="test-[20px] font-satoshiBold font-bold text-status-darkpurple"
        >
          Set Day and Time{" "}
          <span className="font-extrabold text-[#ff0000]">*</span>
        </label>
        <div className="flex items-center space-x-3">
          <div className="relative">
            {/* @ts-ignore  */}
            <DatePicker
              selected={selectedDate || (taskDate ? new Date(taskDate) : null)}
              onChange={(date) => {
                const currDate = date as unknown as Date | null;
                setSelectedDate(currDate);
                setFormData("taskDate", currDate?.toDateString());
              }}
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
              id="taskDate"
              name="taskDate"
              disabled={watchForm.isFlexible}
              customInput={<CustomDateInput errors={errors} />}
              className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
            />
          </div>
          <div className="relative">
            {/* @ts-ignore */}
            <DatePicker
              placeholderText="Choose Time"
              selected={selectedTime || (taskTime ? new Date(taskTime) : null)}
              onChange={(time) => {
                const currTime = time as unknown as Date | null;
                setSelectedTime(currTime);
                setFormData("taskTime", currTime?.toISOString());
              }}
              showTimeSelect
              showTimeSelectOnly
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="h:mm aa"
              id="taskTime"
              disabled={watchForm.isFlexible}
              customInput={<CustomTimeInput errors={errors} />}
              className="w-full cursor-pointer rounded-2xl  bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
            />
          </div>
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("isFlexible")}
                className="mr-2"
              />
              <span className="text-[12px] text-status-darkpurple">
                I’m Flexible
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full rounded-3xl p-3 text-white lg:w-[100px]"
      >
        Next
      </Button>
    </motion.form>
  );
}

export default StepOne;
