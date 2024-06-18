import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
};

type DropdownContextType = {
  closeDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

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
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => setShowDropdown(false);

  const handleChildClick = () => {
    if (closeOnClick) {
      closeDropdown();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, triggerRef]);

  return (
    <DropdownContext.Provider value={{ closeDropdown }}>
      <div className="relative w-full" ref={menuRef}>
        <div
          ref={triggerRef}
          onMouseEnter={() => triggerStyle === "hover" && setShowDropdown(true)}
          onMouseLeave={() => triggerStyle === "hover" && setShowDropdown(false)}
          onClick={() => {
            if (triggerStyle === "click") {
              setShowDropdown((prev) => !prev);
              if (!showDropdown && onTrigger) {
                onTrigger();
              }
            }
          }}
        >
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
                  "absolute z-[100] rounded drop-shadow-2xl",
                  position === "bottom" ? "top-[38px]" : "bottom-[23px]",
                  className,
                )}
                onClick={handleChildClick}
              >
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

export default Dropdown;
