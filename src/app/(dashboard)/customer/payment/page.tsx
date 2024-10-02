// "use client"

// import Button from "@/components/global/Button"
// import Input from "@/components/global/Input"
// import Link from "next/link";
// import { useState } from "react";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

// type SignUpRequest = {
//   cardName: string;
//   cardNumber: number
//   expiryDate: string;
//   cvv: number;
// };

// const CustomerPaymentsPage = () => {
//   const [selectedMethod, setSelectedMethod] = useState('creditCard');

//   const handleChange = (event: any) => {
//     setSelectedMethod(event.target.value);
//   };

//   const methods = useForm({
//     mode: "onChange",
//     defaultValues: {
//       cardName: "",
//       cardNumber: 0,
//       expiryDate: "",
//       cvv: 0,
//     },
//   });

//   const {
//     formState: { isValid },
//     watch,
//   } = methods;

//   const onSubmit: SubmitHandler<SignUpRequest> = async (payload) => {
//     try {

//     } catch (err: any) {
//       console.log("Error:", err);

//     }
//   };
//   return (
//     <div className='p-4 lg:px-14 mt-[4rem]'>
//       <div className="mt-14 mb-8 space-y-8">
//         <h4 className='text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-4xl'>Payment Settings</h4>
//         <div className='border-[1.5px] border-primary' />
//       </div>
//       <div className="space-y-8">
//         <h2 className="text-[#140B31] font-satoshiBold font-bold text-xl lg:text-2xl">Select payment method</h2>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-10">
//             <div className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 id="creditCard"
//                 value="creditCard"
//                 checked={selectedMethod === 'creditCard'}
//                 onChange={handleChange}
//               />
//               <h5 className="text-[#140B31] lg:text-lg font-satoshiMedium">Credit/Debit cards</h5>
//             </div>
//             <div className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 id="paypal"
//                 value="paypal"
//                 checked={selectedMethod === 'paypal'}
//                 onChange={handleChange}
//               />
//               <h5 className="text-[#140B31] lg:text-lg font-satoshiMedium">Paypal</h5>
//             </div>
//           </div>
//           <Link href="/customer/payment/transaction-history">
//             <Button className="rounded-full">View Payment History</Button>
//           </Link>
//         </div>

//         {selectedMethod === 'creditCard' && (
//           <div className="max-w-[800px] bg-[#EBE9F4] p-7 rounded-3xl">
//             <h2 className="text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-3xl">Payment Information</h2>
//             <p className="text-black my-4">To make purchases, enter your credit card information.</p>
//             <FormProvider {...methods}>
//               <form
//                 onSubmit={methods.handleSubmit(onSubmit)}
//                 className="font-satoshi space-y-10 mt-14"
//               >
//                 <Input name="cardName" label="Card Name" placeholder="Enter card name" />
//                 <div className="max-lg:grid max-lg:grid-cols-1 lg:flex lg:items-center lg:justify-between lg:space-x-8">
//                   <div className="w-full lg:w-1/2">
//                     <Input name="cardNumber" label="Card Number" placeholder="0000 0000 0000 0000" />
//                   </div>
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-lg:mt-5 lg:w-1/2">
//                     <Input name="expiryDate" label="Expiry Date" placeholder="MM/YY" className="w-full" />
//                     <Input name="cvv" label="CVV" placeholder="000" className="w-full" />
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-end">
//                   <Button disabled={!isValid} className="rounded-full px-14">Save</Button>
//                 </div>
//               </form>
//             </FormProvider>
//           </div>
//         )}

//         {selectedMethod === 'paypal' && (
//           <div className="max-w-[800px] bg-[#EBE9F4] p-7 rounded-3xl">
//             <h2 className="text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-3xl">Paypal Information</h2>
//             <p className="text-black my-4">To make purchases, enter your paypal information.</p>
//             <FormProvider {...methods}>
//               <form
//                 onSubmit={methods.handleSubmit(onSubmit)}
//                 className="font-satoshi space-y-10 mt-14"
//               >
//                 <Input name="email" label="Email" placeholder="Enter your email" />
//                 <div className="flex items-center justify-end">
//                   <Button disabled={!isValid} className="rounded-full px-14">Save</Button>
//                 </div>
//               </form>
//             </FormProvider>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CustomerPaymentsPage

"use client"

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Invoices from "@/components/dashboard/customer/Offers";
import CustomerPaymentHistory from "@/components/dashboard/customer/PaymentHistory";

const TransactionHistory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'paymentHistory';

  useEffect(() => {
    if (tab !== 'paymentHistory' && tab !== 'myInvoices') {
      router.push('/customer/payment?tab=paymentHistory');
    }
  }, [tab, router]);

  const tabs = [
    { title: "Payment history", link: "/customer/payment?tab=paymentHistory" },
    { title: "My invoices", link: "/customer/payment?tab=myInvoices" }
  ];

  return (
    <div className='p-4 lg:px-14 mt-24'>
      <div className="space-y-8">
        <div className="flex items-center space-x-10">
          {tabs.map((link, index) => (
            <Link key={index} href={link.link} className="flex items-center space-x-3">
              <div className={`size-5 rounded-full ${tab === link.link.split('=')[1] ? 'bg-primary' : 'bg-white border-primary border-4'}`} />
              <h2 className="text-[#140B31] lg:text-lg font-satoshiMedium">{link.title}</h2>
            </Link>
          ))}
        </div>

        {tab === 'paymentHistory' && <CustomerPaymentHistory />}
        {tab === 'myInvoices' && <Invoices />}
      </div>
    </div>
  )
}

export default TransactionHistory