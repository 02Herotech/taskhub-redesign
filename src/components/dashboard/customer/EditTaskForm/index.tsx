import Button from '@/components/global/Button';
import Dropdown from '@/components/global/Dropdown';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { FaSortDown } from 'react-icons/fa6';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomerTasks } from '@/types/services/tasks';
import { PiFileArrowDownDuotone } from 'react-icons/pi';
import Image from 'next/image';

interface TaskCardProps {
    task: CustomerTasks;
    // closeModal: () => void;
}

interface PostalCodeData {
    name: string;
    postcode: string;
    state: {
        name: string;
        abbreviation: string;
    };
    locality: string;
}

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
}

const EditTaskForm = ({ task }: TaskCardProps) => {
    const [activeEditModalLink, setActiveEditModalLink] = useState<string>("Task Details");
    const [categories, setCategories] = useState<{ id: number; categoryName: string }[]>([]);
    const [postalCodes, setPostalCodes] = useState<PostalCodeData[]>([]);
    const [updatedTaskType, setUpdatedTaskType] = useState<string>(task.taskType);
    const [updatedPostCode, setUpdatedPostCode] = useState<any>(task.postCode);
    const [updatedSuburb, setUpdatedSuburb] = useState<string>(task.suburb!);
    const [updatedState, setUpdatedState] = useState<string>(task.state!);
    const [updatedCustomerBudget, setUpdatedCustomerBudget] = useState<string>(task.customerBudget.toString());
    const [updatedImage, setUpdatedImage] = useState(null)
    const [updatedDate, setUpdatedDate] = useState<Date | null>(null);
    const [updatedTime, setUpdatedTime] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { data: session } = useSession();
    const token = session?.user.accessToken;

    const [taskData, setTaskData] = useState({
        taskBriefDescription: task.taskBriefDescription,
        taskImage: updatedImage ? updatedImage : task.taskImage,
        taskTime: updatedTime ? updatedTime : task.taskTime,
        taskDate: updatedDate ? updatedDate : task.taskDate,
        taskType: updatedTaskType ? updatedTaskType : task.taskType,
        suburb: updatedSuburb ? updatedSuburb : task.suburb,
        state: updatedState ? updatedState : task.state,
        postCode: updatedPostCode ? updatedPostCode : task.postCode,
        customerBudget: task.customerBudget,
        categoryId: task.category.id,
        taskDescription: task.taskDescription,
    });

    useEffect(() => {
        const fetchPostalCodeData = async () => {
            try {
                const response = await axios.get(
                    `https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=${taskData.postCode}`,
                );
                setPostalCodes(response.data as PostalCodeData[]);
            } catch (error) {
                console.error("Error fetching postal code data:", error);
                setPostalCodes([]);
            }
        };

        fetchPostalCodeData();
    }, [taskData.postCode, updatedPostCode]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await axios.get(
                    "https://smp.jacinthsolutions.com.au/api/v1/util/all-categories",
                );
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchAllCategories();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        setUpdatedDate(date);
    };

    const handleTimeChange = (time: Date | null) => {
        setUpdatedTime(time);
    };

    const formatDateToString = (date: Date | null) => {
        if (date) {
            // Formatting the date as "dd-MM-yyyy"
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
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

    const dateString = formatDateToString(updatedDate);
    const timeString = formatTimeToString(updatedTime);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("File size exceeds 5MB.");
            } else {
                setTaskData(prev => ({ ...prev, taskImage: file }));
                const reader = new FileReader();
                reader.readAsDataURL(file);
                setError("");
            }
        }
    };

    // const handletaskImageUpload = (
    //     event: React.ChangeEvent<HTMLInputElement>,
    // ) => {
    //     const uploadedFile = event.target.files?.[0];
    //     if (uploadedFile) {
    //         if (uploadedFile.size > maxSize) {
    //             setErrs("File size exceeds 5MB.");
    //         } else {
    //             setTask({ ...task, taskImage: uploadedFile });

    //             setErrs("");
    //         }
    //     }
    // };

    const convertUrlToBlob = async (url: string): Promise<Blob> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    };

    const getImageURL = () => {
        if (task.taskImage instanceof File) {
            return URL.createObjectURL(task.taskImage);
        }
        return "";
    };
    const imageURL = getImageURL();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            Object.entries(taskData).forEach(([key, value]) => formData.append(key, String(value)));

            const url = `${process.env.NEXT_PUBLIC_API_URL}/task/update-task/${task.id}`;
            await axios.patch(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
            // closeModal();
        } catch (error: any) {
            setLoading(false);
            console.error(error.response?.data);
            setError(error.response?.data?.message || "An error occurred");
        }
    };

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
            <div className="border-b-2 border-[#140B31] w-full" />
            <div className="rounded-2xl min-h-[200px] min-w-[80%] lg:w-[850px] font-satoshi overflow-y-auto">
                <div className="lg:flex h-full lg:space-x-3 p-2">
                    <div className="hidden lg:block border-r-2 border-[#140B31] pr-8 space-y-5 pt-5">
                        <div className={`cursor-pointer text-lg font-bold ${activeEditModalLink === "Task Details" ? "bg-tc-orange rounded-lg pl-2 pr-5 py-2 text-white" : "text-primary"}`} onClick={() => setActiveEditModalLink("Task Details")}>Task Details</div>
                        <div className={`cursor-pointer text-lg font-bold ${activeEditModalLink === "Location" || activeEditModalLink === "Budget" ? "bg-tc-orange rounded-lg pl-2 pr-5 py-2 text-white" : "text-primary"}`} onClick={() => setActiveEditModalLink("Location")}>Location and Budget</div>
                    </div>
                    <div className="flex-1 w-full p-4 lg:px-5">
                        {activeEditModalLink === "Task Details" && (
                            <div className="space-y-8 w-full">
                                <div className="grid space-y-3">
                                    <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                                        Write a short title for the task you need done
                                    </label>
                                    <textarea
                                        className="h-full w-full rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB] border-none outline-none"
                                        placeholder="e.g, I need a junior league coach."
                                        name="taskBriefDescription"
                                        value={taskData.taskBriefDescription}
                                        onChange={handleInputChange}
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
                                                <h2>{categories.find(category => category.id === taskData.categoryId)?.categoryName || "Select Category"}</h2>
                                                <FaSortDown className="text-status-darkpurple" />
                                            </div>
                                        )}
                                        className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
                                    >
                                        {categories.map((category) => (
                                            <button
                                                type="button"
                                                key={category.id}
                                                className="block p-2 font-satoshiBold text-[12px] font-bold text-[#381F8C]"
                                                onClick={() => setTaskData(prev => ({ ...prev, categoryId: category.id }))}
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
                                        name="taskDescription"
                                        value={taskData.taskDescription}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-end space-x-3">
                                    <Button
                                        theme="outline"
                                        // onClick={closeModal}
                                        type="button"
                                        className="rounded-full px-10"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        theme="primary"
                                        type="button"
                                        onClick={() => setActiveEditModalLink("Location")}
                                        className="rounded-full px-10"
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
                                    {taskData.taskImage ? (
                                        <div className="flex items-end ">
                                            <div className="relative flex h-48 w-1/2 items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4">
                                                <img
                                                    src={imageURL}
                                                    alt="Uploaded Task"
                                                    className="h-full w-full object-contain"
                                                    width="100%"
                                                    height="100%"
                                                />
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    name="image"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                            <button
                                                className="rounded-lg bg-tc-gray px-3 py-1 text-white"
                                                onClick={() => {
                                                    setUpdatedImage(null)
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
                                                File Upload supports: JPG, PDF, PNG.
                                            </span>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                accept=".png, .jpg, .jpeg, .gif"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                    )}

                                </div>

                                <div className="space-y-5">
                                    <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                                        Set Day and Time
                                    </label>
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <DatePicker
                                                    selected={updatedDate}
                                                    onChange={handleDateChange}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    dateFormat="h:mm aa"
                                                    placeholderText="Choose Time"
                                                    id="taskTime"
                                                    name="taskTime"
                                                    // disabled={termAccepted}
                                                    customInput={<CustomInputs />}
                                                    className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
                                                />
                                            </div>
                                            <div className="relative">
                                                <DatePicker
                                                    selected={updatedTime}
                                                    onChange={handleTimeChange}
                                                    dateFormat="dd-MM-yyyy"
                                                    minDate={new Date()}
                                                    placeholderText="Choose Date"
                                                    id="taskDate"
                                                    name="taskDate"
                                                    // disabled={termAccepted}
                                                    customInput={<CustomInput />}
                                                    className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="check"
                                                        // checked={termAccepted}
                                                        // disabled={accepted}
                                                        // onChange={handleCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-[12px] text-status-darkpurple">
                                                        I’m Flexible
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-3">
                                    <Button
                                        theme="outline"
                                        onClick={() => setActiveEditModalLink("Task Details")}
                                        className="rounded-full px-10"
                                        type="button"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setActiveEditModalLink("Budget")}
                                        className="rounded-full px-10"
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
                                    <div className="flex space-x-4 text-[13px] text-[#221354]">
                                        <button
                                            className={`rounded-2xl p-2 ${updatedTaskType === "PHYSICAL_SERVICE"
                                                ? "bg-status-purpleBase text-white"
                                                : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                                                } outline-none`}
                                            name="physical"
                                            onClick={() => {
                                                setUpdatedTaskType("PHYSICAL_SERVICE")
                                            }}
                                        >
                                            Physical Service
                                        </button>
                                        <button
                                            className={`rounded-2xl p-2 ${updatedTaskType === "REMOTE_SERVICE"
                                                ? "bg-status-purpleBase text-white"
                                                : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                                                } outline-none`}
                                            name="remote"
                                            onClick={() => {
                                                setUpdatedTaskType("REMOTE_SERVICE")
                                            }}
                                        >
                                            Remote Service
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    {updatedTaskType === "REMOTE_SERVICE" && (
                                        <input
                                            type="text"
                                            name="remote"
                                            value="Remote"
                                            readOnly
                                            className=" rounded-2xl bg-[#EBE9F4] p-3 "
                                        />
                                    )}
                                    {updatedTaskType === "PHYSICAL_SERVICE" && (
                                        <>
                                            <div className="space-y-10 font-bold text-status-darkpurple ">
                                                <div className="flex space-x-4">
                                                    <div className="grid space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <label className='text-[13px] font-semibold text-status-darkpurple lg:text-[16px]'>
                                                                Postal code{" "}
                                                            </label>
                                                        </div>
                                                        <input
                                                            value={updatedPostCode}
                                                            onChange={(e) => setUpdatedPostCode(e.target.value)}
                                                            name="postCode"
                                                            className={`w-[155px] cursor-pointer  rounded-2xl bg-[#EBE9F4] p-3 text-[13px] placeholder:font-bold border-none outline-none"}`}
                                                        />
                                                    </div>

                                                    <div className="grid space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <label className='text-[13px] font-semibold text-status-darkpurple lg:text-[16px]'>
                                                                Suburb{" "}
                                                            </label>
                                                        </div>
                                                        <Dropdown
                                                            trigger={() => (
                                                                <div
                                                                    className={`flex h-full w-[150px] cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 font-satoshi text-[13px] font-light border-none outline-none"}`}
                                                                >
                                                                    <h2>{updatedState}</h2>
                                                                    <FaSortDown />
                                                                </div>
                                                            )}
                                                            className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
                                                        >
                                                            {postalCodes.map((data, index) => (
                                                                <button
                                                                    type="button"
                                                                    className="block p-2 text-[12px] text-[#221354]"
                                                                    key={index}
                                                                    value={data.name}
                                                                    onClick={() => setUpdatedState(data.name)}
                                                                >
                                                                    {data.name}
                                                                </button>
                                                            ))}
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <div className="grid space-y-4 ">
                                                    <label className='text-[13px] font-semibold text-status-darkpurple lg:text-[16px]'>State/Territory</label>
                                                    <input
                                                        value={
                                                            postalCodes.length > 0
                                                                ? postalCodes[0].state.name
                                                                : ""
                                                        }
                                                        onChange={handleInputChange}
                                                        name="state"
                                                        id="state"
                                                        disabled
                                                        className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-sm outline-none"
                                                    />
                                                </div>
                                            </div>
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
                                                    name="customerBudget"
                                                    onChange={(e) => setUpdatedCustomerBudget(e.target.value)}
                                                    value={updatedCustomerBudget ? updatedCustomerBudget : task.customerBudget}
                                                    placeholder="500"
                                                    className={`appearance-none w-full no-input-default-style placeholder:font-bold border-none"}`}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {error && <div className="font-bold text-red-500">{error}</div>}
                                    <div className="flex items-center justify-end space-x-3">
                                        <Button
                                            theme="outline"
                                            onClick={() => setActiveEditModalLink("Location")}
                                            className="rounded-full px-10"
                                            type="button"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            theme="primary"
                                            loading={loading}
                                            onClick={handleSubmit}
                                            className="rounded-full px-10"
                                        >
                                            Save changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default EditTaskForm;