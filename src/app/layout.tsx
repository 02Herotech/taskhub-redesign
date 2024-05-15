import type { Metadata } from "next";
import { clashDisplay, satoshi } from "@/fonts";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { cn } from "@/lib/utils";
import Provider from "@/store/Provider";

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
        <Provider>
          <main className=''>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
