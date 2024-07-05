// "use client";

// import React, { useEffect, useState } from "react";
// import { FiCalendar, FiClock } from "react-icons/fi";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaRegEdit } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { dayOfWeekNames, formatAmount, monthNames, suffixes } from "@/lib/utils";
// import { CustomerTasks } from "@/types/services/tasks";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import Popup from "@/components/global/Popup";
// import Button from "@/components/global/Button";
// import { GrFormCheckmark } from "react-icons/gr";
// import Dropdown from "@/components/global/Dropdown";
// import { FaSortDown } from "react-icons/fa6";
// import DatePicker from "react-datepicker";

// interface TaskCardProps {
//     task: CustomerTasks;
// }

// type DropDownItem = {
//     title: string;
//     onClick: () => void;
//     icon?: React.ReactNode;
// };

// interface Item {
//     id: number;
//     categoryName: string;
// }

// interface PostalCodeData {
//     name: string;
//     postcode: string;
//     state: {
//         name: string;
//         abbreviation: string;
//     };
//     locality: string;
// }

// interface CustomInputProps {
//     value?: string;
//     onClick?: () => void;
// }

// const NewTasksCard = ({ task }: TaskCardProps) => {
//     const dateArray = task.createdAt;
//     const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [activeEditModalLink, setActiveEditModalLink] = useState<string>("Task Details");
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//     const [selectedTime, setSelectedTime] = useState<Date | null>(null);
//     const [selectedCode, setSelectedCode] = useState(task.postCode);
//     const [selectedCity, setSelectedCity] = useState(task.state);
//     const { data: session } = useSession();
//     const token = session?.user.accessToken;
//     const [taskData, setTaskData] = useState({
//         taskBriefDescription: task.taskBriefDescription || "",
//         taskImage: task.taskImage || "",
//         taskTime: task.taskTime || "",
//         taskDate: task.taskDate || "",
//         taskType: task.taskType || "",
//         suburb: task.suburb || "",
//         state: task.state || "",
//         postCode: task.postCode || "",
//         customerBudget: task.category.id ? task.category.id : null,
//         termAccepted: false,
//         categoryId: task.category.id ? task.category.id : null,
//         taskDescription: task.taskDescription || "",
//     });
//     const [wordCount, setWordCount] = useState(0);
//     const [error, setError] = useState({ taskBriefDescription: false });
//     const [items, setItems] = useState<Item[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//     const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
//     const [postalCodeData, setPostalCodeData] = useState<PostalCodeData[]>([]);
//     const [termAccepted, setTermAccepted] = useState(false);
//     const [selectedServiceType, setSelectedServiceType] = useState<string>("Physical");

//     const day = date.getDate();
//     const daySuffix = (day === 11 || day === 12 || day === 13) ? "th" : suffixes[day % 10] || suffixes[0];
//     const formattedDate = `On ${dayOfWeekNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}${daySuffix}`;

//     const dropDownItems: DropDownItem[] = [
//         {
//             title: "Edit Task",
//             onClick: () => {
//                 setIsEditModalOpen(true);
//                 setIsDropdownOpen(false);
//             },
//             icon: <FaRegEdit className="text-white size-4" />,
//         },
//     ];

//     const handleChange = (
//         event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     ) => {
//         const wordArray = event.target.value.split(/\s+/).filter(Boolean);
//         if (wordArray.length <= 10) {
//             setTaskData({
//                 ...taskData,
//                 [event.target.name]: event.target.value,
//             });
//             setWordCount(wordArray.length);
//         }
//     };

//     const handleCategoryChange = (id: number) => {
//         setSelectedCategory(id);
//         setTaskData({
//             ...taskData,
//             categoryId: id,
//         });
//     };

//     useEffect(() => {
//         const fetchPostalCodeData = async () => {
//             try {
//                 const response = await axios.get(
//                     `https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=${selectedCode}`,
//                 );
//                 console.log(response.data);
//                 setPostalCodeData(response.data as PostalCodeData[]);
//             } catch (error) {
//                 console.error("Error fetching postal code data:", error);
//                 setPostalCodeData([]);
//             }
//         };

//         if (selectedCode) {
//             fetchPostalCodeData();
//         }
//     }, [selectedCode]);

//     useEffect(() => {
//         const fetchItems = async () => {
//             try {
//                 const response = await axios.get(
//                     "https://smp.jacinthsolutions.com.au/api/v1/util/all-categories",
//                 );
//                 const data: Item[] = response.data;
//                 setItems(data);
//             } catch (error) {
//                 console.error("Error fetching items:", error);
//             }
//         };

//         fetchItems();
//     }, []);

//     const handleDateChange = (date: Date | null) => {
//         setSelectedDate(date);
//         // setAccepted(true);
//     };

//     const handleTimeChange = (time: Date | null) => {
//         setSelectedTime(time);
//         // setAccepted(true);
//     };

//     const formatDateToString = (date: Date | null) => {
//         if (date) {
//             // Formatting the date as "dd-MM-yyyy"
//             const day = String(date.getDate()).padStart(2, "0");
//             const month = String(date.getMonth() + 1).padStart(2, "0");
//             const year = date.getFullYear();
//             return `${day}-${month}-${year}`;
//         }
//         return "";
//     };

//     const formatTimeToString = (time: Date | null) => {
//         if (time) {
//             // Formatting the time as "HH:mm"
//             const hours = String(time.getHours()).padStart(2, "0");
//             const minutes = String(time.getMinutes()).padStart(2, "0");
//             return `${hours}:${minutes}`;
//         }
//         return "";
//     };

//     const dateString = formatDateToString(selectedDate);
//     const timeString = formatTimeToString(selectedTime);

//     const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => (
//         <button
//             className={`flex cursor-pointer justify-between rounded-2xl  bg-[#EBE9F4] px-2 py-1 text-[12px] placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px] border border-tc-gray outline-none"}`}
//             onClick={onClick}
//             type="button"
//         >
//             {value || "Choose Date"} <FaSortDown />
//         </button>
//     );

//     const CustomInputs: React.FC<CustomInputProps> = ({ value, onClick }) => (
//         <button
//             className={`flex cursor-pointer justify-between rounded-2xl bg-[#EBE9F4] px-2 py-1 text-[12px]  placeholder:text-[14px] placeholder:font-bold hover:bg-status-darkpurple hover:text-white lg:w-[150px] lg:text-[14px] border border-tc-gray outline-none"}`}
//             onClick={onClick}
//             type="button"
//         >
//             {value || "Choose Time"} <FaSortDown />
//         </button>
//     );

//     const handleEditTask = async () => {
//         console.log("Edit Task");
//         try {
//             const url =
//                 "https://smp.jacinthsolutions.com.au/api/v1/listing/update-listing/" +
//                 task.id;
//             await axios.patch(url, taskData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             // setShowModal(true);
//         } catch (error: any) {
//             console.log(error.response.data);
//             // setErrorMessage(error.response.data.message);
//         }
//     }

//     return (
//         <>
//             {isEditModalOpen && (
//                 <Popup
//                     isOpen={isEditModalOpen}
//                     popupTitle={(
//                         <div className="flex items-center space-x-2 p-2">
//                             <div className="bg-[#140B31] rounded-full p-2 flex items-center justify-center">
//                                 <FaRegEdit className="text-white size-4" />
//                             </div>
//                             <h3 className="text-[#140B31] text-lg font-bold">Edit Task</h3>
//                         </div>
//                     )}
//                     onClose={() => setIsEditModalOpen(false)}
//                 >
//                     <>
//                         <div className="border-b border-gray-300 w-full" />
//                         <div className="rounded-2xl min-h-[200px] w-full lg:w-[850px] font-satoshi overflow-y-auto">
//                             <div className="flex h-full space-x-3 p-2">
//                                 <div className="border-r-2 border-[#140B31] px-4 space-y-3">
//                                     <div className="cursor-pointer" onClick={() => setActiveEditModalLink("Task Details")}>Task Details</div>
//                                     <div className="cursor-pointer" onClick={() => setActiveEditModalLink("Location")}>Location and Budget</div>
//                                 </div>
//                                 <form onSubmit={handleEditTask} className="flex-1 w-full px-5">
//                                     {activeEditModalLink === "Task Details" && (
//                                         <div className="space-y-8">
//                                             <div className="grid space-y-3">
//                                                 <div className="flex items-center justify-between">
//                                                     <label className="text-[13px] font-semibold text-status-darkpurple lg:text-[16px]">
//                                                         Write a short title for the task you need done{" "}
//                                                         <span className="font-extrabold text-[#ff0000]">*</span>
//                                                     </label>
//                                                     {wordCount > 3 && (
//                                                         <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
//                                                             <GrFormCheckmark />
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <textarea
//                                                     className={`h-full w-full rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB] ${error.taskBriefDescription ? "border border-[#ff0000] outline-[#FF0000]" : "border-none outline-none"}`}
//                                                     placeholder="e.g, I need a junior league coach."
//                                                     name="taskBriefDescription"
//                                                     value={taskData.taskBriefDescription}
//                                                     onChange={handleChange}
//                                                     style={{ resize: "none", overflow: "hidden" }}
//                                                 ></textarea>
//                                                 <div className="text-right text-sm text-status-darkpurple">
//                                                     {wordCount}/10 words
//                                                 </div>
//                                             </div>
//                                             <div className="relative grid space-y-4">
//                                                 <div className="flex items-center justify-between">
//                                                     <label className="text-[13px] font-semibold lg:text-[16px]">
//                                                         What category best describes your task?{" "}
//                                                         <span className="font-extrabold text-[#ff0000]">*</span>
//                                                     </label>
//                                                     {selectedCategory && (
//                                                         <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
//                                                             <GrFormCheckmark />
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <Dropdown
//                                                     trigger={() => (
//                                                         <div
//                                                             className={`flex h-full w-full cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 text-[13px] text-status-darkpurple border-none outline-none"}`}
//                                                         >
//                                                             <h2>{selectedCategoryName}</h2>
//                                                             <FaSortDown className="text-status-darkpurple" />
//                                                         </div>
//                                                     )}
//                                                     className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
//                                                 >
//                                                     {items.map((item) => (
//                                                         <button
//                                                             type="button"
//                                                             key={item.id}
//                                                             value={item.id}
//                                                             className="block p-2 font-satoshiBold text-[12px] font-bold text-[#381F8C]"
//                                                             onClick={() => {
//                                                                 handleCategoryChange(item.id);
//                                                                 setSelectedCategoryName(item.categoryName);
//                                                             }}
//                                                         >
//                                                             {item.categoryName}
//                                                         </button>
//                                                     ))}
//                                                 </Dropdown>
//                                             </div>
//                                             <div className="relative grid space-y-3">
//                                                 <div className="flex items-center justify-between">
//                                                     <label className="flex text-[13px] font-semibold lg:text-[16px]">
//                                                         Give a description of your task {""}{" "}
//                                                         <span className="font-extrabold text-[#ff0000]">*</span>
//                                                     </label>
//                                                     {wordCount > 15 && (
//                                                         <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
//                                                             <GrFormCheckmark />
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <textarea
//                                                     className={` h-[150px] rounded-2xl bg-[#EBE9F4] p-3 placeholder:text-[#C1BADB]  border-none outline-none"}`}
//                                                     placeholder="Arts and Craft"
//                                                     name="description"
//                                                     value={task.taskDescription}
//                                                     onChange={handleChange}
//                                                 ></textarea>
//                                             </div>
//                                             <div className="flex items-center justify-end space-x-3">
//                                                 <Button
//                                                     theme="outline"
//                                                     onClick={() => setIsEditModalOpen(false)}
//                                                     type="button"
//                                                     className="rounded-full px-10"
//                                                 >
//                                                     Back
//                                                 </Button>
//                                                 <Button
//                                                     theme="primary"
//                                                     type="button"
//                                                     onClick={() => setActiveEditModalLink("Location")}
//                                                     className="rounded-full px-10"
//                                                 >
//                                                     Next
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     )}
//                                     {activeEditModalLink === "Location" && (
//                                         <div className="space-y-8">
//                                             <div className="space-y-5 ">
//                                                 <label
//                                                     htmlFor="taskTime"
//                                                     className="test-[20px] font-satoshiBold font-bold text-status-darkpurple"
//                                                 >
//                                                     Set Day and Time{" "}
//                                                     <span className="font-extrabold text-[#ff0000]">*</span>
//                                                 </label>
//                                                 <div className="flex items-center space-x-3">
//                                                     <div className="relative">
//                                                         <DatePicker
//                                                             selected={selectedTime}
//                                                             onChange={handleTimeChange}
//                                                             showTimeSelect
//                                                             showTimeSelectOnly
//                                                             timeFormat="HH:mm"
//                                                             timeIntervals={15}
//                                                             dateFormat="h:mm aa"
//                                                             placeholderText="Choose Time"
//                                                             id="taskTime"
//                                                             name="taskTime"
//                                                             // disabled={termAccepted}
//                                                             customInput={<CustomInputs />}
//                                                             className="w-full cursor-pointer rounded-2xl  bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
//                                                         />
//                                                     </div>
//                                                     <div className="relative">
//                                                         <DatePicker
//                                                             selected={selectedDate}
//                                                             onChange={handleDateChange}
//                                                             dateFormat="dd-MM-yyyy"
//                                                             minDate={new Date()}
//                                                             placeholderText="Choose Date"
//                                                             id="taskDate"
//                                                             name="taskDate"
//                                                             // disabled={termAccepted}
//                                                             customInput={<CustomInput />}
//                                                             className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold "
//                                                         />
//                                                     </div>
//                                                     <div>
//                                                         <div className="flex items-center">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 name="check"
//                                                                 checked={termAccepted}
//                                                                 // disabled={accepted}
//                                                                 // onChange={handleCheckboxChange}
//                                                                 className="mr-2"
//                                                             />
//                                                             <span className="text-[12px] text-status-darkpurple">
//                                                                 I’m Flexible
//                                                             </span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center justify-end space-x-3">
//                                                 <Button
//                                                     theme="outline"
//                                                     onClick={() => setActiveEditModalLink("Task Details")}
//                                                     className="rounded-full px-10"
//                                                     type="button"
//                                                 >
//                                                     Back
//                                                 </Button>
//                                                 <Button
//                                                     theme="primary"
//                                                     type="button"
//                                                     onClick={() => setActiveEditModalLink("Budget")}
//                                                     className="rounded-full px-10"
//                                                 >
//                                                     Next
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     )}
//                                     {activeEditModalLink === "Budget" && (
//                                        <div className="space-y-8">
//                                             <div className="space-y-4">
//                                                 <h2 className="font-satoshiBold text-[13px] font-bold text-status-darkpurple lg:text-[16px]">
//                                                     Type of Service{" "}
//                                                     <span className="font-extrabold text-[#ff0000]">*</span>
//                                                 </h2>
//                                                 <div className="flex space-x-4 text-[13px] text-[#221354]">
//                                                     <button
//                                                         className={`rounded-2xl p-2 ${selectedServiceType === "Physical"
//                                                                 ? "bg-status-purpleBase text-white"
//                                                                 : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
//                                                             } outline-none`}
//                                                         name="physical"
//                                                         onClick={() => setSelectedServiceType("Physical")}
//                                                     >
//                                                         Physical Service
//                                                     </button>
//                                                     <button
//                                                         className={`rounded-2xl p-2 ${selectedServiceType === "Remote"
//                                                                 ? "bg-status-purpleBase text-white"
//                                                                 : "bg-[#EBE9F4] hover:bg-status-purpleBase hover:text-white"
//                                                             } outline-none`}
//                                                         name="remote"
//                                                         onClick={() => setSelectedServiceType("Remote")}
//                                                     >
//                                                         Remote Service
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                             <div className="space-y-5">
//                                                 {selectedServiceType === "Remote" && (
//                                                     <input
//                                                         type="text"
//                                                         name="remote"
//                                                         value="Remote"
//                                                         readOnly
//                                                         className=" rounded-2xl bg-[#EBE9F4] p-3 "
//                                                     />
//                                                 )}
//                                                 {selectedServiceType === "Remote" && (
//                                                     <div className="space-y-10 font-bold text-status-darkpurple ">
//                                                         <div className="flex space-x-4">
//                                                             <div className="grid space-y-4">
//                                                                 <div className="flex items-center justify-between">
//                                                                     <label>
//                                                                         Postal code{" "}
//                                                                         <span className="font-extrabold text-[#ff0000]">
//                                                                             *
//                                                                         </span>
//                                                                     </label>
//                                                                     {selectedCode && (
//                                                                         <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
//                                                                             <GrFormCheckmark />
//                                                                         </div>
//                                                                     )}
//                                                                 </div>
//                                                                 <input
//                                                                     value={selectedCode!}
//                                                                     onChange={handleCode}
//                                                                     name="postCode"
//                                                                     className={`w-[155px] cursor-pointer  rounded-2xl bg-[#EBE9F4] p-3 text-[13px] placeholder:font-bold border border-[#ff0000] outline-[#FF0000]" : "border-none outline-none"}`}
//                                                                 />
//                                                             </div>

//                                                             <div className="grid space-y-4">
//                                                                 <div className="flex items-center justify-between">
//                                                                     <label>
//                                                                         Suburb{" "}
//                                                                         <span className="font-extrabold text-[#ff0000]">
//                                                                             *
//                                                                         </span>
//                                                                     </label>
//                                                                     {selectedCity && (
//                                                                         <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
//                                                                             <GrFormCheckmark />
//                                                                         </div>
//                                                                     )}
//                                                                 </div>
//                                                                 <Dropdown
//                                                                     trigger={() => (
//                                                                         <div
//                                                                             className={`flex h-full w-[150px] cursor-pointer appearance-none justify-between rounded-2xl bg-[#EBE9F4] p-3 font-satoshi text-[13px] font-light border-none outline-none"}`}
//                                                                         >
//                                                                             <h2>{selectedCity}</h2>
//                                                                             <FaSortDown />
//                                                                         </div>
//                                                                     )}
//                                                                     className="small-scrollbar left-0 right-0 top-14 mx-auto max-h-64 overflow-y-auto bg-white transition-all duration-300"
//                                                                 >
//                                                                     {postalCodeData.map((data, index) => (
//                                                                         <button
//                                                                             type="button"
//                                                                             className="block p-2 text-[12px] text-[#221354]"
//                                                                             key={index}
//                                                                             value={data.name}
//                                                                             onClick={() => handleCity(data.name)}
//                                                                         >
//                                                                             {data.name}
//                                                                         </button>
//                                                                     ))}
//                                                                 </Dropdown>
//                                                             </div>
//                                                         </div>
//                                                         <div className="grid space-y-4 ">
//                                                             <label>State/Territory</label>
//                                                             <input
//                                                                 value={
//                                                                     postalCodeData.length > 0
//                                                                         ? postalCodeData[0].state.name
//                                                                         : ""
//                                                                 }
//                                                                 onChange={handleChange}
//                                                                 name="state"
//                                                                 id="state"
//                                                                 disabled
//                                                                 className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] p-3 text-sm outline-none"
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 <div className="relative grid space-y-4 font-bold text-status-darkpurple">
//                                                     <div className="flex items-center justify-between">
//                                                         <label className="text-[13px] lg:text-[16px]">
//                                                             Budget{" "}
//                                                             <span className="font-extrabold text-[#ff0000]">*</span>
//                                                         </label>
//                                                         {task.customerBudget && (
//                                                             <div className="h-[16px] w-[16px] rounded-3xl bg-[#4CAF50] text-[16px] font-extrabold text-white">
//                                                                 <GrFormCheckmark />
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <input
//                                                         type="number"
//                                                         name="customerBudget"
//                                                         onChange={handlePrice}
//                                                         placeholder="500"
//                                                         className={`appearance-none rounded-2xl bg-[#EBE9F4] p-3 pl-6 text-[13px] placeholder:font-bold border-none outline-none"}`}
//                                                     />
//                                                     <p className="absolute left-3 top-8">$</p>
//                                                 </div>
//                                             <div className="flex items-center justify-end space-x-3">
//                                                 <Button
//                                                     theme="outline"
//                                                     onClick={() => setActiveEditModalLink("Location")}
//                                                     className="rounded-full px-10"
//                                                     type="button"
//                                                 >
//                                                     Back
//                                                 </Button>
//                                                 <Button
//                                                     theme="primary"
//                                                     type="submit"
//                                                     className="rounded-full px-10"
//                                                 >
//                                                     Save changes
//                                                 </Button>
//                                             </div>
//                                        </div>
//                                     )}
//                                 </form>
//                             </div>
//                         </div>
//                     </>
//                 </Popup>
//             )}
//             <motion.div
//                 className="lg:rounded-4xl font-satoshi rounded-xl bg-[#EBE9F4] p-4 mb-4 flex flex-col justify-between h-full"
//                 whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
//             >
//                 <div className="flex w-full justify-between items-center space-x-2">
//                     <h2 className="overflow-hidden truncate text-ellipsis whitespace-nowrap py-4 text-xl font-satoshiBold font-bold text-primary lg:text-[30px]">
//                         {task.taskBriefDescription}
//                     </h2>
//                     <div className="relative">
//                         <button
//                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                             className="p-2 flex items-center space-x-3 bg-primary text-white rounded-lg"
//                         >
//                             <BsThreeDotsVertical className="size-4" />
//                         </button>
//                         <div
//                             className={`small-scrollbar right-0 absolute top-[calc(100%+0.2rem)] flex max-h-0 w-[190px] flex-col rounded-md bg-[#EBE9F4] transition-all duration-300 ${isDropdownOpen ? "max-h-64 overflow-y-auto border border-primary" : "max-h-0 overflow-hidden"
//                                 }`}
//                         >
//                             <div className="px-2 py-1">
//                                 {dropDownItems.map((item, index) => (
//                                     <button key={index} onClick={item.onClick} className="flex items-center space-x-3 cursor-pointer">
//                                         <span className="bg-[#140B31] p-1 rounded-full flex items-center justify-center">
//                                             {item.icon}
//                                         </span>
//                                         <span className='text-sm text-[#140B31] font-satoshiMedium'>{item.title}</span>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <p className="text-[#2A1769] text-sm font-satoshiMedium line-clamp-3">{task.taskDescription}</p>
//                 <div className="mt-auto">
//                     <div className="flex justify-between items-center my-2">
//                         <HiOutlineLocationMarker className="h-5 w-5 font-bold text-[#716F78]" />
//                         <div className="flex items-center space-x-2 font-medium text-[#716F78] w-2/3">
//                             <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-[15px] lg:text-lg">
//                                 {task.state || `No location`}
//                             </p>
//                         </div>
//                         <div className="flex items-center space-x-2 font-medium text-[#716F78]">
//                             <FiClock className="h-5 w-5 font-bold" />
//                             <h5 className="text-[15px] lg:text-lg">{task.taskTime || "Flexible"}</h5>
//                         </div>
//                     </div>
//                     <div className="flex justify-between items-end">
//                         <div className="flex items-center space-x-2 font-medium text-[#716F78]">
//                             <FiCalendar className="h-5 w-5 font-bold" />
//                             <h5 className="text-[15px] lg:text-lg">{formattedDate}</h5>
//                         </div>
//                         <h2 className="text-2xl font-bold capitalize text-tc-orange lg:text-[20px]">
//                             {formatAmount(task.customerBudget, "USD", false)}
//                         </h2>
//                     </div>
//                 </div>
//             </motion.div>
//         </>
//     );
// };

// export default NewTasksCard;
