"use client";

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/global/Button';

const SuccessPage = () => {
    return (
        <div className="h-[80vh] flex items-center justify-center bg-white">
            <div className="p-8 w-full text-center">
                <Image src="/assets/images/customer/success.png" alt="Success" width={180} height={180} className="mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-lg mb-6">Thank you for your payment. Your transaction has been completed successfully.</p>
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