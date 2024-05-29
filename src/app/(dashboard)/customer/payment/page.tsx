"use client"

import Button from "@/components/global/Button"
import Input from "@/components/global/Input"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type SignUpRequest = {
  cardName: string;
  cardNumber: number
  expiryDate: string;
  cvv: number;
};

const CustomerPaymentsPage = () => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      cardName: "",
      cardNumber: 0,
      expiryDate: "",
      cvv: 0,
    },
  });

  const {
    formState: { isValid },
    watch,
  } = methods;

  const onSubmit: SubmitHandler<SignUpRequest> = async (payload) => {
    try {

    } catch (err: any) {
      console.log("Error:", err);

    }
  };
  return (
    <div className='p-4 lg:px-14 mt-20'>
      <div className="mt-14 mb-8 space-y-8">
        <h4 className='text-[#140B31] font-satoshiBold font-bold text-3xl lg:text-5xl'>Payment Settings</h4>
        <div className='border-2 border-primary' />
      </div>
      <div className="space-y-8">
        <h2 className="text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-3xl">Select payment method</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-3">
              <input type="radio" />
              <h5 className="text-[#140B31] lg:text-lg font-satoshiMedium">Credit/Debit cards</h5>
            </div>
            <div className="flex items-center space-x-3">
              <input type="radio" />
              <h5 className="text-[#140B31] lg:text-lg font-satoshiMedium">Paypal</h5>
            </div>
          </div>
          <Button className="rounded-full">View Payment History</Button>
        </div>
        <div className="w-full bg-[#EBE9F4] p-7 rounded-3xl">
          <h2 className="text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-3xl">Payment Information</h2>
          <p className="text-black my-4">To make purchases, enter your credit card information.</p>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="font-satoshi space-y-10 mt-14"
            >
              <Input name="cardName" label="Card Name" placeholder="Enter card name" />
              <div className="max-lg:grid max-lg:grid-cols-1 lg:flex lg:items-center lg:justify-between lg:space-x-8">
                <div className="w-full lg:w-1/2">
                  <Input name="cardNumber" label="Card Number" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-lg:mt-5 lg:w-1/2">
                  <Input name="expiryDate" label="Expiry Date" placeholder="MM/YY" className="w-full" />
                  <Input name="cvv" label="CVV" placeholder="000" className="w-full" />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Button disabled={!isValid} className="rounded-full px-14">Save</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default CustomerPaymentsPage