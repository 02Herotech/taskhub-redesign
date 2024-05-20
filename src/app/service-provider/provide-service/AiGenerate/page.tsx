import Button from '@/components/global/Button';
import axios from 'axios';
import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';

interface AiGenerateProps {
    subCategory: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AiGeneratedDesc: React.FC<AiGenerateProps> = ({ subCategory, handleChange }) => {
    const [showAiInput, setShowAiInput] = useState(false)
    const toggleAiInput = () => {
        setShowAiInput(true)
    }

    const [aiQuery, setAiQuery] = useState('')
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setAiQuery(event.target.value);
        console.log(aiQuery)
    };


    const [AiLoading, setAiLoading] = useState(false);
    const [subCategoryErr, setSubCategoryErr] = useState(false)

    const AiGenerate = async () => {
        setAiLoading(true);
        // if (selectedSubCategory === '') {
        //   setSubCategoryErr(true)
        //   setAiLoading(false);
        //   return
        // } else {
        //   setSubCategoryErr(false)
        // }
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/create-listing/category/content-generate?category=${encodeURIComponent(selectedSubCategory)}`;
            const response = await axios.get(
                url
            );
            if (response.status === 201) {
                const aiGeneratedDescription = response.data;

                // setTask({ ...task, 'serviceDetails': aiGeneratedDescription });
                // setAiLoading(false);
                // setTask({ ...task, 'serviceDetails': '' });
                // TypingEffect(aiGeneratedDescription)

            }
            if (response.status === 400) {
            }
        }
        catch (err: any) { } finally {
            setAiLoading(false);
        }
    };



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
                    <button
                        onClick={toggleAiInput} type="button"
                        className={` text-10px p-2 px-4 transition-transform duration-300  w-[160px]
       ease-in-out transform hover:scale-110 bg-[#333236] text-white rounded-[20px]
      `}
                    >
                        Generate with AI
                    </button> </span>
            </div>

            {showAiInput && (<div className="bg-[#2A1769] font-medium min-h-[230px] rounded-[20px] p-4">
                <div className='h-[90%]'>
                    <textarea
                        name='aiQuery'
                        placeholder='Give a service description for a makeup artist who only does sfx makeup'
                        onChange={handleInputChange}
                        value={aiQuery}
                        className='text-[24px] font-normal bg-transparent border-none text-white 
                        w-full text-wrap h-[196px]'



                    />
                </div>
                <div className='flex justify-end'>
                    <BiSend color='white' size={26} />
                </div>


            </div>)}



            {/* {subCategoryErr && (<p className="text-red-600 font-medium">
            Kindly choose a subcategory
          </p>)} */}
        </div>
    )
};

export default AiGeneratedDesc;
