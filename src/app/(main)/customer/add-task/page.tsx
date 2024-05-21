/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { FaGreaterThan } from "react-icons/fa";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useSession } from "next-auth/react";
import image from "../../../../../public/assets/images/customer/Task management.png";
import Image from "next/image";
import Link from "next/link";

interface FormData {
    taskDescription: string;
    taskImage?: File | defaultImage | null;
    taskTime: string;
    taskDate: string;
    taskType: string;
    customerBudget: string;
    hubTime: string;
    taskAddress: string[];
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

type defaultImage = string;

const AddTaskForm: React.FC = () => {
    const session = useSession();
    const token = session?.data?.user.accessToken;
    const [currentPage, setCurrentPage] = useState(1);
    const [task, setTask] = useState<FormData>({
        taskDescription: "",
        taskImage: null,
        taskTime: "",
        taskDate: "",
        taskType: "",
        taskAddress: [],
        customerBudget: "",
        hubTime: "",
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [selectedCode, setSelectedCode] = useState("");
    const [selectedSuite, setSelectedSuite] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isRemote, setIsRemote] = useState("")
    const [isSelectedTime, setIsSelectedTime] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
        null,
    );
    const [errors, setErrors] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [postalCodeData, setPostalCodeData] = useState<PostalCodeData[]>([]);

    useEffect(() => {
        const fetchPostalCodeData = async () => {
            try {
                const response = await axios.get(
                    `https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=${selectedCode}`
                );
                setPostalCodeData(response.data as PostalCodeData[]);
            } catch (error) {
                console.error("Error fetching postal code data:", error);
                setPostalCodeData([]);
            }
        };

        if (selectedCode.length > 0) {
            fetchPostalCodeData();
        }
    }, [selectedCode]);

    const validateFields = () => {
        const errors: any = {};
        if (activeButtonIndex === 0) {
            // Validation for physical service
            if (!selectedCode) {
                errors.postalCode = "Please select postal code.";
            } else if (!selectedCity) {
                errors.city = "Please select city.";
            } else if (!task.customerBudget) {
                errors.customerBudget = "please enter your budget";
            }
        } else if (activeButtonIndex === 0) {
            // Validation for remote service
            if (!selectedSuite) {
                errors.taskAddress = "Please enter taskAddress and suite number.";
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateField1 = () => {
        const error: any = {};
        if (!task.taskDescription) {
            error.taskDescription = "please write down a brief description";
        }

        if (!selectedDate) {
            error.taskTime = "please choose a Date";
        } else if (!selectedTime) {
            error.taskDate = "please choose a Time";
        }

        if (termsAccepted) {
            if (!isSelectedTime) {
                error.terms = "please choose a Time.";
            }
        }

        setError(error);
        return Object.keys(error).length === 0;
    };

    const handleClick = (index: number) => {
        setActiveButtonIndex(index);
        setIsOpen(true);
    };

    const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCode(event.target.value);
    };

    const handleCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedCity(selectedValue);
    };


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTermsAccepted(event.target.checked);
        if (!event.target.checked) {
            setIsSelectedTime("");
        }
    };

    const handleTickChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setIsSelectedTime(selectedValue);
    };

    const nextPage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateField1()) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    const handletaskImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setTask({ ...task, taskImage: uploadedFile });
        }
    };

    const getImageURL = () => {
        if (task.taskImage instanceof File) {
            return URL.createObjectURL(task.taskImage);
        }
        return "";
    };

    const imageURL = getImageURL();

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time: Date | null) => {
        setSelectedTime(time);
    };

    const formatDateToString = (date: Date | null) => {
        if (date) {
            // Formatting the date as "dd-MM-yyyy"
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return "";
    };

    const formatTimeToString = (time: Date | null) => {
        if (time) {
            // Formatting the time as "HH:mm"
            const hours = String(time.getHours()).padStart(2, '0');
            const minutes = String(time.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        }
        return "";
    };

    const dateString = formatDateToString(selectedDate);
    const timeString = formatTimeToString(selectedTime);

    const calculateProgress = () => {
        const isPhysical = task.taskType === 'physical';
        const requiredFields = [
            task.taskDescription,
            task.taskTime,
            task.taskDate,
            task.customerBudget,
            selectedDate,
            selectedTime,
        ];

        if (isOpen && activeButtonIndex === 1) {
            requiredFields.push(isRemote)
        } else {
            requiredFields.push(selectedCode, selectedCity)
        }
        const filledFields = requiredFields.filter(value => value !== '' && value !== null).length;

        // Calculate the total number of fields that need to be filled
        const totalFields = (isOpen && activeButtonIndex === 0) ? 6 : 5;

        return Math.round((filledFields / totalFields) * 100);
    };

    const progress = calculateProgress();



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (validateFields() && validateField1()) {
            try {
                let finalTask = { ...task };

                if (termsAccepted) {
                    finalTask = { ...finalTask };
                }
                if (termsAccepted) {
                    const hub = isSelectedTime
                    finalTask = { ...finalTask, hubTime: hub };
                }
                if (selectedTime && selectedDate) {
                    const date = dateString;
                    const time = timeString;
                    finalTask = { ...finalTask, taskDate: date, taskTime: time }
                }

                if (isOpen && activeButtonIndex === 1) {
                    const type = "REMOTE_SERVICE"
                    finalTask = { ...finalTask, taskType: type };
                } else {
                    const Address = [selectedCode, selectedCity, postalCodeData[0].state.name];
                    finalTask = {
                        ...finalTask,
                        taskType: "PHYSICAL_SERVICE",
                        taskAddress: Address,
                    };
                }



                if (!task.taskImage) {
                    const defaultImage =
                        "google-map.png";
                    setTask({ ...task, taskImage: defaultImage });
                }


                // await axios.post(
                //     "https://smp.jacinthsolutions.com.au/api/v1/task/post",
                //     finalTask,
                //     {
                //         headers: {
                //             Authorization: `Bearer ${token}`,
                //             'Content-Type': 'multipart/form-data',
                //         },
                //     },
                // );
                setTask({
                    taskDescription: "",
                    taskImage: "",
                    taskTime: "",
                    taskDate: "",
                    taskType: "",
                    hubTime: "",
                    taskAddress: [],
                    customerBudget: "",
                });
                console.log(finalTask);
                setIsSuccessPopupOpen(true);
            } catch (error) {
                console.error("Error submitting form:", error);
                setIsSuccessPopupOpen(false);
            }
        }

    };

    const renderPage = () => {
        switch (currentPage) {
            case 1:
                return (
                    <div className="mb-10 grid items-center justify-center space-y-10">
                        <form className="space-y-10 font-medium" onSubmit={nextPage}>
                            <div className="grid space-y-3">
                                <label className="text-status-darkpurple">Briefly tell us what you need done?</label>
                                <textarea
                                    className="h-full rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                                    placeholder="e.g, i need a junior league coach."
                                    name="taskDescription"
                                    value={task.taskDescription}
                                    onChange={handleChange} style={{ resize: "none", overflow: "hidden" }}></textarea>
                            </div>
                            <div className=" space-y-3">
                                <label className="text-status-darkpurple">Upload a taskImage (Optional)</label>
                                {task.taskImage ? (
                                    <div className="flex items-end justify-center">
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
                                                readOnly
                                                disabled
                                                name="image"
                                                className="hidden"
                                                onChange={handletaskImageUpload}
                                            />
                                        </div>
                                        <button
                                            className="rounded-lg bg-tc-gray px-3 py-1 text-white"
                                            onClick={() => {
                                                setTask({ ...task, taskImage: null });
                                            }}>
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="file-upload"
                                        className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4">
                                        <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                                        <span className="text-center text-[#EBE9F4]">
                                            Choose a File Upload supports: JPG, PDF, PNG.
                                        </span>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept=".png, .jpg, .jpeg, .gif"
                                            className="hidden"
                                            onChange={handletaskImageUpload}
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="space-y-5">
                                <label htmlFor="taskTime" className="text-status-darkpurple">
                                    Set number(s) of working Days /Time:
                                </label>
                                <div className="flex space-x-3">
                                    <div className="relative">
                                        <DatePicker
                                            selected={selectedTime}
                                            onChange={handleTimeChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            dateFormat="h:mm aa"
                                            placeholderText="Choose Time"
                                            id="taskTime"
                                            name="taskTime"
                                            className="cursor-pointer rounded-2xl w-full border hover:text-white border-tc-gray bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] hover:bg-status-purpleBase hover:placeholder:text-white"
                                        />
                                        <IoMdArrowDropdown className="absolute right-5 top-2 cursor-pointer text-status-purpleBase" />
                                    </div>
                                    <div className="relative">
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="dd-MM-yyyy"
                                            minDate={new Date()}
                                            placeholderText="Choose Date"
                                            id="taskDate"
                                            name="taskDate"
                                            className="cursor-pointer rounded-2xl border w-full hover:text-white border-tc-gray bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] hover:bg-status-purpleBase hover:placeholder:text-white"
                                        />

                                        <IoMdArrowDropdown className="absolute right-5 top-2 text-status-purpleBase" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="check"
                                        checked={termsAccepted}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    <span className="text-status-darkpurple">I need a certain time of day.</span>
                                </div>
                                {termsAccepted && (
                                    <div className="mt-2">
                                        <select
                                            value={isSelectedTime}
                                            onChange={handleTickChange}
                                            name="hubTime"
                                            className="w-full rounded-2xl border border-tc-gray bg-[#EBE9F4] px-3 py-1 text-[14px] text-status-purpleBase   outline-none">
                                            <option value="">Select Time Of The Day</option>
                                            <option value="MORNING_BEFORE_10AM">Morning, before 10am</option>
                                            <option value="MIDDAY_10AM_to_12PM">Midday, 10am to 12pm</option>
                                            <option value="AFTERNOON_12PM_to_2PM">Afternoon, 12pm to 2pm</option>
                                            <option value="EVENING_2PM_to_5PM">Evening, 2pm to 5pm</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className="text-[#FF0000]">
                                {Object.keys(error).map((key, index) => (
                                    <div key={index}>{error[key]}</div>
                                ))}
                            </div>
                            <Button type="submit" className="w-1/2 rounded-3xl p-3 text-white">
                                Next
                            </Button>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div className="mb-10 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-status-darkpurple font-medium">Type of Service</h2>
                            <div className="flex space-x-4 text-[13px] text-[#221354]">
                                <button
                                    className={`rounded-2xl p-2 ${activeButtonIndex === 0
                                        ? "bg-status-purpleBase text-white"
                                        : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                                        } outline-none`}
                                    name="physical"
                                    onClick={() => handleClick(0)}>
                                    Physical Service
                                </button>
                                <button
                                    className={`rounded-2xl p-2 ${activeButtonIndex === 1
                                        ? "bg-status-purpleBase text-white"
                                        : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                                        } outline-none`}
                                    name="remote"
                                    onClick={() => { handleClick(1); setIsRemote("Remote") }}>
                                    Remote Service
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {isOpen && activeButtonIndex === 1 && (
                                <input
                                    type="text"
                                    name="remote"
                                    value={isRemote}
                                    readOnly
                                    className=" rounded-2xl bg-[#EBE9F4] p-3 "
                                />
                            )}
                            {isOpen && activeButtonIndex === 0 && (
                                <div className="space-y-10 text-status-darkpurple font-medium">
                                    <div className="flex space-x-4">
                                        <div className="grid space-y-4">
                                            <label >Postal code</label>
                                            <input
                                                value={selectedCode}
                                                onChange={handleCode}
                                                name="postalCode"
                                                className="w-[155px] cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none" />
                                        </div>

                                        <div className="grid space-y-4">
                                            <label>City/Suburb</label>
                                            <select
                                                value={selectedCity}
                                                onChange={handleCity}
                                                name="city"
                                                id="city"
                                                className="w-[155px] cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none"
                                            >
                                                <option value="">Select City/Suburb</option>
                                                {postalCodeData.map((data, index) => (
                                                    <option key={index} value={data.name}>
                                                        {data.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid space-y-4 ">
                                        <label>State/Territory</label>
                                        <input
                                            value={postalCodeData.length > 0 ? postalCodeData[0].state.name : ''}
                                            onChange={handleChange}
                                            name="state"
                                            id="state"
                                            disabled
                                            className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-sm outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                            <p className="text-xl text-[#381F8C] font-extrabold">Your Budget</p>
                            <div className="grid space-y-4 text-status-darkpurple font-medium">
                                <label>Budget</label>
                                <input
                                    type="text"
                                    name="customerBudget"
                                    value={task.customerBudget}
                                    onChange={handleChange}
                                    placeholder="$500"
                                    className="rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none"
                                />
                            </div>
                            <div className="text-[#FF0000]">
                                {Object.keys(errors).map((key, index) => (
                                    <div key={index}>{errors[key]}</div>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <Button type="submit" >Confirm Task</Button>
                                <button
                                    type="button"
                                    onClick={prevPage}
                                    className="w-[100px] rounded-2xl bg-[#EBE9F4] p-2 text-[14px] outline-none hover:bg-purpleBase hover:text-white"
                                >
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center mt-24">
            <Head>
                <title>TaskHub | Add Task</title>
            </Head>
            <div className="w-full">
                <div className="flex justify-center space-x-5 mb-3">
                    <div
                        className={`${currentPage === 1
                            ? "text-status-purpleBase"
                            : "text-status-purpleBase"
                            }`}>
                        <p className="flex items-center gap-2 lg:gap-3 text-[12px] md:text-[16px]">
                            <span
                                className={`${currentPage === 1
                                    ? "bg-status-purpleBase text-white"
                                    : "bg-status-purpleBase text-white"
                                    } rounded-xl border-none px-3 py-1`}>
                                01
                            </span>{" "}
                            Services Details
                            <span >
                                <FaGreaterThan />
                            </span>
                        </p>
                    </div>
                    <div
                        className={`${currentPage === 2
                            ? "text-status-purpleBase"
                            : " text-[#716F78]"
                            }`}>
                        <p className="flex items-center gap-2 lg:gap-3 text-[12px] md:text-[16px]">
                            <span
                                className={`${currentPage === 2
                                    ? "bg-status-purpleBase text-white"
                                    : "bg-[#EAE9EB] text-[#716F78]"
                                    } rounded-xl border-none px-3 py-1`}>
                                02
                            </span>{" "}
                            Location and Budget
                            <span >
                                <FaGreaterThan />
                            </span>
                        </p>
                    </div>
                </div>
                <hr className="h-[2px] bg-[#EAE9EB] text-[#EAE9EB] w-full" />
                <div>
                    <div className="flex justify-center">
                        <div
                            className="container flex items-center w-80 lg:w-full justify-center space-x-5 border-2 border-[#EAE9EB] p-3"
                            style={{ borderRadius: "0px 0px 20px 20px ", borderTop: "none" }}>
                            {/* Progress bar */}
                            <div className="h-1 w-2/3 overflow-hidden bg-[#EAE9EB]">
                                <div
                                    className={`h-full ${currentPage === 1
                                        ? "bg-status-purpleBase"
                                        : currentPage === 2
                                            ? "bg-status-purpleBase"
                                            : "bg-status-purpleBase"
                                        }`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-status-darkpurple">
                                {`${progress}% complete`}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center p-8 lg:p-0 font-medium mt-8">
                    <div>
                        <div>
                            <h2 className="text-4xl text-status-darkpurple">Add a Task</h2>
                            <p className="text-[12px] text-[#716F78]">
                                Please fill out the information below to add a new task.
                            </p>
                        </div>
                        <div className="mt-8">{renderPage()}</div>
                    </div>
                </div>
            </div>
            <Popup
                isOpen={isSuccessPopupOpen}
                onClose={() => {
                    setIsSuccessPopupOpen(false);
                }}>
                <div className="p-5 lg:px-20">
                    <div className="relative grid items-center justify-center space-y-5">
                        <div className="flex justify-center text-white">
                            <TiTick className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px] rounded-full bg-[#FE9B07] p-2" />
                        </div>
                        <p className="text-center text-[25px] lg:text-[37px] text-[#2A1769] font-extrabold font-clashDisplay ">TaskPosted</p>
                        <p className="lg:text-[20px]">
                            Your Task has been posted! please click <br /> on the button to
                            proceed to marketplace
                        </p>
                        <Image src={image} alt="image" className="absolute lg:top-2/3 lg:-right-20 -right-8 top-40 w-20 lg:w-32" />
                        <div className="flex justify-center">
                            <Link href="/">
                                <button className="w-[100px] rounded-2xl bg-status-purpleBase p-2 text-[14px] text-white outline-none">
                                    Go Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default AddTaskForm;
