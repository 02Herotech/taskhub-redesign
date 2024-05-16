"use client"

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type SignInRequest = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        formState: { errors, isValid },
    } = methods;

    // const searchParams = useSearchParams();

    // const from = searchParams.get("from");

    const session = useSession();
    console.log(session)

    /* Handle submit */
    const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
        try {
            setIsLoading(true)
            const response = await signIn("credentials", {
                redirect: false,
                email: payload.email,
                password: payload.password,
            });

            if (response?.ok) {
                // if (from) {
                //     router.push(from);
                // }
                // else {
                    router.push("/marketplace");
                    toast.success("Login Successful");
                // }
            }

            setIsLoading(false)
        } catch (err: any) {
            setIsLoading(false)
            toast.error(err?.data.message);
            // toast.error(err || "Something went wrong");
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
                            name='email'
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
                                loading={isLoading}
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
