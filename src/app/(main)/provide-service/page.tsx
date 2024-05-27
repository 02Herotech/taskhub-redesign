/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import {
  IoIosArrowForward,
  IoMdArrowDropdown,
  IoMdClose,
} from "react-icons/io";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import Link from "next/link";
import image from "../../../../public/assets/images/customer/Task management.png";
import img from "../../../../public/assets/images/blend.png";
import AiDesciption from "@/components/AiGenerate/AiDescription";
import { useSession } from "next-auth/react";
import { GrFormCheckmark } from "react-icons/gr";

interface ProvideServiceData {
  listingTitle: string;
  listingDescription: string;
  planOneDescription: string;
  planTwoDescription: string;
  planThreeDescription: string;
  image1: File | null;
  image2?: File | null;
  image3?: File | null;
  image4?: File | null;
  taskType: string;
  planOnePrice: number | null;
  planTwoPrice: number | null;
  planThreePrice: number | null;
  availableDays: string[];
  suburb: string;
  postCode: string;
  state: string;
  available: boolean;
  categoryId: number | null;
  subCategoryId: number | null;
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

interface Item {
  id: string;
  categoryName: string;
}

interface Subcategory {
  id: string;
  name: string;
}

const ProvideService: React.FC = () => {
  const session = useSession();
  const id = session?.data?.user.user.id;
  const authenticated = session?.data?.user.user.enabled;
  const [currentPage, setCurrentPage] = useState(1);
  const [task, setTask] = useState<ProvideServiceData>({
    listingTitle: "",
    listingDescription: "",
    planOneDescription: "",
    planTwoDescription: "",
    planThreeDescription: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    taskType: "",
    planOnePrice: null,
    planTwoPrice: null,
    planThreePrice: null,
    availableDays: [],
    suburb: "",
    postCode: "",
    state: "",
    available: false,
    categoryId: null,
    subCategoryId: null,
  });
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [isRemote, setIsRemote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );
  const [activePlanIndex, setActivePlanIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [err, setErr] = useState<any>({});
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [postalCodeData, setPostalCodeData] = useState<PostalCodeData[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

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

  useEffect(() => {
    if (selectedCategory) {
      const fetchSubcategories = async () => {
        try {
          const response = await axios.get(
            `https://smp.jacinthsolutions.com.au/api/v1/util/all-sub-categories-by-categoryId/${selectedCategory}`,
          );
          const data: Subcategory[] = response.data;
          setSubcategories(data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };

      fetchSubcategories();
    }
  }, [selectedCategory]);

  const validateFields = () => {
    const errors: any = {};
    if (!selectedCategory) {
      errors.category = "Please select a category.";
    } else if (!selectedSubCategory) {
      errors.subCategory = "Please select a subcategory.";
    } else if (!task.listingTitle) {
      errors.lisitingTitle = "Please lisitingTitle with a short title";
    } else if (!task.listingDescription) {
      errors.description = "Please give a detailed description";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateField1 = () => {
    const error: any = {};
    if (!task.planOneDescription) {
      error.planDetails = "Please write down details about your plan";
    }
    if (!task.planOnePrice) {
      error.price = "Please write down your budget price";
    }
    if (activeButtonIndex === 0) {
      if (!selectedCode) {
        error.postalCode = "Please input your postal code";
      }
      if (!selectedCity) {
        error.city = "Please select your city";
      }
    }

    setError(error);
    return Object.keys(error).length === 0;
  };

  const validateField2 = () => {
    const err: any = {};
    if (!selectedDays) {
      err.availableDays = "Please select an available day";
    }
    if (!task.image1) {
      err.image = "Please upload an Image";
    }

    setErr(err);
    return Object.keys(err).length === 0;
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedId = parseInt(event.target.value);
    setSelectedCategory(selectedId);
    setTask({
      ...task,
      categoryId: selectedId,
    });
    setSubcategories([]);
  };

  const handleSubCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedId = parseInt(event.target.value);
    setSelectedSubCategory(selectedId);
    setTask({
      ...task,
      subCategoryId: selectedCategory,
    });
  };

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

  const handleTickChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value && !selectedDays.includes(value)) {
      setSelectedDays([...selectedDays, value]);
    }
    setSelectedDay("");
  };

  const handleRemoveDay = (day: string) => {
    setSelectedDays(selectedDays.filter((d) => d !== day));
  };

  const nextPage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields()) {
      setCurrentPage(currentPage + 1);
      console.log(selectedCategory, selectedSubCategory);
    }
  };

  const nextPages = (event: React.FormEvent<HTMLFormElement>) => {
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
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setTask({ ...task, image1: uploadedFile });
    }
  };
  const handlePictureUpload1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setTask({ ...task, image2: uploadedFile });
    }
  };

  const handlePictureUpload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setTask({ ...task, image3: uploadedFile });
    }
  };

  const handlePictureUpload3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setTask({ ...task, image4: uploadedFile });
    }
  };
  const getImageURL = (imageIndex: number) => {
    switch (imageIndex) {
      case 1:
        return task.image2 instanceof File
          ? URL.createObjectURL(task.image2)
          : "";
      case 2:
        return task.image3 instanceof File
          ? URL.createObjectURL(task.image3)
          : "";
      case 3:
        return task.image4 instanceof File
          ? URL.createObjectURL(task.image4)
          : "";
      default:
        return task.image1 instanceof File
          ? URL.createObjectURL(task.image1)
          : "";
    }
  };

  const imageURL = getImageURL(0);
  const imageURL1 = getImageURL(1);
  const imageURL2 = getImageURL(2);
  const imageURL3 = getImageURL(3);

  const calculateProgress = () => {
    const requiredFields = [
      task.listingDescription,
      task.planOnePrice,
      task.listingTitle,
      selectedDay,
      task.planOneDescription,
      task.image1,
      task.categoryId,
      task.subCategoryId,
    ];

    if (isOpen && activeButtonIndex === 1) {
      requiredFields.push(isRemote);
    } else {
      requiredFields.push(selectedCode, selectedCity);
    }
    const filledFields = requiredFields.filter(
      (value) => value !== "" && value !== null,
    ).length;

    const totalFields = isOpen && activeButtonIndex === 0 ? 9 : 8;

    return Math.round((filledFields / totalFields) * 100);
  };

  const progress = calculateProgress();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateField2()) {
      try {
        let finalTask = { ...task };

        if (isOpen && activeButtonIndex === 1) {
          const type = "REMOTE_SERVICE";
          finalTask = { ...finalTask, taskType: type };
        } else {
          finalTask = {
            ...finalTask,
            taskType: "PHYSICAL_SERVICE",
            suburb: selectedCity,
            postCode: selectedCode,
            state: postalCodeData[0].state.name,
          };
        }

        if (selectedDays) {
          finalTask = { ...finalTask, availableDays: selectedDays };
        }

        if (!task.image2 || !task.image3 || !task.image4) {
          finalTask = {
            ...finalTask,
            image2: task.image1,
            image3: task.image1,
            image4: task.image1,
          };
        }
        console.log(finalTask);

        await axios.post(
          `https://smp.jacinthsolutions.com.au/api/v1/listing/create-listing?userId=${id}`,
          finalTask,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setTask({
          listingTitle: "",
          listingDescription: "",
          planOneDescription: "",
          planTwoDescription: "",
          planThreeDescription: "",
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          taskType: "",
          planOnePrice: null,
          planTwoPrice: null,
          planThreePrice: null,
          availableDays: [],
          suburb: "",
          postCode: "",
          state: "",
          available: false,
          categoryId: null,
          subCategoryId: null,
        });
        setIsSuccessPopupOpen(true);
      } catch (error: any) {
        console.error("Error submitting form:", error);
        console.log(error.message);
        setIsSuccessPopupOpen(false);
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="mx-auto  w-[80%] lg:w-full">
            <div className="mb-10 space-y-10 ">
              <form
                className="w-full space-y-10 text-status-darkpurple"
                onSubmit={nextPage}
              >
                <div className="grid space-y-4">
                  <label className="font-semibold">
                    Write a short title that accurately describes your service.{" "}
                  </label>
                  <input
                    type="text"
                    name="listingTitle"
                    value={task.listingTitle}
                    onChange={handleChange}
                    placeholder="Casual Babysitting"
                    className="rounded-2xl bg-[#EBE9F4] p-3 text-[13px]  outline-none"
                  />
                </div>
                <div className="relative grid space-y-4">
                  <label className="font-semibold">
                    Choose the best category for your listing.{" "}
                  </label>
                  <select
                    value={selectedCategory || ""}
                    name="category"
                    onChange={handleCategoryChange}
                    className="w-full cursor-pointer appearance-none rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none"
                  >
                    <option value="">Category</option>
                    {items.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        className="text-[12px] text-[#221354]"
                      >
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown className="absolute right-5 top-10 cursor-pointer text-status-purpleBase" />
                </div>
                <div className="relative grid space-y-4">
                  <label className="font-bold">Choose a subcategory. </label>
                  <select
                    value={selectedSubCategory || ""}
                    name="subCategory"
                    onChange={handleSubCategoryChange}
                    className="w-full cursor-pointer appearance-none rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none"
                  >
                    <option value="">Subcategory</option>
                    {subcategories.map((subcategory) => (
                      <option
                        key={subcategory.id}
                        value={subcategory.id}
                        className="text-[12px] text-[#221354]"
                      >
                        <p>{subcategory.name}</p>
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown className="absolute right-5 top-10 cursor-pointer text-status-purpleBase" />
                </div>

                <div className="lg:hidden">
                {/* @ts-ignore */}
                  <AiDesciption setTask={setTask} task={task} />
                </div>
                <div className="grid space-y-3">
                  <label className="font-semibold">
                    Please give a detailed description of the service
                  </label>
                  <textarea
                    className=" h-[350px] rounded-2xl bg-[#EBE9F4] p-3 outline-none"
                    placeholder="Casual Babysitting"
                    name="description"
                    value={task.listingDescription}
                    // onChange={handleChange}

                    onChange={(e) =>
                      setTask({ ...task, listingDescription: e.target.value })
                    }
                  ></textarea>
                </div>
                {Object.keys(errors).map((key, index) => (
                  <div key={index} className="text-red-500">
                    {errors[key]}
                  </div>
                ))}
                <Button type="submit">Next</Button>
              </form>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="mb-10 space-y-10 lg:w-[470px]">
            <form onSubmit={nextPages} className="space-y-10">
              <div className="space-y-4">
                <h2 className="font-bold">Choose the pricing plans.</h2>
                <div className="grid space-y-4 text-[13px] text-[#221354]">
                  <input
                    className={`rounded-2xl ${
                      activePlanIndex === 0
                        ? " disabled bg-transparent p-1 text-lg font-bold text-status-darkViolet"
                        : "bg-[#EBE9F4] p-4 hover:bg-status-darkViolet hover:text-white "
                    } cursor-pointer text-left outline-none placeholder:text-[#2A1769] hover:placeholder:text-white`}
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
                      <div className="grid space-y-3 rounded-2xl border-2 pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 outline-none placeholder:font-semibold"
                          placeholder="Casual Babysitting"
                          name="planOneDescription"
                          value={task.planOneDescription}
                          onChange={handleChange}
                        ></textarea>
                        <label className="pl-2 font-medium">Price</label>
                        <div className="relative flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="planOnePrice"
                            value={
                              task.planOnePrice !== null
                                ? task.planOnePrice
                                : ""
                            }
                            onChange={handlePrice}
                            placeholder="500"
                            className="w-1/3 rounded-2xl bg-[#EBE9F4] p-3 pl-5 text-[13px] outline-none"
                          />
                          <p className="absolute left-3 top-3">$</p>
                          <p className="text-xs font-bold text-status-lightViolet">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    className={`rounded-2xl ${
                      activePlanIndex === 1
                        ? " disabled bg-transparent p-1 text-lg font-bold text-status-darkViolet"
                        : "bg-[#EBE9F4] p-4 hover:bg-status-darkViolet hover:text-white"
                    } cursor-pointer text-left outline-none placeholder:text-[#2A1769] hover:placeholder:text-white`}
                    name="physical"
                    onClick={() => handlePlan(1)}
                    placeholder="Plan 2  (Optional)"
                    value="Plan 2  (Optional)"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 1 && (
                    <div>
                      <label className="font-bold">
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 rounded-2xl border-2 pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 outline-none placeholder:font-bold"
                          placeholder="Casual Babysitting"
                          name="planTwoDescription"
                          value={task.planTwoDescription}
                          onChange={handleChange}
                        ></textarea>
                        <label className="pl-2 font-medium">Price</label>
                        <div className="relative flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="planTwoPrice"
                            value={
                              task.planTwoPrice !== null
                                ? task.planTwoPrice
                                : ""
                            }
                            onChange={handlePrice}
                            placeholder="500"
                            className="w-1/3 rounded-2xl bg-[#EBE9F4] p-3 pl-5 text-[13px] outline-none"
                          />
                          <p className="absolute left-3 top-3">$</p>
                          <p className="text-xs font-bold text-status-lightViolet">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    className={`rounded-2xl ${
                      activePlanIndex === 2
                        ? " disabled bg-transparent p-1 text-lg font-bold text-status-darkViolet"
                        : "bg-[#EBE9F4] p-4 hover:bg-status-darkViolet hover:text-white"
                    } cursor-pointer text-left outline-none placeholder:text-[#2A1769] hover:placeholder:text-white`}
                    name="physical"
                    onClick={() => handlePlan(2)}
                    placeholder="Plan 3  (Optional)"
                    value="Plan 3  (Optional)"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 2 && (
                    <div>
                      <label className="font-bold">
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 rounded-2xl border-2 pb-5">
                        <textarea
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 outline-none placeholder:font-bold"
                          placeholder="Casual Babysitting"
                          name="planThreeDescription"
                          value={task.planThreeDescription}
                          onChange={handleChange}
                        ></textarea>
                        <label className="pl-2 font-medium">Price</label>
                        <div className="relative flex items-center space-x-2 pl-2">
                          <input
                            type="text"
                            name="planThreePrice"
                            value={
                              task.planThreePrice !== null
                                ? task.planThreePrice
                                : ""
                            }
                            onChange={handlePrice}
                            placeholder="500"
                            className="w-1/3 rounded-2xl bg-[#EBE9F4] p-3 pl-5 text-[13px] outline-none"
                          />
                          <p className="absolute left-3 top-3">$</p>
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
                    className={`rounded-2xl p-2 ${
                      activeButtonIndex === 0
                        ? "bg-status-purpleBase text-white"
                        : "bg-[#EBE9F4] placeholder:text-white hover:bg-status-purpleBase hover:text-white"
                    } cursor-pointer outline-none placeholder:font-bold`}
                    name="physical"
                    onClick={() => handleClick(0)}
                    placeholder="Physical Services"
                    value="Physical Services"
                    readOnly
                  />
                  <input
                    className={`rounded-2xl p-2 ${
                      activeButtonIndex === 1
                        ? "bg-status-purpleBase text-white"
                        : "bg-[#EBE9F4] placeholder:text-white hover:bg-status-purpleBase hover:text-white "
                    } cursor-pointer outline-none placeholder:font-bold`}
                    name="remote"
                    onClick={() => {
                      handleClick(1);
                      setIsRemote("Remote");
                    }}
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
                <div className="flex flex-col font-medium text-status-darkpurple lg:flex-row lg:space-x-3">
                  <div className="flex space-x-4 lg:justify-normal">
                    <div className="grid space-y-4">
                      <label>Postal code</label>
                      <input
                        value={selectedCode}
                        onChange={handleCode}
                        name="postalCode"
                        className="w-[155px] cursor-pointer rounded-2xl bg-[#EBE9F4]  p-3 text-[13px] outline-none placeholder:font-bold sm:w-[200px]  lg:w-[140px]"
                      />
                    </div>

                    <div className="relative grid space-y-4">
                      <label>City/Suburb</label>
                      <select
                        value={selectedCity}
                        onChange={handleCity}
                        name="city"
                        id="city"
                        className="w-[180px] cursor-pointer appearance-none  rounded-2xl bg-[#EBE9F4] p-3 text-[13px] outline-none placeholder:font-bold lg:w-[155px]"
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
                      value={
                        postalCodeData.length > 0
                          ? postalCodeData[0].state.name
                          : ""
                      }
                      onChange={handleChange}
                      name="state"
                      id="state"
                      disabled
                      className=" cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-sm outline-none lg:w-[145px]"
                    />
                  </div>
                </div>
              )}
              <div className="text-[#FF0000]">
                {Object.keys(error).map((key, index) => (
                  <div key={index} className="text-red-500">
                    {error[key]}
                  </div>
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
          <div className="xs:w-[500px] mb-10 space-y-10 font-bold text-status-darkpurple lg:w-[700px]">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative mt-2">
                <select
                  value={selectedDay}
                  onChange={handleTickChange}
                  name="availableDays"
                  className="h-10 w-full appearance-none rounded-2xl border border-tc-gray bg-[#EBE9F4] px-3 py-1 text-[14px] outline-none lg:w-1/2"
                >
                  <option value="">Available Days</option>
                  <option value="MONDAY">Monday</option>
                  <option value="TUESDAY">Tuesday</option>
                  <option value="WEDNESDAY">Wednesday</option>
                  <option value="THURSDAY">Thursday</option>
                  <option value="FRIDAY">Friday</option>
                  <option value="SATURDAY">Saturday</option>
                  <option value="SUNDAY">Sunday</option>
                </select>
                <IoMdArrowDropdown className="absolute right-96 top-3 cursor-pointer" />
                <div className="mt-4 h-[100px] rounded-2xl border bg-[#EBE9F4] p-4 lg:w-2/3">
                  <ul className="flex flex-wrap gap-2">
                    {selectedDays.map((day) => (
                      <li
                        key={day}
                        className="relative h-[40px] w-[105px] rounded-3xl border-2 border-[#FE9B07] bg-[#FFF0DA]
p-3 text-center text-[12px] text-[#fe9b07]"
                        style={{ textTransform: "capitalize" }}
                      >
                        {day}
                        <button
                          type="button"
                          onClick={() => handleRemoveDay(day)}
                          className="absolute -top-1 right-0.5 ml-2 rounded-3xl border-[1px] border-[#4E5158] bg-[#EBE9F4] text-[#4E5158]"
                        >
                          <IoMdClose />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-status-darkpurple">
                  Upload an Image <br /> This is the main image that would be
                  seen by customers
                </label>
                {task.image1 ? (
                  <div className="flex items-end ">
                    <div className="relative flex h-48 w-1/2 items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 lg:w-2/5">
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
                        name="image1"
                        className="hidden"
                        onChange={handlePictureUpload}
                      />
                    </div>
                    <button
                      className="rounded-lg bg-tc-gray px-3 py-1 text-white"
                      onClick={() => {
                        setTask({ ...task, image1: null });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="file-upload-main"
                    className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 lg:w-2/5 "
                  >
                    <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                    <span className="text-center font-bold text-[#EBE9F4]">
                      File Upload supports: JPG, PDF, PNG.
                    </span>
                    <input
                      id="file-upload-main"
                      type="file"
                      accept=".png, .jpg, .jpeg, .gif"
                      className="hidden"
                      onChange={handlePictureUpload}
                      name="image1"
                    />
                  </label>
                )}
              </div>

              <div className="space-y-4">
                <p>Upload additional images of service.</p>
                <div className="flex flex-col space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
                  <div className=" space-y-3">
                    {task.image2 ? (
                      <div className="relative flex items-end">
                        <div className="relative flex h-48 w-1/2 items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 lg:w-full">
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
                            name="image2"
                            className="hidden"
                            onChange={handlePictureUpload1}
                          />
                        </div>
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-red-500"
                          onClick={() => setTask({ ...task, image2: null })}
                        >
                          <IoMdClose className="h-[24px] w-[24px] rounded-3xl border-2 border-[#5A5960]" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload-1"
                        className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 lg:w-full "
                      >
                        <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                        <span className="text-center font-bold text-[#EBE9F4]">
                          File Upload supports: JPG, PDF, PNG.
                        </span>
                        <input
                          id="file-upload-1"
                          type="file"
                          accept=".png, .jpg, .jpeg, .gif"
                          className="hidden"
                          name="image2"
                          onChange={handlePictureUpload1}
                        />
                      </label>
                    )}
                  </div>

                  <div className=" space-y-3">
                    {task.image3 ? (
                      <div className="relative flex items-end ">
                        <div className="relative flex h-48 w-1/2 items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 lg:w-full">
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
                            name="image3"
                            className="hidden"
                            onChange={handlePictureUpload2}
                          />
                        </div>
                        <button
                          className="absolute right-2 top-2 text-red-500"
                          onClick={() => setTask({ ...task, image3: null })}
                        >
                          <IoMdClose className="h-[24px] w-[24px] rounded-3xl border-2 border-[#5A5960]" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload-2"
                        className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 lg:w-full "
                      >
                        <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                        <span className="text-center font-bold text-[#EBE9F4]">
                          File Upload supports: JPG, PDF, PNG.
                        </span>
                        <input
                          id="file-upload-2"
                          type="file"
                          accept=".png, .jpg, .jpeg, .gif"
                          className="hidden"
                          name="image3"
                          onChange={handlePictureUpload2}
                        />
                      </label>
                    )}
                  </div>

                  <div className=" space-y-3">
                    {task.image4 ? (
                      <div className="relative flex items-end">
                        <div className="relative flex h-48 w-1/2 items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 lg:w-full">
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
                            name="image4"
                            className="hidden"
                            onChange={handlePictureUpload3}
                          />
                        </div>
                        <button
                          className="absolute right-2 top-2 text-red-500"
                          onClick={() => setTask({ ...task, image4: null })}
                        >
                          <IoMdClose className="h-[24px] w-[24px] rounded-3xl border-2 border-[#5A5960]" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload-3"
                        className="flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#EBE9F4] p-4 lg:w-full "
                      >
                        <PiFileArrowDownDuotone className="text-xl text-[#EBE9F4]" />
                        <span className="text-center font-bold text-[#EBE9F4]">
                          File Upload supports: JPG, PDF, PNG.
                        </span>
                        <input
                          id="file-upload-3"
                          type="file"
                          accept=".png, .jpg, .jpeg, .gif"
                          className="hidden"
                          name="image4"
                          onChange={handlePictureUpload3}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-[#FF0000]">
                {Object.keys(err).map((key, index) => (
                  <div key={index}>{err[key]}</div>
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
    <div className="mt-4 flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>TaskHub | Provide Service</title>
      </Head>
      <div className="w-full">
        <div className="mb-3 flex justify-center md:space-x-5">
          <div
            className={`${
              currentPage === 1
                ? "text-status-purpleBase"
                : "text-status-purpleBase"
            }`}
          >
            <p className="flex items-center  text-[12px] md:text-[16px] lg:gap-3">
              <span
                className={`${
                  currentPage === 1
                    ? "bg-status-purpleBase text-white"
                    : "bg-status-purpleBase text-white"
                } rounded-2xl border-none px-3 py-2`}
              >
                01
              </span>{" "}
              Services Description
              <span>
                <IoIosArrowForward />
              </span>
            </p>
          </div>
          <div
            className={`${
              currentPage === 2 || currentPage === 3
                ? "text-status-purpleBase"
                : " text-[#716F78]"
            }`}
          >
            <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
              <span
                className={`${
                  currentPage === 2 || currentPage === 3
                    ? "bg-status-purpleBase text-white"
                    : "bg-[#EAE9EB] text-[#716F78]"
                } rounded-2xl border-none px-3 py-2`}
              >
                02
              </span>{" "}
              Services Details
              <span>
                <IoIosArrowForward />
              </span>
            </p>
          </div>
          <div
            className={`${
              currentPage === 3 ? "text-status-purpleBase" : " text-[#716F78]"
            }`}
          >
            <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
              <span
                className={`${
                  currentPage === 3
                    ? "bg-status-purpleBase text-white"
                    : "bg-[#EAE9EB] text-[#716F78]"
                } rounded-2xl border-none px-3 py-2`}
              >
                03
              </span>{" "}
              Image Upload
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
        <div className="mt-8 lg:flex">
          {currentPage === 1 && (
            <div className="mr-[50px] hidden lg:ml-[10%] lg:block lg:w-[390px] xl:ml-[15%] ">
                {/* @ts-ignore */}
              <AiDesciption setTask={setTask} task={task} />
            </div>
          )}

          <div
            className={
              currentPage !== 1 ? "flex w-full items-center justify-center" : ""
            }
          >
            <div>
              <div
                className={
                  currentPage === 1 ? " mx-auto w-[80%] lg:w-full " : ""
                }
              >
                <h2 className="text-4xl font-medium text-status-darkpurple">
                  Provide a Service
                </h2>
                <p className="text-[12px] font-medium text-[#716F78]">
                  Please fill out the information below to add a new listing.
                </p>
              </div>
              <div className="mt-8">{renderPage()}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {authenticated === false ? (
          <Popup
            isOpen={isSuccessPopupOpen}
            onClose={() => {
              setIsSuccessPopupOpen(false);
            }}
          >
            <div className="p-10 lg:px-12">
              <div className="relative grid items-center justify-center space-y-5">
                <p className="text-center font-clashDisplay text-[20px] font-extrabold text-[#2A1769] md:text-[36px] lg:text-[37px] ">
                  You are almost done!!!
                </p>
                <p className="text-center text-[14px] lg:text-[20px]">
                  Please proceed to update your profile
                  <br /> before your Task can be posted
                </p>
                <Image
                  src={image}
                  alt="image"
                  className="absolute -right-12 top-28 w-24 lg:-right-20 lg:top-1/2 lg:w-36"
                />
                <Image
                  src={img}
                  alt="image"
                  className="absolute -left-12 top-12 w-12 lg:-left-[73px] lg:top-2 lg:w-24"
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
            <div className="p-5 lg:px-20">
              <div className="relative grid items-center justify-center space-y-5">
                <div className="flex justify-center text-[1px] text-white">
                  <GrFormCheckmark className="h-[50px] w-[50px] rounded-full bg-[#FE9B07] p-2 lg:h-[60px] lg:w-[60px]" />
                </div>
                <p className="text-center font-clashDisplay text-[25px] font-extrabold text-[#2A1769] lg:text-[37px] ">
                  Service created
                </p>
                <p className="lg:text-[20px]">
                  Your Service Listing has been created!
                  <br /> please click on the button to proceed to marketplace
                </p>
                <Image
                  src={image}
                  alt="image"
                  className="absolute -right-8 top-40 w-20 lg:-right-20 lg:top-2/3 lg:w-32"
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
    </div>
  );
};

export default ProvideService;