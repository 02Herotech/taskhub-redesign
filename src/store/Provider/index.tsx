"use client";

import { Provider as ProviderWrapper } from "react-redux";
import { store, persistor } from "..";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <SessionProvider>
        <ProviderWrapper store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </ProviderWrapper>
      </SessionProvider>
    </>
  );
};

export default Provider;
