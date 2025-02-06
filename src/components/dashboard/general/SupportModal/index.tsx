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
      <form onSubmit={handleFormSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
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
            <h2 className="text-lg font-bold text-primary">Help Center</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>
          <p className="font-bold mb-4">We are here to make your journey easy and simple</p>

          {/* Contact Section */}
          <div className="flex justify-between items-center mt-8">
            {/* Call Us Section */}
            <div className="flex items-center space-x-2">
              <svg
                width="36"
                height="37"
                viewBox="0 0 36 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.30779 2.23041L8.62014 0.542947C9.41465 0.360138 10.2303 0.774973 10.5537 1.52027L13.9286 9.3951C14.2239 10.0842 14.0271 10.8927 13.4435 11.3638L9.18263 14.8512C11.7138 20.2441 16.1364 24.7299 21.6417 27.3104L25.1292 23.0495C25.6073 22.4659 26.4088 22.2691 27.0979 22.5644L34.9727 25.9393C35.7251 26.2697 36.1399 27.0854 35.9571 27.8799L34.2696 35.1922C34.0938 35.9516 33.4189 36.5 32.6243 36.5C14.6177 36.5 0 21.9105 0 3.87569C0 3.08821 0.541397 2.40619 1.30779 2.23041Z"
                  fill="#FE9B07"
                />
              </svg>

              <div className="flex flex-col">
              <span className="text-sm text-primary font-bold">Call Us</span>
                <a
                href="tel:+61426131854"
                className="text-sm text-primary font-bold hover:underline"
                >
                (+61) 426131854
                </a>
              </div>
            </div>

            {/* Email Us Section */}
            <div className="flex items-center space-x-2">
              <svg
                width="41"
                height="33"
                viewBox="0 0 41 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40.2232 11.0667C40.5355 10.8083 41 11.05 41 11.4583V28.5C41 30.7083 39.2783 32.5 37.1562 32.5H3.84375C1.72168 32.5 0 30.7083 0 28.5V11.4667C0 11.05 0.456445 10.8167 0.776758 11.075C2.57051 12.525 4.94883 14.3667 13.1168 20.5417C14.8064 21.825 17.6572 24.525 20.5 24.5083C23.3588 24.5333 26.2656 21.775 27.8912 20.5417C36.0592 14.3667 38.4295 12.5167 40.2232 11.0667ZM20.5 21.8333C22.3578 21.8667 25.0324 19.4 26.3777 18.3833C37.0041 10.3583 37.8129 9.65833 40.2633 7.65833C40.7277 7.28333 41 6.7 41 6.08333V4.5C41 2.29167 39.2783 0.5 37.1562 0.5H3.84375C1.72168 0.5 0 2.29167 0 4.5V6.08333C0 6.7 0.272266 7.275 0.736719 7.65833C3.18711 9.65 3.9959 10.3583 14.6223 18.3833C15.9676 19.4 18.6422 21.8667 20.5 21.8333Z"
                  fill="#FE9B07"
                />
              </svg>
              <div className="flex flex-col">
              <span className="text-sm text-primary font-bold">Email Us @:</span>
                <a
                href="mailto:olojahub@jacinthsolutions.com.au"
                className="text-sm text-primary font-bold hover:underline"
                >
                olojahub@jacinthsolutions.com.au
                </a>
              </div>
            </div>
          </div>

          {/* Subject Dropdown (Inline Label) */}
          <div className="mt-4 flex items-center space-x-3">
            <label className="text-sm font-bold text-primary w-[120px]">
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
              className="block flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categoriesData.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.subjectCategoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field (Inline Label) */}
          <div className="mt-4 flex items-center space-x-3">
            <label className="text-sm font-bold text-primary w-[120px]">
              Message:
            </label>
            <textarea
              className="block flex-1 border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex justify-center">
            <Button
              type="submit"
              className="w-[150px] font-medium py-4 text-lg rounded-full"
            >
              Submit
            </Button>
          </div>

          {/* Error Message (optional location) */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
          )}
        </div>
      </form>
    </section>
  );
};

export default ContactSupportModal;
