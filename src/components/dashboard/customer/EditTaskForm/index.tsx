import Button from '@/components/global/Button';
import Dropdown from '@/components/global/Dropdown';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaSortDown } from 'react-icons/fa6';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomerTasks } from '@/types/services/tasks';
import { PiSealCheckFill } from 'react-icons/pi';
import Image from 'next/image';
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { typeData } from "@/data/marketplace/data";
import { useRouter } from 'next/navigation';
import { useUpdateTaskMutation } from '@/services/tasks';

interface TaskCardProps {
    task: CustomerTasks;
    setShowEditModal: (value: boolean) => void;
}

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
}

const EditTaskForm = ({ task, setShowEditModal }: TaskCardProps) => {
    const [activeEditModalLink, setActiveEditModalLink] = useState<string>("Task Details");
    const [categories, setCategories] = useState<{ id: number; categoryName: string }[]>([]);
    const [updatedPostCode, setUpdatedPostCode] = useState<any>(task.postCode);
    const [updatedDate, setUpdatedDate] = useState<Date | null>(null);
    const [updatedTime, setUpdatedTime] = useState<Date | null>(null);
    const [taskImage, setTaskImage] = useState<File | null>(null);
    const taskImageRef = useRef<HTMLInputElement>(null);
    const [suburbList, setSuburbList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(task.category.categoryName);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isFlexible, setIsFlexible] = useState(false);
    const router = useRouter();

    const taskSchema = z.object({
        taskBriefDescription: z
            .string(),
        // .min(3, "Minimum of 3 characters")
        // .refine((str) => str.split(" ").filter(Boolean).length > 0, {
        //     message: `Title must have ${1} word or more`,
        // }),
        taskDescription: z
            .string(),
        // .min(10, "Minimum of 10 characters")
        // .refine((str) => str.split(" ").filter(Boolean).length >= 5, {
        //     message: `Description must have ${5} words or more`,
        // }),
        category: z.string(),
        taskType: z.string(),
        postCode: z.string().nullable().optional(),
        suburb: z.string().nullable().optional(),
        state: z.string().nullable().optional(),
        taskImage: z.string().optional(),
        taskDate: z.number().array().nullable().optional(),
        taskTime: z.string().nullable().optional(),
        customerBudget: z.string().transform((val) => Number(val))
    });

    type taskZodType = z.infer<typeof taskSchema>;

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
                category: selectedCategory,
                taskType: task.taskType,
                postCode: updatedPostCode,
                suburb: task.suburb,
                state: task.state,
                taskImage: task.taskImage,
                taskDate: task.taskDate,
                taskTime: task.taskTime ? formatTimeToString(new Date(task.taskTime[0], task.taskTime[1])) : "Flexible",
                customerBudget: task.customerBudget
            });
        }
        // eslint-disable-next-line
    }, [task]);

    const watchField = watch();

    useEffect(() => {
        if (watchField.taskType === typeData[0].value) {
            setValue("postCode", "");
            setValue("state", "");
            setValue("suburb", "");
        }
        // eslint-disable-next-line
    }, [watchField.taskType]);

    useEffect(() => {
        const fetchPostalCodeData = async () => {
            try {
                const { data } = await axios.get(
                    `https://api.oloja.com.au/api/v1/util/locations/search?postcode=${watchField.postCode}`,
                );
                const suburb = data.map((item: any) => item.name);
                setSuburbList(suburb);
                setValue("state", data[0].state.name);
                setValue("suburb", suburb[0]);
            } catch (error) {
                console.error("Error fetching postal code data:", error);
            }
        };

        fetchPostalCodeData();
    }, [watchField.postCode, updatedPostCode]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await axios.get(
                    "https://api.oloja.com.au/api/v1/util/all-categories",
                );
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchAllCategories();
    }, []);

    const watchImage = watch("taskImage");

    const handleOnImageInputChange = ({
        event,
        index,
    }: {
        event: React.ChangeEvent<HTMLInputElement>;
        index: number;
    }) => {
        const imageFieldNames = ["taskImage",];
        const setImageFuncs = [setTaskImage,];
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

    const imageRefs = [taskImageRef,];

    const handleClickImageButton = ({ index }: { index: number }) => {
        const imageRef = imageRefs[index - 1];
        imageRef?.current?.click();
    };

    const [updateTask] = useUpdateTaskMutation();

    const handleUpdateTask: SubmitHandler<taskZodType> = async (data) => {
        const formData = new FormData();

        const fields = {
            taskBriefDescription: data.taskBriefDescription,
            taskDescription: data.taskDescription,
            categoryId: categories.find(category => category.categoryName === data.category)?.id,
            taskType: data.taskType,
            postCode: data.postCode,
            suburb: data.suburb,
            state: data.state,
            taskDate: dateString,
            taskTime: timeString,
            customerBudget: data.customerBudget,
        };

        Object.entries(fields).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== "" && value !== 0) {
                formData.append(key, value.toString());
            }
        });

        // Handle taskImage separately
        if (taskImage) {
            formData.append('taskImage', taskImage);
        }

        try {
            await updateTask({ id: task.id, details: formData }).unwrap();
            setShowSuccessModal(true)
        } catch (error: any) {
            console.log(error);
            // setError(error.response.data.message);
        }
    };

    const handleDateChange = (date: Date | null) => {
        setUpdatedDate(date);
    };

    const handleTimeChange = (time: Date | null) => {
        setUpdatedTime(time);
    };

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
            // Formatting the time as "HH:mm"
            const hours = String(time.getHours()).padStart(2, "0");
            const minutes = String(time.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
        }
        return "";
    };

    const dateString = formatDateToLocalDateString(updatedDate);
    const timeString = formatTimeToString(updatedTime);

    const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => (
        <button
            className={`flex cursor-pointer justify-between rounded-2xl bg-[#EBE9F4] px-2 py-1 text-[12px] placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px] border border-tc-gray outline-none"}`}
            onClick={onClick}
            type="button"
        >
            {value || "Choose Date"} <FaSortDown />
        </button>
    );

    const CustomInputs: React.FC<CustomInputProps> = ({ value, onClick }) => (
        <button
            className={`flex cursor-pointer justify-between rounded-2xl bg-[#EBE9F4] px-2 py-1 text-[12px]  placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px] border border-tc-gray outline-none"}`}
            onClick={onClick}
            type="button"
        >
            {value || "Choose Time"} <FaSortDown />
        </button>
    );


    return (
        <div className='pt-14 lg:px-5'>
            {showSuccessModal && (
                <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div
                        onClick={() => {
                            setShowSuccessModal(false)
                            setShowEditModal(false)
                            router.refresh()
                        }}
                        className="absolute h-screen w-screen"
                    />
                    <div className=" relative z-10 flex w-[90vw] max-w-md  flex-col items-center justify-center gap-4 rounded-lg bg-white p-5 ">
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
                                        setShowSuccessModal(false)
                                        setShowEditModal(false)
                                        router.refresh()
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
            <div className="border-b-2 border-[#140B31] w-full" />
            <div className="rounded-2xl max-h-[80vh] w-full lg:w-[800px] font-satoshi overflow-y-auto small-scrollbar">
                <div className="lg:flex h-full lg:space-x-3 p-2">
                    <div className="hidden lg:block border-r-2 border-[#140B31] pr-8 pb-10 space-y-5 pt-5">
                        <div className={`cursor-pointer text-lg font-bold ${activeEditModalLink === "Task Details" ? "bg-tc-orange rounded-lg pl-2 pr-5 py-2 text-white" : "text-primary"}`} onClick={() => setActiveEditModalLink("Task Details")}>Task Details</div>
                        <div className={`cursor-pointer text-lg font-bold ${activeEditModalLink === "Location" || activeEditModalLink === "Budget" ? "bg-tc-orange rounded-lg pl-2 pr-5 py-2 text-white" : "text-primary"}`} onClick={() => setActiveEditModalLink("Location")}>Location and Budget</div>
                    </div>
                    <form className="flex-1 w-full p-4 lg:px-5" onSubmit={handleSubmit(handleUpdateTask)}>
                        {activeEditModalLink === "Task Details" && (
                            <div className="space-y-8 w-full">
                                <div className="grid space-y-3">
                                    <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                                        Write a short title for the task you need done
                                    </label>
                                    <textarea
                                        className="h-full w-full rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB] border-none outline-none"
                                        placeholder="e.g, I need a junior league coach."
                                        {...register("taskBriefDescription")}
                                        style={{ resize: "none", overflow: "hidden" }}
                                    ></textarea>
                                </div>

                                <div className="relative grid space-y-4">
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
                                </div>

                                <div className="relative grid space-y-3">
                                    <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                                        Give a description of your task
                                    </label>
                                    <textarea
                                        className="h-[150px] rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB] resize-none border-none outline-none small-scrollbar"
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
                                        size='sm'
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        theme="primary"
                                        type="button"
                                        onClick={() => setActiveEditModalLink("Location")}
                                        className="rounded-full px-10"
                                        size='sm'

                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeEditModalLink === "Location" && (
                            <div className="space-y-8 w-full">
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
                                                        watchField.taskImage ??
                                                        task?.taskImage?.[0] ??
                                                        ""
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
                                        Set Day and Time
                                    </label>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                        <div>
                                            <DatePicker
                                                value={updatedTime as unknown as string}
                                                selected={updatedTime}
                                                onChange={handleTimeChange}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                dateFormat="h:mm aa"
                                                placeholderText="Choose Time"
                                                disabled={isFlexible}
                                                id="taskTime"
                                                name="taskTime"
                                                // disabled={termAccepted}
                                                customInput={<CustomInputs />}
                                                className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
                                            />
                                        </div>
                                        <div>
                                            <DatePicker
                                                value={updatedDate as unknown as string}
                                                selected={updatedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd-MM-yyyy"
                                                minDate={new Date()}
                                                placeholderText="Choose Date"
                                                id="taskDate"
                                                name="taskDate"
                                                disabled={isFlexible}
                                                // disabled={termAccepted}
                                                customInput={<CustomInput />}
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
                                                    setIsFlexible(!isFlexible)
                                                    setUpdatedDate(null)
                                                    setUpdatedTime(null)
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
                                        size='sm'
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setActiveEditModalLink("Budget")}
                                        className="rounded-full px-10"
                                        size='sm'
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
                                    <div className="space-x-2">
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
                                    {watchField.taskType === typeData[1].value ? (
                                        <>
                                            <div className="flex items-center space-x-4 justify-between">
                                                {/* postcode */}
                                                <div className="space-y-4 w-full">
                                                    <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">Post Code</label>
                                                    <input
                                                        type="number"
                                                        className="rounded-2xl bg-violet-light p-3 text-[13px] outline-none w-full"
                                                        {...register("postCode")}
                                                    />
                                                </div>

                                                {/* suburb */}
                                                <div className="space-y-4 w-full">
                                                    <div className="flex items-center justify-between">
                                                        <label className='text-[13px] font-semibold text-status-darkpurple lg:text-[16px]'>
                                                            Suburb{" "}
                                                        </label>
                                                    </div>
                                                    <Dropdown
                                                        trigger={() => (
                                                            <div
                                                                className={`flex h-full w-full cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 font-satoshi text-[13px] font-light border-none outline-none"}`}
                                                            >
                                                                <h2>{watchField.suburb}</h2>
                                                                <FaSortDown />
                                                            </div>
                                                        )}
                                                        className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
                                                    >
                                                        {suburbList.map((data, index) => (
                                                            <button
                                                                type="button"
                                                                className="block p-2 text-[12px] font-semibold text-primary hover:text-tc-orange"
                                                                key={index}
                                                                value={data}
                                                                onClick={() => setValue("suburb", data)}
                                                            >
                                                                {data}
                                                            </button>
                                                        ))}
                                                    </Dropdown>
                                                </div>
                                            </div>
                                            {/* State */}
                                            <div className="space-y-4 w-full">
                                                <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">State/ Territory</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="cursor-default rounded-2xl bg-violet-light text-[13px] p-3 pl-4 outline-none w-full"
                                                    {...register("state")}
                                                />
                                            </div>
                                        </>

                                    ) : (
                                        <div></div>
                                    )}
                                    <div className='space-y-2'>
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
                                                value={watchField.customerBudget}
                                                {...register("customerBudget")}
                                                className={`appearance-none w-full no-input-default-style placeholder:font-bold border-none"}`}
                                            />
                                        </div>
                                    </div>

                                    {/* {errors && <div className="font-bold text-red-500">{errors.}</div>} */}
                                    <div className="flex items-center justify-end space-x-3">
                                        <Button
                                            theme="outline"
                                            onClick={() => setActiveEditModalLink("Location")}
                                            className="rounded-full px-10"
                                            type="button"
                                            size='sm'
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            theme="primary"
                                            loading={isSubmitting}
                                            type='submit'
                                            className="rounded-full"
                                            size='sm'
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