import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/layout/HomeNavigation";

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
            <HomeNavigation />
            <div className="min-h-[70vh]">
                {children}
            </div>
            <Footer />
        </main>
    );
}
