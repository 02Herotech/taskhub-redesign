import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const currencySymbolMap = {
	NGN: "₦",
	USD: "$",
	GBP: "£",
	EUR: "€",
	jungle_coin: "",
};

export type currencySymbol = keyof typeof currencySymbolMap;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
	if (!input) return "";
	const date = new Date(input);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function numberWithCommas(x: string | number) {
	return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatAmount(
	amount: number,
	currency?: currencySymbol,
	isSubunit: boolean = true,
	subUnitValue: number = 100
): string {
	const amountInSubunit = isSubunit ? amount / subUnitValue : amount;
	if (currency) {
		const currencySymbol = currencySymbolMap[currency];
		return `${currencySymbol}${numberWithCommas(
			Number(amountInSubunit).toFixed(2)
		)}`;
	}
	return numberWithCommas(Number(amountInSubunit).toFixed(2));
}

export function convertAmountToSubunit(
	amount: number,
	isSubUnit = true
): number {
	if (isSubUnit) {
		return amount * 100;
	}
	return amount;
}

export function formatCardNumber(cardNumber: string): string {
	const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
	return formattedCardNumber;
}

export function listenForOutsideClicks(
	listening: boolean,
	setListening: (listening: boolean) => void,
	menuRef: React.RefObject<HTMLDivElement> | any,
	setIsOpen: (isOpen: boolean) => void
) {
	return () => {
		if (listening) return;
		if (!menuRef.current) return;
		setListening(true);
		[`click`, `touchstart`].forEach((type) => {
			document.addEventListener(`click`, (evt) => {
				const cur = menuRef.current;
				const node = evt.target;
				try {
					if (cur.contains(node)) return;
					setIsOpen(false);
				} catch (error) {}
			});
		});
	};
}

export function formatNumber(number: number): string {
	const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

	const tier = Math.floor(Math.log10(number) / 3);

	if (tier === 0) {
		return number.toString();
	}

	const suffix = SI_SYMBOL[tier];
	const scale = Math.pow(10, tier * 3);

	const scaled = number / scale;

	return scaled.toFixed() + suffix;
}
