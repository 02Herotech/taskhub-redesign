import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/store/Provider";

export const metadata: Metadata = {
  title: "Olojà",
  description: "Olojà is an AI-driven platform that transcends boundaries, connecting diverse communities with a world of authentic products and services.",
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
