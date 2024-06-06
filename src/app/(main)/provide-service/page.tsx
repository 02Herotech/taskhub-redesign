/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import {
  IoIosArrowForward,
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
import { FaSortDown } from "react-icons/fa6";
import Dropdown from "@/components/global/Dropdown";

interface FormData {
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
  categoryId: number | null;
  subCategoryId: number | null;
  negotiable: boolean;
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
  const isAuthenticated = session?.data?.user.user.enabled === false;
  const [currentPage, setCurrentPage] = useState(1);
  const [task, setTask] = useState<FormData>({
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
    categoryId: null,
    subCategoryId: null,
    negotiable: false,
  });
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState("Suburb");
  const [isRemote, setIsRemote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [negotiable, setnegotiable] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState("Category");
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("Subcategory");
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

  const daysOfWeek = [
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
    { value: 'SUNDAY', label: 'Sunday' },
  ];

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

  useEffect(() => {
    if (currentPage === 2 || currentPage === 3) {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const validateFields = () => {
    const errors: any = {};
    if (!selectedCategory) {
      errors.category = "Please fill out all required fields";
    }
      if (!selectedSubCategory) {
      errors.subCategory = "Please fill out all required fields";
    }
    if (!task.listingTitle) {
      errors.lisitingTitle = "Please fill out all required fields";
    }
    if (!task.listingDescription) {
      errors.description = "Please fill out all required fields";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateField1 = () => {
    const error: any = {};
    if (!task.planOneDescription) {
      error.planDetails = "Please fill out all required fields";
    }
    if (!task.planOnePrice) {
      error.price = "Please fill out all required fields";
    }
    if (activeButtonIndex === 0) {
      if (!selectedCode) {
        error.postalCode = "Please fill out all required fields";
      }
    }
    if (activeButtonIndex === 0) {
      if (!selectedCity) {
        error.city = "Please fill out all required fields";
      }
    }

    setError(error);
    return Object.keys(error).length === 0;
  };

  const validateField2 = () => {
    const err: any = {};
    if (!selectedDays) {
      err.availableDays = "Please fill out all required fields";
    }
    if (!task.image1) {
      err.image = "Please fill out all required fields";
    }

    setErr(err);
    return Object.keys(err).length === 0;
  };

  const handleCategoryChange = (item: any) => {
    const selectedId = parseInt(item);
    setSelectedCategory(selectedId);
    setTask({
      ...task,
      categoryId: selectedId,
    });
  };

  const handleSubCategoryChange = (subcategory: any) => {
    const selectedId = parseInt(subcategory);
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
  const handleCity = (data: any) => {
    setSelectedCity(data);
  };

  const handleTickChange = (daysOfWeek: any) => {
    const value = daysOfWeek;
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
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnegotiable(event.target.checked);
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
      requiredFields.push(selectedCode);
    }
    const filledFields = requiredFields.filter(
      (value) => value !== "" && value !== null,
    ).length;

    const totalFields = isOpen && activeButtonIndex === 0 ? 8 : 8;

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
          categoryId: null,
          subCategoryId: null,
          negotiable: false,
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
                    Write a short title that accurately describes your service.{" "}<span className="text-[#ff0000] font-extrabold">*</span>
                  </label>
                  <input
                    type="text"
                    name="listingTitle"
                    value={task.listingTitle}
                    onChange={handleChange}
                    placeholder="Casual Babysitting"
                    className={`rounded-2xl bg-[#EBE9F4] p-3 text-[13px] placeholder:font-satoshiMedium placeholder:font-medium placeholder:text-status-darkpurple ${errors.lisitingTitle ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}
                  />
                </div>
                <div className="relative grid space-y-4">
                  <label className="font-semibold">
                    Choose the best category for your listing.{" "}<span className="text-[#ff0000] font-extrabold">*</span>
                  </label>
                  <Dropdown
                    trigger={() => (
                      <div className={`flex h-full w-full cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] ${errors.category ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}>
                        <h2 className="font-satoshiMedium">
                          {selectedCategoryName}
                        </h2>
                        <FaSortDown />
                      </div>
                    )}
                    className="left-0 right-0 top-14 mx-auto bg-white small-scrollbar transition-all duration-300 max-h-64 overflow-y-auto"
                  >
                    {items.map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        value={item.id}
                        className="block p-2 text-[12px] text-[#221354] font-satoshiMedium"
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
                <div className="relative grid space-y-4">
                  <label className="font-bold">Choose a subcategory. <span className="text-[#ff0000] font-extrabold">*</span></label>
                  <Dropdown
                    trigger={() => (
                      <div className={`flex h-full w-full cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] ${errors.subCategory ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}>
                        <h2>{selectedSubCategoryName}</h2>
                        <FaSortDown />
                      </div>
                    )}
                    className="left-0 right-0 top-14 mx-auto bg-white small-scrollbar transition-all duration-300 max-h-64 overflow-y-auto"
                  >
                    {subcategories.map((subcategory) => (
                      <button
                        type="button"
                        key={subcategory.id}
                        value={subcategory.id}
                        className="block p-2 text-[12px] text-[#221354] font-satoshiMedium"
                        onClick={() => {
                          handleSubCategoryChange(subcategory.id);
                          setSelectedSubCategoryName(subcategory.name);
                        }}
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </Dropdown>
                </div>

                <div className="lg:hidden">
                  {/* @ts-ignore */}
                  <AiDesciption
                    setTask={setTask}
                    task={task}
                    displayType={"card"}
                  />
                </div>
                <div className="grid space-y-3">
                  <label className="font-semibold">
                    Please give a detailed description of the service <span className="text-[#ff0000] font-extrabold">*</span>
                  </label>
                  <textarea
                    className={` h-[350px] rounded-2xl bg-[#EBE9F4] p-3 placeholder:font-medium placeholder:text-status-darkpurple ${errors.description ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}
                    placeholder="Casual Babysitting"
                    name="description"
                    value={task.listingDescription}
                    onChange={(e) =>
                      setTask({ ...task, listingDescription: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="!mt-[-1px]">
                  <AiDesciption
                    setTask={setTask}
                    task={task}
                    displayType={"text"}
                  />
                </div>
                <div className="text-red-600">
                  {errors.lisitingTitle|| errors.listingDescription|| errors.category || errors.subCategory}
                </div>
                <Button className="rounded-3xl" type="submit">
                  Next
                </Button>
              </form>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="mb-10 space-y-10 lg:w-[470px]">
            <form
              onSubmit={nextPages}
              className="space-y-10 font-satoshi font-medium "
            >
              <div className="space-y-4">
                <h2 className="font-bold">Choose the pricing plans. <span className="text-[#ff0000] font-extrabold">*</span></h2>
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="check"
                      checked={negotiable}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <span className="text-[#381F8C]">
                      Payment plans are negotiable
                    </span>
                  </div>
                </div>
                <div className="relative grid space-y-4 text-[13px] text-[#221354]">
                  <input
                    className={`rounded-2xl ${activePlanIndex === 0
                      ? " disabled bg-transparent p-1 text-lg font-bold text-status-darkViolet"
                      : "bg-[#EBE9F4] p-4 hover:bg-status-darkViolet hover:text-white "
                      } cursor-pointer text-left outline-none placeholder:font-satoshiMedium placeholder:font-medium placeholder:text-[#2A1769] hover:placeholder:text-white `}
                    name="physical"
                    onClick={() => handlePlan(0)}
                    placeholder="Plan 1"
                    value="Plan 1"
                    readOnly
                  />
                  {isOpen && activePlanIndex === 0 && (
                    <div className="space-y-3">
                      <label className="font-semibold">
                        Give Details about everything this plan includes
                      </label>
                      <div className="grid space-y-3 rounded-2xl border-2 pb-5">
                        <textarea
                          className={`h-[200px] rounded-2xl bg-[#EBE9F4] p-3 font-satoshiMedium placeholder:font-satoshiMedium placeholder:font-semibold  ${error.planDetails ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}
                          placeholder="Casual Babysitting"
                          name="planOneDescription"
                          value={task.planOneDescription}
                          onChange={handleChange}
                        ></textarea>
                        <label className="pl-2 font-satoshiMedium">Price</label>
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
                            className={`w-1/3 rounded-2xl bg-[#EBE9F4] p-3 pl-5 font-satoshiMedium text-[13px]  ${error.price ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}
                          />
                          <p className="absolute left-3 top-3">$</p>
                          <p className="font-extraBold text-xs text-[#140B31]">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    className={`rounded-2xl ${activePlanIndex === 1
                      ? " disabled bg-transparent p-1 text-lg font-bold text-status-darkViolet"
                      : "bg-[#EBE9F4] p-4 hover:bg-status-darkViolet hover:text-white"
                      } cursor-pointer text-left outline-none placeholder:font-satoshiMedium placeholder:font-medium placeholder:text-[#2A1769] hover:placeholder:text-white`}
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
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 font-satoshiMedium outline-none placeholder:font-satoshiMedium placeholder:font-medium"
                          placeholder="Casual Babysitting"
                          name="planTwoDescription"
                          value={task.planTwoDescription}
                          onChange={handleChange}
                        ></textarea>
                        <label className="pl-2 font-bold">Price</label>
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
                            className="w-1/3 rounded-2xl bg-[#EBE9F4] p-3 pl-5 font-satoshiMedium text-[13px] outline-none"
                          />
                          <p className="absolute left-3 top-3">$</p>
                          <p className="font-extraBold text-xs text-[#140B31]">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    className={`rounded-2xl ${activePlanIndex === 2
                      ? " disabled bg-transparent p-1 text-lg font-bold text-status-darkViolet"
                      : "bg-[#EBE9F4] p-4 hover:bg-status-darkViolet hover:text-white"
                      } cursor-pointer text-left outline-none placeholder:font-satoshiMedium placeholder:font-medium placeholder:text-[#2A1769] hover:placeholder:text-white`}
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
                          className="h-[200px] rounded-2xl bg-[#EBE9F4] p-3 font-satoshiMedium outline-none placeholder:font-satoshiMedium placeholder:font-medium"
                          placeholder="Casual Babysitting"
                          name="planThreeDescription"
                          value={task.planThreeDescription}
                          onChange={handleChange}
                        ></textarea>
                        <label className="pl-2 font-bold">Price</label>
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
                            className="w-1/3 rounded-2xl bg-[#EBE9F4] p-3 pl-5 font-satoshiMedium text-[13px] outline-none"
                          />
                          <p className="absolute left-3 top-3">$</p>
                          <p className="font-extraBold text-xs text-[#140B31]">
                            Minimum AUD$25 + 10% GST inclusive
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="font-satoshiMedium text-xl font-bold">
                  Type of Service <span className="text-[#ff0000] font-extrabold">*</span>
                </h2>
                <div className="flex space-x-4 text-[13px] text-[#221354]">
                  <input
                    className={`rounded-2xl p-2 ${activeButtonIndex === 0
                      ? "bg-status-purpleBase text-white"
                      : "bg-[#EBE9F4] placeholder:text-white hover:bg-status-purpleBase hover:text-white"
                      } cursor-pointer outline-none placeholder:font-satoshiMedium placeholder:font-bold`}
                    name="physical"
                    onClick={() => handleClick(0)}
                    placeholder="Physical Services"
                    value="Physical Services"
                    readOnly
                  />
                  <input
                    className={`rounded-2xl p-2 ${activeButtonIndex === 1
                      ? "bg-status-purpleBase text-white"
                      : "bg-[#EBE9F4] placeholder:text-white hover:bg-status-purpleBase hover:text-white "
                      } cursor-pointer outline-none placeholder:font-satoshiMedium placeholder:font-bold`}
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
                  className="rounded-2xl bg-[#EBE9F4] p-3 font-satoshiMedium "
                />
              )}
              {isOpen && activeButtonIndex === 0 && (
                <div className="flex flex-col font-satoshiMedium font-medium text-status-darkpurple lg:flex-row lg:space-x-3">
                  <div className="flex space-x-4 lg:justify-normal">
                    <div className="grid space-y-4">
                      <label>Postal code <span className="text-[#ff0000] font-extrabold">*</span></label>
                      <input
                        value={selectedCode}
                        onChange={handleCode}
                        name="postalCode"
                        className={`w-[155px] cursor-pointer rounded-2xl bg-[#EBE9F4]  p-3 text-[13px] placeholder:font-bold sm:w-[200px]  lg:w-[140px] ${error.postalCode ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}
                      />
                    </div>

                    <div className="relative grid space-y-4">
                      <label>Suburb <span className="text-[#ff0000] font-extrabold">*</span></label>
                      <Dropdown
                        trigger={() => (
                          <div className={`flex h-full w-[150px] cursor-pointer appearance-none font-satoshi font-light justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] ${error.city ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}>
                            <h2>{selectedCity}</h2>
                            <FaSortDown />
                          </div>
                        )}
                        className="left-0 right-0 top-14 mx-auto bg-white small-scrollbar transition-all duration-300 max-h-64 overflow-y-auto"
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
                      className=" cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-sm outline-none lg:w-[145px]"
                    />
                  </div>
                </div>
              )}
              <div className="text-[#FF0000]">
                {error.planDetails|| error.price|| error.postalCode|| error.city }
              </div>
              <div className="flex justify-between">
                <Button
                  className="rounded-3xl"
                  type="button"
                  theme="outline"
                  onClick={prevPage}
                >
                  Back
                </Button>
                <Button className="rounded-3xl" type="submit">
                  Next
                </Button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="xs:w-[500px] mb-10 space-y-10 font-bold text-status-darkpurple lg:w-[700px]">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative mt-2">
                <Dropdown
                  trigger={() => (
                    <div className={`flex justify-between items-center h-10 w-full rounded-2xl border border-tc-gray bg-[#EBE9F4] px-3 py-1 text-[14px] outline-none lg:w-1/2 ${err.availableDays ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-none"}`}>
                      <h2>Available Days <span className="text-[#ff0000] font-extrabold">*</span></h2>
                      <FaSortDown />
                    </div>
                  )}
                  className="left-0 right-full top-14 mx-auto bg-white w-1/2"
                >
                  {daysOfWeek.map((day) => (
                    <button type="button" key={day.value} value={day.value} onClick={() => { handleTickChange(day.value) }} className="block p-2 text-[12px] text-[#221354]">
                      {day.label}
                    </button>
                  ))}
                </Dropdown>
                <div className="mt-4 rounded-2xl lg:w-2/3">
                  <ul className="flex flex-wrap gap-2">
                    {selectedDays.map((day) => (
                      <li
                        key={day}
                        className="relative h-[40px] w-[105px] rounded-3xl border-2 border-[#FE9B07] bg-[#FFF0DA] p-3 text-center text-[12px] text-[#fe9b07]"
                        style={{ textTransform: "capitalize" }}
                      >
                        {day.toLowerCase()}
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
                  seen by customers <span className="text-[#ff0000] font-extrabold">*</span>
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
                      className={`flex h-48 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 lg:w-2/5  ${err.image ? "outline-[#FF0000] border border-[#ff0000]" : "outline-none border-2 border-[#EBE9F4]"}`}
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
                <p>Add a portfolio (Images /videos)</p>
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
              <div className="text-red-600">
                {err.image|| err.availableDays}
              </div>
              <div className="flex justify-between">
                <Button
                  className="rounded-3xl"
                  theme="outline"
                  type="button"
                  onClick={prevPage}
                >
                  Back
                </Button>
                <Button className="rounded-3xl" type="submit">
                  Post Listing
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
    <div className="mt-24 flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>TaskHub | Provide Service</title>
      </Head>
      <div className="w-full">
        <div className="fixed top-20 left-0 w-full bg-white shadow-md z-10 border-t-2">
          <div className="mb-3 flex justify-center font-bold md:space-x-5 pt-4">
            <div
              className={`${currentPage === 1
                ? "text-status-purpleBase"
                : "text-status-purpleBase"
                }`}
            >
              <p className="flex items-center  text-[12px] md:text-[16px] lg:gap-3">
                <span
                  className={`${currentPage === 1
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
              className={`${currentPage === 2 || currentPage === 3
                ? "text-status-purpleBase"
                : " text-[#716F78]"
                }`}
            >
              <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
                <span
                  className={`${currentPage === 2 || currentPage === 3
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
              className={`${currentPage === 3 ? "text-status-purpleBase" : " text-[#716F78]"
                }`}
            >
              <p className="flex items-center gap-2 text-[12px] md:text-[16px] lg:gap-3">
                <span
                  className={`${currentPage === 3
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
          <div className="flex justify-center pb-4">
            <div
              className="container flex w-80 items-center justify-center space-x-5 border-2 border-[#EAE9EB] p-3 lg:w-2/3"
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
        </div>
        <div className="pt-24">
        <div className="mt-8 lg:flex">
          {currentPage === 1 && (
            <div className="mr-[50px] hidden lg:ml-[10%] lg:block lg:w-[390px] xl:ml-[15%] ">
              {/* @ts-ignore */}
              <AiDesciption
                setTask={setTask}
                task={task}
                displayType={"card"}
              />
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
        </div>
      <div>
        {isAuthenticated ? (
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
              <div className="relative grid items-center justify-center space-y-3">
                <div className="flex justify-center text-[1px] text-white">
                  <GrFormCheckmark className="h-[50px] w-[50px] rounded-full bg-[#FE9B07] p-2 lg:h-[60px] lg:w-[60px]" />
                </div>
                <p className=" text-center font-clashBold text-[32px] font-extrabold text-[#2A1769] lg:text-[42px]">
                  Service created
                </p>
                <p className="text-center font-satoshiMedium lg:text-[20px]">
                  Your Service Listing has been created!
                  <br /> please click on the button to proceed to <br />{" "}
                  marketplace
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
    </div>
  );
};

export default ProvideService;
