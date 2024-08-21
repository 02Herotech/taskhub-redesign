"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import { BiXCircle } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateAsYYYYMMDD } from "@/utils";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { BsPencilSquare } from "react-icons/bs";
import { PiSealCheckFill } from "react-icons/pi";
import { toPng } from "html-to-image";

interface ModalPropType {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  currentBooking: BookingType | undefined;
  invoiceDraft: InvoiceDraftType | undefined;
}

const Invoice = ({
  isModalOpen,
  setIsModalOpen,
  currentBooking,
  invoiceDraft,
}: ModalPropType) => {
  // setting invoice state

  const [invoiceState, setInvoiceState] = useState<{
    price: string | number;
    date: Date | null;
    gst: number;
    total: number;
    successData: string;
    loading: boolean;
  }>({
    price: "",
    date: null,
    gst: 0,
    total: 0,
    successData: "",
    loading: false,
  });

  const [invoiceDraftData, setInvoiceDraftData] = useState<InvoiceDraftType[]>(
    [],
  );
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const invoiceContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const user = session?.data?.user?.user;

  useEffect(() => {
    setInvoiceState({
      price:
        invoiceDraft?.price !== undefined
          ? invoiceDraft.price
          : currentBooking?.price ?? "",
      date:
        invoiceDraft?.serviceStartOn !== undefined
          ? invoiceDraft.serviceStartOn
          : (currentBooking?.startDate &&
              convertToDateInputFormat(currentBooking?.startDate)) ??
            null,
      gst:
        invoiceDraft?.gst !== undefined
          ? invoiceDraft.gst
          : currentBooking
            ? Math.floor((currentBooking.price / 100) * 10)
            : 0,
      total:
        invoiceDraft?.total !== undefined
          ? invoiceDraft.total
          : currentBooking
            ? Math.floor(
                currentBooking.price -
                  (currentBooking.price / 100) * 10 -
                  (currentBooking.price / 100) * 2,
              )
            : 0,

      successData: "",
      loading: false,
    });
  }, [currentBooking, invoiceDraft]);

  function convertToDateInputFormat(dateArray: number[]) {
    const [year, month, day] = dateArray;

    // Ensure month and day are two digits
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    // Return the formatted date string
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const todayDate = new Date();
  const tomorrowDate = new Date();

  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const generateInvoice = async () => {
    if (!currentBooking) return;
    const invoiceData = {
      bookingId: currentBooking.id,
      subTotal: invoiceState.total,
      total: invoiceState.price,
      serviceStartOn: formatDateAsYYYYMMDD(invoiceState.date as Date),
      issuedOn: formatDateAsYYYYMMDD(todayDate),
      dueOn: formatDateAsYYYYMMDD(tomorrowDate),
      serviceProviderId: user?.id,
      customerId: currentBooking.customer?.id,
      gst: invoiceState.gst,
      platformCharge: Math.floor((Number(invoiceState.price) / 100) * 2),
    };

    try {
      setInvoiceState((prev) => ({ ...prev, loading: true }));
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/generate-invoice";
      await axios.post(url, invoiceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      safeInvoiceToDraft();
      setInvoiceState((prev) => ({
        ...prev,
        successData: "Invoice successfully Generated and sent to customer",
      }));
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setInvoiceState((prev) => ({ ...prev, loading: false }));
    }
  };

  const safeInvoiceToDraft = () => {
    if (!currentBooking) return;
    const invoiceData: InvoiceDraftType = {
      bookingId: currentBooking.id,
      subTotal: invoiceState.total,
      total: invoiceState.price as number,
      serviceStartOn: invoiceState.date as Date,
      issuedOn: formatDateAsYYYYMMDD(todayDate),
      dueOn: formatDateAsYYYYMMDD(tomorrowDate),
      serviceProviderId: user?.id,
      customerId: currentBooking.customer?.id,
      gst: invoiceState.gst,
      platformCharge: Math.floor((Number(invoiceState.price) / 100) * 2),
      price: invoiceState.price as number,
    };

    setInvoiceDraftData((prev) => {
      const updatedDrafts = prev.filter(
        (invoice) => invoice.bookingId !== invoiceData.bookingId,
      );
      const newDrafts = [...updatedDrafts, invoiceData];
      localStorage.setItem("invoiceDraftData", JSON.stringify(newDrafts));
      return newDrafts;
    });
    // localStorage.setItem("invoiceDraftData", JSON.stringify(invoiceDraftData));
    setInvoiceState((prev) => ({
      ...prev,
      successData: "Invoice successfully saved to draft",
    }));
  };

  useEffect(() => {
    setInvoiceState((prev) => ({
      ...prev,
      gst: Math.floor((Number(invoiceState.price) / 100) * 10),
      total: Math.floor(
        Number(invoiceState.price) -
          (Number(invoiceState.price) / 100) * 10 -
          (Number(invoiceState.price) / 100) * 2,
      ),
    }));
    // eslint-disable-next-line
  }, [invoiceState.price]);

  const handleDownloadImage = async () => {
    if (invoiceContainerRef.current) {
      console.log("downloading image");
      setIsDownloadingImage(true);
      const dataUrl = await toPng(invoiceContainerRef.current);

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "invoice.png";
      link.click();
      setIsDownloadingImage(false);
    }
  };

  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${isModalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <div
        className="absolute inset-0 h-screen w-screen"
        onClick={() => setIsModalOpen(false)}
      ></div>
      {invoiceState.successData ? (
        <div className=" relative z-10 flex w-[90vw] max-w-md  flex-col items-center justify-center gap-4 rounded-lg bg-white p-5 ">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#C1F6C3] bg-opacity-60">
            <div className=" flex size-14 items-center justify-center rounded-full bg-[#A6F8AA] p-2">
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
          <div className="flex  items-center justify-center gap-10">
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
          className=" relative w-[90vw] max-w-xl  space-y-3 rounded-xl bg-white p-3 py-10 lg:p-6"
        >
          <div>
            <h1 className="font-clashBold text-3xl font-extrabold leading-6 text-violet-dark">
              {!currentBooking?.invoiceSent && "Make an "} Offer
            </h1>
            <p className="text-sm text-violet-active ">
              {currentBooking?.bookingTitle}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex-grow rounded-lg bg-violet-light p-4 py-2 font-bold ">
              <span className="flex items-center gap-2 text-[#716F78] ">
                <span>Amount</span>{" "}
                {!currentBooking?.invoiceSent && (
                  <BsPencilSquare className="text-violet-normal" />
                )}
              </span>
              <div className="flex w-full items-center gap-1">
                <p>$ </p>
                <input
                  type="number"
                  name="price"
                  value={invoiceState.price}
                  placeholder={currentBooking?.price?.toString()}
                  disabled={currentBooking?.invoiceSent}
                  className="w-full bg-violet-light py-2 outline-none"
                  onChange={(event) =>
                    setInvoiceState((prev) => ({
                      ...prev,
                      price: event.target.value,
                    }))
                  }
                />
              </div>
            </label>
            <label className="flex flex-grow flex-col gap-2 rounded-lg bg-violet-light p-4 py-2 font-bold ">
              <span className="flex items-center gap-2 text-[#716F78]">
                <span>Start Date</span>
                {!currentBooking?.invoiceSent && (
                  <BsPencilSquare className="text-violet-normal" />
                )}
              </span>
              {invoiceState.date ? (
                <DatePicker
                  selected={invoiceState.date as Date}
                  minDate={new Date()}
                  required
                  disabled={currentBooking?.invoiceSent}
                  onChange={(date: Date) =>
                    setInvoiceState((prev) => ({
                      ...prev,
                      date: date,
                    }))
                  }
                  className="w-full bg-transparent text-[#716F78]  outline-none  "
                  dateFormat="dd/MM/yyyy"
                />
              ) : (
                <span>Flexible</span>
              )}
            </label>
          </div>
          <div className="space-y-3 rounded-lg bg-violet-active p-3 py-4 text-violet-normal">
            <p className="font-bold uppercase text-violet-normal ">
              Service Information
            </p>
            <div className="grid grid-cols-2 gap-3 ">
              <div className="space-y-3">
                <div>
                  <p className="font-black text-violet-dark  ">
                    {formatDateAsYYYYMMDD(todayDate)}
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
                    ${invoiceState.gst}
                  </p>
                  <p className="font-medium  text-[#4E5158]">GST @10%</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className=" font-extrabold text-violet-dark  ">
                    {formatDateAsYYYYMMDD(tomorrowDate)}
                  </p>
                  <p className="font-medium  text-[#4E5158]">Due On</p>
                </div>
                <div>
                  <p className=" font-extrabold text-violet-dark  ">Bill To</p>
                  <p className="font-medium  text-[#4E5158]">
                    {currentBooking?.customer?.user?.fullName}
                  </p>
                </div>
                <div>
                  <p className=" font-extrabold text-violet-dark  ">
                    ${invoiceState.total}
                  </p>
                  <p className="font-medium  text-[#4E5158]">
                    Amount + Service fee (2%)
                  </p>
                </div>
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
              onClick={() => setIsModalOpen((prev) => !prev)}
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
                className=" rounded-full bg-orange-100 px-4 py-2 font-medium text-violet-normal transition-colors duration-300 hover:bg-orange-200"
              >
                Back
              </button>
              {!currentBooking?.invoiceSent && (
                <button
                  onClick={safeInvoiceToDraft}
                  className=" rounded-full bg-violet-light px-4 py-2 font-medium text-violet-normal"
                >
                  Save to draft
                </button>
              )}
              {currentBooking?.invoiceSent && (
                <button
                  onClick={handleDownloadImage}
                  className=" rounded-full bg-violet-normal px-4 py-2 font-medium text-white"
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
