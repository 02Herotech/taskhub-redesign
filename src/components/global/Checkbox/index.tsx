import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

type CheckboxProps = {
	name: string;
	label?: string | JSX.Element;
	value?: boolean;
	onChange?: (value: boolean) => void;
	checked?: boolean;
	size?: "sm" | "md" | "lg";
	id?: string;
	required?: boolean;
	labelClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Checkbox = ({
	label,
	size = "md",
	value,
	onChange,
	id,
	name,
	required = false,
	labelClassName,
	checked,
	...rest
}: CheckboxProps) => {
	const checkboxSize = (size: string) => {
		switch (size) {
			case "sm":
				return "h-4 w-4";
			case "md":
				return "h-[18px] w-[18px]";
			case "lg":
				return "h-8 w-8";
			default:
				return "h-6 w-6";
		}
	};

	const { register } = useFormContext();

	return (
		<div className='flex'>
			<div className='flex items-center'>
				<input
					className={`${checkboxSize(
						size
					)} relative form-check-input appearance-none border-2 border-[#D0D5DD] rounded-sm bg-transparent checked:bg-primary checked:border-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-3 cursor-pointer  outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]`}
					type='checkbox'
					id={id}
					value={id}
					{...rest}
					{...register(name, {
						required,
					})}
					onChange={(e) => {
						if (onChange) {
							onChange(e.target.checked);
						}
					}}
				/>
				<label
					className={cn("text-black-800 w-[calc(100%-24px)]", labelClassName)}
					htmlFor={id}>
					{label}
				</label>
			</div>
		</div>
	);
};

export default Checkbox;
