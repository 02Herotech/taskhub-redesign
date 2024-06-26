"use client";

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/global/Button';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import axios from 'axios';
import { GrFormCheckmark } from 'react-icons/gr';

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const invoiceId = searchParams.get('invoiceId');
    const session = useSession();
    const userToken = session.data?.user.accessToken;

    const sendPaymentResponse = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/stripe/handle-payment`,
                {
                    invoiceId: Number(invoiceId), // Convert invoiceId to a number
                    status: "success"
                },
                // {
                //     headers: {
                //         "Authorization": `Bearer ${userToken}`,
                //         "Content-Type": "application/json"
                //     }
                // }
            );
        } catch (error) {
            console.error('Error sending payment response', error);
            console.log("error", error);
        }
    };

    useEffect(() => {
        if (invoiceId) {
            sendPaymentResponse();
        }
    }, [invoiceId]);

    return (
        <div className="h-[80vh] flex items-center justify-center bg-white">
            <div className="p-8 max-w-lg text-center drop-shadow rounded-xl">
                <div className="flex justify-center text-[1px] text-white">
                    <GrFormCheckmark className="h-[50px] w-[50px] rounded-full bg-[#4CAF50] p-2 lg:h-[60px] lg:w-[60px]" />
                </div>
                <h1 className="text-3xl font-bold my-4 text-primary">Payment Approved!</h1>
                <p className="text-lg mb-6 text-center">Your payment is successful and would be held securely until service is complete</p>
                <Link href="/customer/tasks" className='flex items-center justify-center'>
                    <Button className='rounded-full'>
                        View tasks
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;