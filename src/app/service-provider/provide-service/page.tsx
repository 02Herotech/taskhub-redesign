"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { FaGreaterThan } from "react-icons/fa";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TiTick } from "react-icons/ti";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import Link from "next/link";
import AiGenerate from "./AiGenerate/page";
import AiGeneratedDesc from "./AiGenerate/page";

interface Task {
  serviceDetails: string;
  briefDescription: string;
  physicalService: boolean;
  remoteService: boolean;
  termsAccepted: boolean;
  picture?: File | null;
  workDaysTime: string;
  describe: string;
  address: string;
  Suite: string;
  postalCode: string;
  category: string;
  subCategory: string;
  budget: string;
  time: string;
}

const AddTaskForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [task, setTask] = useState<Task>({
    serviceDetails: "",
    briefDescription: "",
    physicalService: false,
    remoteService: false,
    termsAccepted: false,
    picture: null,
    workDaysTime: "",
    describe: "",
    address: "",
    Suite: "",
    postalCode: "",
    category: "",
    subCategory: "",
    budget: "",
    time: "",
  });
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSelectedTime, setIsSelectedTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );
  const [activePlanIndex, setActivePlanIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleClick = (index: number) => {
    setActiveButtonIndex(index);
    setIsOpen(true);
  };

  const handlePlan = (index: number) => {
    setActivePlanIndex(index);
    setIsOpen(true);
    setInputDisabled(!inputDisabled);
  };
  const handleCode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(event.target.value);
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

  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setTask({ ...task, picture: uploadedFile });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setTask({
        serviceDetails: "",
        briefDescription: "",
        physicalService: false,
        remoteService: false,
        termsAccepted: false,
        picture: null,
        workDaysTime: "",
        describe: "",
        address: "",
        Suite: "",
        postalCode: selectedCode,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        time: isSelectedTime,
        budget: "",
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

  const [AiLoading, setAiLoading] = useState(false);
  const [subCategoryErr, setSubCategoryErr] = useState(false)

  const AiGenerate = async () => {
    setAiLoading(true);
    if (selectedSubCategory === '') {
      setSubCategoryErr(true)
      setAiLoading(false);
      return
    } else {
      setSubCategoryErr(false)
    }
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(selectedSubCategory)}`;
      const response = await axios.get(
        url
      );
      if (response.status === 201) {
        const aiGeneratedDescription = response.data;

        // setTask({ ...task, 'serviceDetails': aiGeneratedDescription });
        // setAiLoading(false);
        setTask({ ...task, 'serviceDetails': '' });
        TypingEffect(aiGeneratedDescription)

      }
      if (response.status === 400) {
      }
    }
    catch (err: any) { } finally {
      setAiLoading(false);
    }
  };

  const TypingEffect = (text: string) => {
    console.log(text)
    let currentIndex = 0;

    const timer = setInterval(() => {
      setTask((task) => {
        const newServiceDetails = task.serviceDetails + text[currentIndex];
        currentIndex++;
        if (currentIndex === text.length) {
          clearInterval(timer);
        }
        return { ...task, serviceDetails: newServiceDetails };
      });
    }, 50);
  };

  const GeneratedAiDescription = () => {

    return (
      <div>
        <div className="flex flex-col space-y-6 p-4 bg-[#381F8C] mb-5 rounded-[20px]">

          <h2 className="text-lg font-extrabold text-white">
            Get personalized AI help
          </h2>
          <p className="text-white">
            Recommended for you , Get an automated content prompt for your
            service description by clicking on{" "}
            <span className="text-[#FE9B07]">Generate with AI</span>{" "}
            button.
          </p>
          <span onClick={AiGenerate}>


            <Button
              loading={AiLoading}
              onClick={AiGenerate} type="button"
              className={` text-10px p-2 px-4 transition-transform duration-300  w-[160px]
     ease-in-out transform hover:scale-110 bg-[#333236] text-white rounded-[20px]
    `}
            >
              Generate with AI
            </Button> </span>
        </div>
        {subCategoryErr && (<p className="text-red-600 font-medium">
          Kindly choose a subcategory
        </p>)}
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="lg:w-full  w-[80%] mx-auto">

            {/* <div className="mb-10 grid items-center justify-center space-y-10 w-full"> */}
            <div className="mb-10 space-y-10 ">
              <form className="space-y-10 w-full" onSubmit={nextPage}>
                <div className="grid space-y-4">
                  <label>Choose the best category for your listing. </label>
                  <select
                    value={selectedCategory}
                    name="category"
                    onChange={handleCategory}
                    className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none">
                    <option value="">Category</option>
                    <option className="text-[12px] text-[#221354]">
                      Childcare and Babysitting
                    </option>
                  </select>
                </div>
                <div className="grid space-y-4">
                  <label>Choose a subcategory. </label>
                  <select
                    value={selectedSubCategory}
                    name="subCategory"
                    onChange={handleSubCategory}
                    className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none">
                    <option value="">subcategory</option>
                    <option className="text-[12px] text-[#221354]">Nanny</option>
                  </select>
                </div>

                <div className="grid space-y-4">
                  <label>
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
                  <GeneratedAiDescription />
                </div>
                <div className="grid space-y-3">
                  <label>Please give a detailed description of the service</label>
                  <textarea
                    className=" rounded-2xl bg-[#EBE9F4] p-3 outline-none h-[350px]"
                    placeholder="Casual Babysitting"
                    name="serviceDetails"
                    value={task.serviceDetails}
                    // onChange={handleChange}

                    onChange={(e) => setTask({ ...task, serviceDetails: e.target.value })}>
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
          <div className="mb-10 lg:w-[400px] space-y-10">
            <form onSubmit={nextPages} className="space-y-10">
              <div className="space-y-4">
                <h2>Choose the pricing plans.</h2>
                <div className="grid space-y-4 text-[13px] text-[#221354]">
                  <input
                    className={`rounded-2xl ${activePlanIndex === 0
                      ? " text-status-darkViolet p-1 text-lg bg-transparent disabled"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white p-4 "
                      } outline-none text-left placeholder:text-status-darkViolet hover:placeholder:text-white`}
                    name="physical"
                    onClick={() => handlePlan(0)}
                    placeholder="Plan 1"
                    value="Plan 1"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 0 && (
                    <div>
                      <label>
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 border-2 rounded-2xl pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                          placeholder="Casual Babysitting"
                          name="serviceDetails"
                          value={task.serviceDetails}
                          onChange={handleChange}></textarea>
                        <label className="pl-2">Price</label>
                        <div className="flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="budget"
                            value={task.budget}
                            onChange={handleChange}
                            placeholder="$500"
                            className="rounded-2xl w-1/3 bg-[#EBE9F4] p-3 text-[13px] outline-none"
                          />
                          <p className="text-xs text-status-lightViolet">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    className={`rounded-2xl ${activePlanIndex === 1
                      ? " text-status-darkViolet p-1 text-lg bg-transparent"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white p-4"
                      } outline-none text-left placeholder:text-status-darkViolet hover:placeholder:text-white`}
                    name="physical"
                    onClick={() => handlePlan(1)}
                    placeholder="Plan 2"
                    value="Plan 2"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 1 && (
                    <div>
                      <label>
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 border-2 rounded-2xl pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                          placeholder="Casual Babysitting"
                          name="serviceDetails"
                          value={task.serviceDetails}
                          onChange={handleChange}></textarea>
                        <label className="pl-2">Price</label>
                        <div className="flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="budget"
                            value={task.budget}
                            onChange={handleChange}
                            placeholder="$500"
                            className="rounded-2xl w-1/3 bg-[#EBE9F4] p-3 text-[13px] outline-none"
                          />
                          <p className="text-xs text-status-lightViolet">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    className={`rounded-2xl ${activePlanIndex === 2
                      ? " text-status-darkViolet p-1 text-lg bg-transparent"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white p-4"
                      } outline-none text-left placeholder:text-status-darkViolet hover:placeholder:text-white`}
                    name="physical"
                    onClick={() => handlePlan(2)}
                    placeholder="Plan 3"
                    value="Plan 3"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 2 && (
                    <div>
                      <label>
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 border-2 rounded-2xl pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                          placeholder="Casual Babysitting"
                          name="serviceDetails"
                          value={task.serviceDetails}
                          onChange={handleChange}></textarea>
                        <label className="pl-2">Price</label>
                        <div className="flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="budget"
                            value={task.budget}
                            onChange={handleChange}
                            placeholder="$500"
                            className="rounded-2xl w-1/3 bg-[#EBE9F4] p-3 text-[13px] outline-none"
                          />
                          <p className="text-xs text-status-lightViolet">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h2>Type of Service</h2>
                <div className="flex space-x-4 text-[13px] text-[#221354]">
                  <input
                    className={`rounded-2xl p-2 ${activeButtonIndex === 0
                      ? "bg-status-darkViolet text-white"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white placeholder:text-white"
                      } outline-none cursor-pointer`}
                    name="physical"
                    onClick={() => handleClick(0)}
                    placeholder="Physical Services"
                    value="Physical Services"
                    readOnly
                  />
                  <input
                    className={`rounded-2xl p-2 ${activeButtonIndex === 1
                      ? "bg-status-darkViolet text-white"
                      : "bg-[#EBE9F4] hover:bg-status-darkViolet hover:text-white placeholder:text-white"
                      } outline-none cursor-pointer`}
                    name="remote"
                    onClick={() => handleClick(1)}
                    placeholder="Remote Services"
                    value="Remote Services"
                    readOnly
                  />
                </div>
              </div>

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
              <div className="grid space-y-3">
                <label>Select your availabiliy</label>
                <textarea
                  className="h-full rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                  placeholder="e.g Mondays 5pm."
                  name="serviceDetails"
                  value={task.serviceDetails}
                  onChange={handleChange}></textarea>
              </div>
              <div className="grid space-y-3">
                <label>Upload a picture </label>
                {/* Check if picture is uploaded */}
                {task.picture ? (
                  <div className="flex items-end justify-center space-x-2">
                    {/* Display a disabled input with message */}
                    <label
                      htmlFor="file-upload"
                      className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-grey3 p-4">
                      <PiFileArrowDownDuotone className="text-xl text-grey3" />
                      <span className="text-center text-grey6">
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
                      className="rounded-lg bg-grey4 px-3 py-1 text-white"
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
                    className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-grey3 p-4">
                    <PiFileArrowDownDuotone className="text-xl text-grey3" />
                    <span className="text-center text-grey3">
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
              <div className="flex">
                <div className="grid space-y-3">
                  <label>Upload a picture </label>
                  {task.picture ? (
                    <div className="flex items-end justify-center space-x-2">
                      {/* Display a disabled input with message */}
                      <label
                        htmlFor="file-upload"
                        className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-grey3 p-4">
                        <PiFileArrowDownDuotone className="text-xl text-grey3" />
                        <span className="text-center text-grey6">
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
                        className="rounded-lg bg-grey4 px-3 py-1 text-white"
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
                      className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-grey3 p-4">
                      <PiFileArrowDownDuotone className="text-xl text-grey3" />
                      <span className="text-center text-grey3">
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
                <div className="grid space-y-3">
                  {task.picture ? (
                    <div className="flex items-end justify-center space-x-2">
                      {/* Display a disabled input with message */}
                      <label
                        htmlFor="file-upload"
                        className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-grey3 p-4">
                        <PiFileArrowDownDuotone className="text-xl text-grey3" />
                        <span className="text-center text-grey6">
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
                        className="rounded-lg bg-grey4 px-3 py-1 text-white"
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
                      className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-grey3 p-4">
                      <PiFileArrowDownDuotone className="text-xl text-grey3" />
                      <span className="text-center text-grey3">
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
                <div className="grid space-y-3">
                  <label>Upload a picture </label>
                  {/* Check if picture is uploaded */}
                  {task.picture ? (
                    <div className="flex items-end justify-center space-x-2">
                      {/* Display a disabled input with message */}
                      <label
                        htmlFor="file-upload"
                        className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-grey3 p-4">
                        <PiFileArrowDownDuotone className="text-xl text-grey3" />
                        <span className="text-center text-grey6">
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
                        className="rounded-lg bg-grey4 px-3 py-1 text-white"
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
                      className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-grey3 p-4">
                      <PiFileArrowDownDuotone className="text-xl text-grey3" />
                      <span className="text-center text-grey3">
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>TaskHub | Provide Service</title>
      </Head>
      <div className="w-full space-y-3">
        <div className="flex justify-center space-x-5">
          <div
            className={`${currentPage === 1
              ? "text-status-darkViolet"
              : "text-status-darkViolet"
              }`}>
            <p className="flex items-center gap-3">
              <span
                className={`${currentPage === 1
                  ? "bg-status-darkViolet text-white"
                  : "bg-status-darkViolet text-white"
                  } rounded-xl border-none px-3 py-1`}>
                01
              </span>{" "}
              Services Description
              <span className="text-[#716F78]">
                <FaGreaterThan />
              </span>
            </p>
          </div>
          <div
            className={`${currentPage === 2 || currentPage === 3
              ? "text-status-darkViolet"
              : " text-[#716F78]"
              }`}>
            <p className="flex items-center gap-3">
              <span
                className={`${currentPage === 2 || currentPage === 3
                  ? "bg-status-darkViolet text-white"
                  : "bg-[#EAE9EB] text-[#716F78]"
                  } rounded-xl border-none px-3 py-1`}>
                02
              </span>{" "}
              Services Details
              <span className="text-[#716F78]">
                <FaGreaterThan />
              </span>
            </p>
          </div>
          <div
            className={`${currentPage === 3 ? "text-status-darkViolet" : " text-[#716F78]"
              }`}>
            <p className="flex items-center gap-3">
              <span
                className={`${currentPage === 3
                  ? "bg-status-darkViolet text-white"
                  : "bg-[#EAE9EB] text-[#716F78]"
                  } rounded-xl border-none px-3 py-1`}>
                03
              </span>{" "}
              Image Upload
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
                  className={`h-full ${currentPage === 1
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
        <div className="lg:flex">
          {currentPage === 1 && (
            <div className="lg:w-[390px] hidden lg:block mr-[50px] xl:ml-[15%] lg:ml-[10%] ">
              {/* <GeneratedAiDescription /> */}
              <AiGeneratedDesc
                subCategory={selectedSubCategory}
                handleChange={handleChange}
              />
            </div>
          )}

          <div className={currentPage !== 1 ? "flex items-center justify-center w-full" : ''}>
            <div>
              <div className={currentPage === 1 ? " lg:w-full w-[80%] mx-auto " : ''}>
                <h2 className="text-2xl">Provide a Service</h2>
                <p className="text-[12px] text-[#716F78]">
                  Please fill out the information below to add a new listing.
                </p>
              </div>
              <div className="mt-8 w-full ">
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
              <Image src="/public/assets/images/customer/task/Task management.svg" height={10} width={19} alt="img" />
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default AddTaskForm;
