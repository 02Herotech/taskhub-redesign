"use client";

import Button from "@/components/global/Button";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ clientSecret, invoiceId }: { clientSecret: string, invoiceId: number}) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!elements || !stripe) {
            return;
        } 

        try {
            setIsProcessing(true);
            // Trigger form validation and wallet collection
            const { error: submitError } = await elements.submit();
            if (submitError) {
                // Show error to your customer
                setErrorMessage(submitError.message || "Something went wrong");
                return;
            }

            const { error } = await stripe?.confirmPayment({
                //`Elements` instance that was used to create the Payment Element
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `https://oloja.com.au/customer/payment/success?invoiceId=${invoiceId}`,
                },
            });

            if (error) {
                // This point will only be reached if there is an immediate error when
                // confirming the payment. Show error to your customer (for example, payment
                // details incomplete)
                setErrorMessage(error.message || "Something went wrong");
            } else {
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
            }
            setIsProcessing(false);
        }
        catch (error) {
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='m-5'>
            <PaymentElement />
            <Button loading={isProcessing} className='rounded-full w-full mt-5' type="submit" disabled={!stripe || !elements}>
                Pay
            </Button>
            {errorMessage && (
                <div className="text-status-error-100 text-base font-semibold my-1">{errorMessage}</div>
            )}
        </form>
    );
}
