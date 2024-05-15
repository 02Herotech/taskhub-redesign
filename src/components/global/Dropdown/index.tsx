import { cn, listenForOutsideClicks } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
    trigger?: (showDropdown: boolean) => React.ReactNode;
    position?: "top" | "bottom";
    closeOnClick?: boolean;
    triggerStyle?: "click" | "hover";
    onTrigger?: () => void;
};

const Dropdown = ({
    children,
    className,
    trigger,
    position = "bottom",
    closeOnClick = true,
    triggerStyle = "click",
    onTrigger,
}: Props) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const menuRef = useRef(null);

    const [listening, setListening] = useState(false);

    useEffect(
        listenForOutsideClicks(listening, setListening, menuRef, setShowDropdown)
    );

    useEffect(() => {
        const handleClick = () => {
            closeOnClick && setShowDropdown(false);
        };

        const dropdownItems = document.querySelectorAll(".dropdown-item");
        dropdownItems.forEach((item) => {
            item.addEventListener("click", handleClick);
        });

        return () => {
            dropdownItems.forEach((item) => {
                item.removeEventListener("click", handleClick);
            });
        };
    }, [showDropdown]);

    return (
        <div
            className='relative w-full'
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
    );
};

export default Dropdown;
