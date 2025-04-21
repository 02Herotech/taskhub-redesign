"use client"

import { useState, useRef, useEffect } from "react"
import { CgMoreVertical } from "react-icons/cg"

export default function MoreButtonDropdown({
  dropdownItems,
}: {
  dropdownItems,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} aria-label="More options">
        <CgMoreVertical className="w-10 h-10 p-2 bg-transparent text-[#E58C06] rounded-[50%] bg-[#DECEB5]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 -mt-1 w-52 rounded-lg bg-white shadow-lg z-10 overflow-hidden">
          <div className="p-2 space-y-1.5">
            {dropdownItems.map((item) => (
              <button
                key={item.id}
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left bg-[#EBE9F4] hover:bg-[#e4e0f5] transition-colors"
                onClick={() => {
                  item.onClick()
                  setIsOpen(false)
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3a1f8b]">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-[#3a1f8b] font-medium text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
