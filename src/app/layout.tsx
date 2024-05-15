import type { Metadata } from "next";
import { clashDisplay, satoshi } from "@/fonts";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { cn } from "@/lib/utils";
import Provider from "@/store/Provider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

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
          <Navigation />
          <main className='mt-[20px] py-10 xl:py-20'>
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
