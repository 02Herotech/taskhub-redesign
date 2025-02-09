"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { BiXCircle } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { PiSealCheckFill } from "react-icons/pi";
import { BeatLoader } from "react-spinners";
import { toPng } from "html-to-image";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateAsYYYYMMDD } from "@/utils";
import { formatAmount, formatDate } from "@/lib/utils";
import useAxios from "@/hooks/useAxios";

interface ModalPropType {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentBooking: BookingType | undefined;
  invoiceDraft: InvoiceDraftType | undefined;
}

const Invoice = ({
  isModalOpen,
  setIsModalOpen,
  currentBooking,
  invoiceDraft,
}: ModalPropType) => {
  const [invoiceState, setInvoiceState] = useState({
    price: "",
    date: null as Date | null,
    gst: 0,
    serviceCharge: 0,
    total: 0,
    successData: "",
    loading: false,
  });

  const [invoiceDraftData, setInvoiceDraftData] = useState<InvoiceDraftType[]>(
    [],
  );
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const invoiceContainerRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<DatePicker>(null);

  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user?.user;
  const authInstance = useAxios();

  useEffect(() => {
    if (currentBooking?.startDate) {
      const [year, month, day] = currentBooking.startDate;
      setInvoiceState((prev) => ({
        ...prev,
        date: new Date(year, month - 1, day),
      }));
    }
  }, [currentBooking]);

  useEffect(() => {
    const calculateUserEarnings = () => {
      const price = invoiceDraft?.price || currentBooking?.price || 0;
      const gstAmount = 0;
      const serviceChargeAmount = Number(
        (Math.round(Number(price) * 0.07 * 100) / 100).toFixed(2),
      );
      const userEarnings = Number(price) - (gstAmount + serviceChargeAmount);

      setInvoiceState((prev) => ({
        ...prev,
        price: price.toString(),
        gst: gstAmount,
        serviceCharge: serviceChargeAmount,
        total: userEarnings,
      }));
    };

    calculateUserEarnings();
  }, [currentBooking, invoiceDraft]);

  const handleDateChange = (date: Date | null) => {
    setInvoiceState((prev) => ({ ...prev, date }));
    setIsDatePickerOpen(false);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = event.target.value;
    const price = Number(newPrice) || 0;
    const gstAmount = 0;
    const serviceChargeAmount = Number(
      (Math.round(Number(price) * 0.07 * 100) / 100).toFixed(2),
    );
    const userEarnings = price - (gstAmount + serviceChargeAmount);

    setInvoiceState((prev) => ({
      ...prev,
      price: newPrice,
      gst: gstAmount,
      serviceCharge: serviceChargeAmount,
      total: userEarnings,
    }));
  };

  const generateInvoice = async () => {
    if (!currentBooking) return;
    const invoiceData = {
      bookingId: currentBooking.id,
      subTotal: invoiceState.total,
      total: invoiceState.price,
      serviceStartOn: formatDateAsYYYYMMDD(invoiceState.date as Date),
      issuedOn: formatDateAsYYYYMMDD(new Date()),
      dueOn: formatDateAsYYYYMMDD(new Date(Date.now() + 86400000)),
      serviceProviderId: user?.id,
      customerId: currentBooking.customer?.id,
      gst: invoiceState.gst,
      platformCharge: Math.floor((Number(invoiceState.price) / 100) * 2),
    };

    try {
      setInvoiceState((prev) => ({ ...prev, loading: true }));
      await authInstance.post("booking/generate-invoice", invoiceData);
      safeInvoiceToDraft();
      setInvoiceState((prev) => ({
        ...prev,
        successData: "Invoice successfully Generated and sent to customer",
      }));
    } catch (error: any) {
      console.error(error.response?.data);
    } finally {
      setInvoiceState((prev) => ({ ...prev, loading: false }));
    }
  };

  const safeInvoiceToDraft = () => {
    if (!currentBooking) return;
    const invoiceData: InvoiceDraftType = {
      bookingId: currentBooking.id,
      subTotal: invoiceState.total,
      total: Number(invoiceState.price),
      serviceStartOn: invoiceState.date as Date,
      issuedOn: formatDateAsYYYYMMDD(new Date()),
      dueOn: formatDateAsYYYYMMDD(new Date(Date.now() + 86400000)),
      serviceProviderId: user?.id,
      customerId: currentBooking.customer?.id,
      gst: invoiceState.gst,
      platformCharge: Math.floor((Number(invoiceState.price) / 100) * 2),
      price: Number(invoiceState.price),
    };

    setInvoiceDraftData((prev) => {
      const updatedDrafts = prev.filter(
        (invoice) => invoice.bookingId !== invoiceData.bookingId,
      );
      const newDrafts = [...updatedDrafts, invoiceData];
      localStorage.setItem("invoiceDraftData", JSON.stringify(newDrafts));
      return newDrafts;
    });

    setInvoiceState((prev) => ({
      ...prev,
      successData: "Invoice successfully saved to draft",
    }));
  };

  const handleDownloadImage = async () => {
    if (invoiceContainerRef.current) {
      setIsDownloadingImage(true);
      try {
        const dataUrl = await toPng(invoiceContainerRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "invoice.png";
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setIsDownloadingImage(false);
      }
    }
  };

  function getFormattedDate(dateArray: number[]): string {
    if (!dateArray) return "Flexible";

    if (dateArray[0] === 1970 && dateArray[1] === 1 && dateArray[2] === 1) {
      return "Flexible";
    }

    return formatDate(dateArray);
  }

  console.log("tss", currentBooking?.startDate);

  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${
        isModalOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 h-screen w-screen"
        onClick={() => setIsModalOpen(false)}
      ></div>
      {invoiceState.successData ? (
        <div className="relative z-10 flex w-[90vw] max-w-md flex-col items-center justify-center gap-4 rounded-lg bg-white p-5">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
            <div className="flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
              <PiSealCheckFill className="size-10 text-green-500" />
            </div>
          </div>
          <p className="text-center font-satoshiBold text-2xl font-extrabold text-violet-normal">
            Success
          </p>
          <p className="text-center font-semibold text-violet-darker">
            {invoiceState.successData.includes("draft")
              ? "Offer successfully saved to draft"
              : "Offer successfully Generated and sent to customer"}
          </p>
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={() => router.push("/service-provider/jobs")}
              className="rounded-full bg-violet-normal px-4 py-2 font-semibold text-white transition-opacity duration-300 hover:opacity-90"
            >
              View Jobs
            </button>
          </div>
        </div>
      ) : (
        <div
          ref={invoiceContainerRef}
          className="relative space-y-3 rounded-xl bg-white p-3 py-10 max-lg:w-[90vw] lg:p-6"
        >
          <div>
            <h1 className="font-clashBold text-3xl font-extrabold leading-6 text-violet-dark">
              {!currentBooking?.invoiceSent && "Make an "}Offer
            </h1>
            <p className="text-sm text-violet-active">
              {currentBooking?.bookingTitle}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex h-20 flex-grow flex-col justify-center rounded-lg bg-violet-light px-4 font-bold">
              <span className="flex items-center justify-between gap-2 text-[#716F78]">
                <span>Amount</span>
                {!currentBooking?.invoiceSent && (
                  <BsPencilSquare className="text-violet-normal" />
                )}
              </span>
              <div className="flex w-full items-center gap-1">
                <p>$</p>
                <input
                  type="number"
                  name="price"
                  value={invoiceState.price}
                  placeholder={currentBooking?.price?.toString()}
                  disabled={currentBooking?.invoiceSent}
                  className="w-full bg-violet-light py-2 outline-none"
                  onChange={handlePriceChange}
                />
              </div>
            </label>
            <div className="flex h-20 flex-grow flex-col justify-center rounded-lg bg-violet-light px-4 font-bold">
              <span className="flex items-center justify-between gap-2 text-[#716F78]">
                <span>Start Date</span>
              </span>
              <span>{getFormattedDate(currentBooking?.startDate!)}</span>
            </div>
          </div>

          <div className="space-y-3 rounded-lg bg-violet-active p-3 py-4 text-violet-normal">
            <p className="font-bold uppercase text-violet-normal ">
              Service Information
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div>
                  <p className="font-black text-violet-dark">
                    {formatDateAsYYYYMMDD(new Date())}
                  </p>
                  <p className="font-medium  text-[#4E5158]">Issued On</p>
                </div>
                <div>
                  <p className=" font-extrabold text-violet-dark  ">
                    Bill From
                  </p>
                  <p className="font-medium  text-[#4E5158]">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div>
                  <p className=" font-extrabold text-violet-dark  ">
                    ${invoiceState.gst.toFixed(2)}
                  </p>
                  <p className="font-medium  text-[#4E5158]">GST @0%</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className=" font-extrabold text-violet-dark  ">
                    {formatDateAsYYYYMMDD(new Date(Date.now() + 86400000))}
                  </p>
                  <p className="font-medium  text-[#4E5158]">Due On</p>
                </div>
                <div>
                  <p className=" font-extrabold text-violet-dark">Bill To</p>
                  <p className="font-medium  text-[#4E5158]">
                    {currentBooking?.customer?.user?.fullName}
                  </p>
                </div>
                <div>
                  <p className="font-extrabold text-violet-dark">
                    ${invoiceState.serviceCharge.toFixed(2)}
                  </p>
                  <p className="font-medium text-[#E10909]">Service fee (7%)</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div>
                <p className="text-center font-satoshiBold text-xl font-extrabold text-[#006F05] lg:text-3xl">
                  ${invoiceState.total.toFixed(2)}
                </p>
                <p className="font-medium text-[#4E5158]">
                  Total Receivable Amount
                </p>
              </div>
            </div>
          </div>
          <p className=" font-bold text-violet-darker">
            Note: The service charges and GST would be deducted from the total
            paid by the customer
          </p>

          {!isDownloadingImage && (
            <button
              className="absolute right-4 top-4"
              onClick={() => setIsModalOpen(false)}
            >
              <BiXCircle className="size-8 text-violet-normal" />
            </button>
          )}
          {!isDownloadingImage && (
            <div className="flex gap-2">
              {!currentBooking?.invoiceSent && (
                <button
                  onClick={generateInvoice}
                  className="rounded-full bg-violet-normal px-4 py-2 font-medium text-white"
                >
                  {invoiceState.loading ? (
                    <BeatLoader
                      color={"white"}
                      loading={invoiceState.loading}
                      size={14}
                    />
                  ) : (
                    "Send"
                  )}
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full bg-orange-100 px-4 py-2 font-medium text-violet-normal transition-colors duration-300 hover:bg-orange-200"
              >
                Back
              </button>
              {!currentBooking?.invoiceSent && (
                <button
                  onClick={safeInvoiceToDraft}
                  className="rounded-full bg-violet-light px-4 py-2 font-medium text-violet-normal"
                >
                  Save to draft
                </button>
              )}
              {currentBooking?.invoiceSent && (
                <button
                  onClick={handleDownloadImage}
                  className="rounded-full bg-violet-normal px-4 py-2 font-medium text-white"
                >
                  Download Offer
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Invoice;
