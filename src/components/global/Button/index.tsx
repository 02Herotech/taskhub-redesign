"use client";

import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { ButtonProps } from "@/types/global/ButtonProps";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Button: React.FC<ButtonProps> = ({
	loading = false,
	onClick,
	disabled,
	theme = "primary",
	icon = null,
	href,
	size = "md",
	underline = true,
	outline = false,
	isExternal = false,
	children,
	tag,
	className,
	type = "button",
	...rest
}) => {
	const router = useRouter();

	const pathname = usePathname();

	const buttonTheme = (theme: string) => {
		switch (theme) {
			case "primary":
				return "bg-primary disabled:opacity-50 text-white border-2 border-primary rounded-lg";
			case "plain":
				return ``;
			case "outline":
				return `bg-[#EBE9F4] text-primary border border-primary rounded-lg`;
			case "secondary":
				return "bg-tc-orange text-white rounded-lg";
			default:
				return "bg-primary text-white border-2 border-transparent rounded-lg";
		}
	};

	const LinkTheme = (theme: string) => {
		switch (theme) {
			case "primary":
				return "text-primary";
			case "secondary":
				return "text-secondary";
			case "plain":
				return "";
			default:
				return "text-primary";
		}
	};

	const buttonSize = (size: string) => {
		switch (size) {
			case "sm":
				return "px-4 py-2 h-9";
			case "md":
				return "px-6 py-3 h-11";
			case "lg":
				return "py-4 h-[59.98px]";
			case "xl":
				return "px-10 py-5";
			default:
				return "px-6 py-3";
		}
	};

	const iconColor = (theme: string) => {
		switch (theme) {
			case "primary":
				return "#fff";
			case "outline":
				return "#5645F5";
			default:
				return "#fff";
		}
	};

	if (tag === "a") {
		return (
			<Link
				href={
					isExternal
						? !href?.includes("https" || "http")
							? `https://${href}`
							: href
						: href || pathname
				}
				target={isExternal ? "_blank" : "_self"}
				className={cn(LinkTheme(theme), { underline: underline }, className)}>
				{children}
			</Link>
		);
	}

	return (
		<button
			type={type}
			disabled={disabled || loading}
			onClick={onClick}
			className={cn(
				"flex items-center hover:scale-[1.015] justify-center transition-all ease-in text-center font-semibold disabled:cursor-not-allowed",
				buttonTheme(theme),
				buttonSize(size),
				className
			)}
			{...rest}>
			{loading ? (
				<BeatLoader color={iconColor(theme)} loading={loading} size={12} />
			) : (
				children
			)}
		</button>
	);
};

export default Button;
