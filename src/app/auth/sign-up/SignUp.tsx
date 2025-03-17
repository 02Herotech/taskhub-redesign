"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Carousel from "../Carousel";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema, StepOneSchema } from "./schema";
import { StepTwoSchema, stepTwoSchema } from "./schema";
import { actionChoices, userTypes, passwordRules } from "./data";
import useAbnValidate from "@/hooks/useAbnValidate";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  useCustomerSignupMutation,
  useServiceProviderSignupMutation,
} from "@/services/auth";
import Button from "@/components/global/Button";
import { Input } from "./Inputs";

/**Animation properties for transitioning between components */
const animationProps = (from: "left" | "right" = "left") => {
  const initialAndExit = { x: from == "left" ? -100 : 100, opacity: 0 };
  return {
    initial: initialAndExit,
    animate: { x: 0, opacity: 1 },
    exit: initialAndExit,
    transition: { duration: 0.3, ease: "easeInOut" },
  };
};

function SignUp() {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneSchema | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const [customerSignup] = useCustomerSignupMutation();
  const [serviceProviderSignup] = useServiceProviderSignupMutation();

  //?Step one logic
  const form = useForm<StepOneSchema>({ resolver: zodResolver(stepOneSchema) });
  //Set default values for choices
  useEffect(() => {
    form.setValue("actionChoice", actionChoices[0].action);
    form.setValue("userType", userTypes[0].action);
  }, []);

  const actionChoice = form.watch("actionChoice");
  //Reset ABN input when get-tasks-done is chosen
  useEffect(() => {
    if (actionChoice == "GET_TASKS_DONE") {
      form.setValue("abn", "");
      form.setError("abn", { message: "" });
    }
  }, [actionChoice]);

  const isValidAbn = useAbnValidate({
    abnInput: form.watch("abn"),
    setAbnError: (error: string) => {
      form.setError("abn", { message: error });
    },
  });

  const submitFormOne: SubmitHandler<StepOneSchema> = (data) => {
    if (form.watch("abn") && !isValidAbn) {
      form.setError("abn", { message: "Error occured while validating ABN" });
      return;
    }
    setStepOneData(data);
    setStep(2);
  };
  //?Step one logic

  //?Form two logic
  const [showPassword, setShowPassword] = useState(false);
  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepTwoSchema>({
    resolver: zodResolver(stepTwoSchema),
  });

  const password = watch("password");

  const failingRules = !password
    ? passwordRules.map((rule) => rule.message)
    : passwordRules
        .filter((rule) => !rule.regex.test(password))
        .map((rule) => rule.message);

  const submitFinalForm: SubmitHandler<StepTwoSchema> = async (data) => {
    if (!stepOneData) return;
    const { actionChoice, userType, ...otherInputs } = stepOneData;
    const { confirmPassword, terms, email, ...rest } = data;
    const finalData = {
      ...otherInputs,
      emailAddress: email.toLowerCase(),
      ...rest,
      media: "WEB",
    };
    try {
      actionChoice == "GET_TASKS_DONE"
        ? await customerSignup(finalData).unwrap()
        : await serviceProviderSignup(finalData).unwrap();

      setError("");
      reset();
      router.push(`/auth/verify-email?email=${finalData.emailAddress}`);
    } catch (error: any) {
      console.error("Error while signing up: ", error);
      setError(error?.data?.message || "An unexpected error occurred");
    }
  };
  //?Form two logic
  return (
    <section className="mx-auto flex max-w-[1400px] flex-col p-3 lg:flex-row">
      <Carousel />
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full pt-8 sm:w-10/12 lg:pt-0">
          <h2 className="mb-2 text-xl font-semibold text-[#190E3F] md:text-4xl">
            Create account
          </h2>
          <h3 className="font-clashMedium text-sm text-[#55535A] md:text-2xl">
            Join us for exclusive access to our services
          </h3>
          <AnimatePresence initial={false} mode="wait">
            {step === 1 ? (
              <motion.form
                onSubmit={form.handleSubmit(submitFormOne)}
                className="mt-5 grid grid-cols-2 gap-3 gap-y-5"
                autoComplete="off"
                {...animationProps()}
                key="step-one"
              >
                <Input
                  label="First name"
                  id="firstName"
                  placeholder="Enter First name"
                  {...form.register("firstName")}
                  error={form.formState.errors.firstName?.message}
                />

                <Input
                  id="lastName"
                  label="Last name"
                  placeholder="Enter Last name"
                  {...form.register("lastName")}
                  error={form.formState.errors.lastName?.message}
                />

                <p className="col-span-2 -mb-2">
                  What do you want to do on Olójà at this time?
                </p>
                <div className="col-span-2 flex cursor-pointer flex-col items-start gap-3 sm:flex-row sm:items-center">
                  {actionChoices.map((choice) => (
                    <div
                      className="flex w-full items-center gap-3 rounded-lg border border-[#EBE9F4] p-2 sm:w-1/2"
                      onClick={() => {
                        form.setValue("actionChoice", choice.action);
                      }}
                      key={Math.random() * 1234}
                    >
                      <div className="flex size-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#E58C06] bg-white p-1">
                        {actionChoice == choice.action && (
                          <div className=" aspect-square w-10/12 rounded-full bg-[#E58C06]" />
                        )}
                      </div>
                      <img src={choice.imageUrl} alt="Icon" />
                      <div>
                        <h2 className="text-sm font-semibold text-[#AC6905]">
                          {choice.title}
                        </h2>
                        <small className="max-w-[70px] text-[12px] leading-3 text-[#4E5158]">
                          {choice.description}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="col-span-2 -mb-2">
                  How would you describe yourself?
                </p>
                <div className="col-span-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  {userTypes.map((choice) => (
                    <div
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#EBE9F4] p-2 sm:w-1/2"
                      onClick={() => form.setValue("userType", choice.action)}
                      key={Math.random() * 1234}
                    >
                      <div className="flex size-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white p-1">
                        {form.watch("userType") == choice.action && (
                          <div className=" aspect-square w-10/12 rounded-full bg-primary" />
                        )}
                      </div>
                      <img
                        src={choice.imageUrl}
                        alt="Icon"
                        className="size-10 object-cover"
                      />
                      <div>
                        <h2 className="text-sm font-semibold text-primary">
                          {choice.title}
                        </h2>
                        <small className="max-w-[70px] text-[12px] leading-3 text-[#4E5158]">
                          {choice.description}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <Input
                    id="abn"
                    maxLength={11}
                    placeholder="12345678901"
                    label="ABN (where applicable)"
                    inputMode="numeric"
                    {...form.register("abn")}
                    error={form.formState.errors.abn?.message}
                  />
                </div>

                <div className="col-span-2 my-3">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-10 py-2 font-satoshiBold font-bold text-white sm:w-max"
                  >
                    Next
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                className="space-y-5 py-10"
                key="step-two"
                onSubmit={handleSubmit(submitFinalForm)}
                {...animationProps("right")}
              >
                <Input
                  type="email"
                  id="email"
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  {...register("email")}
                  disabled={isSubmitting}
                  error={errors.email?.message}
                />

                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm text-[#333236] sm:text-base"
                  >
                    Password
                  </label>
                  <div className="flex w-full items-center rounded-2xl border-[1.5px] border-[#E9ECF1] p-2 px-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full font-satoshiMedium outline-none placeholder:text-[#D3D2D5]"
                      placeholder="*************"
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

                <div className="w-full">
                  <label
                    htmlFor="confirm-password"
                    className="mb-1 block text-sm text-[#333236] sm:text-base"
                  >
                    Confirm password
                  </label>
                  <div className="flex w-full items-center rounded-2xl border-[1.5px] border-[#E9ECF1] p-2 px-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirm-password"
                      className="w-full font-satoshiMedium outline-none placeholder:text-[#D3D2D5]"
                      placeholder="*************"
                      disabled={isSubmitting}
                      {...register("confirmPassword")}
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
                    {errors.confirmPassword?.message}
                  </p>
                </div>

                <ul>
                  {failingRules.map((msg, index) => (
                    <li
                      key={Math.random() * 1234}
                      style={{ color: "red" }}
                      className="text-xs"
                    >
                      ❌ {msg}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-1">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms")}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="terms" className="">
                    I agree to all{" "}
                    <Link
                      href="/terms-and-condition"
                      className="text-primary underline"
                    >
                      {" "}
                      Terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">
                      Privacy.
                    </Link>
                  </label>
                  <p className="ml-1 mt-1 w-full text-sm text-[#FF0000]">
                    {errors.terms?.message}
                  </p>
                </div>
                {errors.password?.types &&
                  Object.values(errors.password.types).map((msg) => (
                    <p
                      key={Math.random() * 1234}
                      className="ml-1 mt-1 text-sm text-[#FF0000]"
                    >
                      {msg}
                    </p>
                  ))}

                {error && (
                  <div className="my-2 text-base font-semibold text-status-error-100">
                    {error}
                  </div>
                )}
                <div className="my-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                    className="w-full rounded-full border border-primary bg-[#EBE9F4] px-10 py-2 font-satoshiBold font-bold text-primary sm:w-max"
                  >
                    Back
                  </button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="w-full rounded-full px-10 py-2 font-satoshiBold font-bold sm:w-max"
                  >
                    Submit
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="font-satoshiBold font-bold text-[#190E3F]">
            Have an existing account?{" "}
            <Link href="/auth/login" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
