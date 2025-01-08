import { cn } from "@/lib/utils";
import type { InputProps } from "@/types/global/InputProps";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type ValidationResult = boolean | string;

export type ValidationRules = {
  email: (value: string, label?: string) => ValidationResult;
  required: (value: string, label?: string) => ValidationResult;
  phone: (value: string, label?: string) => ValidationResult;
  altPhone: (value: string, label?: string) => ValidationResult;
  password: (value: string, label?: string) => ValidationResult;
  otp: (value: string, label?: string) => ValidationResult;
  bvn: (value: string, label?: string) => ValidationResult;
  confirmPassword: (value: string, label?: string) => ValidationResult;
  noSpaces: (value: string, label?: string) => ValidationResult;
  NGNBankAccountNumber: (value: string, label?: string) => ValidationResult;
  textOnly: (value: string, label?: string) => ValidationResult;
};

const Input = ({
  label,
  placeholder,
  type = "text",
  id,
  onChange = () => {},
  max,
  min,
  pattern,
  rules = [],
  name,
  autoComplete = "off",
  disabled = false,
  theme = "outline",
  focused = false,
  optional = false,
  className = "",
  showPassword: _showPassword = false,
  left,
  right,
  paddingLeft = "",
  paddingRight = "",
  customError,
  customMessage,
  characters = 50,
  hint,
  info = {},
  tag = "input",
  isLoading = false,
  ...rest
}: InputProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(_showPassword);
  const [passwordCheck, setPasswordCheck] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    length: false,
  });
  const [passwordIsDirty, setPasswordIsDirty] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const methods = useFormContext();

  const {
    watch,
    formState: { isDirty },
  } = methods;

  const validationRules: ValidationRules = {
    required: (value, label = "") => {
      if (value !== null && value !== undefined && value !== "") return true;
      else return `The ${label} field is required`;
    },
    email: (value, label = "") => {
      const match = value
        .toString()
        .match(
          /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/,
        );
      return match ? true : `Please enter a valid email`;
    },
    password: (value, label = "") => {
      const messages: string[] = [];

      if (!/[A-Z]/g.test(value)) {
        messages.push("an uppercase letter");
      }
      if (!/[a-z]/g.test(value)) {
        messages.push("a lowercase letter");
      }
      if (!/[0-9]/g.test(value)) {
        messages.push("a number");
      }
      if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g.test(value)) {
        messages.push("a special character");
      }
      if (value.length < 8) {
        messages.push("at least 8 digits");
      }

      const message =
        messages.length > 1
          ? `${messages.slice(0, -1).join(", ")} and ${messages.slice(-1)}`
          : `${messages.join(", ")}`;
      return messages.length > 0
        ? `The ${label} field must have ${message}`
        : true;
    },
    otp: (value, label = "") => {
      return value.length === 6
        ? true
        : `The ${label} field must be of length 6`;
    },
    bvn: (value, label = "") => {
      return value?.length === 11
        ? true
        : `The ${label} field must be of length 11`;
    },
    phone: (value, label = "") => {
      return value.length <= 10
        ? true
        : `The ${label} field must be less than or equal to 12 digits`;
    },
    altPhone: (value, label = "") => {
      return value.length <= 12
        ? true
        : `The ${label} field must be less than or equal to 12 digits`;
    },
    confirmPassword: (value, label = "") => {
      return value === watch("password") || value === watch("new_password")
        ? true
        : `Passwords do not match`;
    },
    noSpaces: (value, label = "") => {
      return !value.includes(" ")
        ? true
        : `The ${label} field is not allowed to contain spaces`;
    },
    NGNBankAccountNumber: (value, label = "") => {
      return value.length === 10
        ? true
        : `The ${label} field must be equal to 10 digits`;
    },
    textOnly: (value, label = "") => {
      return /^[a-zA-Z\s]*$/.test(value)
        ? true
        : `The ${label} field must contain only alphabets`;
    },
  };

  const computedRules = rules.reduce<{
    [index: string]: (param: string) => ValidationResult;
  }>((map, key) => {
    map[key] = (value) => validationRules[key](value, label || name);
    return map;
  }, {});

  const { error } = methods.getFieldState(name);

  const register = methods.register(name, {
    validate: computedRules,

    pattern: pattern
      ? {
          value: new RegExp(pattern),
          message:
            errorMessage ||
            `The ${label} field doesn't satisfy the regex ${pattern}`,
        }
      : undefined,
    min: min
      ? {
          value: min,
          message: `The ${label} field must be greater than or equal to ${min}`,
        }
      : undefined,
    max: max
      ? {
          value: max,
          message: `The ${label} field must be less than or equal to ${max}`,
        }
      : undefined,
  });

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    }
  }, [focused]);

  const watchPassword = watch("password") || watch("new_password") || "";

  const value = watch(name);

  useEffect(() => {
    setPasswordCheck({
      ...passwordCheck,
      uppercase: /[A-Z]/g.test(watchPassword),
      lowercase: /[a-z]/g.test(watchPassword),
      number: /[0-9]/g.test(watchPassword),
      special: /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/g.test(watchPassword),
      length: watchPassword?.length >= 8,
    });
  }, [watchPassword]);

  const inputTheme = (theme: string) => {
    switch (theme) {
      case "outline":
        return `p-4 bg-white text-tc-secondary border-[1.5px] disabled:bg-[#83819729] disabled:border-[#83819729] ${
          error
            ? "border-[#E98282] focus:border-[#E98282]"
            : "border-[#5B5B66] focus:border-primary"
        }`;
      case "plain":
        return "p-4 bg-transparent border-[1.5px] border-transparent";
      default:
        return "bg-white border-[1.5px] border-[#5B5B66]";
    }
  };

  if (tag === "textarea")
    return (
      <label htmlFor={id} className="relative flex flex-col">
        <span className="mb-2 flex w-full items-center space-x-2 text-left text-base leading-5">
          <span className="font-medium capitalize text-[#333236]">{label}</span>
        </span>
        <textarea
          {...register}
          className={cn(
            "text-tc-main focus:bg-pc-02 w-full active:border-primary",
            inputTheme(theme),
            "overflow-hidden rounded-[10px] text-sm font-normal outline-none",
            className,
          )}
          rows={10}
          placeholder={placeholder}
          id={id}
          onChange={(event) => {
            register.onChange(event);
            onChange(event as any);
          }}
          ref={(e) => {
            register.ref(e);
          }}
          disabled={disabled}
        />

        {/* <span
					className={cn(
						"text-sm text-primary font-medium absolute right-0 -bottom-6",
						{ "text-[#E98282]": value.length > characters - 25 }
					)}>
					{value.length}/{characters}
				</span> */}

        {!rules.includes("password") && (error || customError) && (
          <span className="mt-2 text-left text-[18px] text-[#E98282]">
            *{customError || error?.message}
          </span>
        )}
      </label>
    );

  return (
    <div>
      <span className="mb-[6px] flex w-full items-center space-x-2 text-left text-base leading-5">
        <span className="font-medium capitalize text-[#333236]">{label}</span>
      </span>
      <label htmlFor={id} className="relative flex flex-col">
        <input
          onFocus={() => setPasswordIsDirty(true)}
          {...register}
          className={`w-full text-dark active:border-primary ${inputTheme(
            theme,
          )} h-12 overflow-hidden rounded-[10px] text-base font-normal outline-none ${className} ${
            type === "password" ? "pr-16" : ""
          } ${left ? paddingLeft : ""} ${right ? paddingRight : ""}`}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          id={id}
          onChange={(event) => {
            register.onChange(event);
            onChange(event);
          }}
          ref={(e) => {
            register.ref(e);
            inputRef.current = e;
          }}
          disabled={disabled}
          {...rest}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[2px] top-2 flex w-12 cursor-pointer items-center justify-center focus:border-primary focus:outline-primary"
          >
            {!showPassword ? (
              <IoMdEye className="h-7 w-7" />
            ) : (
              <IoMdEyeOff className="h-7 w-7" />
            )}
          </button>
        )}

        {right && (
          <div className="absolute right-[2px] top-[30px] flex h-[44px] items-center justify-center">
            {right}
          </div>
        )}

        {left && (
          <div className="absolute left-[2px] top-[30px] flex h-[44px] items-center justify-center">
            {left}
          </div>
        )}

        {!rules.includes("password") && (error || customError) && (
          <span className="mt-2 flex items-center space-x-1 text-sm text-status-error-100">
            <MdErrorOutline className="h-5 w-5 text-status-error-100" />
            <h6>{customError || error?.message}</h6>
          </span>
        )}

        {passwordIsDirty && rules.includes("password") && (
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-start text-[12px]">
              {(!passwordCheck.lowercase || !passwordCheck.uppercase) && (
                <MdErrorOutline className="mr-4 h-5 w-5 text-status-error-100" />
              )}
              {!passwordCheck.lowercase && (
                <span className="mr-1 text-status-error-100">
                  A lowercase
                  {!passwordCheck.uppercase && (
                    <span> and uppercase letter</span>
                  )}
                </span>
              )}
              {!passwordCheck.uppercase && passwordCheck.lowercase && (
                <span className="text-status-error-100">
                  An uppercase letter
                </span>
              )}
            </div>

            <div
              className={
                passwordCheck.length
                  ? "hidden"
                  : "flex items-center space-x-4 text-[12px] text-status-error-100"
              }
            >
              <MdErrorOutline className="h-5 w-5" />
              <span className="">At least 8 characters</span>
            </div>

            <div className="flex items-start text-[12px]">
              {(!passwordCheck.special || !passwordCheck.number) && (
                <MdErrorOutline className="mr-4 h-5 w-5 text-status-error-100" />
              )}
              {!passwordCheck.special && (
                <span className="mr-1 text-status-error-100">
                  1 special character
                  {!passwordCheck.number && <span> and 1 number</span>}
                </span>
              )}
              {!passwordCheck.number && passwordCheck.special && (
                <span className="text-status-error-100">1 number</span>
              )}
            </div>
          </div>
        )}

        {customMessage && (
          <span className="text-status-success-100 mt-2 text-left text-sm">
            {customMessage}
          </span>
        )}

        {hint && !customError && !error && !customMessage && (
          <span className="text-tc-03 mt-2 text-left text-sm">{hint}</span>
        )}
      </label>
    </div>
  );
};

export default Input;
