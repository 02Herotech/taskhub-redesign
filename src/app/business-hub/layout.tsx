import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import HomeNavigation from "@/components/layout/HomeNavigation";
import BlogNavbar from "@/components/business-hub/BlogNavbar";

export const metadata: Metadata = {
  title: "Oloja Business HUB",
  description:
    "Discover expert insights, tips, and inspiring stories on business growth, entrepreneurship, and achieving success. Stay ahead with our curated business hub.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await fetch(process.env.BLOG_API + "/postCategory");
  const categories: { docs: { title: string; slug: string }[] } =
    await result.json();
  return (
    <main className="min-w-80">
      <HomeNavigation />
      <BlogNavbar links={categories.docs} />
      <div className="">{children}</div>
      <Footer />
    </main>
  );
}
