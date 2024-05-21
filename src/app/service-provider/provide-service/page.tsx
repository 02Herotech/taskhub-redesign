/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { IoIosArrowForward, IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import Link from "next/link";
import image from "../../../../public/assets/images/customer/Task management.png";
import AiDesciption from "@/components/AiGenerate/AiDescription";
import { useSession } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";
import { GrFormCheckmark } from "react-icons/gr";
interface FormData {
  describe: string;
  availability: string;
  taskDescription: string;
  planDetails: string;
  taskImage: File | defaultImage | null;
  taskImage1?: File | defaultImage | null;
  taskImage2?: File | defaultImage | null;
  taskImage3?: File | defaultImage | null;
  taskTime: string;
  taskDate: string;
  taskType: string;
  customerBudget: string;
  hubTime: string;
  taskAddress: string[];
  category: string;
  subCategory: string;
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

const ProvideService: React.FC = () => {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const [currentPage, setCurrentPage] = useState(1);
  const [task, setTask] = useState<FormData>({
    describe: "",
    availability: "",
    taskDescription: "",
    planDetails: "",
    taskImage: null,
    taskImage1: null,
    taskImage2: null,
    taskImage3: null,
    taskTime: "",
    taskDate: "",
    taskType: "",
    taskAddress: [],
    customerBudget: "",
    hubTime: "",
    category: "",
    subCategory: "",

  });
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isRemote, setIsRemote] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );
  const [activePlanIndex, setActivePlanIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
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


  const handleClick = (index: number) => {
    setActiveButtonIndex(index);
    setIsOpen(true);
  };

  const handlePlan = (index: number) => {
    setActivePlanIndex(index);
    setIsOpen(true);
    setInputDisabled(!inputDisabled);
  };
  const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCode(event.target.value);
  };
  const handleCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);
  };
  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const handleSubCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(event.target.value);
  };

  const nextPage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  const Page = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(currentPage);
  };

  const nextPages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };


  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>, imageIndex: number) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      switch (imageIndex) {
        case 1:
          setTask({ ...task, taskImage1: uploadedFile });
          break;
        case 2:
          setTask({ ...task, taskImage2: uploadedFile });
          break;
        case 3:
          setTask({ ...task, taskImage3: uploadedFile });
          break;
        default:
          setTask({ ...task, taskImage: uploadedFile });
      }
    }
  };

  const getImageURL = (imageIndex: number) => {
    switch (imageIndex) {
      case 1:
        return task.taskImage1 instanceof File ? URL.createObjectURL(task.taskImage1) : "";
      case 2:
        return task.taskImage2 instanceof File ? URL.createObjectURL(task.taskImage2) : "";
      case 3:
        return task.taskImage3 instanceof File ? URL.createObjectURL(task.taskImage3) : "";
      default:
        return task.taskImage instanceof File ? URL.createObjectURL(task.taskImage) : "";
    }
  };

  const validateImages = () => {
    return task.taskImage || task.taskImage1 || task.taskImage2 || task.taskImage3;
  };

  const imageURL = getImageURL(0);
  const imageURL1 = getImageURL(1);
  const imageURL2 = getImageURL(2);
  const imageURL3 = getImageURL(3);

  const calculateProgress = () => {
        const isPhysical = task.taskType === 'physical';
        const requiredFields = [
            task.taskDescription,
            task.taskTime,
            task.taskDate,
            task.customerBudget,
            
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
    event.preventDefault();

    try {
      if (!task.taskImage || !task.taskImage1 || !task.taskImage2 || !task.taskImage3) {
        const defaultImage =
          "google-map.png";
        setTask({ ...task, taskImage: defaultImage });
      }
      setTask({
        describe: "",
        availability: "",
        taskDescription: "",
        planDetails: "",
        taskImage: "",
        taskImage1: "",
        taskImage2: "",
        taskImage3: "",
        taskTime: "",
        taskDate: "",
        taskType: "",
        hubTime: "",
        taskAddress: [],
        customerBudget: "",
        category: selectedCategory,
        subCategory: selectedSubCategory,

      });
      setIsSuccessPopupOpen(true);
      console.log(task);
    } catch {
      console.log(error);
    }
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (validateFields() && validateField1()) {
  //     try {
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

  //       await axios.post("/api/endpoint", finalTask);
  //       setTask({
  //         serviceDetails: "",
  //         briefDescription: "",
  //         physicalService: false,
  //         remoteService: false,
  //         termsAccepted: false,
  //         picture: null,
  //         workDaysTime: "",
  //         address: "",
  //         Suite: "",
  //         postalCode: selectedCode,
  //         city: selectedCity,
  //         state: selectedState,
  //         time: isSelectedTime,
  //         budget: "",
  //       });
  //       setCurrentPage(1);
  //setIsSuccessPopupOpen(true)
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //setIsSuccessPopupOpen(false)
  //     }
  //   }
  // };




  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="lg:w-full  w-[80%] mx-auto">
            <div className="mb-10 space-y-10 ">
              <form className="space-y-10 w-full text-status-darkpurple" onSubmit={nextPage}>
                <div className="grid space-y-4 relative">
                  <label className="font-semibold">Choose the best category for your listing. </label>
                  <select
                    value={selectedCategory}
                    name="category"
                    onChange={handleCategory}
                    className="w-full appearance-none cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none">
                    <option value="">Category</option>
                    <option className="text-[12px] text-[#221354]">
                      Childcare and Babysitting
                    </option>
                  </select>
                  <IoMdArrowDropdown className="absolute right-5 top-10 cursor-pointer text-status-purpleBase" />
                </div>
                <div className="grid space-y-4 relative">
                  <label className="font-bold">Choose a subcategory. </label>
                  <select
                    value={selectedSubCategory}
                    name="subCategory"
                    onChange={handleSubCategory}
                    className="w-full appearance-none cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none">
                    <option value="">subcategory</option>
                    <option className="text-[12px] text-[#221354]">Nanny</option>
                  </select>
                  <IoMdArrowDropdown className="absolute right-5 top-10 cursor-pointer text-status-purpleBase" />
                </div>

                <div className="grid space-y-4">
                  <label className="font-semibold">
                    Write a short title that accurately describes your service.{" "}
                  </label>
                  <input
                    type="text"
                    name="describe"
                    value={task.describe}
                    onChange={handleChange}
                    placeholder="Casual Babysitting"
                    className="rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none"
                  />
                </div>
                <div className="lg:hidden">
                  <AiDesciption
                    setTask={setTask}
                    task={task}
                  />
                </div>
                <div className="grid space-y-3">
                  <label className="font-semibold">Please give a detailed description of the service</label>
                  <textarea
                    className=" rounded-2xl bg-[#EBE9F4] p-3 outline-none h-[350px]"
                    placeholder="Casual Babysitting"
                    name="serviceDetails"
                    value={task.taskDescription}
                    // onChange={handleChange}

                    onChange={(e) => setTask({ ...task, taskDescription: e.target.value })}>
                  </textarea>
                </div>
                {Object.keys(error).map((key, index) => (
                  <div key={index}>{error[key]}</div>
                ))}
                <Button type="submit" className="w-24 rounded-2xl p-3 text-white">
                  Next
                </Button>
              </form>
            </div>



          </div>
        );
      case 2:
        return (
          <div className="mb-10 lg:w-[470px] space-y-10">
            <form onSubmit={nextPages} className="space-y-10">
              <div className="space-y-4">
                <h2 className="font-bold">Choose the pricing plans.</h2>
                <div className="grid space-y-4 text-[13px] text-[#221354]">
                  <input
                    className={`rounded-2xl ${activePlanIndex === 0
                      ? " text-status-darkViolet p-1 text-lg bg-transparent font-bold disabled"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white p-4 "
                      } outline-none text-left placeholder:text-[#2A1769] hover:placeholder:text-white`}
                    name="physical"
                    onClick={() => handlePlan(0)}
                    placeholder="Plan 1"
                    value="Plan 1"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 0 && (
                    <div>
                      <label className="font-semibold">
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 border-2 rounded-2xl pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 outline-none placeholder:font-semibold"
                          placeholder="Casual Babysitting"
                          name="serviceDetails"
                          value={task.planDetails}
                          onChange={handleChange}></textarea>
                        <label className="pl-2 font-medium">Price</label>
                        <div className="flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="budget"
                            value={task.customerBudget}
                            onChange={handleChange}
                            placeholder="$500"
                            className="rounded-2xl w-1/3 bg-[#EBE9F4] p-3 text-[13px] outline-none"
                          />
                          <p className="text-xs text-status-lightViolet font-bold">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    className={`rounded-2xl ${activePlanIndex === 1
                      ? " text-status-darkViolet p-1 text-lg bg-transparent font-bold disabled"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white p-4"
                      } outline-none text-left placeholder:text-[#2A1769] hover:placeholder:text-white`}
                    name="physical"
                    onClick={() => handlePlan(1)}
                    placeholder="Plan 2"
                    value="Plan 2"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 1 && (
                    <div>
                      <label className="font-bold">
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 border-2 rounded-2xl pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] placeholder:font-bold p-3 outline-none"
                          placeholder="Casual Babysitting"
                          name="serviceDetails"
                          value={task.planDetails}
                          onChange={handleChange}></textarea>
                        <label className="pl-2 font-medium">Price</label>
                        <div className="flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="budget"
                            value={task.customerBudget}
                            onChange={handleChange}
                            placeholder="$500"
                            className="rounded-2xl w-1/3 bg-[#EBE9F4] p-3 text-[13px] outline-none"
                          />
                          <p className="text-xs text-status-lightViolet font-bold">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    className={`rounded-2xl ${activePlanIndex === 2
                      ? " text-status-darkViolet p-1 text-lg bg-transparent font-bold disabled"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white p-4"
                      } outline-none text-left placeholder:text-[#2A1769] hover:placeholder:text-white`}
                    name="physical"
                    onClick={() => handlePlan(2)}
                    placeholder="Plan 3"
                    value="Plan 3"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 2 && (
                    <div>
                      <label className="font-bold">
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 border-2 rounded-2xl pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 placeholder:font-bold outline-none"
                          placeholder="Casual Babysitting"
                          name="serviceDetails"
                          value={task.planDetails}
                          onChange={handleChange}></textarea>
                        <label className="pl-2 font-medium">Price</label>
                        <div className="flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="customerBudget"
                            value={task.customerBudget}
                            onChange={handleChange}
                            placeholder="$500"
                            className="rounded-2xl w-1/3 bg-[#EBE9F4] p-3 text-[13px] outline-none"
                          />
                          <p className="text-xs font-bold text-status-lightViolet">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Type of Service</h2>
                <div className="flex space-x-4 text-[13px] text-[#221354]">
                  <input
                    className={`rounded-2xl p-2 ${activeButtonIndex === 0
                      ? "bg-status-purpleBase text-white"
                      : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white placeholder:text-white"
                      } outline-none cursor-pointer placeholder:font-bold`}
                    name="physical"
                    onClick={() => handleClick(0)}
                    placeholder="Physical Services"
                    value="Physical Services"
                    readOnly
                  />
                  <input
                    className={`rounded-2xl p-2 ${activeButtonIndex === 1
                      ? "bg-status-purpleBase text-white"
                      : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white placeholder:text-white "
                      } outline-none cursor-pointer placeholder:font-bold`}
                    name="remote"
                    onClick={() => { handleClick(1); setIsRemote("Remote") }}
                    placeholder="Remote Services"
                    value="Remote Services"
                    readOnly
                  />
                </div>
              </div>

              {isOpen && activeButtonIndex === 1 && (
                <input
                  type="text"
                  value={isRemote}
                  readOnly
                  className=" rounded-2xl bg-[#EBE9F4] p-3 "
                />
              )}
              {isOpen && activeButtonIndex === 0 && (
                <div className="flex flex-col lg:flex-row lg:space-x-3 text-status-darkpurple font-medium">
                  <div className="flex lg:justify-normal space-x-4">
                    <div className="grid space-y-4">
                      <label>Postal code</label>
                      <input
                        value={selectedCode}
                        onChange={handleCode}
                        name="postalCode"
                        className="w-[155px] sm:w-[200px] lg:w-[140px] cursor-pointer  placeholder:font-bold rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none" />
                    </div>

                    <div className="grid space-y-4 relative">
                      <label>City/Suburb</label>
                      <select
                        value={selectedCity}
                        onChange={handleCity}
                        name="city"
                        id="city"
                        className="w-[180px] lg:w-[155px] cursor-pointer  placeholder:font-bold rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none appearance-none"
                      >
                        <option value="">Select City/Suburb</option>
                        {postalCodeData.map((data, index) => (
                          <option key={index} value={data.name}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                      <IoMdArrowDropdown className="absolute right-2 top-9 cursor-pointer text-status-purpleBase" />
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
                      className=" lg:w-[145px] cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-sm outline-none"
                    />
                  </div>
                </div>
              )}
              <div className="text-[#FF0000]">
                {Object.keys(errors).map((key, index) => (
                  <div key={index}>{errors[key]}</div>
                ))}
              </div>
              <div className="flex justify-between">
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
          <div className="mb-10 xs:w-[500px] lg:w-[700px] space-y-10 text-status-darkpurple font-bold">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid space-y-3">
                <label>Select your availabiliy</label>
                <textarea
                  className="h-full lg:w-2/3 rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                  placeholder="e.g Mondays 5pm."
                  name="serviceDetails"
                  value={task.availability}
                  onChange={handleChange} style={{ resize: "none", overflow: "hidden" }}></textarea>
              </div>
              <div className="space-y-3">
                <label className="text-status-darkpurple">Upload an Image <br /> This is the main image that would be seen by customers</label>
                {task.taskImage ? (
                  <div className="flex items-end ">
                    <div className="relative flex h-48 w-1/2 lg:w-2/5 items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4">
                      <img
                        src={imageURL}
                        alt="Uploaded Task"
                        className="h-full w-full object-contain"
                        width="100%"
                        height="100%"
                      />
                      <input
                        id="file-upload-main"
                        type="file"
                        readOnly
                        disabled
                        name="image"
                        className="hidden"
                        onChange={(e) => handlePictureUpload(e, 0)}
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
                    htmlFor="file-upload-main"
                    className="flex h-48 w-1/2 lg:w-2/5 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 ">
                    <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                    <span className="text-center text-[#EBE9F4] font-bold">
                      File Upload supports: JPG, PDF, PNG.
                    </span>
                    <input
                      id="file-upload-main"
                      type="file"
                      accept=".png, .jpg, .jpeg, .gif"
                      className="hidden"
                      onChange={(e) => handlePictureUpload(e, 0)}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-4">
                <p>Upload additional images of service.</p>
                <div className="flex flex-col lg:flex-row space-y-3 lg:space-x-3">
                  <div className=" space-y-3">
                    {task.taskImage1 ? (
                      <div className="flex items-end relative">
                        <div className="relative flex h-48 w-1/2 lg:w-full items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4">
                          <img
                            src={imageURL1}
                            alt="Uploaded Task"
                            className="h-full w-full object-contain"
                            width="100%"
                            height="100%"
                          />
                          <input
                            id="file-upload-1"
                            type="file"
                            readOnly
                            disabled
                            name="image"
                            className="hidden"
                            onChange={(e) => handlePictureUpload(e, 1)}
                          />
                        </div>
                        <button
                          type="button"
                          className="absolute top-2 right-2 text-red-500"
                          onClick={() => setTask({ ...task, taskImage1: null })}
                        >
                          <IoMdClose className="w-[24px] h-[24px] border-2 border-[#5A5960] rounded-3xl" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload-1"
                        className="flex h-48 w-1/2 lg:w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 ">
                        <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                        <span className="text-center text-[#EBE9F4] font-bold">
                          File Upload supports: JPG, PDF, PNG.
                        </span>
                        <input
                          id="file-upload-1"
                          type="file"
                          accept=".png, .jpg, .jpeg, .gif"
                          className="hidden"
                          onChange={(e) => handlePictureUpload(e, 1)}
                        />
                      </label>
                    )}
                  </div>

                  <div className=" space-y-3">
                    {task.taskImage2 ? (
                      <div className="flex items-end relative ">
                        <div className="relative flex h-48 w-1/2 lg:w-full items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4">
                          <img
                            src={imageURL2}
                            alt="Uploaded Task"
                            className="h-full w-full object-contain"
                            width="100%"
                            height="100%"
                          />
                          <input
                            id="file-upload-2"
                            type="file"
                            readOnly
                            disabled
                            name="image"
                            className="hidden"
                            onChange={(e) => handlePictureUpload(e, 2)}
                          />
                        </div>
                        <button
                          className="absolute top-2 right-2 text-red-500"
                          onClick={() => setTask({ ...task, taskImage2: null })}
                        >
                          <IoMdClose className="w-[24px] h-[24px] border-2 border-[#5A5960] rounded-3xl" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload-2"
                        className="flex h-48 w-1/2 lg:w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 ">
                        <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                        <span className="text-center text-[#EBE9F4] font-bold">
                          File Upload supports: JPG, PDF, PNG.
                        </span>
                        <input
                          id="file-upload-2"
                          type="file"
                          accept=".png, .jpg, .jpeg, .gif"
                          className="hidden"
                          onChange={(e) => handlePictureUpload(e, 2)}
                        />
                      </label>
                    )}
                  </div>

                  <div className=" space-y-3">
                    {task.taskImage3 ? (
                      <div className="flex items-end relative">
                        <div className="relative flex h-48 w-1/2 lg:w-full items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4">
                          <img
                            src={imageURL3}
                            alt="Uploaded Task"
                            className="h-full w-full object-contain"
                            width="100%"
                            height="100%"
                          />
                          <input
                            id="file-upload-3"
                            type="file"
                            readOnly
                            disabled
                            name="image"
                            className="hidden"
                            onChange={(e) => handlePictureUpload(e, 3)}
                          />
                        </div>
                        <button
                          className="absolute top-2 right-2 text-red-500"
                          onClick={() => setTask({ ...task, taskImage3: null })}
                        >
                          <IoMdClose className="w-[24px] h-[24px] border-2 border-[#5A5960] rounded-3xl" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload-3"
                        className="flex h-48 w-1/2 lg:w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 ">
                        <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                        <span className="text-center text-[#EBE9F4] font-bold">
                          File Upload supports: JPG, PDF, PNG.
                        </span>
                        <input
                          id="file-upload-3"
                          type="file"
                          accept=".png, .jpg, .jpeg, .gif"
                          className="hidden"
                          onChange={(e) => handlePictureUpload(e, 3)}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-[#FF0000]">
                {Object.keys(error).map((key, index) => (
                  <div key={index}>{error[key]}</div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button theme="outline" type="button" onClick={prevPage}>
                  Back
                </Button>
                <Button type="submit">Post Listing</Button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center mt-24">
      <Head>
        <title>TaskHub | Provide Service</title>
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
                  } rounded-2xl border-none px-3 py-2`}>
                01
              </span>{" "}
              Services Description
              <span >
                <IoIosArrowForward />
              </span>
            </p>
          </div>
          <div
            className={`${currentPage === 2 || currentPage === 3
              ? "text-status-purpleBase"
              : " text-[#716F78]"
              }`}>
            <p className="flex items-center gap-2 lg:gap-3 text-[12px] md:text-[16px]">
              <span
                className={`${currentPage === 2 || currentPage === 3
                  ? "bg-status-purpleBase text-white"
                  : "bg-[#EAE9EB] text-[#716F78]"
                  } rounded-2xl border-none px-3 py-2`}>
                02
              </span>{" "}
              Services Details
              <span >
                <IoIosArrowForward />
              </span>
            </p>
          </div>
          <div
            className={`${currentPage === 3
              ? "text-status-purpleBase"
              : " text-[#716F78]"
              }`}>
            <p className="flex items-center gap-2 lg:gap-3 text-[12px] md:text-[16px]">
              <span
                className={`${currentPage === 3
                  ? "bg-status-purpleBase text-white"
                  : "bg-[#EAE9EB] text-[#716F78]"
                  } rounded-2xl border-none px-3 py-2`}>
                03
              </span>{" "}
              Image Upload
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
        <div className="lg:flex mt-8">
          {currentPage === 1 && (
            <div className="lg:w-[390px] hidden lg:block mr-[50px] xl:ml-[15%] lg:ml-[10%] ">
              <AiDesciption
                setTask={setTask}
                task={task}
              />
            </div>
          )}

          <div className={currentPage !== 1 ? "flex items-center justify-center w-full" : ''}>
            <div>
              <div className={currentPage === 1 ? " lg:w-full w-[80%] mx-auto " : ''}>
                <h2 className="text-4xl text-status-darkpurple font-medium">Provide a Service</h2>
                <p className="text-[12px] text-[#716F78] font-medium">
                  Please fill out the information below to add a new listing.
                </p>
              </div>
              <div className="mt-8">
                {renderPage()}</div>
            </div>
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
            <div className="flex justify-center text-white text-[1px]">
              <GrFormCheckmark className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px] rounded-full bg-[#FE9B07] p-2" />
            </div>
            <p className="text-center text-[25px] lg:text-[37px] text-[#2A1769] font-extrabold font-clashDisplay ">Task posted</p>
            <p className="lg:text-[20px]">
              Your task has been posted! please click <br /> on the button to
              proceed to marketplace
            </p>
            <Image src={image} alt="image" className="absolute lg:top-2/3 lg:-right-20 -right-8 top-40 w-20 lg:w-32" />
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
    </div>
  );
};

export default ProvideService;
