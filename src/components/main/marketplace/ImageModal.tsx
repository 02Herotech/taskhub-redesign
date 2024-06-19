"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface ModalData {
  showImageModal: {
    state: boolean;
    image: string;
  };
  setShowImageModal: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      image: string;
    }>
  >;
}

const ImageModal = ({ showImageModal, setShowImageModal }: ModalData) => {
  const handleCloseModal = () => setShowImageModal({ state: false, image: "" });

  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-all duration-300 ${showImageModal.state ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} overflow-hidden `}
    >
      <div
        className="absolute left-0 top-0 z-0 h-screen w-screen"
        onClick={handleCloseModal}
      ></div>

      <div className="relative z-10 flex max-h-[80vh] min-w-[50vw] max-w-[80vw] flex-col items-center justify-center gap-4 rounded-lg bg-violet-light p-5 ">
        {/* eslint-disable-next-line */}
        <img src={showImageModal.image} alt="image" className="object-fill" />
      </div>
    </section>
  );
};

export default ImageModal;
