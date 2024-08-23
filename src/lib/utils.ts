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

export const monthNames = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];

export const dayOfWeekNames = [
	"Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat",
];

export const suffixes = ["th", "st", "nd", "rd"];

export const getYesterday = () => {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return yesterday;
}

export const STORAGE_KEY = 'inspectionData';

export const saveToLocalStorage = (data: any) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getFromLocalStorage = () => {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : null;
};

export const clearLocalStorage = () => {
	localStorage.removeItem(STORAGE_KEY);
};

export const revisions = [
	"I need the service redone",
	"I need time to inspect task",
	"I’m dissatisfied with the service",
	"I didn’t receive any service",
	"Others"
];

export const inspectionTimes = ['1 hour', '3 hours', '5 hours', '24 hours', '3 days', '5 days', '7 days'];

export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<F>): void => {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => func(...args), waitFor);
	};
}

type Timestamp = number[];

export const formatTimeAgo = (timestamp: Timestamp): string => {
	// Ensure we have at least year, month, and day
	if (timestamp.length < 3) {
		return 'Invalid date';
	}

	const date = new Date(
		timestamp[0], // year
		(timestamp[1] || 1) - 1, // month (0-indexed), default to January if not provided
		timestamp[2] || 1, // day, default to 1 if not provided
		timestamp[3] || 0, // hour, default to 0 if not provided
		timestamp[4] || 0, // minute, default to 0 if not provided
		timestamp[5] || 0, // second, default to 0 if not provided
		(timestamp[6] || 0) / 1000000 // milliseconds, default to 0 if not provided
	);

	// Add 1 hour from the date
	date.setHours(date.getHours() + 1);

	const now = new Date();
	const secondsAgo = Math.round((now.getTime() - date.getTime()) / 1000);

	if (secondsAgo < 30) return 'Just now';
	if (secondsAgo < 60) return `${secondsAgo} seconds ago`;

	const minutesAgo = Math.round(secondsAgo / 60);
	if (minutesAgo < 60) return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;

	const hoursAgo = Math.round(minutesAgo / 60);
	if (hoursAgo < 24) return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;

	const daysAgo = Math.round(hoursAgo / 24);
	if (daysAgo < 30) return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;

	const monthsAgo = Math.round(daysAgo / 30);
	if (monthsAgo < 12) return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;

	const yearsAgo = Math.round(monthsAgo / 12);
	return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
};


export function formatTime24Hour(timeArray: [number, number] | null): string {
	// Check if the input is null
	if (timeArray === null) {
		return "Flexible";
	}

	const [hours, minutes] = timeArray;

	// Check if the input is valid
	if (hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) {
		return "Invalid time input";
	}

	// Format the time in 24-hour format
	const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

	return formattedTime;
}