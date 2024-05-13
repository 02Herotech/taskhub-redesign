"use client"

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

type SignInRequest = {
    password: string;
};

const ResetPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            password: "",
        },
    });

    const {
        formState: { errors, isValid },
    } = methods;

    /* Handle submit */
    const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
        try {
            setIsLoading(true)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}user/reset-password`,
                { password: payload.password }
            );
            console.log(response);

            if ((response.status = 200)) {
                toast.success("Password Reset Successfully");
                
            }
        } catch (error: any) {
            console.error("Password Reset Error: ", error);
            setIsLoading(false);
        }
    };

    return (
        <section className='w-full xl:w-[554px] mx-auto max-lg:p-10'>
            <div className='space-y-10'>
                <div className="space-y-4">
                    <h1 className='text-2xl lg:text-4xl text-black font-medium'>
                        Reset your Password?
                    </h1>
                    <p className='text-xl lg:text-2xl text-tc-gray font-medium'>
                        Please enter a password you will remember and do not share with others.
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className='w-full space-y-5'>
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
                        <div className='pt-1 flex items-center space-x-4'>
                            <Button
                                type='submit'
                                loading={isLoading}
                                disabled={!isValid}
                                className='w-full lg:w-[170px] rounded-full font-normal'>
                                Reset
                            </Button>
                            <Button
                                className='w-full lg:w-[170px] rounded-full font-normal'
                                theme="outline"
                            >
                                Cancel
                            </Button>

                        </div>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
};

export default ResetPasswordForm;
