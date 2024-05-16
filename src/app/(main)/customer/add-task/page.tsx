"use client";

import React, { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { FaGreaterThan } from "react-icons/fa";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import Img from "../../../../../public/assets/images/customer/task/Task management.svg";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useSession } from "next-auth/react";

interface Task {
  serviceDetails: string;
  physicalService: boolean;
  remoteService: boolean;
  termsAccepted: boolean;
  picture?: File | defaultImage | null;
  workDaysTime: string;
  workDaysDate: string;
  address: string;
  Suite: string;
  postalCode: string;
  city: string;
  state: string;
  budget: string;
  time: string;
}

type defaultImage = string;

const AddTaskForm: React.FC = () => {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  console.log(token);
  const [currentPage, setCurrentPage] = useState(1);
  const defaultImage =
    "../../../../../public/assets/images/explore/google-map.png";
  const [task, setTask] = useState<Task>({
    serviceDetails: "",
    physicalService: false,
    remoteService: false,
    termsAccepted: false,
    picture: null,
    workDaysTime: "",
    workDaysDate: "",
    address: "",
    Suite: "",
    postalCode: "",
    city: "",
    state: "",
    budget: "",
    time: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSelectedTime, setIsSelectedTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [err, setErr] = useState<any>({});
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const validateFields = () => {
    const errors: any = {};
    if (activeButtonIndex === 0) {
      // Validation for physical service
      if (!selectedCode) {
        errors.postalCode = "Please select postal code.";
      } else if (!selectedCity) {
        errors.city = "Please select city.";
      } else if (!selectedState) {
        errors.state = "Please select State/Territory.";
      }
      if (!task.address || !task.Suite) {
        errors.address = "Please enter address and suite number.";
      }
    } else if (activeButtonIndex === 0) {
      // Validation for remote service
      if (!task.address || !task.Suite) {
        errors.address = "Please enter address and suite number.";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateField1 = () => {
    const error: any = {};
    if (!task.serviceDetails) {
      error.serviceDetails = "please write down a brief description";
    }

    if (!selectedDate) {
      error.workDaysTime = "please choose a Date";
    } else if (!selectedTime) {
      error.workDaysDate = "please choose a Time";
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
  const handleCode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCode(selectedValue);
  };
  const handleCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);
  };
  const handleState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedState(selectedValue);
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

  const nextPages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setTask({ ...task, picture: uploadedFile });
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
  };

  const formatDateToString = (date: Date | null) => {
    if (date) {
      // Formatting the date as "YYYY-MM-DD"
      return date.toISOString().split("T")[0];
    }
    return "";
  };

  const formatTimeToString = (time: Date | null) => {
    if (time) {
      // Formatting the time as "HH:mm:ss"
      return time.toTimeString().split(" ")[0];
    }
    return "";
  };
  const dateString = formatDateToString(selectedDate);
  const timeString = formatTimeToString(selectedTime);
  // console.log(dateString);
  // console.log(timeString);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (!task.budget) {
  //     const err: any = {};
  //     err.budget = "please fill in budget";
  //     setErr(err);
  //     return Object.keys(err).length === 0;
  //   } else {
  //     if (validateFields() && validateField1()) {
  //       let finalTask = { ...task };

  //       if (termsAccepted) {
  //         finalTask = { ...finalTask, termsAccepted };
  //       }

  //       if (isOpen && activeButtonIndex === 1) {
  //         finalTask = { ...finalTask, remoteService: isOpen };
  //       } else {
  //         finalTask = {
  //           ...finalTask,
  //           physicalService: isOpen,
  //           address: task.address,
  //           Suite: task.Suite,
  //           postalCode: selectedCode,
  //           city: selectedCity,
  //           state: selectedState,
  //         };
  //       }
  //       setTask({
  //         serviceDetails: "",
  //         physicalService: false,
  //         remoteService: false,
  //         termsAccepted: false,
  //         picture: defaultImage,
  //         workDaysTime: timeString,
  //         workDaysDate: dateString,
  //         address: "",
  //         Suite: "",
  //         postalCode: selectedCode,
  //         city: selectedCity,
  //         state: selectedState,
  //         time: isSelectedTime,
  //         budget: "",
  //       });
  //       setIsSuccessPopupOpen(true);
  //       console.log(finalTask);
  //     } else {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!task.budget) {
      const err: any = {};
      err.budget = "please fill in budget";
      setErr(err);
      return Object.keys(err).length === 0;
    } else {
      if (validateFields() && validateField1()) {
        try {
          let finalTask = { ...task };

          if (termsAccepted) {
            finalTask = { ...finalTask, termsAccepted };
          }

          if (isOpen && activeButtonIndex === 1) {
            finalTask = { ...finalTask, remoteService: isOpen };
          } else {
            finalTask = {
              ...finalTask,
              physicalService: isOpen,
              address: task.address,
              Suite: task.Suite,
              postalCode: selectedCode,
              city: selectedCity,
              state: selectedState,
            };
          }

          if (!task.picture) {
            const defaultImage =
              "../../../../../public/assets/images/explore/google-map.png";
            setTask({ ...task, picture: defaultImage });
          }

          await axios.post(
            "https://smp.jacinthsolutions.com.au/api/v1/task/post",
            finalTask,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setTask({
            serviceDetails: "",
            physicalService: false,
            remoteService: false,
            termsAccepted: false,
            picture: defaultImage,
            workDaysTime: timeString,
            workDaysDate: dateString,
            address: "",
            Suite: "",
            postalCode: selectedCode,
            city: selectedCity,
            state: selectedState,
            time: isSelectedTime,
            budget: "",
          });
          console.log(finalTask);
          setIsSuccessPopupOpen(true);
        } catch (error) {
          console.error("Error submitting form:", error);
          setIsSuccessPopupOpen(false);
        }
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="mb-10 grid items-center justify-center space-y-10">
            <form className="space-y-10" onSubmit={nextPage}>
              <div className="grid space-y-3">
                <label>Briefly tell us what you need done?</label>
                <textarea
                  className="h-full rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                  placeholder="e.g, i need a junior league coach."
                  name="serviceDetails"
                  value={task.serviceDetails}
                  onChange={handleChange}></textarea>
              </div>
              <div className="grid space-y-3">
                <label>Upload a picture (Optional)</label>
                {/* Check if picture is uploaded */}
                {task.picture ? (
                  <div className="flex items-end justify-center space-x-2">
                    {/* Display a disabled input with message */}
                    <label
                      htmlFor="file-upload"
                      className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-tc-gray p-4">
                      <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                      <span className="text-center text-tc-gray">
                        Image Uploaded
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        readOnly
                        disabled
                        className="hidden"
                        onChange={handlePictureUpload}
                      />
                    </label>
                    <button
                      className="rounded-lg bg-tc-gray px-3 py-1 text-white"
                      onClick={() => {
                        setTask({ ...task, picture: null }); // Clear uploaded image
                      }}>
                      Remove
                    </button>
                  </div>
                ) : (
                  // If no picture is uploaded, render the file input
                  <label
                    htmlFor="file-upload"
                    className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-tc-gray p-4">
                    <PiFileArrowDownDuotone className="text-xl text-tc-gray" />
                    <span className="text-center text-tc-gray">
                      Choose a File Upload supports: JPG, PDF, PNG.
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg, .gif"
                      className="hidden"
                      onChange={handlePictureUpload}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-5">
                <label htmlFor="workDaysTime">
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
                      id="workDaysTime"
                      name="workDaysTime"
                      className="cursor-pointer rounded-2xl border border-tc-gray bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] hover:bg-purpleBase hover:placeholder:text-white"
                    />
                    <IoMdArrowDropdown className="absolute right-5 top-2 cursor-pointer text-status-darkViolet" />
                  </div>
                  <div className="relative">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="MMMM d, yyyy"
                      minDate={new Date()}
                      placeholderText="Choose Date"
                      id="workDaysDate"
                      name="workDaysDate"
                      className="cursor-pointer rounded-2xl border border-tc-gray bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] hover:bg-status-darkViolet hover:placeholder:text-white"
                    />
                    <IoMdArrowDropdown className="absolute right-5 top-2 text-status-darkViolet" />
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
                  <span>I need a certain time of day.</span>
                </div>
                {termsAccepted && (
                  <div className="mt-2">
                    <select
                      value={isSelectedTime}
                      onChange={handleTickChange}
                      name="time"
                      className="w-full rounded-2xl border border-tc-gray bg-[#EBE9F4] px-3 py-1 text-[14px] text-status-darkViolet   outline-none">
                      <option value="">Select Time Of The Day</option>
                      <option>Morning, before 10am</option>
                      <option>Afternoon, before 2pm</option>
                      <option>Evening, before 7pm</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="text-[#FF0000]">
                {Object.keys(error).map((key, index) => (
                  <div key={index}>{error[key]}</div>
                ))}
              </div>
              <Button type="submit" className="w-24 rounded-2xl p-3 text-white">
                Next
              </Button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="mb-10 space-y-10">
            <div className="space-y-4">
              <h2>Type of Service</h2>
              <div className="flex space-x-4 text-[13px] text-[#221354]">
                <button
                  className={`rounded-2xl p-2 ${
                    activeButtonIndex === 0
                      ? "bg-status-darkViolet text-white"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white"
                  } outline-none`}
                  name="physical"
                  onClick={() => handleClick(0)}>
                  Physical Service
                </button>
                <button
                  className={`rounded-2xl p-2 ${
                    activeButtonIndex === 1
                      ? "bg-status-darkViolet text-white"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white"
                  } outline-none`}
                  name="remote"
                  onClick={() => handleClick(1)}>
                  Remote Service
                </button>
              </div>
            </div>
            <form onSubmit={nextPages} className="space-y-10">
              {isOpen && activeButtonIndex === 1 && (
                <input
                  type="text"
                  value="Remote"
                  readOnly
                  className=" rounded-2xl bg-[#EBE9F4] p-3 "
                />
              )}
              {isOpen && activeButtonIndex === 0 && (
                <div className="space-y-10">
                  <div className="grid space-y-4">
                    <label>Address(Street and Area)</label>
                    <input
                      type="text"
                      name="address"
                      value={task.address}
                      onChange={handleChange}
                      placeholder="Enter your house/apartment address"
                      className="rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none"
                    />
                  </div>
                  <div className="grid space-y-4">
                    <label>Apt, Suite,Unit, Building</label>
                    <input
                      type="text"
                      name="Suite"
                      value={task.Suite}
                      onChange={handleChange}
                      placeholder="3"
                      className="rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="grid space-y-4">
                      <label>Postal code</label>
                      <select
                        value={selectedCode}
                        onChange={handleCode}
                        name="postalCode"
                        className="w-[155px] cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none">
                        <option value="">postal code</option>
                        <option className="text-[12px] text-[#221354]">
                          4032
                        </option>
                      </select>
                    </div>
                    <div className="grid space-y-4">
                      <label>City/Suburb</label>
                      <select
                        value={selectedCity}
                        name="city"
                        onChange={handleCity}
                        className="w-[155px] cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none">
                        <option value="">City/Suburb</option>
                        <option className="text-[12px] text-[#221354]">
                          flag
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="grid space-y-4">
                    <label>State/Territory</label>
                    <select
                      value={selectedState}
                      onChange={handleState}
                      name="state"
                      className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none">
                      <option value="">State/Territory</option>
                      <option className="text-[12px] text-[#221354]">
                        Queensland
                      </option>
                    </select>
                  </div>
                </div>
              )}
              <div className="text-[#FF0000]">
                {Object.keys(errors).map((key, index) => (
                  <div key={index}>{errors[key]}</div>
                ))}
              </div>
              <div className="flex space-x-4">
                <Button type="button" theme="outline" onClick={prevPage}>
                  Previous
                </Button>
                <Button type="submit">Next</Button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="mb-10 space-y-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid space-y-4">
                <label>Budget</label>
                <input
                  type="text"
                  name="budget"
                  value={task.budget}
                  onChange={handleChange}
                  placeholder="$500"
                  className="rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none"
                />
              </div>
              <div className="text-[#FF0000]">
                {Object.keys(err).map((key, index) => (
                  <div key={index}>{err[key]}</div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button type="submit">Confirm Task</Button>
                <Button theme="outline" type="button" onClick={prevPage}>
                  Back
                </Button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-20">
      <Head>
        <title>TaskHub | Add Task</title>
      </Head>
      <div className="w-full space-y-3">
        <div className="flex justify-center space-x-5">
          <div
            className={`${
              currentPage === 1
                ? "text-status-darkViolet"
                : "text-status-darkViolet"
            }`}>
            <p className="flex items-center gap-3">
              <span
                className={`${
                  currentPage === 1
                    ? "bg-status-darkViolet text-white"
                    : "bg-status-darkViolet text-white"
                } rounded-xl border-none px-3 py-1`}>
                01
              </span>{" "}
              Services Details
              <span className="text-[#716F78]">
                <FaGreaterThan />
              </span>
            </p>
          </div>
          <div
            className={`${
              currentPage === 2 || currentPage === 3
                ? "text-status-darkViolet"
                : " text-[#716F78]"
            }`}>
            <p className="flex items-center gap-3">
              <span
                className={`${
                  currentPage === 2 || currentPage === 3
                    ? "bg-status-darkViolet text-white"
                    : "bg-[#EAE9EB] text-[#716F78]"
                } rounded-xl border-none px-3 py-1`}>
                02
              </span>{" "}
              Location
              <span className="text-[#716F78]">
                <FaGreaterThan />
              </span>
            </p>
          </div>
          <div
            className={`${
              currentPage === 3 ? "text-status-darkViolet" : " text-[#716F78]"
            }`}>
            <p className="flex items-center gap-3">
              <span
                className={`${
                  currentPage === 3
                    ? "bg-status-darkViolet text-white"
                    : "bg-[#EAE9EB] text-[#716F78]"
                } rounded-xl border-none px-3 py-1`}>
                03
              </span>{" "}
              Budget
              <span className="text-[#716F78]">
                <FaGreaterThan />
              </span>
            </p>
          </div>
        </div>
        <div>
          <hr className="h-[2px] bg-[#EAE9EB] text-[#EAE9EB]" />
          <div className="flex justify-center">
            <div
              className="container flex items-center justify-center space-x-5 border-2 border-[#EAE9EB] p-3"
              style={{ borderRadius: "0px 0px 20px 20px ", borderTop: "none" }}>
              {/* Progress bar */}
              <div className="h-1 w-2/3 overflow-hidden bg-[#EAE9EB]">
                <div
                  className={`h-full ${
                    currentPage === 1
                      ? "bg-status-darkViolet"
                      : currentPage === 2
                      ? "bg-status-darkViolet"
                      : "bg-status-darkViolet"
                  }`}
                  style={{ width: `${(currentPage / 3) * 100}%` }}
                />
              </div>
              <p className="text-xs">
                {Math.round((currentPage / 3) * 100)}% Complete
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <div>
              <h2 className="text-xl">Add a Task</h2>
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
        <div className="p-5">
          <div className="relative grid items-center justify-center space-y-10">
            <div className="flex justify-center text-white">
              <TiTick className=" h-[40px] w-[40px] rounded-3xl bg-[#FE9B07] p-2" />
            </div>
            <p className="text-center text-lg">Task Posted</p>
            <p>
              Your Task has been posted! please click <br /> on the button to
              proceed to marketplace
            </p>
            <div className="flex justify-center">
              <button className="w-[100px] rounded-2xl bg-purpleBase p-2 text-[14px] text-white outline-none">
                Go Home
              </button>
            </div>
            <div className="absolute -right-10 top-44">
              <Image src={Img} alt="img" />
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default AddTaskForm;
