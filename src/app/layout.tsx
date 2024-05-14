import type { Metadata } from "next";
import { clashDisplay, satoshi } from "@/fonts";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthSessionProvider } from "@/lib/SessionProvider";
import { StoreProvider } from "@/lib/StoreProvider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Taskhub",
  description: "Taskhub is a task management and booking app built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(clashDisplay.className, satoshi.className)}>
        <StoreProvider>
          <AuthSessionProvider>
            {children}
            <ToastContainer position="top-right" autoClose={7000} />
          </AuthSessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
