import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { UserDataType } from "@/lib/validation/userData.schema";
import { BiCheck } from "react-icons/bi";

interface FormFieldProps {
  label: string;
  name: keyof UserDataType;
  register: UseFormRegister<UserDataType>;
  errors: FieldErrors<UserDataType>;
  watch: UseFormWatch<UserDataType>;
  disabled: boolean;
  readonly?: boolean;
  as?: "input" | "textarea";
  defaultValue?: string;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  errors,
  watch,
  disabled,
  readonly = false,
  as = "input",
  defaultValue,
  ...props
}) => {
  const watchedValue = watch(name);
  const {watchField, ...rest} = props
  return (
    <label className="flex w-full flex-col gap-3 text-violet-normal">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        {!errors[name] && watchedValue && String(watchedValue).length >= 2 && (
          <BiCheck className="size-5 rounded-full bg-green-500 p-1 text-white" />
        )}
      </span>
      {as === "input" ? (
        <input
          type="text"
          disabled={disabled}
          readOnly={readonly}
          className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
          {...register(name)}
          defaultValue={defaultValue}
          {...rest}
        />
      ) : (
        <textarea
          disabled={disabled}
          className="rounded-xl border border-slate-100 p-2 text-slate-700 shadow outline-none transition-shadow duration-300 hover:shadow-md lg:max-w-sm"
          {...register(name)}
          {...rest}
        />
      )}
    </label>
  );
};

export default FormField;
