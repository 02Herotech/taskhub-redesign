"use client";

import { Provider as ProviderWrapper } from "react-redux";
import { store } from "..";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

type ProviderProps = {
	children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
	return (
		<>
			<SessionProvider>
				<ToastContainer />
				<ProviderWrapper store={store}>{children}</ProviderWrapper>
			</SessionProvider>
		</>
	);
};

export default Provider;
