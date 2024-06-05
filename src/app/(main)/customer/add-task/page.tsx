/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { IoIosArrowForward } from "react-icons/io";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GrFormCheckmark } from "react-icons/gr";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useSession } from "next-auth/react";
import image from "../../../../../public/assets/images/customer/Task management.png";
import img from "../../../../../public/assets/images/blend.png";
import imag from "../../../../../public/assets/images/contract.png";
import imgg from "../../../../../public/assets/images/girl.png"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { FaSortDown} from "react-icons/fa6";
import Dropdown from "@/components/global/Dropdown";


interface FormData {
  taskBriefDescription: string;
  taskImage?: File | null | Blob;
  taskTime: string;
  taskDate: string;
  taskType: string;
  customerBudget: number | null;
  termAccepted: boolean;
  taskAddress: string[];
  categoryId: number | null;
  taskDescription: string;
}

interface Item {
  id: string;
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

const AddTaskForm: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  const token = session?.data?.user.accessToken;
  const isAuthenticated = session.status === "authenticated";
  const [currentPage, setCurrentPage] = useState(1);
  const defaultImageSrc =
    "https://static.wixstatic.com/media/7d1889_ab302adc66e943f9b6be9de260cbc40f~mv2.png";
  const [task, setTask] = useState<FormData>({
    taskBriefDescription: getCookie("taskBriefDescription") || "",
    taskImage: null,
    taskTime: getCookie("taskTime") || "",
    taskDate: getCookie("taskDate") || "",
    taskType: getCookie("taskType") || "",
    taskAddress: [],
    customerBudget: getCookie("categoryId")
      ? parseInt(getCookie("categoryId") as string)
      : null,
    termAccepted: false,
    categoryId: getCookie("categoryId")
      ? parseInt(getCookie("categoryId") as string)
      : null,
    taskDescription: getCookie("taskDescription") || "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("Select a City/Suburb");
  const [termAccepted, settermAccepted] = useState(false);
  const [isRemote, setIsRemote] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("Category");
  const [isOpen, setIsOpen] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [postalCodeData, setPostalCodeData] = useState<PostalCodeData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [wordCounts, setWordCounts] = useState(0);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);

  
 const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => (
   <button
     className="flex text-[12px] lg:text-[14px]  lg:w-[150px] justify-between cursor-pointer rounded-2xl border  border-tc-gray  bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
     onClick={onClick}
     type="button"
   >
     {value || "Choose Date"} <FaSortDown />
   </button>
 );
  
  const CustomInputs: React.FC<CustomInputProps> = ({ value, onClick }) => (
    <button
      className="flex text-[12px] lg:text-[14px] lg:w-[150px] cursor-pointer justify-between rounded-2xl border  border-tc-gray  bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
      onClick={onClick}
      type="button"
    >
      {value || "Choose Time"} <FaSortDown/>
    </button>
  );

  
  const handleLoginNavigation = () => {
    router.push("/auth/sign-up?userType=Service+Provider?from=/customer/add-task");
  };

   useEffect(() => {
     // Save task data to cookies whenever it changes
     setCookie("taskBriefDescription", task.taskBriefDescription, { maxAge: 120 });
     setCookie("taskTime", task.taskTime, { maxAge: 120 });
     setCookie("taskDate", task.taskDate, { maxAge: 120 });
     setCookie("taskType", task.taskType, { maxAge: 120 });
     setCookie("taskAddress", JSON.stringify(task.taskAddress), {
       maxAge: 120,
     });
     setCookie("customerBudget", task.customerBudget, { maxAge: 120 });
     setCookie("hubTime", task.termAccepted, { maxAge: 120 });
     setCookie("categoryId", task.categoryId?.toString(), { maxAge: 120 });
     setCookie("taskDescription", task.taskDescription, { maxAge: 120 });
   }, [task]);

  useEffect(() => {
    const fetchPostalCodeData = async () => {
      try {
        const response = await axios.get(
          `https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=${selectedCode}`,
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
  useEffect(() => {
    const fetchItems = async () => {
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

    fetchItems();
  }, []);

  const validateFields = () => {
    const errors: any = {};
    if (activeButtonIndex === 0) {
      // Validation for physical service
      if (!selectedCode) {
        errors.postalCode = "Please select postal code.";
      } else if (!selectedCity) {
        errors.city = "Please select city.";
      }
    }
    if (!task.customerBudget) {
      errors.customerBudget = "please enter your budget";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

 const validateField1 = () => {
   const error: any = {};

   // Validate taskBriefDescription
   if (!task.taskBriefDescription) {
     error.taskBriefDescription = "Please write down a brief description.";
   }

   // Validate taskDescription
   if (!task.taskDescription) {
     error.taskDescription = "Please write down a description.";
   }

   // Validate selectedTime and selectedDate or termAccepted
   if (!(selectedTime && selectedDate) && !termAccepted) {
     error.message = "Please select a time and date, or accept the terms.";
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

 
  const handleCity = (data: any) => {
    setSelectedCity(data);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settermAccepted(event.target.checked);
  };

 
  const handleCategoryChange = (
   item: any
  ) => {
    const selectedId = parseInt(item);
    setSelectedCategory(selectedId);
    setTask({
      ...task,
      categoryId: selectedId,
    });
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

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numberValue = value === "" ? 0 : parseFloat(value);
    setTask({
      ...task,
      [name]: numberValue,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
    setWordCount(event.target.value.split(/\s+/).filter(Boolean).length);
  };

  const handleDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTask({
      ...task,
      taskDescription: event.target.value,
    });
    setWordCounts(event.target.value.split(/\s+/).filter(Boolean).length);
  };

  const handletaskImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setTask({ ...task, taskImage: uploadedFile });

      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
    }
  };

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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
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

  const dateString = formatDateToString(selectedDate);
  const timeString = formatTimeToString(selectedTime);

  const calculateProgress = () => {
    const requiredFields = [
      task.taskBriefDescription,
      task.customerBudget,
      task.taskDescription,
      selectedCategory,
    ];

    if (isOpen && activeButtonIndex === 1) {
      requiredFields.push(isRemote);
    } else {
      requiredFields.push(selectedCode);
    }

    const filledFields = requiredFields.filter(
      (value) => value !== "" && value !== null,
    ).length;

    // Calculate the total number of fields that need to be filled
    let totalFields = 5;

    return Math.round((filledFields / totalFields) * 100);
  };

  const progress = calculateProgress();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields() && validateField1()) {
      try {
        let finalTask = { ...task };

        if (termAccepted) {
          finalTask = { ...finalTask };
        }
        
        if (selectedDate && selectedTime) {
          const date = dateString;
          const time = timeString;
          finalTask = { ...finalTask, taskDate: date, taskTime: time };
        } else if (termAccepted) {
          finalTask = { ...finalTask, termAccepted: true };
        }

        if (isOpen && activeButtonIndex === 1) {
          const type = "REMOTE_SERVICE";
          finalTask = { ...finalTask, taskType: type };
        } else {
          const Address = [
            selectedCode,
            selectedCity,
            postalCodeData[0].state.name,
          ];
          finalTask = {
            ...finalTask,
            taskType: "PHYSICAL_SERVICE",
            taskAddress: Address,
          };
        }

        if (!task.taskImage) {
          const defaultImageBlob = await convertUrlToBlob(defaultImageSrc);
          finalTask = { ...finalTask, taskImage: defaultImageBlob };
        }

        console.log(finalTask);
        await axios.post(
          "https://smp.jacinthsolutions.com.au/api/v1/task/post",
          finalTask,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setTask({
          taskBriefDescription: "",
          taskImage: null,
          taskTime: "",
          taskDate: "",
          taskType: "",
          termAccepted: false,
          taskAddress: [],
          customerBudget: null,
          categoryId: null,
          taskDescription: "",
        });
        console.log(finalTask);
        setIsSuccessPopupOpen(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSuccessPopupOpen(true);
      }
    }
  };

  

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="mb-10 grid items-center justify-center space-y-10">
            <form
              className="space-y-10 font-medium text-status-darkpurple"
              onSubmit={nextPage}
            >
              <div className="grid space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-status-darkpurple">
                    Briefly tell us what you need done?
                  </label>
                  {wordCount > 5 && (
                    <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                      <GrFormCheckmark />
                    </div>
                  )}
                </div>
                <textarea
                  className="h-full w-full rounded-2xl bg-[#EBE9F4] p-3 outline-none placeholder:font-bold"
                  placeholder="e.g, I need a junior league coach."
                  name="taskBriefDescription"
                  value={task.taskBriefDescription}
                  onChange={handleChange}
                  style={{ resize: "none", overflow: "hidden" }}
                ></textarea>
              </div>
              <div className="relative grid space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-semibold">
                    What category best describes your task?
                  </label>
                  {selectedCategory && (
                    <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                      <GrFormCheckmark />
                    </div>
                  )}
                </div>
                <Dropdown
                  trigger={() => (
                    <div className="flex h-full w-full cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none">
                      <h2>{selectedCategoryName}</h2>
                      <FaSortDown />
                    </div>
                  )}
                  className="left-0 right-0 top-14 mx-auto bg-white"
                >
                  {items.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      value={item.id}
                      className="block p-2 text-[12px] text-[#221354]"
                      onClick={() => {
                        handleCategoryChange(item.id);
                        setSelectedCategoryName(item.categoryName);
                      }}
                    >
                      {item.categoryName}
                    </button>
                  ))}
                </Dropdown>
              </div>
              <div className="relative grid space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex justify-between font-semibold">
                    Give a description of your task
                  </label>
                  {wordCounts > 10 && (
                    <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                      <GrFormCheckmark />
                    </div>
                  )}
                </div>
                <textarea
                  className=" h-[150px] rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                  placeholder="Arts and Craft"
                  name="description"
                  value={task.taskDescription}
                  onChange={handleDescription}
                ></textarea>
              </div>
              <div className=" space-y-3">
                <label className="font-satoshiBold font-bold text-status-darkpurple">
                  Upload an Image (Optional)
                </label>
                {task.taskImage ? (
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
                      onChange={handletaskImageUpload}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-5 ">
                <label
                  htmlFor="taskTime"
                  className="test-[20px] font-satoshiBold font-bold text-status-darkpurple"
                >
                  Set Day and Time:
                </label>
                <div className="flex items-center space-x-3">
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
                      disabled={termAccepted}
                      customInput={<CustomInputs />}
                      className="w-full cursor-pointer rounded-2xl border  border-tc-gray  bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold "
                    />
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
                      disabled={termAccepted}
                      customInput={<CustomInput />}
                      className="w-full cursor-pointer rounded-2xl  border border-tc-gray bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold "
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="check"
                        checked={termAccepted}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <span className="text-status-darkpurple text-[12px]">
                        I’m Flexible
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[#FF0000]">
                {Object.keys(error).map((key, index) => (
                  <div key={index}>{error[key]}</div>
                ))}
              </div>
              <Button
                type="submit"
                className="w-[100px] rounded-3xl p-3 text-white"
              >
                Next
              </Button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="mb-10 space-y-10">
            <div className="space-y-4">
              <h2 className="font-satoshiBold font-bold text-status-darkpurple">
                Type of Service
              </h2>
              <div className="flex space-x-4 text-[13px] text-[#221354]">
                <button
                  className={`rounded-2xl p-2 ${
                    activeButtonIndex === 0
                      ? "bg-status-purpleBase text-white"
                      : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                  } outline-none`}
                  name="physical"
                  onClick={() => handleClick(0)}
                >
                  Physical Service
                </button>
                <button
                  className={`rounded-2xl p-2 ${
                    activeButtonIndex === 1
                      ? "bg-status-purpleBase text-white"
                      : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                  } outline-none`}
                  name="remote"
                  onClick={() => {
                    handleClick(1);
                    setIsRemote("Remote");
                  }}
                >
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
                <div className="space-y-10 font-bold text-status-darkpurple ">
                  <div className="flex space-x-4">
                    <div className="grid space-y-4">
                      <label>Postal code</label>
                      <input
                        value={selectedCode}
                        onChange={handleCode}
                        name="postalCode"
                        className="w-[155px] cursor-pointer  rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none  placeholder:font-bold"
                      />
                    </div>

                    <div className="grid space-y-4">
                      <label>City/Suburb</label>
                      <Dropdown
                        trigger={() => (
                          <div className="flex h-full w-[150px] cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none">
                            <h2>{selectedCity}</h2>
                            <FaSortDown />
                          </div>
                        )}
                        className="left-0 right-0 top-14 mx-auto bg-white"
                      >
                        {postalCodeData.map((data, index) => (
                          <button
                            type="button"
                            className="block p-2 text-[12px] text-[#221354]"
                            key={index}
                            value={data.name}
                            onClick={() => handleCity(data.name)}
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
                        postalCodeData.length > 0
                          ? postalCodeData[0].state.name
                          : ""
                      }
                      onChange={handleChange}
                      name="state"
                      id="state"
                      disabled
                      className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-sm outline-none"
                    />
                  </div>
                </div>
              )}
              <p className="text-xl font-extrabold text-[#381F8C]">
                Your Budget
              </p>
              <div className="relative grid space-y-4 font-bold text-status-darkpurple">
                <label>Budget</label>
                <input
                  type="number"
                  name="customerBudget"
                  onChange={handlePrice}
                  placeholder="500"
                  className="appearance-none rounded-2xl bg-[#EBE9F4] p-3 pl-6 text-[13px] outline-none  placeholder:font-bold"
                />
                <p className="absolute left-3 top-8">$</p>
              </div>
              <div className="text-[#FF0000]">
                {Object.keys(errors).map((key, index) => (
                  <div key={index}>{errors[key]}</div>
                ))}
              </div>
              <div className="flex justify-between">
                {isAuthenticated && (
                  <Button className="rounded-3xl" type="submit">
                    Confirm Task
                  </Button>
                )}
                {!isAuthenticated && (
                  <Button
                    className="rounded-3xl"
                    type="button"
                    onClick={()=>setIsSuccessPopup(true)}
                  >
                    Confirm Task
                  </Button>
                )}
                <button
                  type="button"
                  onClick={prevPage}
                  className="hover:bg-status-violet w-[100px] rounded-3xl bg-[#EBE9F4] p-2 text-[14px] font-bold outline-none hover:text-white"
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
    <div className="mt-24 flex min-h-screen items-center justify-center">
      <Head>
        <title>TaskHub | Add Task</title>
      </Head>
      <div className="w-full">
        <div className="mb-3 flex justify-center space-x-5">
          <div
            className={`${
              currentPage === 1
                ? "text-status-purpleBase"
                : "text-status-purpleBase"
            }`}
          >
            <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
              <span
                className={`${
                  currentPage === 1
                    ? "bg-status-purpleBase text-white"
                    : "bg-status-purpleBase text-white"
                } rounded-2xl border-none px-3 py-2 font-satoshiBold`}
              >
                01
              </span>{" "}
              Services Details
              <span>
                <IoIosArrowForward />
              </span>
            </p>
          </div>
          <div
            className={`${
              currentPage === 2 ? "text-status-purpleBase" : " text-[#716F78]"
            }`}
          >
            <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
              <span
                className={`${
                  currentPage === 2
                    ? "bg-status-purpleBase text-white"
                    : "bg-[#EAE9EB] text-[#716F78]"
                } rounded-2xl border-none px-3 py-2 font-satoshiBold`}
              >
                02
              </span>{" "}
              Location and Budget
            </p>
          </div>
        </div>
        <hr className="h-[2px] w-full bg-[#EAE9EB] text-[#EAE9EB]" />
        <div>
          <div className="flex justify-center">
            <div
              className="container flex w-80 items-center justify-center space-x-5 border-2 border-[#EAE9EB] p-3 lg:w-full"
              style={{ borderRadius: "0px 0px 20px 20px ", borderTop: "none" }}
            >
              {/* Progress bar */}
              <div className="h-1 w-2/3 overflow-hidden bg-[#EAE9EB]">
                <div
                  className={`h-full ${
                    currentPage === 1
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
        <div className="mt-8 flex items-center justify-center p-8 font-medium lg:p-0">
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
      {<Popup
        isOpen={isSuccessPopup}
        onClose={() => {
        setIsSuccessPopupOpen(false);
      }}>
        <div className="px-24 py-10">
          <div className="relative grid items-center justify-center space-y-5">
            <p className="font-clashBold text-center text-[20px] font-extrabold text-[#2A1769] md:text-[36px] lg:text-[37px] ">
              You are almost done!!!
            </p>
            <p className="text-center text-[14px] lg:text-[20px] ">
              Please sign up to finish adding your first <br/> task and manage all your tasks.
            </p>
            <Image
              src={imag}
              alt="image"
              className="absolute -right-12 top-28 w-24 lg:-right-24 lg:top-1/3 lg:w-36 "
            />
            <Image
              src={imgg}
              alt="image"
              className="absolute -left-12 top-12 w-12 lg:-left-[100px] lg:-top-12 lg:w-28"
            />
            <div className="flex space-x-3 ">
                <button onClick={handleLoginNavigation} className="rounded-2xl border-2 border-status-purpleBase p-2 text-[14px] font-semibold text-status-purpleBase outline-none md:w-[100px]">
                  Sign Up
                </button>
              <Link href="/">
                <button className="rounded-2xl bg-status-purpleBase p-2 text-[14px] text-white outline-none md:w-[100px]">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Popup>

      }
      {!isAuthenticated ? (
        <Popup
          isOpen={isSuccessPopupOpen}
          onClose={() => {
            setIsSuccessPopupOpen(false);
          }}
        >
          <div className="px-24 py-10">
            <div className="relative grid items-center justify-center space-y-5">
              <p className="font-clashDisplay text-center text-[20px] font-extrabold text-[#2A1769] md:text-[36px] lg:text-[37px] ">
                You are almost done!!!
              </p>
              <p className="text-center text-[14px] lg:text-[20px]">
                Please proceed to update your profile
                <br /> before your Task can be posted
              </p>
              <Image
                src={image}
                alt="image"
                className="absolute -right-12 top-28 w-24 lg:-right-12 lg:top-2/3 lg:w-24 "
              />
              <Image
                src={img}
                alt="image"
                className="absolute -left-12 top-12 w-12 lg:-left-[53px] lg:top-8 lg:w-16"
              />
              <div className="flex justify-center space-x-3 md:justify-around">
                <Link href="/marketplace">
                  <button className="rounded-2xl border-2 border-status-purpleBase p-2 text-[14px] font-semibold text-status-purpleBase outline-none md:w-[100px]">
                    Back
                  </button>
                </Link>
                <Link href="/marketplace">
                  <button className="rounded-2xl bg-status-purpleBase p-2 text-[14px] text-white outline-none md:w-[100px]">
                    Go to profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Popup>
      ) : (
        <Popup
          isOpen={isSuccessPopupOpen}
          onClose={() => {
            setIsSuccessPopupOpen(false);
          }}
        >
          <div className="px-24 py-10">
            <div className="relative grid items-center justify-center space-y-5">
              <div className="flex justify-center text-[1px] text-white">
                <GrFormCheckmark className="h-[50px] w-[50px] rounded-full bg-[#FE9B07] p-2 lg:h-[60px] lg:w-[60px]" />
              </div>
              <p className="font-clashDisplay text-center text-[25px] font-extrabold text-[#2A1769] lg:text-[37px] ">
                Congratulations
              </p>
              <p className="lg:text-[20px]">
                Your task has been posted! please click <br /> on the button to
                proceed to marketplace
              </p>
              <Image
                src={image}
                alt="image"
                className="absolute -right-24 top-36  w-32 font-satoshiMedium lg:-right-20 lg:top-2/3"
              />
              <div className="flex justify-center">
                <Link href="/marketplace">
                  <button className="w-[100px] rounded-2xl bg-status-purpleBase p-2 text-[14px] text-white outline-none">
                    Go Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default AddTaskForm;
