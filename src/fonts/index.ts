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
	// display: "swap",
	variable: "--font-clashDisplay",
});

export const satoshi = localFont({
	src: [
		{
			path: "./satoshi/Satoshi-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./satoshi/Satoshi-Light.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "./satoshi/Satoshi-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./satoshi/Satoshi-Bold.otf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./satoshi/Satoshi-Black.otf",
			weight: "900",
			style: "normal",
		},
		{
			path: "./satoshi/Satoshi-Italic.otf",
			weight: "400",
			style: "italic",
		},
		{
			path: "./satoshi/Satoshi-LightItalic.otf",
			weight: "300",
			style: "italic",
		},
		{
			path: "./satoshi/Satoshi-MediumItalic.otf",
			weight: "500",
			style: "italic",
		},
		{
			path: "./satoshi/Satoshi-BoldItalic.otf",
			weight: "700",
			style: "italic",
		},
		{
			path: "./satoshi/Satoshi-BlackItalic.otf",
			weight: "900",
			style: "italic",
		},
	],
	// display: "swap",
	variable: "--font-satoshi",
});
