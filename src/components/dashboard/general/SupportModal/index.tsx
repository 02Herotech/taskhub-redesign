"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import { useSession } from "next-auth/react";
import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";

type Props = {
  onClose: () => void;
};

type Category = {
  id: number;
  subjectCategoryName: string;
};

const ContactSupportModal = ({ onClose }: Props) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const session = useSession();
  const user = session?.data?.user?.user;

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/util/all-subject-categories`
        );
        setCategoriesData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategory) {
      setErrorMessage("Please select a subject category.");
      return;
    }

    if (!message.trim()) {
      setErrorMessage("Please enter a message.");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/util/contact-us`, {
        subjectCategoryId: selectedCategory?.id,
        fullName: user.firstName,
        emailAddress: user.emailAddress,
        message,
      });

        setSuccessMessage("Message sent successfully!");
        setIsPopupOpen(true); // Open the success popup
        setTimeout(() => setIsPopupOpen(false), 3000);
        setErrorMessage("");

      // Optionally reset form fields if needed
      setFullName("");
      setEmailAddress("");
      setMessage("");
      setSelectedCategory(null);

      // Automatically close the modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccessMessage(""); // Clear success message if needed
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
<section className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60">
  <form onSubmit={handleFormSubmit} className="w-full sm:w-[500px] md:w-[550px] lg:w-[600px]">
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full">
      {/* Conditionally show the Popup */}
      {successMessage && (
        <div>
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            // popUpTitle="Success"
          >
            <div className="p-4 text-center">
              <h3 className="text-green-600">{successMessage}</h3>
            </div>
          </Popup>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-lg sm:text-xl font-bold text-primary">Help Center</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          {/* <AiOutlineClose className="w-6 h-6 text-primary" /> */}
          <div className="w-8 h-8 flex items-center justify-center border-2 border-primary rounded-full">
            <AiOutlineClose className="w-6 h-6 text-primary" />
          </div>
        </button>
      </div>
      <p className="font-bold mb-4 text-sm sm:text-base">We are here to make your journey easy and simple</p>

      <div className="mt-7 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
  {/* Call Us Section */}
  <div className="flex items-center space-x-2 sm:ml-0 ml-4">
    <svg width="80" height="61" viewBox="0 0 90 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="88" height="69" rx="6" transform="matrix(-1 0 0 1 89 1)" stroke="#E58C06" stroke-width="2"/>
    <path d="M28.3078 18.2304L35.6201 16.5429C36.4147 16.3601 37.2303 16.775 37.5537 17.5203L40.9286 25.3951C41.2239 26.0842 41.0271 26.8927 40.4435 27.3638L36.1826 30.8512C38.7138 36.2441 43.1364 40.7299 48.6417 43.3104L52.1292 39.0495C52.6073 38.4659 53.4088 38.2691 54.0979 38.5644L61.9727 41.9393C62.7251 42.2697 63.1399 43.0854 62.9571 43.8799L61.2696 51.1922C61.0938 51.9516 60.4189 52.5 59.6243 52.5C41.6177 52.5 27 37.9105 27 19.8757C27 19.0882 27.5414 18.4062 28.3078 18.2304Z" fill="#FE9B07"/>
    </svg>


    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-primary font-bold">Call Us</span>
      <a
        href="tel:+61426131854"
        className="text-xs sm:text-xs text-dark font-bold hover:underline"
      >
        (+61) 426131854
      </a>
    </div>
  </div>

  {/* Email Us Section */}
  <div className="flex items-center space-x-2 sm:ml-0 ml-4">
    <svg width="80" height="61" viewBox="0 0 90 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="88" height="69" rx="6" transform="matrix(-1 0 0 1 89 1)" stroke="#FE9B07" stroke-width="2"/>
    <path d="M65.2232 29.0667C65.5355 28.8083 66 29.05 66 29.4583V46.5C66 48.7083 64.2783 50.5 62.1562 50.5H28.8438C26.7217 50.5 25 48.7083 25 46.5V29.4667C25 29.05 25.4564 28.8167 25.7768 29.075C27.5705 30.525 29.9488 32.3667 38.1168 38.5417C39.8064 39.825 42.6572 42.525 45.5 42.5083C48.3588 42.5333 51.2656 39.775 52.8912 38.5417C61.0592 32.3667 63.4295 30.5167 65.2232 29.0667ZM45.5 39.8333C47.3578 39.8667 50.0324 37.4 51.3777 36.3833C62.0041 28.3583 62.8129 27.6583 65.2633 25.6583C65.7277 25.2833 66 24.7 66 24.0833V22.5C66 20.2917 64.2783 18.5 62.1562 18.5H28.8438C26.7217 18.5 25 20.2917 25 22.5V24.0833C25 24.7 25.2723 25.275 25.7367 25.6583C28.1871 27.65 28.9959 28.3583 39.6223 36.3833C40.9676 37.4 43.6422 39.8667 45.5 39.8333Z" fill="#FE9B07"/>
    </svg>

    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-primary font-bold">Email Us @:</span>
      <a
        href="mailto:olojahub@jacinthsolutions.com.au"
        className="text-xs sm:text-xs text-dark font-bold hover:underline"
      >
        olojahub@jacinthsolutions.com.au
      </a>
    </div>
  </div>
</div>

  <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-3">
    <label className="text-[12px] sm:text-[12px] font-bold text-primary sm:w-[120px]">
      Subject Category:
    </label>
    <select
      value={selectedCategory?.id || ""}
      onChange={(e) => {
        const selected = categoriesData.find(
          (category) => category.id === Number(e.target.value)
        );
        setSelectedCategory(selected || { id: null, subjectCategoryName: "" });
        setIsDropdownOpen(false);
      }}
      className="block sm:flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select a category</option>
      {categoriesData.map((category) => (
        <option key={category.id} value={category.id}>
          {category.subjectCategoryName}
        </option>
      ))}
    </select>
  </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-3">
        <label className="text-[12px] sm:text-[12px] font-bold text-primary sm:w-[120px]">
          Message:
        </label>
        <textarea
          className="block sm:flex-1 border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
        />
      </div>


      <div className="mt-4 flex justify-center">
        <Button
          type="submit"
          className="w-[120px] font-medium py-4 text-lg rounded-full 
                    md:w-[120px] sm:w-[120px] lg:w-[150px] sm:py-3 sm:text-base"
        >
          Submit
        </Button>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
      )}
    </div>
  </form>
</section>

  );
};

export default ContactSupportModal;
