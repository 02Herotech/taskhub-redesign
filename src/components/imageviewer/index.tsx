"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

import Image from "next/image"
import { RiCloseCircleLine } from "react-icons/ri"

interface ImageViewerProps {
  src: string
  alt?: string
  thumbnailWidth?: number
  thumbnailHeight?: number
}

export default function ImageViewer({
  src,
  alt = "Image",
  thumbnailWidth = 400,
  thumbnailHeight = 300,
}: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const viewerRef = useRef<HTMLDivElement>(null)

  // Handle escape key to close the viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent scrolling when viewer is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close when clicking outside the image
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (viewerRef.current && e.target === viewerRef.current) {
      setIsOpen(false)
    }
  }

  const openViewer = () => {
    setIsOpen(true)
    setIsLoaded(false)
  }

  const closeViewer = () => {
    setIsOpen(false)
  }

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <>
      {/* Thumbnail */}
      <div className="cursor-pointer overflow-hidden rounded-lg" onClick={openViewer}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={thumbnailWidth}
          height={thumbnailHeight}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          ref={viewerRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-300"
          onClick={handleBackdropClick}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg">
            {/* Image */}
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={2400}
              height={2400}
              className={`h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
                }`}
              onLoad={handleImageLoad}
              priority
            />

            {/* Close button */}
            <button
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              onClick={closeViewer}
              aria-label="Close image viewer"
            >
              <RiCloseCircleLine className="h-5 w-5" />
              {/* <X className="h-5 w-5" /> */}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
