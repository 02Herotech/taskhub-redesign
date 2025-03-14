"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Toast from "@/components/global/Toast";

type SignInRequest = {
    password: string;
};

const ResetPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setMessage(msg);
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 8000); // Hide toast after 8 seconds
    };

    const router = useRouter();
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            password: "",
        },
    });

    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const {
        formState: { isValid },
    } = methods;

    const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password?email=${email}`,
                { password: payload.password }
            );

            if (response.status === 200) {
                router.push("/auth/login");
                setIsLoading(false);
            }
            // showToast("Password reset successful");
        } catch (error: any) {
            setIsLoading(false);
            setError(error.response.data.message);
        }
    };
``
    return (
        <>
            <Toast
                body={
                    <div className="text-sm lg:text-base text-primary font-bold">
                        {message}
                    </div>
                }
                // theme='error'
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
            />
            <section className='w-full xl:w-[554px] flex items-center justify-center mx-auto'>
                <div className='space-y-10'>
                    <div className="space-y-4">
                        <h1 className='text-2xl lg:text-4xl text-[#190E3F] font-clashSemiBold'>
                            Reset your Password?
                        </h1>
                        <p className='text-sm lg:text-lg text-tc-gray font-clashMedium'>
                            Please enter a password you will remember and do not share with others.
                        </p>
                    </div>

                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className='w-full space-y-5 font-satoshi'>
                            <Input
                                name='password'
                                label='Password'
                                placeholder='password'
                                rules={["required", "password"]}
                                type='password'
                            />
                            <Input
                                name='confirm password'
                                label='Confirm Password'
                                placeholder='password'
                                rules={["required", "confirmPassword"]}
                                type='password'
                            />
                            {error && (
                                <div className="text-status-error-100 text-base text-center font-semibold my-5">{error}</div>
                            )}
                            <div className='pt-1 flex items-center space-x-4'>
                                <Button
                                    type='submit'
                                    loading={isLoading}
                                    disabled={!isValid}
                                    className='w-full lg:w-[170px] rounded-full font-bold'>
                                    Reset
                                </Button>
                                <Button
                                    className='w-full lg:w-[170px] rounded-full font-bold'
                                    theme="outline"
                                    onClick={() => router.push("/auth/login")}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </section>
        </>
    );
};

export default ResetPasswordForm;
