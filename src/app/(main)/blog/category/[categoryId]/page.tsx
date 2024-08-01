"use client";

import BigPostCard from "@/components/blog/BigPostCard";
import Newsletter from "@/components/newsletter/Newsletter";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";

const BlogCategoryPage = () => {
    const categories = ["Afrik immigrant", "Business & Finance", "Housing & Accommodation", "Medical & Education", "Career & Transports"]
    const router = useRouter();
    const pathname = usePathname();

    const [blog, setBlog] = useState<BlogTypes | null>(null);
    const [allBlogs, setallBlogs] = useState<BlogTypes[] | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const tempBlog = localStorage.getItem("blogs");
        if (tempBlog) {
            const blogs: BlogTypes[] = JSON.parse(tempBlog);
            setallBlogs(blogs);
        }
    }, []);

    const categoryName = decodeURIComponent(pathname.split("/").pop() ?? "");

    return (
        <main className="container mt-20 min-h-96 max-w-screen-xl space-y-14 px-4 py-10">

            {/* Search */}
            <div className="relative w-full mb-14">
                <div className="flex items-center justify-center">
                    <Image
                        src="/assets/images/blog/blog_banner.png"
                        alt="Blog banner"
                        width={1200}
                        quality={100}
                        height={202}
                        className="rounded-3xl"
                    />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1/2 max-w-md text-[#C1BADB]">
                    <div className="relative w-full flex">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
                            <CiSearch className="size-5" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-12 pr-4 py-3 rounded-2xl drop-shadow-lg bg-[#EEEEEF] appearance-none outline-none border-none placeholder:text-[#C1BADB]"
                        />
                    </div>
                </div>
            </div>

            {/* Selected Category */}
            <div className="flex items-center space-x-3 lg:px-20 lg:mb-14">
                <div
                    className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-white font-semibold cursor-pointer hover:scale-105 transition-all py-3 px-6 bg-primary"
                >
                    {categoryName}
                </div>
                <div className="border border-primary p-2 rounded-full cursor-pointer" onClick={() => router.push("/blog")}>
                    <IoCloseCircleOutline className="size-6 text-primary" />
                </div>
            </div>

            <hr className="border-[1.5px] border-[#CACACC]" />

            <div className="lg:grid lg:grid-cols-12 max-sm:space-y-5 gap-7">
                <div className="col-span-8">
                    {allBlogs?.map((item) => (
                        <BigPostCard key={item.id} post={item} />
                    ))}
                </div>
                <div className="col-span-4 space-y-20 max-sm:hidden">
                    <div className="">
                        <h2 className="font-clashBold text-2xl font-extrabold text-violet-normal">
                            Trending Categories
                        </h2>
                        <div className="flex items-center justify-start flex-wrap gap-3 lg:space-4 mt-5 mb-14">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/blog/category/${category}`}
                                    className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-primary font-semibold cursor-pointer hover:scale-105 transition-all py-2 px-6 bg-[#F1F1F2]"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <h2 className="font-clashBold text-2xl font-extrabold text-violet-normal">
                            Related Articles
                        </h2>
                        <div className="flex flex-col gap-5 mt-5">
                            {allBlogs
                                ?.filter((item) => item.id !== blog?.id)
                                .slice(0, 3)
                                .map((item) => (
                                    <Link
                                        href={"/blog/" + item.id}
                                        key={item.id}
                                        className="grid grid-cols-12 gap-4 rounded-md hover:cursor-pointer hover:bg-violet-50 "
                                    >
                                        <div className="col-span-4 min-h-40">
                                            <Image
                                                src={item?.bannerImage ?? ""}
                                                alt={item?.title ?? ""}
                                                quality={100}
                                                width={1600}
                                                height={1600}
                                                className="h-full w-full rounded-md object-cover"
                                            />
                                        </div>
                                        <div className="col-span-8 space-y-4 ">
                                            <p className="font-satoshiMedium text-[#381F8C]">
                                                {item.blogType || "Finance"}
                                            </p>
                                            <h2 className="font-clashMedium text-lg text-violet-darker">
                                                {item.title}
                                            </h2>
                                            <p className="line-clamp-2 font-satoshiMedium text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                    <Newsletter />
                </div>
            </div>
        </main>
    );
};

export default BlogCategoryPage;



