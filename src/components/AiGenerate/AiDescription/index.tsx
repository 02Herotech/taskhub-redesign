"use client";

import Button from "@/components/global/Button";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import icon3 from "../../../../public/assets/images/serviceProvider/AiButton.jpg";

interface Message {
  type: "user" | "ai";
  text: string;
}

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

interface AiGenerateProps {
  setTask: React.Dispatch<React.SetStateAction<ProvideServiceData>> | any;
  task: ProvideServiceData | any;
}

const AiDesciption: React.FC<AiGenerateProps> = ({ task, setTask }) => {
  const session = useSession();
  const userName = session?.data?.user?.user?.firstName;

  const [aiQuery, setAiQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAiQuery(event.target.value);
    setCurrentQuery(event.target.value);
  };

  const [aiChatView, showAiChatView] = useState(false);
  const AiChatView = () => {
    showAiChatView(!aiChatView);
  };

  const [conversation, setConversation] = useState<Message[]>([]);
  const [AiLoading, setAiLoading] = useState(false);
  const [emptyQuerryField, setEmptyQuerryField] = useState(false);

  const handleAiChatView = async (e: any) => {
    e.preventDefault();
    if (aiQuery === "") {
      setEmptyQuerryField(true);
      return;
    } else {
      setEmptyQuerryField(false);
    }
    setAiLoading(true);
    const newConversation: Message[] = [
      ...conversation,
      { type: "user", text: aiQuery },
    ];
    setConversation(newConversation);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(aiQuery)}`;
      const response = await axios.get(url);
      const data = await response.data[0]?.message?.content;
      setConversation([...newConversation, { type: "ai", text: data }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setAiQuery("");
      setAiLoading(false);
    }
  };

  const conversationEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const setServiceDetails = (index: any) => {
    const description = conversation[index]?.text;
    setTask({ ...task, listingDescription: description });
    AiChatView();
  };

  const getMoreSuggestions = async () => {
    setAiLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(currentQuery)}`;
      const response = await axios.get(url);
      const data = await response.data[0]?.message?.content;
      const newConversation: Message[] = [
        ...conversation,
        { type: "ai", text: data },
      ];
      setConversation(newConversation);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-col space-y-6 rounded-[20px] bg-[#381F8C] p-4">
        <h2 className="text-lg font-extrabold text-white">
          Get personalized AI help
        </h2>
        <p className="text-white">
          Recommended for you , Get an automated content prompt for your service
          description by clicking on{" "}
          <span className="text-[#FE9B07]">Generate with AI</span> button.
        </p>
        <span>
          <button
            onClick={AiChatView}
            type="button"
            className={` text-10px w-[160px] transform rounded-[20px] bg-[#FE9B07]  p-2
       px-4 text-white transition-transform duration-300 ease-in-out hover:scale-110
      `}
          >
            {/* <Image alt='' src={icon3} width={10} height={10}/>  */}
            Generate with AI
          </button>{" "}
        </span>
      </div>

      {aiChatView && (
        <div className="bg-opacity-84 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className=" mx-auto h-[90%] w-[90%] rounded-[16px] bg-[#140B31] p-10 text-white md:w-[60%] lg:w-[50%]">
            <div className=" flex justify-end">
              <div
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:cursor-pointer"
                onClick={AiChatView}
              >
                <IoCloseCircleOutline color="#4E5158" size={20} className="" />
              </div>
            </div>
            <div>
              <h2 className="text-[25px]">Hello, {userName}</h2>
              <p className="pb-3 text-[16px] text-[#716F78]">
                How can I help you?
              </p>
            </div>

            <div className="conversation h-[65%] space-y-4 overflow-y-scroll lg:h-[65%] ">

              <div>
                Hello
              </div>
              {conversation.map((entry, index) => (
                <div key={index}>
                  <div
                    key={index}
                    className={` ${entry.type === "user" ? "flex justify-end" : ""}`}
                  >
                    <p
                      className={` p-2 text-[15px] ${entry.type === "user" ? "mr-[5%] rounded-[12px] bg-white text-[#2A1769] lg:w-[50%] " : "w-[85%]"}`}
                    >
                      {entry.text}
                    </p>
                  </div>

                  <p
                    className={` ${entry.type === "user" ? "hidden" : "my-2"}`}
                  >
                    <span className="text-[15px] font-bold">
                      Are you happy with this suggestion? you can
                    </span>{" "}
                    <span
                      onClick={() => setServiceDetails(index)}
                      className="mt-5 rounded-[20px] bg-[#FE9B07] px-4 py-1 text-[14px] text-white hover:cursor-pointer lg:mt-0 lg:p-2"
                    >
                      USE
                    </span>{" "}
                    <span
                      onClick={getMoreSuggestions}
                      className="text-[12px] underline hover:cursor-pointer"
                    >
                      or get more suggestions
                    </span>
                  </p>
                </div>
              ))}

              <div></div>
              <div ref={conversationEndRef} />
            </div>

            <p className="h-[15px] ">
              {AiLoading ? <BeatLoader color={"white"} size={12} /> : ""}
            </p>
            <div className=" relative  rounded-[20px] px-4 pb-7 pt-2 font-medium lg:pb-2">
              <form onSubmit={handleAiChatView}>
                <textarea
                  name="aiQuery"
                  placeholder="Enter request here"
                  onChange={handleInputChange}
                  value={aiQuery}
                  className="h-[50px] w-full overflow-hidden text-wrap rounded-[12px] border-[2px] 
border-[#716F78] bg-transparent px-3 pt-3 text-[16px] font-normal text-white"
                  required
                />
                <div className="absolute right-[10%] top-[20%] hidden lg:right-[5%] lg:top-[25%]  lg:block ">
                  <button type="submit">
                    {" "}
                    <BiSend
                      color="white"
                      size={26}
                      className="transform ease-in-out hover:scale-110 hover:cursor-pointer"
                    />
                  </button>
                </div>

                <div
                  className="absolute right-[10%] top-[20%] lg:right-[5%] lg:top-[25%]  lg:hidden"
                  onClick={handleAiChatView}
                >
                  <span>
                    <BiSend
                      color="white"
                      size={26}
                      className="transform ease-in-out hover:scale-110 hover:cursor-pointer"
                    />
                  </span>
                </div>
              </form>
              {emptyQuerryField && (
                <p className="text-center font-clashDisplay text-red-500">
                  Kindly enter your request
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiDesciption;
