import React, { useState, FC, forwardRef } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | undefined | null;
  label: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={props.id}
          className="mb-1 block text-sm text-[#333236] sm:text-base"
        >
          {label}
        </label>
        <input
          className="w-full rounded-2xl border-[1.5px] border-[#E9ECF1] p-2 px-3 font-satoshiMedium outline-none placeholder:text-[#D3D2D5]"
          {...props}
          ref={ref}
        />
        {error && <p className="ml-1 mt-1 text-sm text-[#FF0000]">{error}</p>}
      </div>
    );
  },
);

//Set Display name for beteer debugging in react
Input.displayName = "SignupInput";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error: string | undefined | null;
  label: string;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  label,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full">
      <label
        htmlFor={props.id}
        className="mb-1 block text-sm text-[#333236] sm:text-base"
      >
        {label}
      </label>
      <div className="flex w-full items-center rounded-2xl border-[1.5px] border-[#E9ECF1] p-2 px-3">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="w-full font-satoshiMedium outline-none placeholder:text-[#D3D2D5]"
          placeholder="*************"
        />
        <div role="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <MdVisibilityOff />
          ) : (
            <MdVisibility color="[#E9ECF1" />
          )}
        </div>
      </div>
      {error && <p className="ml-1 mt-1 text-sm text-[#FF0000]">{error}</p>}
    </div>
  );
};
