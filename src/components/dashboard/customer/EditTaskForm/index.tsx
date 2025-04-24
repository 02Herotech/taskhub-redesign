import Button from "@/components/global/Button";
import Dropdown from "@/components/global/Dropdown";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaSortDown } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomerTasks } from "@/types/services/tasks";
import { PiSealCheckFill } from "react-icons/pi";
import Image from "next/image";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { typeData } from "@/data/marketplace/data";
import { useRouter } from "next/navigation";
import { useUpdateTaskMutation } from "@/services/tasks";
import useSuburbData, { SurburbInfo } from "@/hooks/useSuburbData";
import { IoLocationOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

interface TaskCardProps {
  task: CustomerTasks;
  setShowEditModal: (value: boolean) => void;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const taskSchema = z.object({
  taskBriefDescription: z.string(),
  taskDescription: z.string(),
  // category: z.string(),
  taskType: z.string(),
  suburb: z.string().nullable().optional(),
  taskImage: z.string().optional(),
  taskDate: z.number().array().nullable().optional(),
  taskTime: z.string().nullable().optional(),
  customerBudget: z.string().transform((val) => Number(val)),
});

type taskZodType = z.infer<typeof taskSchema>;

const EditTaskForm = ({ task, setShowEditModal }: TaskCardProps) => {
  const [activeEditModalLink, setActiveEditModalLink] =
    useState<string>("Task Details");
  const [categories, setCategories] = useState<
    { id: number; categoryName: string }[]
  >([]);
  const [updatedDate, setUpdatedDate] = useState<Date | null>(null);
  const [updatedTime, setUpdatedTime] = useState<Date | null>(null);
  const [taskImage, setTaskImage] = useState<File | null>(null);
  const taskImageRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    task.category.categoryName,
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isFlexible, setIsFlexible] = useState(
    task.taskDate === null && task.taskTime === null,
  );
  const router = useRouter();

  const initialDate = useMemo(() => {
    return task.taskDate
      ? new Date(task.taskDate[0], task.taskDate[1] - 1, task.taskDate[2])
      : null;
  }, [task.taskDate]);

  const initialTime = useMemo(() => {
    return task.taskTime
      ? (() => {
          const date = new Date();
          date.setHours(task.taskTime[0], task.taskTime[1]);
          return date;
        })()
      : null;
  }, [task.taskTime]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<taskZodType>({
    // resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (task) {
      reset({
        taskBriefDescription: task.taskBriefDescription,
        taskDescription: task.taskDescription,
        // category: selectedCategory,
        taskType: task.taskType,
        suburb: "",
        taskImage: task.taskImage,
        taskDate: isFlexible ? null : task.taskDate,
        taskTime: isFlexible
          ? null
          : task.taskTime
            ? formatTimeToString(new Date(task.taskTime[0], task.taskTime[1]))
            : null,
        customerBudget: task.customerBudget,
      });

      setUpdatedDate(initialDate);
      setUpdatedTime(initialTime);
    }
    // eslint-disable-next-line
  }, [task, isFlexible, initialDate, initialTime, reset]);

  const watchField = watch();

  const [currentSuburb, setCurrentSuburb] = useState<SurburbInfo | null>(null);
  const {
    suburbList,
    setSuburbList,
    error: suburbError,
    isLoading,
  } = useSuburbData(watchField.suburb, currentSuburb);

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setUpdatedDate(date);
      if (date === null) {
        setValue("taskDate", null);
      } else {
        setValue("taskDate", [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
        ]);
      }
    },
    [setValue],
  );

  const handleTimeChange = useCallback(
    (time: Date | null) => {
      setUpdatedTime(time);
      if (time === null) {
        setValue("taskTime", null);
      } else {
        const timeString = formatTimeToString(time);
        setValue("taskTime", timeString);
      }
    },
    [setValue],
  );

  useEffect(() => {
    if (watchField.taskType === typeData[0].value) {
      setValue("suburb", "");
      setSuburbList([]);
    }
    // eslint-disable-next-line
  }, [watchField.taskType]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/util/all-categories`,
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchAllCategories();
  }, []);

  const formatDateToLocalDateString = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const formatTimeToString = (time: Date | null) => {
    if (time) {
      const timeDate = new Date(time);
      const hours = String(timeDate.getHours()).padStart(2, "0");
      const minutes = String(timeDate.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "";
  };

  const dateString = formatDateToLocalDateString(updatedDate);
  const timeString = formatTimeToString(updatedTime);

  const handleOnImageInputChange = ({
    event,
    index,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    index: number;
  }) => {
    const imageFieldNames = ["taskImage"];
    const setImageFuncs = [setTaskImage];
    const uploadFile = event.target.files?.[0];
    if (uploadFile) {
      const setImage = setImageFuncs[index - 1];
      setImage(uploadFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = reader.result as string;
        // @ts-expect-error "image type fix"
        setValue(imageFieldNames[index - 1], img);
      };
      reader.readAsDataURL(uploadFile);
    }
  };

  const imageRefs = [taskImageRef];

  const handleClickImageButton = ({ index }: { index: number }) => {
    const imageRef = imageRefs[index - 1];
    imageRef?.current?.click();
  };

  const [updateTask] = useUpdateTaskMutation();

  const handleUpdateTask: SubmitHandler<taskZodType> = async (data) => {
    const formData = new FormData();
    const fields: Record<string, string | number | null> = {
      taskBriefDescription: data.taskBriefDescription ?? "",
      taskDescription: data.taskDescription ?? "",
      // categoryId: categories.find(category => category.categoryName === data.category)?.id ?? "",
      taskType: data.taskType ?? "",
      postCode: currentSuburb?.postcode ?? "",
      suburb: data.suburb ?? "",
      state: currentSuburb?.state.name ?? "",
      taskDate: isFlexible ? "" : dateString,
      taskTime: isFlexible ? "" : timeString,
      customerBudget: data.customerBudget ?? 0,
    };

    Object.entries(fields).forEach(([key, value]) => {
      // Append taskDate and taskTime, even if they are null
      if (key === "taskDate" || key === "taskTime") {
        formData.append(key, value !== null ? value.toString() : "");
      }
      // For other fields, append only if they have valid values
      else if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0
      ) {
        formData.append(key, value.toString());
      }
    });

    if (taskImage) {
      formData.append("taskImage", taskImage);
    }

    try {
      await updateTask({ id: task.id, details: formData }).unwrap();
      router.refresh();
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error(error);
    }
  };

  const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => (
    <button
      className={`outline-none"} flex cursor-pointer justify-between rounded-2xl border border-tc-gray bg-[#EBE9F4] px-2 py-1 text-[12px] placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px]`}
      onClick={onClick}
      type="button"
    >
      {value || "Choose Date"} <FaSortDown />
    </button>
  );

  const CustomInputs: React.FC<CustomInputProps> = ({ value, onClick }) => (
    <button
      className={`outline-none"} flex cursor-pointer justify-between rounded-2xl border border-tc-gray bg-[#EBE9F4]  px-2 py-1 text-[12px] placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px]`}
      onClick={onClick}
      type="button"
    >
      {value || "Choose Time"} <FaSortDown />
    </button>
  );

  return (
    <div className="pt-14 lg:px-5">
      {showSuccessModal && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div
            onClick={() => {
              setShowSuccessModal(false);
              setShowEditModal(false);
              router.refresh();
            }}
            className="absolute h-screen w-screen"
          />
          <div className=" relative z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-5 max-sm:w-[70vw] lg:w-[600px] ">
            <div className=" flex w-full max-w-lg flex-col items-center justify-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
                <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
                  <PiSealCheckFill className="size-10 text-green-500" />
                </div>
              </div>
              <p className="text-center font-satoshiBold text-2xl font-extrabold text-violet-normal">
                Task edited successfully
              </p>
              {/* <p className="text-center font-semibold text-violet-darker">
                                Great! You can now view the task on your dashboard.
                            </p> */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setShowEditModal(false);
                    router.refresh();
                  }}
                  className="rounded-full bg-violet-active px-4 py-2 font-bold text-violet-dark max-sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="w-full border-b-2 border-[#140B31]" />
      <div className="small-scrollbar max-h-[80vh] w-full overflow-y-auto rounded-2xl font-satoshi lg:w-[800px]">
        <div className="h-full p-2 lg:flex lg:space-x-3">
          <div className="hidden space-y-5 border-r-2 border-[#140B31] pb-10 pr-8 pt-5 lg:block">
            <div
              className={`cursor-pointer text-lg font-bold ${activeEditModalLink === "Task Details" ? "rounded-lg bg-tc-orange py-2 pl-2 pr-5 text-white" : "text-primary"}`}
              onClick={() => setActiveEditModalLink("Task Details")}
            >
              Task Details
            </div>
            <div
              className={`cursor-pointer text-lg font-bold ${activeEditModalLink === "Location" || activeEditModalLink === "Budget" ? "rounded-lg bg-tc-orange py-2 pl-2 pr-5 text-white" : "text-primary"}`}
              onClick={() => setActiveEditModalLink("Location")}
            >
              Location and Budget
            </div>
          </div>
          <form
            className="w-full flex-1 lg:px-5"
            onSubmit={handleSubmit(handleUpdateTask)}
          >
            {activeEditModalLink === "Task Details" && (
              <div className="w-full space-y-8">
                <div className="grid space-y-3">
                  <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                    Write a short title for the task you need done
                  </label>
                  <textarea
                    className="h-full w-full rounded-2xl border-none bg-[#EBE9F4] p-3 outline-none placeholder:text-[#C1BADB]"
                    placeholder="e.g, I need a junior league coach."
                    {...register("taskBriefDescription")}
                    style={{ resize: "none", overflow: "hidden" }}
                  ></textarea>
                </div>

                {/* <div className="relative grid space-y-4">
                                    <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                                        What category best describes your task?
                                    </label>
                                    <Dropdown
                                        trigger={() => (
                                            <div className="flex h-full w-full cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] text-status-darkpurple border-none outline-none">
                                                <h2>{selectedCategory}</h2>
                                                <FaSortDown className="text-status-darkpurple" />
                                            </div>
                                        )}
                                        className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
                                    >
                                        {categories.map((category) => (
                                            <button
                                                type="button"
                                                key={category.id}
                                                className="block p-2 font-satoshiBold text-[13px] text-primary hover:text-tc-orange"
                                                onClick={() => {
                                                    setValue("category", category.categoryName)
                                                    setSelectedCategory(category.categoryName)
                                                }}
                                            >
                                                {category.categoryName}
                                            </button>
                                        ))}
                                    </Dropdown>
                                </div> */}

                <div className="relative grid space-y-3">
                  <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                    Give a description of your task
                  </label>
                  <textarea
                    className="small-scrollbar h-[150px] resize-none rounded-2xl border-none bg-[#EBE9F4] p-3 outline-none placeholder:text-[#C1BADB]"
                    placeholder="Describe your task"
                    {...register("taskDescription")}
                  ></textarea>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <Button
                    theme="outline"
                    // onClick={closeModal}
                    type="button"
                    className="rounded-full px-10"
                    size="sm"
                  >
                    Back
                  </Button>
                  <Button
                    theme="primary"
                    type="button"
                    onClick={() => setActiveEditModalLink("Location")}
                    className="rounded-full px-10"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {activeEditModalLink === "Location" && (
              <div className="w-full space-y-8">
                <div className="space-y-3">
                  <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                    Upload an Image (Optional)
                  </label>
                  <div className="flex w-full flex-col gap-3 text-lg  text-violet-normal lg:max-w-64 ">
                    <div>
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .gif"
                        className="hidden"
                        onChange={(event) =>
                          handleOnImageInputChange({ event, index: 1 })
                        }
                        ref={imageRefs[0]}
                      />
                      <button
                        type="button"
                        className="my-2 flex items-end justify-center space-x-2 rounded-xl border border-dashed border-violet-normal"
                        onClick={() => handleClickImageButton({ index: 1 })}
                      >
                        {/* Display a disabled input with message */}
                        <Image
                          src={
                            watchField.taskImage ?? task?.taskImage?.[0] ?? ""
                          }
                          alt="Captured or Selected"
                          width={300}
                          height={300}
                          className="size-40 rounded-xl object-cover"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                    Set Date and Time
                  </label>
                  <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3">
                    <div>
                      <DatePicker
                        selected={
                          isFlexible ? null : updatedDate ?? initialDate
                        }
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        minDate={new Date()}
                        placeholderText="Choose Date"
                        id="taskDate"
                        name="taskDate"
                        disabled={isFlexible}
                        customInput={<CustomInput />}
                        className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
                      />
                    </div>
                    <div>
                      <DatePicker
                        selected={
                          isFlexible ? null : updatedTime ?? initialTime
                        }
                        onChange={handleTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeFormat="HH:mm"
                        dateFormat="h:mm aa"
                        placeholderText="Choose Time"
                        disabled={isFlexible}
                        id="taskTime"
                        name="taskTime"
                        customInput={<CustomInputs />}
                        className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="check"
                        checked={isFlexible}
                        // disabled={!!dateString || !!timeString}
                        onChange={() => {
                          setIsFlexible(!isFlexible);
                          setUpdatedDate(null);
                          setUpdatedTime(null);
                        }}
                        className="mr-2"
                      />
                      <span className="text-[12px] text-status-darkpurple">
                        I’m Flexible
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <Button
                    theme="outline"
                    onClick={() => setActiveEditModalLink("Task Details")}
                    className="rounded-full px-10"
                    type="button"
                    size="sm"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveEditModalLink("Budget")}
                    className="rounded-full px-10"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {activeEditModalLink === "Budget" && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                    Type of Service{" "}
                  </h2>
                  <div className="flex flex-col gap-3 space-x-0 sm:flex-row sm:space-x-2">
                    {typeData.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`rounded-full border border-violet-normal px-4 py-2 font-satoshi text-sm font-normal  transition-opacity duration-300 hover:opacity-90 ${item.value === watchField.taskType ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal"} `}
                        onClick={() => setValue("taskType", item.value)}
                      >
                        {item.label} Service
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-5">
                  {watchField.taskType === typeData[1].value && (
                    <div className="relative">
                      {/* Display previous suburb  */}
                      <div className="mb-3 flex items-center gap-x-2 text-slate-600">
                        <IoLocationOutline className="text-xl" />
                        <span>
                          {task.suburb}, {task.state}
                        </span>
                      </div>
                      {/* Suburb input */}
                      <div className="w-full space-y-4">
                        <label
                          className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]"
                          htmlFor="suburb"
                        >
                          Suburb
                        </label>
                        <input
                          id="suburb"
                          type="text"
                          placeholder="Enter a new suburb..."
                          autoComplete="off"
                          className="w-full cursor-default rounded-2xl bg-violet-light p-3 pl-4 text-[13px] outline-none"
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

                      {/* Auto-complete modal  */}
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
                        {suburbList.length > 0 && (
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                        Budget{" "}
                      </label>
                      {/* {task.customerBudget && (
                                                <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                                                    <GrFormCheckmark />
                                                </div>
                                            )} */}
                    </div>
                    <div className="flex items-center space-x-2 rounded-2xl bg-[#EBE9F4] p-3 text-[13px] ">
                      <span>$</span>
                      <input
                        type="number"
                        min="5"
                        value={watchField.customerBudget}
                        {...register("customerBudget")}
                        className={`no-input-default-style border-none"} w-full appearance-none placeholder:font-bold`}
                      />
                    </div>
                  </div>

                  {/* {errors && <div className="font-bold text-red-500">{errors.}</div>} */}
                  <div className="flex items-center justify-center space-x-3 lg:justify-end">
                    <Button
                      theme="outline"
                      onClick={() => setActiveEditModalLink("Location")}
                      className="rounded-full px-10"
                      type="button"
                      size="sm"
                    >
                      Back
                    </Button>
                    <Button
                      theme="primary"
                      loading={isSubmitting}
                      type="submit"
                      className="rounded-full"
                      size="sm"
                    >
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskForm;
