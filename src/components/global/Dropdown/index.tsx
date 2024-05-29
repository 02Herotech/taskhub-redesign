import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn, listenForOutsideClicks } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    children: React.ReactNode;
    className?: string;
    trigger?: (showDropdown: boolean) => React.ReactNode;
    position?: "top" | "bottom";
    closeOnClick?: boolean;
    triggerStyle?: "click" | "hover";
    onTrigger?: () => void;
    showDropdown: boolean;
    setShowDropdown: (show: boolean) => void;
};

type DropdownContextType = {
    closeDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const Dropdown = ({
    children,
    className,
    trigger,
    position = "bottom",
    closeOnClick = true,
    triggerStyle = "click",
    onTrigger,
    showDropdown,
    setShowDropdown
}: Props) => {
    const menuRef = useRef(null);
    const [listening, setListening] = useState(false);

    useEffect(
        listenForOutsideClicks(listening, setListening, menuRef, setShowDropdown)
    );

    const closeDropdown = () => setShowDropdown(false);

    return (
        <DropdownContext.Provider value={{ closeDropdown }}>
            <div
                className="relative w-full"
                ref={menuRef}
                onMouseEnter={() => triggerStyle === "hover" && setShowDropdown(true)}
                onMouseLeave={() => triggerStyle === "hover" && setShowDropdown(false)}>
                <div
                    onClick={() => {
                        triggerStyle === "click" && setShowDropdown(!showDropdown);
                        !showDropdown && onTrigger && onTrigger();
                    }}>
                    {trigger && trigger(showDropdown)}
                </div>
                <div>
                    <AnimatePresence>
                        {showDropdown && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className={cn(
                                    "absolute z-[100] drop-shadow-2xl rounded overflow-hidden",
                                    position === "bottom" ? "top-[38px]" : "bottom-[23px]",
                                    className
                                )}>
                                <div>{children}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DropdownContext.Provider>
    );
};

export const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a Dropdown");
    }
    return context;
};

export { DropdownContext };
export default Dropdown;
