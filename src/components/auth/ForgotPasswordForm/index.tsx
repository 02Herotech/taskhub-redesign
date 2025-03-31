"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

type SignInRequest = {
  email: string;
};

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const {
    formState: { errors, isValid },
  } = methods;

  /* Handle submit */
  const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
    const params = new URLSearchParams({ email: payload.email });
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password`,
        { email: payload.email.toLowerCase() },
      );

      if (response.status == 200) {
        // toast.success(response.data.message || "Email sent successfully");
        router.push(`/auth/forgot-password/confirmation?${params}`);
        setIsLoading(false);
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <section className="mx-auto w-full max-lg:p-5 xl:w-[554px]">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="font-clashSemiBold text-2xl text-[#190E3F] lg:text-4xl">
            Forgot Password?
          </h1>
          <p className="font-clashMedium text-xl text-tc-gray lg:text-2xl">
            Please enter your email address and we will send you an instruction
            to reset your password.
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-5 font-satoshi"
          >
            <Input
              focused
              name="email"
              label="Email address"
              placeholder="example@example.com"
              rules={["email", "required"]}
              type="email"
            />
            {error && (
              <div className="my-2 text-base font-semibold text-status-error-100">
                {error}
              </div>
            )}
            <div className="space-y-5 pt-1">
              <Button
                type="submit"
                loading={isLoading}
                disabled={!isValid}
                className="w-full rounded-full font-normal lg:w-[170px]"
              >
                Send
              </Button>
              <h3 className="text-xl font-bold">
                <Link href="/auth/login" className="text-primary">
                  Back to Login
                </Link>
              </h3>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
