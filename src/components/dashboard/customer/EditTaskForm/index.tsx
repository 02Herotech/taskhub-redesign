import Button from '@/components/global/Button';
import Dropdown from '@/components/global/Dropdown';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { FaSortDown } from 'react-icons/fa6';
import { GrFormCheckmark } from 'react-icons/gr';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomerTasks } from '@/types/services/tasks';
import { PiFileArrowDownDuotone } from 'react-icons/pi';
import Image from 'next/image';
import { set } from 'zod';

interface TaskCardProps {
    task: CustomerTasks;
}

interface Item {
    id: number;
    categoryName: string;
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

const EditTaskForm = ({ task }: TaskCardProps, { closeModal }: any) => {
    const [activeEditModalLink, setActiveEditModalLink] = useState<string>("Task Details");
    const [updatedDate, setUpdatedDate] = useState<Date | null>(null);
    const [updatedTime, setUpdatedTime] = useState<Date | null>(null);
    const [updatedBriefDescription, setUpdateBriefDescription] = useState("")
    const [updatedImage, setUpdatedImage] = useState<File | Blob | null | undefined>(null)
    const [updatedSuburb, setUpdatedSuburb] = useState("")
    const [updatedState, setUpdatedState] = useState("")
    const [updatedPostCode, setUpdatedPostCode] = useState<PostalCodeData[]>([])
    const [updatedCustomerBudget, setUpdatedCustomerBudget] = useState("")
    const [updatedCategoryId, setUpdatedCategoryId] = useState<null | number>(null)
    const [updatedTaskDescription, setUpdatedTaskDescription] = useState("")
    const [updatedTaskType, setUpdatedTaskType] = useState("")
    const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("")
    const [selectedServiceType, setSelectedServiceType] = useState<string>("Physical")
    const [wordCount, setWordCount] = useState(0);
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState("")
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    const { data: session } = useSession();
    const token = session?.user.accessToken;

    const [taskData, setTaskData] = useState({
        taskBriefDescription: updatedBriefDescription ? updatedBriefDescription : task.taskBriefDescription,
        taskImage: updatedImage ? updatedImage : task.taskImage,
        taskTime: updatedTime ? updatedTime : task.taskTime,
        taskDate: updatedDate ? updatedDate : task.taskDate,
        taskType: updatedTaskType ? updatedTaskType : task.taskType,
        suburb: updatedSuburb ? updatedSuburb : task.suburb,
        state: updatedState ? updatedState : task.state,
        postCode: updatedPostCode ? updatedPostCode : task.postCode,
        customerBudget: updatedCustomerBudget ? updatedCustomerBudget : task.customerBudget,
        categoryId: updatedCategoryId ? updatedCategoryId : task.category.id,
        taskDescription: updatedTaskDescription ? updatedTaskDescription : task.taskDescription,
    });


    // const handleChange = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     const wordArray = event.target.value.split(/\s+/).filter(Boolean);
    //     if (wordArray.length <= 10) {
    //         setTaskData({
    //             ...taskData,
    //             [event.target.name]: event.target.value,
    //         });
    //         setWordCount(wordArray.length);
    //     }
    // };

    console.log(updatedPostCode)

    const getImageURL = () => {
        if (task.taskImage instanceof File) {
            return URL.createObjectURL(task.taskImage);
        }
        return "";
    };
    const imageURL = getImageURL();

    useEffect(() => {
        const fetchPostalCodeData = async () => {
            try {
                const response = await axios.get(
                    `https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=${task.postCode}`,
                );
                setUpdatedPostCode(response.data as PostalCodeData[]);
            } catch (error) {
                console.error("Error fetching postal code data:", error);
                setUpdatedPostCode([]);
            }
        };

        fetchPostalCodeData();
    }, [task.postCode]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await axios.get(
                    "https://smp.jacinthsolutions.com.au/api/v1/util/all-categories",
                );
                const data: Item[] = response.data;
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchAllCategories();
    }, []);

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

    const handletaskImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            if (uploadedFile.size > maxSize) {
                setError("File size exceeds 5MB.");
            } else {
                setUpdatedImage(uploadedFile);
                const reader = new FileReader();
                reader.readAsDataURL(uploadedFile);
                setError("");
            }
        }
    };

    const dateString = formatDateToString(updatedDate);
    const timeString = formatTimeToString(updatedTime);

    const handleEditTask = async () => {
        try {
            const url = process.env.NEXT_PUBLIC_API_URL + "/task/update-task/" + task.id;
            await axios.patch(url, taskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            // setShowModal(true);
        } catch (error: any) {
            console.log(error.response.data);
            // setErrorMessage(error.response.data.message);
        }
    }

    return (
        <div className='pt-14 lg:px-5'>
            <div className="border-b-2 border-[#140B31] w-full" />
            <div className="rounded-2xl min-h-[200px] w-full lg:w-[850px] font-satoshi overflow-y-auto">
                <div className="lg:flex h-full lg:space-x-3 p-2">
                    <div className="hidden lg:block border-r-2 border-[#140B31] pr-8 space-y-5 pt-5">
                        <div className={`cursor-pointer text-lg font-bold ${activeEditModalLink === "Task Details" ? "bg-tc-orange rounded-lg pl-2 pr-5 py-2 text-white" : "text-primary"}`} onClick={() => setActiveEditModalLink("Task Details")}>Task Details</div>
                        <div className={`cursor-pointer text-lg font-bold ${activeEditModalLink === "Location" || activeEditModalLink === "Budget" ? "bg-tc-orange rounded-lg pl-2 pr-5 py-2 text-white" : "text-primary"}`} onClick={() => setActiveEditModalLink("Location")}>Location and Budget</div>
                    </div>
                    <div className="flex-1 w-full p-4 lg:px-5">
                        {activeEditModalLink === "Task Details" && (
                            <div className="space-y-8">
                                {/* Brief Description */}
                                <div className="grid space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                                            Write a short title for the task you need done{" "}
                                            <span className="font-extrabold text-[#ff0000]">*</span>
                                        </label>
                                        {/* {wordCount > 3 && (
                                            <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                                                <GrFormCheckmark />
                                            </div>
                                        )} */}
                                    </div>
                                    <textarea
                                        className={`h-full w-full rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB] border-none outline-none"}`}
                                        placeholder="e.g, I need a junior league coach."
                                        name="taskBriefDescription"
                                        value={updatedBriefDescription ? updatedBriefDescription : task.taskBriefDescription}
                                        onChange={(e) => setUpdateBriefDescription(e.target.value)}
                                        style={{ resize: "none", overflow: "hidden" }}
                                    ></textarea>
                                    {/* <div className="text-right text-sm text-status-darkpurple">
                                        {wordCount}/10 words
                                    </div> */}
                                </div>

                                {/* Category */}
                                <div className="relative grid space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[13px] font-semibold lg:text-[16px]">
                                            What category best describes your task?{" "}
                                            <span className="font-extrabold text-[#ff0000]">*</span>
                                        </label>
                                        {/* {updatedCategoryId || task.category.id && (
                                            <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                                                <GrFormCheckmark />
                                            </div>
                                        )} */}
                                    </div>
                                    <Dropdown
                                        trigger={() => (
                                            <div
                                                className={`flex h-full w-full cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] text-status-darkpurple border-none outline-none"}`}
                                            >
                                                <h2>{updatedCategoryName ? updatedCategoryName : task.category.categoryName}</h2>
                                                <FaSortDown className="text-status-darkpurple" />
                                            </div>
                                        )}
                                        className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
                                    >
                                        {items.map((item) => (
                                            <button
                                                type="button"
                                                key={item.id}
                                                value={item.id}
                                                className="block p-2 font-satoshiBold text-[12px] font-bold text-[#381F8C]"
                                                onClick={() => {
                                                    setUpdatedCategoryId(item.id);
                                                    setUpdatedCategoryName(item.categoryName);
                                                }}
                                            >
                                                {item.categoryName}
                                            </button>
                                        ))}
                                    </Dropdown>
                                </div>

                                {/* Description */}
                                <div className="relative grid space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="flex text-[13px] font-semibold lg:text-[16px]">
                                            Give a description of your task {""}{" "}
                                            <span className="font-extrabold text-[#ff0000]">*</span>
                                        </label>
                                        {/* {wordCount > 15 && (
                                            <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                                                <GrFormCheckmark />
                                            </div>
                                        )} */}
                                    </div>
                                    <textarea
                                        className={`h-[150px] rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB] resize-none border-none outline-none small-scrollbar`}
                                        placeholder="Arts and Craft"
                                        name="description"
                                        value={updatedTaskDescription ? updatedTaskDescription : task.taskDescription}
                                        onChange={(e) => setUpdatedTaskDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-end space-x-3">
                                    <Button
                                        theme="outline"
                                        onClick={closeModal}
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
                            <div className="space-y-8">
                                {/* Date, Time and Image */}
                                <div className="space-y-3">
                                    <label className="font-satoshiBold text-[13px] font-bold text-status-darkpurple lg:text-[16px]">
                                        Upload an Image (Optional)
                                    </label>
                                    <div className="flex space-x-5">
                                        <div className="relative flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4">
                                            <Image
                                                src={updatedImage ? updatedImage as unknown as string : task.taskImage}
                                                width={130}
                                                height={130}
                                                alt="Uploaded Task"
                                                className="h-full w-full object-contain"
                                            />
                                            <input
                                                id="file-upload"
                                                type="file"
                                                readOnly
                                                disabled
                                                name="image"
                                                className="hidden"
                                                onChange={handletaskImageUpload}
                                            />
                                        </div>
                                        <div className="flex items-end space-x-1">
                                            <label
                                                htmlFor="file-upload"
                                                className="flex h-48 flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 "
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
                                                    onChange={handletaskImageUpload}
                                                />
                                            </label>
                                            <Button
                                                className="rounded-lg bg-tc-gray px-3 border-none py-1 text-white"
                                                onClick={() => setUpdatedImage(null)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>

                                    {error && <div className="font-bold text-red-500">{error}</div>}
                                </div>
                                <div className="space-y-5">
                                    <label
                                        htmlFor="taskTime"
                                        className="test-[20px] font-satoshiBold font-bold text-status-darkpurple"
                                    >
                                        Set Day and Time{" "}
                                        <span className="font-extrabold text-[#ff0000]">*</span>
                                    </label>
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <DatePicker
                                                    selected={updatedTime}
                                                    onChange={handleTimeChange}
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
                                                    className="w-full cursor-pointer rounded-2xl  bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
                                                />
                                            </div>
                                            <div className="relative">
                                                <DatePicker
                                                    selected={updatedDate}
                                                    onChange={handleDateChange}
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
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="check"
                                                // checked={termAccepted}
                                                // disabled={accepted}
                                                // onChange={handleCheckboxChange}
                                                className="mr-2"
                                            />
                                            <span className="text-[12px] font-semibold text-primary">
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
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        theme="primary"
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
                                    <h2 className="font-satoshiBold text-[13px] font-bold text-status-darkpurple lg:text-[16px]">
                                        Type of Service{" "}
                                        <span className="font-extrabold text-[#ff0000]">*</span>
                                    </h2>
                                    <div className="flex space-x-4 text-[13px] text-[#221354]">
                                        <button
                                            className={`rounded-2xl p-2 ${selectedServiceType === "Physical"
                                                ? "bg-status-purpleBase text-white"
                                                : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                                                } outline-none`}
                                            name="physical"
                                            onClick={() => {
                                                setSelectedServiceType("Physical")
                                                setUpdatedTaskType("PHYSICAL_SERVICE")
                                            }}
                                        >
                                            Physical Service
                                        </button>
                                        <button
                                            className={`rounded-2xl p-2 ${selectedServiceType === "Remote"
                                                ? "bg-status-purpleBase text-white"
                                                : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                                                } outline-none`}
                                            name="remote"
                                            onClick={() => {
                                                setSelectedServiceType("Remote")
                                                setUpdatedTaskType("REMOTE_SERVICE")
                                            }}
                                        >
                                            Remote Service
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    {selectedServiceType === "Remote" && (
                                        <input
                                            type="text"
                                            name="remote"
                                            value="Remote"
                                            readOnly
                                            className=" rounded-2xl bg-[#EBE9F4] p-3 "
                                        />
                                    )}
                                    {selectedServiceType === "Physical" && (
                                        <>
                                            <div className="space-y-10 font-bold text-status-darkpurple ">
                                                <div className="flex space-x-4">
                                                    <div className="grid space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <label>
                                                                Postal code{" "}
                                                                <span className="font-extrabold text-[#ff0000]">
                                                                    *
                                                                </span>
                                                            </label>
                                                            {/* {selectedCode && (
                                                            <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                                                                <GrFormCheckmark />
                                                            </div>
                                                        )} */}
                                                        </div>
                                                        <input
                                                            // value={updatedPostCode. ? updatedPostCode : task.postCode}
                                                            // onChange={(e) => setUpdatedPostCode(e.target.value)}
                                                            name="postCode"
                                                            className={`w-[155px] cursor-pointer  rounded-2xl bg-[#EBE9F4] p-3 text-[13px] placeholder:font-bold border border-none outline-none"}`}
                                                        />
                                                    </div>

                                                    <div className="grid space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <label>
                                                                Suburb{" "}
                                                                <span className="font-extrabold text-[#ff0000]">
                                                                    *
                                                                </span>
                                                            </label>
                                                            {/* {selectedCity && (
                                                            <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                                                                <GrFormCheckmark />
                                                            </div>
                                                        )} */}
                                                        </div>
                                                        <Dropdown
                                                            trigger={() => (
                                                                <div
                                                                    className={`flex h-full w-[150px] cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 font-satoshi text-[13px] font-light border-none outline-none"}`}
                                                                >
                                                                    <h2>{updatedSuburb ? updatedSuburb : task.suburb}</h2>
                                                                    <FaSortDown />
                                                                </div>
                                                            )}
                                                            className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
                                                        >
                                                            {updatedPostCode.map((data, index) => (
                                                                <button
                                                                    type="button"
                                                                    className="block p-2 text-[12px] text-[#221354]"
                                                                    key={index}
                                                                    value={data.name}
                                                                    onClick={() => setUpdatedSuburb(data.name)}
                                                                >
                                                                    {data.name}
                                                                </button>
                                                            ))}
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <div className="grid space-y-4 ">
                                                    <label>State/Territory</label>
                                                    <input
                                                        value={
                                                            task.state
                                                                ? task.state
                                                                : updatedPostCode[0].state.name
                                                        }
                                                        onChange={() => setUpdatedState(updatedPostCode[0].state.name)}
                                                        name="state"
                                                        id="state"
                                                        disabled
                                                        className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-sm outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <label className="text-[13px] lg:text-[16px]">
                                                    Budget{" "}
                                                    <span className="font-extrabold text-[#ff0000]">*</span>
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
                                            onClick={handleEditTask}
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
    )
}


export default EditTaskForm