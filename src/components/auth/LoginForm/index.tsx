"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

type SignInRequest = {
  emailAddress: string;
  password: string;
};

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          emailAddress: payload.emailAddress,
          password: payload.password,
        },
      );
      const authData = {
        token: response.data.accessToken,
        role: response.data.user.roles,
      };
      // sessionStorage.setItem("auth", JSON.stringify(authData));
      localStorage.setItem("auth", JSON.stringify(authData));
      if (response.status === 200) {
        const userTypeRole = response.data.user.roles[0];

        await signIn("credentials", {
          redirect: false,
          email: payload.emailAddress,
          password: payload.password,
          userType: userTypeRole,
        });
      }
      if (from) {
        router.push(from);
      } else {
        router.push("/marketplace");
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <section className="mx-auto w-full max-lg:p-5 xl:w-[554px]">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="font-clashSemiBold text-2xl text-[#190E3F] lg:text-4xl">
            Welcome to{" "}
            <span className="text-primary">
              <b>Task</b>hub
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
