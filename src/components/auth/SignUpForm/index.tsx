"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useState } from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import { useCustomerSignupMutation, useServiceProviderSignupMutation } from "@/services/auth";
import Image from "next/image";

type SignUpRequest = {
    emailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

const SignUpForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [customerSignUpApiCall] = useCustomerSignupMutation();
    const [serviceProviderSignUpApiCall] = useServiceProviderSignupMutation();
    const [error, setError] = useState<string | null>(null);

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            phoneNumber: ""
        },
    });

    const searchParams = useSearchParams()
    const userType = searchParams.get('userType')

    const {
        formState: { errors, isValid },
        watch,
    } = methods;

    const onSubmit: SubmitHandler<SignUpRequest> = async (payload) => {
        const params = new URLSearchParams({ email: payload.emailAddress });
        try {
            setIsLoading(true);

            const data = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                emailAddress: payload.emailAddress,
                phoneNumber: payload.phoneNumber,
                password: payload.password
            }

            if (userType === 'Service Provider') {
                await serviceProviderSignUpApiCall(data).unwrap();
                setIsLoading(false);
                router.push(`/auth/verify-email?${params}`);
                return;
            }

            if (userType === 'Customer') {
                await customerSignUpApiCall(data).unwrap();
                setIsLoading(false);
                router.push(`/auth/verify-email?${params}`);
                return;
            }

        } catch (err: any) {
            console.log("Error:", err);
            setError(err?.data.message);
            setIsLoading(false);
        }
    };

    return (
        <section className='w-full xl:w-[554px] mx-auto max-lg:p-10'>
            <div className='space-y-6 lg:space-y-10 w-full max-lg:container lg:max-w-[550px] lg:px-4'>
                <div className="space-y-4 font-clashDisplay">
                    <h1 className='text-2xl lg:text-4xl text-[#190E3F] font-medium'>
                        Create Account
                    </h1>
                    <p className='text-xl lg:text-2xl text-tc-gray font-medium'>
                        Join us for exclusive access to our services
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="font-satoshi"
                    >
                        <div className='space-y-4 lg:space-y-6'>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <Input
                                    label='First Name'
                                    name='firstName'
                                    placeholder="John"
                                    type='text'
                                    rules={["required", "textOnly"]}
                                />
                                <Input
                                    label='Last Name'
                                    name='lastName'
                                    placeholder="Doe"
                                    type='text'
                                    rules={["required", "textOnly"]}
                                />
                            </div>
                            <Input
                                label='Email Address'
                                name='emailAddress'
                                type='email'
                                placeholder='user@example.com'
                                rules={["required", "email"]}
                            />
                            <div>
                                <span className='w-full flex items-center space-x-2 text-sm text-left leading-5 mb-2'>
                                    <label htmlFor="" className='capitalize text-[#5B5B66]'>Phone number</label>
                                </span>
                                <PhoneInputWithCountry
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    defaultCountry="AU"
                                    rules={{ required: true }}
                                    international
                                    maxLength={17}
                                    minLength={7}
                                    className="w-full px-3 border border-[#5b5b66] active:border-primary text-dark h-12 overflow-hidden font-normal rounded-[10px] outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <Input
                                    label='Password'
                                    name='password'
                                    type='password'
                                    rules={["required", "password"]}
                                />
                                <Input
                                    label='Confirm Password'
                                    name='confirmPassword'
                                    type='password'
                                    rules={["required", "confirmPassword"]}
                                />
                            </div>
                            <div className={`space-x-2 flex`}>
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    id="agreement"
                                    required
                                />
                                <label
                                    htmlFor="agreement"
                                    className={`font-medium text-[12px]`}
                                >
                                    I agree to all
                                    <Link
                                        href="/terms-and-condition"
                                        className={`text-primary underline`}
                                    >
                                        {" "}
                                        Terms of service{" "}
                                    </Link>{" "}
                                    and
                                    <Link
                                        href="/privacy"
                                        className={`text-primary underline`}
                                    >
                                        {" "}
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {error && (
                                <div className="text-red-500 text-xl text-center font-bold my-5">{error}</div>
                            )}
                        </div>
                        <div className='pt-10 space-y-5'>
                            <Button
                                type='submit'
                                loading={isLoading}
                                disabled={!isValid}
                                className='w-full lg:w-[170px] rounded-full font-normal'>
                                Create account
                            </Button>
                            <h3 className="text-xl font-bold text-[#190E3F]">Have an existing account?
                                <Link href="/auth/login" className="text-primary"> Login</Link>
                            </h3>
                            {/* <div className="border w-full" />
                            <h3 className="text-xl font-bold">Other login methods</h3>
                            <div className="flex items-center space-x-4">
                                <Image src="/assets/images/facebook.png" height={40} width={40} alt="Social logo" />
                                <Image src="/assets/images/apple.png" height={40} width={40} alt="Social logo" />
                                <Image src="/assets/images/google.png" height={40} width={40} alt="Social logo" />
                            </div> */}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </section>
    )
}

export default SignUpForm