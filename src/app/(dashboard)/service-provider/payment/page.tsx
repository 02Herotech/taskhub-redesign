import WalletBalance from "@/components/dashboard/serviceProvider/Payment/WalletBalance";
import { PaymentSvg } from "@/lib/svgIcons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServicePayment = () => {
  return (
    <main className="space-y-8 p-4 lg:p-8">
      <section className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-violet-active p-3 lg:p-6 ">
        <h1 className="text-3xl font-bold text-violet-normal">
          Payment and wallet
        </h1>
        <span className="rounded-xl bg-white px-6 py-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-violet-active"
          >
            <path
              d="M14.5 16.25H9.5C9.36614 16.25 9.25 16.1339 9.25 16C9.25 15.8661 9.36614 15.75 9.5 15.75H14.5C14.6339 15.75 14.75 15.8661 14.75 16C14.75 16.1339 14.6339 16.25 14.5 16.25Z"
              fill="rgb(56 31 140)"
              stroke="rgb(56 31 140)"
            />
            <path
              d="M4.96927 9.61708L4.97086 9.61331L6.8289 5.17801C6.84469 5.14226 6.85982 5.10585 6.8701 5.08111C6.87369 5.07245 6.8767 5.06522 6.87893 5.05994C6.88573 5.04386 6.88915 5.03662 6.89015 5.03452L6.90531 5.00926L6.91836 4.97919C7.64009 3.31628 8.41566 2.39694 9.31883 1.99891C10.2166 1.60327 11.3707 1.66613 12.9908 2.28701L12.9908 2.28705L12.9968 2.28929C13.0476 2.30798 13.0986 2.35232 13.1289 2.42415C13.1564 2.48958 13.1566 2.55913 13.1295 2.62462L10.2019 9.41897C10.1603 9.51058 10.0679 9.57012 9.9697 9.57012H7.1197C6.48281 9.57012 5.87656 9.69354 5.29488 9.93964L5.29484 9.93956L5.28663 9.94321C5.26472 9.95295 5.23444 9.96012 5.1997 9.96012C5.15155 9.96012 5.08347 9.93935 5.01779 9.88091C4.95262 9.81104 4.93305 9.70159 4.96927 9.61708ZM7.36025 5.20286L7.35198 5.22212L7.35159 5.22329C7.3481 5.23027 7.34115 5.2442 7.33423 5.25929C7.32856 5.27165 7.32132 5.28818 7.31393 5.30784L6.00891 8.40603L5.68565 9.17346L6.51496 9.09807C6.72069 9.07937 6.91557 9.07012 7.1197 9.07012H9.4697H9.79885L9.92897 8.76777L12.339 3.16777L12.5569 2.6614L12.0317 2.49379C11.523 2.33144 11.0512 2.25012 10.6097 2.25012C9.85987 2.25012 9.23448 2.50317 8.69696 3.02706C8.18158 3.52937 7.76283 4.26521 7.36025 5.20286Z"
              fill="rgb(56 31 140)"
              stroke="rgb(56 31 140)"
            />
            <path
              d="M18.2902 10.27C18.2202 10.27 18.1402 10.26 18.0702 10.24C17.7002 10.13 17.2902 10.07 16.8702 10.07H9.97023C9.72023 10.07 9.48023 9.94002 9.34023 9.73002C9.21023 9.52002 9.18023 9.25002 9.28023 9.02002L12.1802 2.29002C12.3302 1.93002 12.7602 1.69002 13.1402 1.81002C13.2602 1.85002 13.3702 1.90002 13.4902 1.95002L15.8502 2.94002C17.2302 3.51002 18.1502 4.11002 18.7502 4.83002C18.8702 4.97002 18.9702 5.12002 19.0602 5.27002C19.1702 5.44002 19.2702 5.65002 19.3402 5.86002C19.3702 5.93002 19.4202 6.06002 19.4502 6.20002C19.7302 7.14002 19.5902 8.31002 18.9902 9.81002C18.8702 10.09 18.5902 10.27 18.2902 10.27ZM11.1102 8.57002H16.8802C17.2002 8.57002 17.5102 8.60002 17.8202 8.65002C18.1002 7.78002 18.1602 7.11002 18.0002 6.57002C17.9802 6.48002 17.9602 6.44002 17.9502 6.40002C17.8902 6.24002 17.8502 6.15002 17.8002 6.07002C17.7302 5.96002 17.6802 5.87002 17.6002 5.78002C17.1702 5.26002 16.4102 4.78002 15.2802 4.32002L13.3002 3.49002L11.1102 8.57002Z"
              fill="rgb(56 31 140)"
            />
            <path
              d="M15.9 22.7501H8.1C7.82 22.7501 7.56 22.7301 7.3 22.7001C3.79 22.4601 1.79 20.4601 1.55 16.9101C1.52 16.6901 1.5 16.4201 1.5 16.1501V14.2001C1.5 11.9501 2.84 9.92007 4.91 9.02007C5.61 8.72007 6.36 8.57007 7.13 8.57007H16.89C17.46 8.57007 18.01 8.65007 18.52 8.81007C20.87 9.52007 22.52 11.7401 22.52 14.2001V16.1501C22.52 16.3701 22.51 16.5801 22.5 16.7801C22.28 20.6901 20 22.7501 15.9 22.7501ZM7.12 10.0701C6.55 10.0701 6.01 10.1801 5.49 10.4001C3.97 11.0601 2.99 12.5501 2.99 14.2001V16.1501C2.99 16.3601 3.01 16.5701 3.03 16.7701C3.22 19.6201 4.62 21.0201 7.43 21.2101C7.68 21.2401 7.88 21.2601 8.09 21.2601H15.89C19.19 21.2601 20.81 19.8101 20.97 16.7101C20.98 16.5301 20.99 16.3501 20.99 16.1501V14.2001C20.99 12.3901 19.78 10.7701 18.06 10.2401C17.69 10.1301 17.28 10.0701 16.86 10.0701H7.12Z"
              fill="rgb(56 31 140)"
            />
            <path
              d="M2.24023 14.95C1.83023 14.95 1.49023 14.61 1.49023 14.2V11.27C1.49023 8.12005 3.72023 5.40005 6.80023 4.80005C7.07023 4.75005 7.35023 4.85004 7.53023 5.06004C7.70023 5.27004 7.75023 5.57005 7.64023 5.82005L5.89023 10C5.81023 10.18 5.67023 10.32 5.50023 10.4C3.98023 11.06 3.00023 12.55 3.00023 14.2C2.99023 14.61 2.66023 14.95 2.24023 14.95ZM5.60023 6.82005C4.32023 7.54005 3.39023 8.80005 3.10023 10.27C3.54023 9.82005 4.05023 9.44004 4.63023 9.16004L5.60023 6.82005Z"
              fill="rgb(56 31 140)"
            />
            <path
              d="M21.7592 14.95C21.3492 14.95 21.0092 14.61 21.0092 14.2C21.0092 12.39 19.7992 10.77 18.0792 10.24C17.8792 10.18 17.7092 10.04 17.6192 9.85002C17.5292 9.66002 17.5192 9.44002 17.5992 9.25002C18.0692 8.08002 18.1892 7.23002 17.9992 6.57002C17.9792 6.48002 17.9592 6.44002 17.9492 6.40002C17.8192 6.11002 17.8892 5.77002 18.1192 5.55002C18.3492 5.33002 18.6992 5.28002 18.9792 5.43002C21.1592 6.57002 22.5092 8.81002 22.5092 11.27V14.2C22.5092 14.61 22.1692 14.95 21.7592 14.95ZM19.2492 9.09002C19.8792 9.38002 20.4392 9.79002 20.9092 10.28C20.7192 9.30002 20.2492 8.41002 19.5592 7.71002C19.5092 8.13002 19.4092 8.59002 19.2492 9.09002Z"
              fill="rgb(56 31 140)"
            />
          </svg>
        </span>
      </section>

      <section className="relative flex flex-wrap items-center justify-between gap-2 overflow-hidden rounded-lg bg-violet-active p-3 lg:p-6 ">
        <Image
          src="/assets/images/serviceProvider/wallet/Vector 13.png"
          alt="overlay"
          width={1000}
          height={1000}
          className="absolute -right-32 h-full w-full object-cover max-sm:hidden "
        />
        <div className="relative space-y-6">
          <p className="font-bold text-violet-normal">Current balance</p>
          <h1 className="flex flex-col text-5xl font-bold text-orange-normal lg:text-6xl">
            <span className="text-2xl font-normal">$</span> <WalletBalance />
          </h1>
        </div>
        <Link
          href="/service-provider/payment/withdraw"
          className="relative rounded-full bg-orange-normal px-6 py-3 font-medium text-white"
        >
          Withdraw
        </Link>
      </section>
      <section className="space-y-4">
        <h1 className="text-2xl font-bold  text-violet-dark">
          Payment History
        </h1>
        <div className="flex flex-col  flex-wrap items-center justify-center gap-2 rounded-lg bg-violet-active px-4 py-8 lg:p-6  lg:py-16 ">
          {PaymentSvg}
          <p className="text-center text-violet-normal">
            Looks like you do not have any transaction yet!
          </p>
        </div>
      </section>
    </main>
  );
};

export default ServicePayment;
