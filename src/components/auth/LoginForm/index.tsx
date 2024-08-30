"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

type SignInRequest = {
  emailAddress: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const {
    formState: { isValid },
  } = methods;

  const handleApiLogin = async (payload: SignInRequest) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      payload
    );
    return response.data;
  };

  const handleNextAuthSignIn = async (payload: SignInRequest, userType: string) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: payload.emailAddress,
      password: payload.password,
      userType,
    });
    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const handleRedirect = () => {
    const newRedirectToAddTask = getCookie("redirectToAddTask");
    if (newRedirectToAddTask) {
      router.push(newRedirectToAddTask);
      deleteCookie("redirectToAddTask");
    } else {
      router.push(from || "/marketplace");
    }
  };

  const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
    setIsLoading(true);
    setError(null);

    try {
      const loginData = await handleApiLogin(payload);

      const authData = {
        token: loginData.accessToken,
        role: loginData.user.roles,
      };
      localStorage.setItem("auth", JSON.stringify(authData));

      await handleNextAuthSignIn(payload, loginData.user.roles[0]);

      handleRedirect();
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-lg:p-5 xl:w-[554px]">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="font-clashSemiBold text-2xl text-[#190E3F] lg:text-4xl">
            Welcome to{" "}
            <span className="text-primary">
              <b>Olójà</b>
            </span>
          </h1>
          <p className="font-clashMedium text-xl text-tc-gray lg:text-2xl">
            Join us for exclusive access to our services
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-7 font-satoshi"
          >
            <Input
              focused
              name="emailAddress"
              label="Email address"
              placeholder="johndoe@gmail.com"
              rules={["email", "required"]}
              type="email"
              className="shadow-sm"
            />
            <Input
              name="password"
              label="Password"
              placeholder="**********"
              className=" shadow-sm placeholder:text-dark"
              rules={["required", "password"]}
              type="password"
            />
            {error && (
              <div className="my-1 text-base font-semibold text-status-error-100">
                {error}
              </div>
            )}
            <div className="space-y-8 lg:space-y-5">
              <div className="flex items-center justify-end">
                <Button
                  tag="a"
                  href="/auth/forgot-password"
                  className="flex items-center font-bold underline underline-offset-2"
                >
                  Forgot password
                </Button>
              </div>
              <div className="max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={!isValid}
                  className="w-[170px] rounded-full font-normal"
                >
                  Login
                </Button>
                <h3 className="mt-8 font-satoshiBold text-xl text-[#190E3F]">
                  Don’t have an account?
                  <Link href="/auth" className="text-primary">
                    {" "}
                    Sign Up
                  </Link>
                </h3>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default LoginForm;
