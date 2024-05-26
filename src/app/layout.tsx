import type { Metadata } from "next";
import "./globals.css";
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
      <body>
        <Provider>
          <main className=''>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
