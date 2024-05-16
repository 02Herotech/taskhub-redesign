"use client"

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useSigninMutation } from "@/services/auth";
import { useState } from "react";

type SignInRequest = {
    emailAddress: string;
    password: string;
};

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            emailAddress: "",
            password: "",
        },
    });

    const {
        formState: { errors, isValid },
    } = methods;

    const searchParams = useSearchParams();

    const from = searchParams.get("from");

    const session = useSession();
    console.log(session)

    const [_signin, { isLoading }] = useSigninMutation();

    const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
        try {
            const response = await _signin(payload).unwrap();
            setLoading(true);

            const result = await signIn('credentials', {
                redirect: false,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                user: response.user
            });

            console.log(result)

            router.push("/marketplace")

            
        } catch (err: any) {
            toast.error(err?.data.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='w-full xl:w-[554px] mx-auto max-lg:p-10'>
            <div className='space-y-10'>
                <div className="space-y-4 font-clashDisplay">
                    <h1 className='text-2xl lg:text-4xl text-black font-medium'>
                        Welcome to{" "}
                        <span className="text-primary"><b>Task</b>hub</span>
                    </h1>
                    <p className='text-xl lg:text-2xl text-tc-gray font-medium'>
                        Join us for exclusive access to our services
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className='w-full space-y-5 font-satoshi'>
                        <Input
                            focused
                            name='emailAddress'
                            label='Email address'
                            placeholder='example@example.com'
                            rules={["email", "required"]}
                            type='email'
                            className="shadow-sm"
                        />
                        <Input
                            name='password'
                            label='Password'
                            placeholder='password'
                            rules={["required"]}
                            type='password'
                            className="shadow-sm"
                        />
                        <div className='pt-1 space-y-5'>
                            <div className="flex items-center justify-end">
                                <Button
                                    underline={false}
                                    tag='a'
                                    href='/auth/forgot-password'
                                    className='flex items-center underline font-bold'>
                                    Forgot password
                                </Button>
                            </div>
                            <Button
                                type='submit'
                                loading={loading}
                                disabled={!isValid}
                                className='w-full lg:w-[170px] rounded-full font-normal'>
                                Log in
                            </Button>
                            <h3 className="text-xl font-bold">Don’t have an account?
                                <Link href="/auth/sign-up" className="text-primary"> Sign Up</Link>
                            </h3>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
};

export default LoginForm;
