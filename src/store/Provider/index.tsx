"use client";

import { Provider as ProviderWrapper } from "react-redux";
import { store } from "..";
import { SessionProvider } from "next-auth/react";

type ProviderProps = {
	children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
	return (
		<>
			<SessionProvider>
				<ProviderWrapper store={store}>{children}</ProviderWrapper>
			</SessionProvider>
		</>
	);
};

export default Provider;
