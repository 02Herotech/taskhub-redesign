"use client";
import Carousel from "../Carousel";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Popup from "@/components/global/Popup/PopupTwo";
import { signupSchema } from "../sign-up/schema";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Button from "@/components/global/Button";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const loginSchema = signupSchema.pick({ emailAddress: true, password: true });

type LoginSchema = z.infer<typeof loginSchema>;

type UserType = "CUSTOMER" | "SERVICE_PROVDER";
function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [userType, setUserType] = useState<null | UserType>(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleApiLogin = async (payload: LoginSchema) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      payload,
    );
    return response.data;
  };

  const handleNextAuthSignIn = async (payload: LoginSchema) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: payload.emailAddress,
      password: payload.password,
    });
    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const handleRedirect = () => {
    const newRedirectToAddTask = getCookie("redirectToAddTask");
    const redirectToServiceDetail = getCookie("redirectToMarketplaceDetail");
    const redirectToExploreDetail = getCookie("redirectToExploreDetail");

    if (newRedirectToAddTask) {
      router.push(newRedirectToAddTask);
      deleteCookie("redirectToAddTask");
    } else if (redirectToServiceDetail) {
      router.push(redirectToServiceDetail);
      deleteCookie("redirectToMarketplaceDetail");
    } else if (redirectToExploreDetail) {
      router.push(redirectToExploreDetail);
      deleteCookie("redirectToExploreDetail");
    } else {
      router.push(from || "/marketplace");
      deleteCookie("redirectToAddTask");
      deleteCookie("redirectToMarketplaceDetail");
      deleteCookie("redirectToExploreDetail");
    }
  };

  const submitForm: SubmitHandler<LoginSchema> = async (data) => {
    setError("");
    try {
      const payload = {
        ...data,
        email: data.emailAddress.toLowerCase(),
      };
      const loginData = await handleApiLogin(payload);
      const authData = {
        token: loginData.accessToken,
        role: loginData.user.roles,
      };
      localStorage.setItem("auth", JSON.stringify(authData));
      await handleNextAuthSignIn(payload);
      if (from === "onboarding") {
        //open popup
        setUserType(authData.role[0]);
      } else {
        handleRedirect();
      }
    } catch (error: any) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Something went wrong, please try again",
      );
    }
  };

  return (
    <section className="mx-auto flex max-w-[1400px] flex-col p-3 lg:flex-row">
      <Carousel />
      <div className="flex flex-grow items-center justify-center p-3">
        <div className="w-full pt-5 sm:w-10/12 lg:pt-0">
          <h2 className="mb-2 text-lg font-medium text-[#190E3F] md:text-4xl">
            Login
          </h2>
          <h3 className="font-clashMedium text-sm text-[#55535A] md:text-2xl">
            Join us for exclusive access to our services
          </h3>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="mt-5 space-y-5"
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm text-[#333236] sm:text-base"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                disabled={isSubmitting}
                className="w-full rounded-2xl border-[1.5px] border-[#E9ECF1] p-2 px-3 font-satoshiMedium outline-none placeholder:text-[#D3D2D5]"
                placeholder="johndoe@gmail.com"
                {...register("emailAddress")}
              />
              <p className="ml-1 mt-1 text-sm text-[#FF0000]">
                {errors.emailAddress?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm text-[#333236] sm:text-base"
              >
                Password
              </label>
              <div className="flex items-center overflow-hidden rounded-2xl border-[1.5px] border-[#E9ECF1] p-2 px-3">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full appearance-none font-satoshiMedium outline-none placeholder:text-[#D3D2D5]"
                  placeholder="Password"
                  disabled={isSubmitting}
                  {...register("password")}
                />
                <div
                  role="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MdVisibilityOff />
                  ) : (
                    <MdVisibility color="[#E9ECF1" />
                  )}
                </div>
              </div>
              <p className="ml-1 mt-1 text-sm text-[#FF0000]">
                {errors.password?.message}
              </p>
            </div>

            {error && (
              <div className="my-1 text-base font-semibold text-status-error-100">
                {error}
              </div>
            )}
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                className="w-full rounded-full px-10 py-2 font-satoshiBold font-bold sm:w-max"
              >
                Submit
              </Button>
            </div>
          </form>

          <p className="mt-3 font-satoshiBold font-bold text-[#190E3F]">
            Dont have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Popup
        isOpen={Boolean(userType)}
        onClose={() => {
          router.replace(
            userType === "CUSTOMER"
              ? "/customer/profile"
              : "/service-provider/profile",
          );
        }}
      >
        <div className="relative mt-6 max-h-[700px] min-w-[320px] max-w-[800px] bg-white p-5 sm:min-w-[560px]">
          <h3 className="mb-2 text-center font-clashSemiBold text-2xl text-[#2A1769] md:mb-4 md:text-4xl">
            Congratulations!!!
          </h3>
          <div className="mx-auto mb-6 max-w-[500px] space-y-3">
            <p className="text-pry-sec-gradient mb-2 text-center text-base font-semibold md:text-2xl">
              You’re officially welcome to the Hub
            </p>
            <p className="text-center text-sm text-[#55535A] sm:text-xl">
              You just unlocked a world of opportunities—whether you’re here to
              get things done or showcase your skills, you’re in the right
              place! 🚀
            </p>
            <p className="text-center text-sm text-[#55535A] sm:text-xl">
              <span className="font-semibold text-[#E58C06]">Next Steps?</span>{" "}
              Complete your profile to stand out and start connecting with the
              right people!
            </p>
          </div>
          <div className="my-3 flex flex-col justify-center gap-3 sm:flex-row">
            {userType && (
              <Link
                href={
                  userType === "CUSTOMER"
                    ? "/customer/add-task"
                    : "/provide-service"
                }
                className="w-full rounded-full border border-primary bg-[#EBE9F4] px-10 py-2 text-center font-satoshiBold font-bold text-primary sm:w-max"
              >
                {userType === "CUSTOMER"
                  ? "Post my first task"
                  : "Create a listing"}
              </Link>
            )}
            <Link
              href={
                userType === "CUSTOMER"
                  ? "/customer/profile"
                  : "/service-provider/profile"
              }
              className="w-full rounded-full bg-primary px-10 py-2 text-center font-satoshiBold font-bold text-white sm:w-max"
            >
              Update Profile
            </Link>
          </div>
          <Image
            src="/assets/icons/popup-design.png"
            alt="Icon"
            width={263}
            height={626}
            className="absolute -left-10 -top-20 hidden aspect-auto h-full w-3/12 sm:-left-8 sm:block"
          />
          <Image
            src="/assets/icons/popup-design.png"
            alt="Icon"
            width={263}
            height={626}
            className="absolute -right-10 top-24 hidden aspect-auto h-full w-3/12 scale-x-[-1] blur-md sm:-right-10 sm:block"
          />
        </div>
      </Popup>
    </section>
  );
}

export default Login;
