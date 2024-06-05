"use client"

import Invoices from "@/components/dashboard/customer/Invoices";
import CustomerPaymentHistory from "@/components/dashboard/customer/PaymentHistory";
import Button from "@/components/global/Button"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IoArrowBackSharp } from "react-icons/io5";

type SignUpRequest = {
    cardName: string;
    cardNumber: number
    expiryDate: string;
    cvv: number;
};

const TransactionHistory = () => {
    const [selectedMethod, setSelectedMethod] = useState('paymentHistory');
    const router = useRouter();

    const handleChange = (event: any) => {
        setSelectedMethod(event.target.value);
    };

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
        <div className='p-4 lg:px-14 mt-14'>
            <div className="mt-14 mb-8 space-y-8">
                <h4 className='text-[#140B31] font-satoshiBold font-bold text-2xl lg:text-4xl'>Payment settings</h4>
                <div className='border-[1.5px] border-primary' />
            </div>
            <div className="flex items-center space-x-2 mb-5 lg:mb-10">
                <Button className='px-2' onClick={router.back}>
                    <IoArrowBackSharp className='size-7' />
                </Button>
                <Button>
                    Payment and invoice history
                </Button>
            </div>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="paymentHistory"
                                value="paymentHistory"
                                checked={selectedMethod === 'paymentHistory'}
                                onChange={handleChange}
                            />
                            <h5 className="text-[#140B31] lg:text-lg font-satoshiMedium">Payment history</h5>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="myInvoices"
                                value="myInvoices"
                                checked={selectedMethod === 'myInvoices'}
                                onChange={handleChange}
                            />
                            <h5 className="text-[#140B31] lg:text-lg font-satoshiMedium">My invoices</h5>
                        </div>
                    </div>
                </div>

                {selectedMethod === 'paymentHistory' && (
                    <CustomerPaymentHistory />
                )}

                {selectedMethod === 'myInvoices' && (
                    <Invoices />
                )}
            </div>
        </div>
    )
}

export default TransactionHistory