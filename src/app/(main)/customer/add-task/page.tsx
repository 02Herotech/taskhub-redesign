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
import imags from "../../../../../public/assets/images/tickk.png";
import imgg from "../../../../../public/assets/images/girl.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter} from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { FaSortDown } from "react-icons/fa6";
import Dropdown from "@/components/global/Dropdown";
import Loading from "@/components/global/loading/page";
import Progress from "@/components/global/progress";

interface FormData {
  taskBriefDescription: string;
  taskImage?: File | null;
  taskTime: string;
  taskDate: string;
  taskType: string;
  customerBudget: number | null;
  termAccepted: boolean;
  suburb: string;
  state: string;
  postCode: string;
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
  const [loading, setLoading] = useState(false);
  const defaultImageSrc =
    "https://static.wixstatic.com/media/7d1889_ab302adc66e943f9b6be9de260cbc40f~mv2.png";
  const [task, setTask] = useState<FormData>({
    taskBriefDescription: getCookie("taskBriefDescription") || "",
    taskImage: null,
    taskTime: getCookie("taskTime") || "",
    taskDate: getCookie("taskDate") || "",
    taskType: getCookie("taskType") || "",
    suburb: getCookie("suburb") || "",
    state: getCookie("state") || "",
    postCode: getCookie("postCode") || "",
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
  const [selectedCity, setSelectedCity] = useState("Suburb");
  const [termAccepted, settermAccepted] = useState(false);
  const [accepted, setAccepted] = useState(false);
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
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  const [errs, setErrs] = useState("");

  // Handling getting the description from the marketplace when i user navigates from the marketplace
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const marketplaceDescription = urlParams.get("marketplaceDescription");
    if (marketplaceDescription) {
      setTask((prev) => ({
        ...prev,
        taskBriefDescription: marketplaceDescription,
      }));
    }
  }, []);
  // End of getting description from the marketplace

  const handleLoginNavigation = () => {
    setCookie("redirectToAddTask", "/customer/add-task", { maxAge: 360000 });
    router.push(
      "/auth/sign-up?userType=Service+Provider?from=/customer/add-task",
    );
  };

  useEffect(() => {
    setCookie("taskBriefDescription", task.taskBriefDescription, {
      maxAge: 1200,
    });
    setCookie("taskTime", task.taskTime, { maxAge: 1200 });
    setCookie("taskDate", task.taskDate, { maxAge: 1200 });
    setCookie("taskType", task.taskType, { maxAge: 1200 });
    setCookie("suburb", task.suburb, { maxAge: 1200 });
    setCookie("postCode", task.postCode, { maxAge: 1200 });
    setCookie("state", task.state, { maxAge: 1200 });
    setCookie("customerBudget", task.customerBudget, { maxAge: 1200 });
    setCookie("hubTime", task.termAccepted, { maxAge: 1200 });
    setCookie("categoryId", task.categoryId?.toString(), { maxAge: 1200 });
    setCookie("taskDescription", task.taskDescription, { maxAge: 1200 });
  }, [task]);

  useEffect(() => {
    const fetchPostalCodeData = async () => {
      try {
        const response = await axios.get(
          `https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=${selectedCode}`,
        );
        console.log(response.data);
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

  useEffect(() => {
    if (currentPage === 2) {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const validateFields = () => {
    const errors: any = {};
    if (activeButtonIndex === 0) {
      // Validation for physical service
      if (!selectedCode) {
        errors.postalCode = "Please fill out all required fields";
      } else if (!selectedCity) {
        errors.city = "Please fill out all required fields";
      }
    } else if (!isRemote) {
      error.service = "Please fill out all required fields";
    }
    if (!task.customerBudget) {
      errors.customerBudget = "Please fill out all required fields";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateField1 = () => {
    const error: any = {};

    // Validate taskBriefDescription
    if (!task.taskBriefDescription) {
      error.taskBriefDescription = "Please fill out all required fields";
    }

    // Validate taskDescription
    if (!task.taskDescription) {
      error.taskDescription = "Please fill out all required fields";
    }

    if (!selectedCategory) {
      error.category = "Please fill out all required fields";
    }

    // Validate selectedTime and selectedDate or termAccepted
    if (!(selectedTime && selectedDate) && !termAccepted) {
      error.message = "Please fill out all required fields";
    }

    setError(error);
    return Object.keys(error).length === 0;
  };

  const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => (
    <button
      className={`flex cursor-pointer justify-between rounded-2xl  bg-[#EBE9F4] px-2 py-1 text-[12px] placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px] ${error.message ? "border border-[#ff0000] outline-[#FF0000]" : "border border-tc-gray outline-none"}`}
      onClick={onClick}
      type="button"
    >
      {value || "Choose Date"} <FaSortDown />
    </button>
  );

  const CustomInputs: React.FC<CustomInputProps> = ({ value, onClick }) => (
    <button
      className={`flex cursor-pointer justify-between rounded-2xl bg-[#EBE9F4] px-2 py-1 text-[12px]  placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px] ${error.message ? "border border-[#ff0000] outline-[#FF0000]" : "border border-tc-gray outline-none"}`}
      onClick={onClick}
      type="button"
    >
      {value || "Choose Time"} <FaSortDown />
    </button>
  );

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
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleCategoryChange = (item: any) => {
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
    const numberValue = value === "" ? "" : parseFloat(value);
    setTask({
      ...task,
      [name]: numberValue,
    });
  };


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const wordArray = event.target.value.split(/\s+/).filter(Boolean);
    if (wordArray.length <= 10) {
      setTask({
        ...task,
        [event.target.name]: event.target.value,
      });
      setWordCount(wordArray.length);
    }
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
      if (uploadedFile.size > maxSize) {
        setErrs("File size exceeds 5MB.");
      } else {
        setTask({ ...task, taskImage: uploadedFile });
        const reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        setErrs("");
      }
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
    setAccepted(true);
  };

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
    setAccepted(true);
  };

  const formatDateToString = (date: Date | null) => {
    if (date) {
      // Formatting the date as "dd-MM-yyyy"
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const formatTimeToString = (time: Date | null) => {
    if (time) {
      // Get the hours and minutes
      let hours = time.getHours();
      const minutes = String(time.getMinutes()).padStart(2, "0");

      // Determine AM or PM
      const period = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hours = hours % 12 || 12; // Converts "0" hours to "12" for 12 AM

      // Format the hours with leading zero if necessary
      const formattedHours = String(hours).padStart(2, "0");

      return `${formattedHours}:${minutes} ${period}`;
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

  const timeout = (ms: number) => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out")), ms);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
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
          finalTask = {
            ...finalTask,
            taskType: "PHYSICAL_SERVICE",
            suburb: selectedCity,
            postCode: selectedCode,
            state: postalCodeData[0].state.name
          };
        }

        if (!task.taskImage) {
          finalTask = { ...finalTask, taskImage: null };
        }

        console.log(finalTask);
        await Promise.race([
          axios.post(
            "https://smp.jacinthsolutions.com.au/api/v1/task/post",
            finalTask,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            },
          ),
          timeout(10000),
        ]);

        setTask({
          taskBriefDescription: "",
          taskImage: null,
          taskTime: "",
          taskDate: "",
          taskType: "",
          termAccepted: false,
          suburb: "",
          state: "",
          postCode: "",
          customerBudget: null,
          categoryId: null,
          taskDescription: "",
        });

        setIsSuccessPopupOpen(true);
      } catch (error: any) {
        if (error.response.status === 400 || error.response.status === 500 || error.response.status === 409) {
          setIsSuccessPopupOpen(false);
        } else {
          setIsSuccessPopupOpen(true);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
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
                  <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
                    Write a short title for the task you need done{" "}
                    <span className="font-extrabold text-[#ff0000]">*</span>
                  </label>
                  {wordCount > 3 && (
                    <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                      <GrFormCheckmark />
                    </div>
                  )}
                </div>
                <textarea
                  className={`h-full w-full rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB]  ${error.taskBriefDescription ? "border border-[#ff0000] outline-[#FF0000]" : "border-none outline-none"}`}
                  placeholder="e.g, I need a junior league coach."
                  name="taskBriefDescription"
                  value={task.taskBriefDescription}
                  onChange={handleChange}
                  style={{ resize: "none", overflow: "hidden" }}
                ></textarea>
                <div className="text-right text-sm text-status-darkpurple">
                  {wordCount}/10 words
                </div>
              </div>
              <div className="relative grid space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-semibold lg:text-[16px]">
                    What category best describes your task?{" "}
                    <span className="font-extrabold text-[#ff0000]">*</span>
                  </label>
                  {selectedCategory && (
                    <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                      <GrFormCheckmark />
                    </div>
                  )}
                </div>
                <Dropdown
                  trigger={() => (
                    <div
                      className={`flex h-full w-full cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] text-status-darkpurple  ${error.subCategory ? "border border-[#ff0000] outline-[#FF0000]" : "border-none outline-none"}`}
                    >
                      <h2>{selectedCategoryName}</h2>
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
                  <label className="flex text-[13px] font-semibold lg:text-[16px]">
                    Give a description of your task {""}{" "}
                    <span className="font-extrabold text-[#ff0000]">*</span>
                  </label>
                  {wordCounts > 15 && (
                    <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                      <GrFormCheckmark />
                    </div>
                  )}
                </div>
                <textarea
                  className={` h-[150px] rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB] ${error.taskDescription ? "border border-[#ff0000] outline-[#FF0000]" : "border-none outline-none"}`}
                  placeholder="Arts and Craft"
                  name="description"
                  value={task.taskDescription}
                  onChange={handleDescription}
                ></textarea>
              </div>
              <div className=" space-y-3">
                <label className="font-satoshiBold text-[13px] font-bold text-status-darkpurple lg:text-[16px]">
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
                {errs && <div className="font-bold text-red-500">{errs}</div>}
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
                      className="w-full cursor-pointer rounded-2xl  bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
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
                      className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold "
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
                      <span className="text-[12px] text-status-darkpurple">
                        I’m Flexible
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[#FF0000]">
                {error.message ||
                  error.taskBriefDescription ||
                  error.taskDescription ||
                  error.selectedCategory}
              </div>
              <Button
                type="submit"
                className="lg:w-[100px] rounded-3xl p-3 text-white w-full"
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
              <h2 className="font-satoshiBold text-[13px] font-bold text-status-darkpurple lg:text-[16px]">
                Type of Service{" "}
                <span className="font-extrabold text-[#ff0000]">*</span>
              </h2>
              <div className="flex space-x-4 text-[13px] text-[#221354]">
                <button
                  className={`rounded-2xl p-2 ${activeButtonIndex === 0
                      ? "bg-status-purpleBase text-white"
                      : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
                    } outline-none`}
                  name="physical"
                  onClick={() => handleClick(0)}
                >
                  Physical Service
                </button>
                <button
                  className={`rounded-2xl p-2 ${activeButtonIndex === 1
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
                      <div className="flex items-center justify-between">
                        <label>
                          Postal code{" "}
                          <span className="font-extrabold text-[#ff0000]">
                            *
                          </span>
                        </label>
                        {selectedCode && (
                          <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                            <GrFormCheckmark />
                          </div>
                        )}
                      </div>
                      <input
                        value={selectedCode}
                        onChange={handleCode}
                        name="postCode"
                        className={`w-[155px] cursor-pointer  rounded-2xl bg-[#EBE9F4] p-3 text-[13px] placeholder:font-bold ${error.postalCode ? "border border-[#ff0000] outline-[#FF0000]" : "border-none outline-none"}`}
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
                        {selectedCity && (
                          <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                            <GrFormCheckmark />
                          </div>
                        )}
                      </div>
                      <Dropdown
                        trigger={() => (
                          <div
                            className={`flex h-full w-[150px] cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 font-satoshi text-[13px] font-light ${error.city ? "border border-[#ff0000] outline-[#FF0000]" : "border-none outline-none"}`}
                          >
                            <h2>{selectedCity}</h2>
                            <FaSortDown />
                          </div>
                        )}
                        className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
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
                  <div className="grid space-y-4">
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
              <div className="relative grid space-y-4 font-bold text-status-darkpurple">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] lg:text-[16px]">
                    Budget{" "}
                    <span className="font-extrabold text-[#ff0000]">*</span>
                  </label>
                  {task.customerBudget && (
                    <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
                      <GrFormCheckmark />
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  name="customerBudget"
                  onChange={handlePrice}
                  placeholder="500"
                  className={`appearance-none rounded-2xl bg-[#EBE9F4] p-3 pl-6 text-[13px] placeholder:font-bold ${error.customerBudget ? "border border-[#ff0000] outline-[#FF0000]" : "border-none outline-none"}`}
                />
                <p className="absolute left-3 top-8 md:top-8">$</p>
              </div>
              <div className="text-[#FF0000]">
                {errors.city ||
                  errors.postalCode ||
                  errors.service ||
                  errors.customerBudget}
              </div>
              <div className="flex justify-between flex-wrap-reverse gap-3">
                {isAuthenticated && (
                  <Button className="rounded-3xl w-full lg:w-[200px]" type="submit">
                    Confirm Task
                  </Button>
                )}
                {!isAuthenticated && (
                  <Button
                    className="rounded-3xl w-full lg:w-[200px]"
                    type="button"
                    onClick={() => setIsSuccessPopup(true)}
                  >
                    Confirm Task
                  </Button>
                )}
                <button
                  type="button"
                  onClick={prevPage}
                  className="lg:w-[100px] w-full  rounded-3xl bg-[#EBE9F4] p-2 text-[14px] font-bold outline-none hover:bg-status-violet hover:text-white"
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
        <title>Oloja | Add Task</title>
      </Head>
      <div className="w-full">
        <div className="fixed hidden lg:block left-0 top-20 z-10 w-full border-t-2 bg-white shadow-md">
          <div className="mb-3 flex justify-center space-x-5 pt-4">
            <div
              className={`${currentPage === 1
                  ? "text-status-purpleBase"
                  : "text-status-purpleBase"
                }`}
            >
              <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
                <span
                  className={`${currentPage === 1
                      ? "bg-status-purpleBase text-white"
                      : "bg-status-purpleBase text-white"
                    } flex h-[37px] w-[47px] items-center justify-center rounded-[22px] border-none p-3 font-satoshiBold`}
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
              className={`${currentPage === 2 ? "text-status-purpleBase" : " text-[#716F78]"
                }`}
            >
              <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
                <span
                  className={`${currentPage === 2
                      ? "bg-status-purpleBase text-white"
                      : "bg-[#EAE9EB] text-[#716F78]"
                    } flex h-[37px] w-[47px] items-center justify-center rounded-[22px] border-none p-3 font-satoshiBold`}
                >
                  02
                </span>{" "}
                Location and Budget
              </p>
            </div>
          </div>
          <hr className="h-[2px] w-full bg-[#EAE9EB] text-[#EAE9EB]" />
          <div className="flex justify-center pb-4">
            <div
              className="container flex w-80 items-center justify-center space-x-5 border border-[#EAE9EB] p-3 lg:w-2/3"
              style={{ borderRadius: "0px 0px 20px 20px ", borderTop: "none" }}
            >
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
        <Progress currentPage={currentPage} progress={progress} setCurrentPage={setCurrentPage} />
        <div className="pt-28">
          <div className="mt-8 flex items-center justify-center p-4 font-medium lg:p-0">
            <div>
              <div className="space-y-2">
                <h2 className="text-4xl text-status-darkpurple">Add a Task</h2>
                <p className="text-[12px] text-[#716F78]">
                  Please fill out the information below to add a new task.
                </p>
              </div>
              {loading && <Loading />}
              <div className="mt-8">{renderPage()}</div>
            </div>
          </div>
        </div>
      </div>
      {
        <Popup
          isOpen={isSuccessPopup}
          onClose={() => {
            setIsSuccessPopupOpen(false);
          }}
        >
          <div className="px-16 py-10 lg:px-24">
            <div className="relative grid items-center justify-center space-y-5">
              <p className="text-center font-clashBold text-[20px] font-extrabold text-[#2A1769] md:text-[36px] lg:text-[37px] ">
                You are almost done!!!
              </p>
              <div>
                <p className="text-center text-[14px] lg:text-[20px] ">
                  Please sign up to finish adding your first{" "}
                </p>
                <p className="text-center text-[14px] lg:text-[20px] ">
                  task and manage all your tasks.
                </p>
              </div>
              <Image
                src={imag}
                alt="image"
                className="absolute -right-16 top-20 w-24 lg:-right-24 lg:top-1/3 lg:w-36 "
              />
              <Image
                src={imgg}
                alt="image"
                className="absolute -left-12 top-0 w-16 lg:-left-[100px] lg:-top-12 lg:w-28"
              />
              <div className="flex justify-center space-x-3">
                <button
                  onClick={handleLoginNavigation}
                  className="rounded-2xl border border-status-purpleBase p-2 text-[14px] font-semibold text-status-purpleBase outline-none md:w-[100px]"
                >
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
          <div className="px-16 py-10 lg:px-24">
            <div className="relative grid items-center justify-center space-y-5">
              <p className="font-clashDisplay text-center text-[20px] font-extrabold text-[#2A1769] md:text-[36px] lg:text-[37px] ">
                You are almost done!!!
              </p>
              <div>
                <p className="text-center text-[14px] lg:text-[20px]">
                  Please proceed to update your profile
                </p>
                <p className="text-center text-[14px] lg:text-[20px]">
                  before your Task can be posted
                </p>
              </div>
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
                  <button className="rounded-2xl border border-status-purpleBase p-2 text-[14px] font-semibold text-status-purpleBase outline-none md:w-[100px]">
                    Back
                  </button>
                </Link>
                <Link href="/customer/profile">
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
            router.push("/marketplace");
            setIsSuccessPopupOpen(false);
          }}
        >
          <div className="px-12 py-10 lg:px-24">
            <div className="relative grid items-center justify-center space-y-5">
              <div className="flex justify-center text-[1px] text-white">
                <Image src={imags} alt="image" />
              </div>
              <p className="font-clashDisplay text-center text-[25px] font-extrabold text-[#2A1769] lg:text-[37px] ">
                Congratulations
              </p>
              <div>
                <p className="text-center lg:text-[20px]">
                  Your task has been posted!
                </p>
                <p className="text-center lg:text-[20px]">
                  please click on the button to proceed to marketplace
                </p>
              </div>
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
