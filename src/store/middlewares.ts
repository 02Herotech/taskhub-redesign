import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger: Middleware =
	() => (next) => async (action) => {
		if (isRejectedWithValue(action)) {
			if (!navigator.onLine)
				toast?.error("You do not have an active internet connection");
			if (
				(action.payload as { status: number })?.status === 401 &&
				// @ts-ignore
				!action.meta.baseQueryMeta.request.url.includes("signin")
			) {
				await signOut();
			}
		}

		return next(action);
	};
