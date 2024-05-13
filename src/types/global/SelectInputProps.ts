type Option<T> = T & {
	isUnselectedable?: boolean;
};

export type SelectInputProps<T> = {
	/**
	 * the label for the select input
	 * @type {string}
	 * @example
	 * <SelectInput label="Select a country" />
	 * @default ""
	 */
	label?: string;
	/** the name of the select input
	 * @type {string}
	 * @example
	 * <SelectInput name="country" />
	 * @default ""
	 * @required
	 */
	name: string;
	/** the options for the select input
	 * @type {T[]}
	 * @example
	 * <SelectInput options={[{name: "Nigeria", code: "NG"}, {name: "Ghana", code: "GH"}]} />
	 * @default []
	 * @required
	 * @note the options must be an array of objects
	 */
	options: Option<T>[];
	/** the value of the select input
	 * @type {string | any}
	 * @example
	 * <SelectInput value="NG" />
	 * @default ""
	 * @required
	 */
	value?: string | any;
	/** the position of the dropdown
	 * @type {"top" | "bottom"}
	 * @example
	 * <SelectInput position="top" />
	 * @default "bottom"
	 */
	position?: "top" | "bottom";
	/** the onChange event handler
	 * @type {(e: React.ChangeEvent<HTMLSelectElement>) => void}
	 * @example
	 * <SelectInput onChange={(e) => console.log(e.target.value)} />
	 * @default () => {}
	 */
	variant?: "default" | "outlined";
	/** the type of the select input
	 * @type {"default" | "outlined"}
	 * @example
	 * <SelectInput variant="outlined" />
	 * @default "default"
	 */
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	/** the errors object from react-hook-form
	 * @type {any}
	 * @example
	 * <SelectInput errors={errors} />
	 * @default {}
	 */
	errors?: any;
	/** is the select input required?
	 * @type {boolean}
	 * @example
	 * <SelectInput required />
	 * @default false
	 */
	required?: boolean;
	/** the header for the options dropdown
	 * @type {JSX.Element}
	 * @example
	 * <SelectInput optionsHeader={<input type="search" placeholder="search" className="text-sm text-gray-500"/>} />
	 * @default undefined
	 * @note this is optional
	 */
	optionsHeader?: JSX.Element;
	/**
	 * disable the select input
	 * @default false
	 * @type {boolean}
	 * @example
	 * <SelectInput disabled />
	 */
	disabled?: boolean;
	/** the custom option component
	 * @type {(option: T, selectedOption: T) => JSX.Element}
	 * @example
	 * <SelectInput optionComponent={(option, selectedOption) => <div>{option.name}</div>} />
	 * @required
	 * @default undefined
	 */
	isLoading?: boolean;
	/** loading state for the select input
	 * @type {boolean}
	 * @example
	 * <SelectInput isLoading />
	 * @default false
	 * @note this is optional
	 */
	optionComponent: (option: T, selectedOption: T) => JSX.Element;
	/**
	 * customise the trigger button
	 */
	trigger: (selectedOption: T) => JSX.Element;
	/**
	 * the option that was selected
	 * @type {T}
	 * @example
	 * <SelectInput onOptionSelect={(selectedOption) => console.log(selectedOption)} />
	 * @default undefined
	 * @note this is optional
	 */
	onOptionSelect?: (selectedOption: T) => void;
	/**
	 * the function to call when the dropdown is closed
	 * @type {() => void}
	 * @example
	 * <SelectInput onDropdownClose={() => console.log("dropdown closed")} />
	 * @default undefined
	 * @note this is optional
	 */
	onDropdownClose?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;
