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
  const SERVICE_CHARGE = 10;
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
    gst: currentBooking ? (currentBooking.price / 100) * 10 : 0,
    total: currentBooking
      ? currentBooking.price -
        (currentBooking.price / 100) * 10 -
        SERVICE_CHARGE
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
      platformCharge: SERVICE_CHARGE,
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
      setTimeout(() => {
        router.push("/service-provider/jobs");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setInvoiceState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    setInvoiceState((prev) => ({
      ...prev,
      gst: (Number(invoiceState.price) / 100) * 10,
      total:
        Number(invoiceState.price) -
        (Number(invoiceState.price) / 100) * 10 -
        SERVICE_CHARGE,
    }));
    // eslint-disable-next-line
  }, [invoiceState.price]);

  return (
    <section
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${isModalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <div className=" relative w-[90vw] max-w-xl  space-y-6 rounded-xl bg-white p-3 py-10 lg:p-6">
        <div>
          <h1 className="font-clashBold text-3xl font-extrabold text-violet-dark">
            Paid Invoice
          </h1>
          <p className="text-sm text-slate-500 ">
            {currentBooking?.listing?.listingTitle}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex-grow rounded-lg bg-violet-light p-4 py-2 font-bold ">
            <span className="text-[#716F78]">Amount</span>
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
            <span className="text-[#716F78]">Start Date</span>
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
          <p className="font-bold text-violet-normal ">Service Information</p>
          <div className="grid grid-cols-2 gap-5 ">
            <div className="space-y-5">
              <div>
                <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                  {formatDateAsYYYYMMDD(todayDate)}
                </p>
                <p className="text-slate-600 ">Issued On</p>
              </div>
              <div>
                <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                  Bill From
                </p>
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div>
                <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                  ${invoiceState.gst}
                </p>
                <p>GST @10%</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                  {formatDateAsYYYYMMDD(tomorrowDate)}
                </p>
                <p>Due On</p>
              </div>
              <div>
                <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                  Bill To
                </p>
                <p className=" ">{currentBooking?.user.fullName}</p>
              </div>
              <div>
                <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                  Service Charge
                </p>
                <p>${SERVICE_CHARGE}</p>
              </div>
              <div>
                <p className=" font-satoshiBold font-extrabold text-violet-dark  ">
                  Total
                </p>
                <p>${invoiceState.total}</p>
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
        {invoiceState.successData && (
          <p className="text-emerald-600 "> {invoiceState.successData} </p>
        )}
      </div>
    </section>
  );
};

export default Invoice;
