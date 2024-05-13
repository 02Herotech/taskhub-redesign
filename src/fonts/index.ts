import localFont from "next/font/local";

export const clashDisplay = localFont({
	src: [
		{
			path: "./clashDisplay/ClashDisplayRegular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./clashDisplay/ClashDisplayLight.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "./clashDisplay/ClashDisplayMedium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./clashDisplay/ClashDisplaySemibold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "./clashDisplay/ClashDisplayBold.otf",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-clashDisplay",
});
