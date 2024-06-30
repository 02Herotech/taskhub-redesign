"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import icon1 from "../../../../public/assets/images/serviceProvider/AiButton.png";
import icon2 from "../../../../public/assets/images/serviceProvider/AiButton2.png";
import aiLine from "../../../../public/assets/images/serviceProvider/AiLine.svg";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
interface Message {
  id: number;
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
  displayType: String;
}

const AiDesciption: React.FC<AiGenerateProps> = ({
  task,
  setTask,
  displayType,
}) => {
  const session = useSession();
  const userName = session?.data?.user?.user?.firstName;

  const [aiQuery, setAiQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [isNewQuery, setIsNewQuery] = useState(false);
  const generateId = () => Date.now() + Math.random();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAiQuery(event.target.value);
    setCurrentQuery(event.target.value);
    adjustTextareaHeight();
  };

  const [aiChatView, showAiChatView] = useState(false);
  const AiChatView = () => {
    showAiChatView(!aiChatView);
    setIsNewQuery(false);
  };

  const [conversation, setConversation] = useState<Message[]>([]);
  const [AiLoading, setAiLoading] = useState(false);
  const [emptyQuerryField, setEmptyQuerryField] = useState(false);

  const handleAiChatQuery = async (e: any) => {
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
      { id: generateId(), type: "user", text: aiQuery },
    ];
    setConversation(newConversation);
    setIsNewQuery(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(aiQuery)}`;
      const response = await axios.get(url);
      const data = await response.data[0]?.message?.content;
      setConversation([
        ...newConversation,
        { id: generateId(), type: "ai", text: data },
      ]);
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
    setIsNewQuery(false);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(currentQuery)}`;
      const response = await axios.get(url);
      const data = await response.data[0]?.message?.content;
      const newConversation: Message[] = [
        ...conversation,
        { id: generateId(), type: "ai", text: data },
      ];
      setConversation(newConversation);
      setIsNewQuery(true);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const AiSuggestions = [
    "Give a service description for a makeup artist that does sfx makeup.",
    "Give a service description for an event planner with 2 years experience who specializes in kids parties.",
  ];

  const getAiSuggestions = async (index: number) => {
    setAiLoading(true);
    setCurrentQuery(AiSuggestions[index]);
    setIsNewQuery(true);
    const newConversation: Message[] = [
      ...conversation,
      { id: generateId(), type: "user", text: AiSuggestions[index] },
    ];
    setConversation(newConversation);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(AiSuggestions[index])}`;
      const response = await axios.get(url);
      const data = await response.data[0]?.message?.content;
      setConversation([
        ...newConversation,
        { id: generateId(), type: "ai", text: data },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setAiQuery("");
      setAiLoading(false);
    }
  };

  const [animationFinished, setAnimationFinished] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    if (isNewQuery && conversation.length > 0) {
      const lastMessage = conversation[conversation.length - 1];
      if (lastMessage.type === "ai") {
        const textLength = lastMessage.text.length;
        const animationSpeed = 34;
        const animationDuration = textLength * animationSpeed;

        setTimeout(() => {
          setAnimationFinished((prev) => ({ ...prev, [lastMessage.id]: true }));
        }, animationDuration);
      }
    }
  }, [isNewQuery, conversation]);


  useEffect(() => {
    if (aiChatView) {
      document.body.classList.add("no-AiScroll");
    } else {
      document.body.classList.remove("no-AiScroll");
    }
  }, [aiChatView]);

  // To increase height of text area based on what is being typed
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialContainerHeight, setInitialContainerHeight] = useState<number | null>(null);


  // const adjustTextareaHeight = () => {
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = "auto";
  //     textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
  //   }
  //   if (containerRef.current && textareaRef.current) {
  //     if (initialContainerHeight === null) {
  //       setInitialContainerHeight(containerRef.current.clientHeight);
  //     }
  //     const newContainerHeight = initialContainerHeight! + Math.min(textareaRef.current.scrollHeight, 100);
  //     containerRef.current.style.height = `${newContainerHeight}px`;
  //     containerRef.current.scrollTop = containerRef.current.scrollHeight;
  //   }
  // };


  const adjustTextareaHeight = () => {
    // console.log(textareaRef.current.style.height)
    if (textareaRef.current && containerRef.current) {
      textareaRef.current.style.height = "auto";
      const newTextareaHeight = Math.min(
        textareaRef.current.scrollHeight,
        window.innerWidth < 1024 ? 72 : 96
      );
      textareaRef.current.style.height = `${newTextareaHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [aiQuery]);


  return (
    <div>
      {displayType === "card" ? (
        <div className="relative overflow-hidden ">
          <div className=" mb-5 flex flex-col space-y-6 rounded-[20px] bg-[#381F8C] p-4">
            <h2 className="text-lg font-extrabold text-white">
              Get personalized AI help
            </h2>
            <p className="text-white">
              Recommended for you, Get an automated content prompt for your
              service description by clicking on{" "}
              <span className="text-[#FE9B07]">Generate with AI</span> button.
            </p>
            <span>
              <button
                onClick={AiChatView}
                type="button"
                className={` z-10 flex w-[200px] transform items-center  space-x-4 rounded-[20px] bg-[#FE9B07] p-2 px-3 text-white transition-transform duration-300 ease-in-out hover:scale-105`}
              >
                <span className="mr-2">
                  <Image alt="" src={icon1} width={30} height={30} />
                </span>
                Generate with AI
              </button>{" "}
            </span>
          </div>
          <div className="hidden lg:block absolute right-2 top-[20%] h-full w-[20%] ">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="absolute bottom-0 right-0 h-[200px] w-[1px] bg-white"
                style={{
                  transform: `rotate(45deg) translate(${index * 10}px, ${index * 10}px)`,
                  opacity: 0.5,
                }}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={AiChatView}
          type="button"
          className={` flex transform items-center
       space-x-4 border-none bg-none font-satoshiBold font-extrabold text-primary transition-transform  duration-300 ease-in-out hover:scale-105`}
        >
          Generate with AI
          <span className="ml-2">
            <Image alt="" src={icon2} width={20} height={20} />
          </span>
        </button>
      )}

      {aiChatView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 lg:py-2 py-1">
          <div ref={containerRef} className="mx-auto  h-[100%] w-[90%] rounded-[16px] bg-[#FFFFFF] lg:p-10 lg:pt-7 p-5  text-white md:w-[60%] lg:w-[50%]">
            <div className=" flex justify-end">
              <div
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#EBE9F4] hover:cursor-pointer"
                onClick={AiChatView}
              >
                <IoCloseCircleOutline color="#4E5158" size={20} className="" />
              </div>
            </div>
            <div>
              <h2 className="font-clashBold text-[25px] text-primary lg:text-[35px]">
                Hello, {userName}
              </h2>
              <p className="pb-3 font-clashMedium text-[16px] text-[#716F78]">
                Here are some suggested questions you can ask me?
              </p>
            </div>

            <div className="conversation lg:h-[60%] h-[55%] space-y-4 overflow-y-scroll">
              {conversation.length === 0 && (
                <div className="mx-auto w-full justify-between space-y-3 lg:flex lg:space-y-0">
                  {AiSuggestions.map((entry, index) => (
                    <p
                      key={index}
                      className="mr-[5%] rounded-[13px] border border-primary bg-white p-2 font-satoshiMedium text-[14px] text-primary transition-all  duration-500 hover:translate-x-1 hover:translate-y-1 hover:transform hover:cursor-pointer lg:w-[49%] "
                      onClick={() => getAiSuggestions(index)}
                    >
                      {entry}
                    </p>
                  ))}
                </div>
              )}

              {conversation.map((entry, index) => (
                <div key={index}>
                  {entry.type === "user" && (
                    <div className="flex justify-end">
                      <p className="mr-[5%] rounded-[14px] bg-primary p-2 text-[16px] text-[#ffffff] w-[85%] lg:w-[50%] break-words">
                        {entry.text}
                      </p>
                    </div>
                  )}

                  {entry.type === "ai" && index < conversation.length - 1 && (
                    <div className="flex gap-2">
                      <span className="ml-2 mt-1">
                        <Image alt="" src={icon2} width={20} height={20} />
                      </span>
                      <p className="w-[85%] font-satoshiMedium text-primary">
                        {" "}
                        {entry.text}
                      </p>
                    </div>
                  )}

                  {entry.type === "ai" && index === conversation.length - 1 && (
                    <div className="flex gap-2">
                      <span className="ml-2 mt-1">
                        <Image alt="" src={icon2} width={20} height={20} />
                      </span>
                      <p className="w-[85%] font-satoshiMedium text-primary">
                        {isNewQuery ? (
                          <TypeAnimation
                            sequence={[entry.text]}
                            speed={70}
                            wrapper="span"
                            style={{ fontSize: "16px", margin: "0" }}
                            repeat={0}
                            cursor={false}
                          />
                        ) : (
                          entry.text
                        )}
                      </p>
                    </div>
                  )}

                  {animationFinished[entry.id] && (
                    <p
                      className={`mt-6 ${entry.type === "user" ? "hidden" : "my-2 w-full"}`}
                    >
                      <span className="font-satoshi text-[15px] font-bold text-primary">
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
                        className="font-satoshi text-[12px] font-bold text-primary underline hover:cursor-pointer"
                      >
                        or get more suggestions
                      </span>
                    </p>
                  )}
                  <div ref={conversationEndRef} />
                </div>
              ))}
              <div ref={conversationEndRef} />
            </div>

            <p className="h-[15px] mb-1 ">
              {AiLoading ? (
                <BeatLoader className="text-primary" size={12} />
              ) : (
                ""
              )}
            </p>

            <form className="flex items-center pt-2 rounded-[20px] lg:px-4 px-2 font-medium border-[2px] border-primary ">
              <textarea
                name="aiQuery"
                placeholder="Enter a request here"
                onChange={handleInputChange}
                value={aiQuery}
                className="w-full text-wrap bg-transparent px-2 text-[16px] font-normal overflow-auto text-primary border-none outline-none"
                required
                ref={textareaRef}
              />
              <div
                className=""
                onClick={handleAiChatQuery}
              >
                <BiSend
                  size={26}
                  className="transform text-primary ease-in-out hover:scale-110 hover:cursor-pointer"
                />
              </div>
            </form>
            {emptyQuerryField && (
              <span className="pt-1">

                <p className="font-clashDisplay text-center lg:text-lg text-xs text-red-500">
                  Kindly enter your request
                </p>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiDesciption;
