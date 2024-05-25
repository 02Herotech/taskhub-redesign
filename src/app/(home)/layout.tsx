import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

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
        <main>
            <Navigation />
            <div className="min-h-[70vh]">
                {children}
            </div>
            <Footer />
        </main>
    );
}
