"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateAsYYYYMMDD, formatDateFromNumberArray } from "@/utils";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { BsPencilSquare } from "react-icons/bs";
import Image from "next/image";

interface ModalPropType {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  currentBooking: BookingType | undefined;
}

const Invoice = ({
  isModalOpen,
  setIsModalOpen,
  currentBooking,
}: ModalPropType) => {
  const [invoiceState, setInvoiceState] = useState<{
    price: string | number;
    date: Date | null;
    gst: number;
    total: number;
    successData: string;
    loading: boolean;
  }>({
    price: currentBooking?.price ?? "",
    // @ts-expect-error "type not curruntly correct "
    date: convertToDateInputFormat(currentBooking?.startDate) ?? null,
    gst: currentBooking ? Math.floor((currentBooking.price / 100) * 10) : 0,
    total: currentBooking
      ? Math.floor(
          currentBooking.price -
            (currentBooking.price / 100) * 10 -
            (currentBooking.price / 100) * 2,
        )
      : 0,
    successData: "",
    loading: false,
  });
  const router = useRouter();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const user = session?.data?.user?.user;

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
      total: currentBooking?.price,
      serviceStartOn: formatDateAsYYYYMMDD(invoiceState.date as Date),
      issuedOn: formatDateAsYYYYMMDD(todayDate),
      dueOn: formatDateAsYYYYMMDD(tomorrowDate),
      serviceProviderId: user?.id,
      customerId: currentBooking.user.id,
      gst: invoiceState.gst,
      platformCharge: Math.floor((Number(invoiceState.price) / 100) * 2),
    };
    try {
      setInvoiceState((prev) => ({ ...prev, loading: true }));
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/booking/generate-invoice";
      const response = await axios.post(url, invoiceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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

  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${isModalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <div
        className="absolute inset-0 h-screen w-screen"
        onClick={() => setIsModalOpen(false)}
      ></div>
      {invoiceState.successData ? (
        <div className="relative z-10 flex max-w-md flex-col items-center justify-center gap-4 rounded-lg bg-violet-light p-5 ">
          <div className="size-10 rounded-full bg-violet-darker p-2">
            <Image
              src={"/assets/images/serviceProvider/jobs/checkicon.png"}
              alt="checkicon"
              width={80}
              height={80}
              className="h-full w-full"
            />
          </div>
          <h2 className="font-satoshiBold text-2xl font-bold text-violet-normal">
            Success
          </h2>
          <p className="text-center">{invoiceState.successData}</p>
          <div className="flex  items-center justify-center gap-10">
            <button
              onClick={() => router.push("service-provider/jobs")}
              className="rounded-full bg-violet-normal px-4 py-2 font-semibold text-white transition-opacity duration-300 hover:opacity-90"
            >
              View Jobs
            </button>
          </div>
        </div>
      ) : (
        <div className=" relative w-[90vw] max-w-xl  space-y-3 rounded-xl bg-white p-3 py-10 lg:p-6">
          <div>
            <h1 className="font-clashBold text-3xl font-extrabold leading-6 text-violet-dark">
              Paid Invoice
            </h1>
            <p className="text-sm text-violet-active ">
              {currentBooking?.bookingTitle}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex-grow rounded-lg bg-violet-light p-4 py-2 font-bold ">
              <span className="flex items-center gap-2 text-[#716F78] ">
                <span>Amount</span>{" "}
                <BsPencilSquare className="text-violet-normal" />
              </span>
              <div className="flex w-full items-center gap-1">
                <p>$ </p>
                <input
                  type="number"
                  name="price"
                  value={invoiceState.price}
                  placeholder={currentBooking?.price?.toString()}
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
                <BsPencilSquare className="text-violet-normal" />
              </span>
              <DatePicker
                selected={invoiceState.date as Date}
                minDate={new Date()}
                required
                onChange={(date: Date) =>
                  setInvoiceState((prev) => ({
                    ...prev,
                    date: date,
                  }))
                }
                className="w-full bg-transparent text-[#716F78]  outline-none  "
                dateFormat="dd/MM/yyyy"
              />
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
                    {currentBooking?.user.fullName}
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
          <button
            className="absolute right-4 top-4"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            <BiXCircle className="size-8 text-violet-normal" />
          </button>
          <div className="flex gap-2">
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
                "Done"
              )}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className=" rounded-full px-4 py-2 font-medium text-violet-normal"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Invoice;
