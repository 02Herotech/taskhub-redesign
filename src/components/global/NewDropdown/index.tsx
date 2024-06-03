import React, { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';

type NewDropdownProps = {
    children: React.ReactNode;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
};

const NewDropdown = ({ children, setIsDropdownOpen, name }: NewDropdownProps) => {
    const [isDropdownOpen, setIsDropdownOpenLocal] = useState(false);

    const handleToggleDropdown = () => {
        setIsDropdownOpenLocal(!isDropdownOpen);
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
            <button
                className="w-[170px] border border-primary flex items-center justify-center gap-x-4 rounded-3xl bg-[#F1F1F2] px-4 py-2 text-base font-bold text-[#140B31] transition-colors duration-300"
                onClick={handleToggleDropdown}
            >
                <div
                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen ? 'block' : 'hidden'}`}
                    onClick={handleToggleDropdown}
                ></div>
                <h3 className='text-primary'>{name}</h3>
                <span>
                    <BsTriangleFill
                        fill="#140B31"
                        className="size-2 rotate-[60deg] text-[#140B31]"
                    />
                </span>
            </button>
            <div
                className={`small-scrollbar absolute top-[calc(100%+0.2rem)] flex max-h-0 w-[170px] flex-col rounded-md bg-[#F1F1F2] transition-all duration-300 ${isDropdownOpen ? 'max-h-64 overflow-y-auto' : 'max-h-0 overflow-hidden'
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default NewDropdown;
