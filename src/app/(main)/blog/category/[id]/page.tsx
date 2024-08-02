"use client";

import BigPostCard from "@/components/blog/BigPostCard";
import Newsletter from "@/components/blog/Newsletter";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogSearch from "@/components/blog/Search";
import { useGetAllPostsQuery, useGetPostCategoriesQuery } from "@/services/blog";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { IoCloseCircleOutline } from "react-icons/io5";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BlogCategoryPage = () => {
    const { data: blogPosts, isLoading: postsLoading, error: postsError } = useGetAllPostsQuery();
    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetPostCategoriesQuery();
    const router = useRouter();
    const { id } = useParams();

    const categoryName = categories?.docs.find((item) => item.id === id)?.title || "Unknown Category";
    const blogPostByCategory = blogPosts?.docs.filter((item) => item.category.id === id);
    const isLoading = postsLoading || categoriesLoading;

    return (
        <main className="container mt-20 min-h-96 max-w-screen-xl space-y-14 px-4 py-10">
            <BlogSearch />

            {isLoading ? (
                <Skeleton height={50} width={200} />
            ) : (
                <div className="flex items-center space-x-3 lg:px-20 lg:mb-14">
                    <div className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-white font-semibold cursor-pointer hover:scale-105 transition-all py-3 px-6 bg-primary">
                        {categoryName}
                    </div>
                    <div className="border border-primary p-2 rounded-full cursor-pointer" onClick={() => router.push("/blog")}>
                        <IoCloseCircleOutline className="size-6 text-primary" />
                    </div>
                </div>
            )}

            <hr className="border-[1.5px] border-[#CACACC]" />

            <div className="lg:grid lg:grid-cols-12 max-sm:space-y-5 gap-7">
                <div className="col-span-8 max-sm:px-3">
                    {isLoading ? (
                        Array(3).fill(0).map((_, index) => (
                            <Skeleton key={index} height={200} className="mb-4" />
                        ))
                    ) : blogPostByCategory && blogPostByCategory.length > 0 ? (
                        blogPostByCategory.map((item) => (
                            <BigPostCard key={item.id} post={item} />
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <h3 className="text-2xl font-semibold text-gray-600">No posts found in this category</h3>
                            <p className="mt-2 text-gray-500">Check back later for new content!</p>
                        </div>
                    )}
                </div>
                <div className="col-span-4 space-y-20 max-sm:hidden">
                    <div className="">
                        <h2 className="font-clashBold text-2xl font-extrabold text-violet-normal">
                            Trending Categories
                        </h2>
                        <div className="flex items-center justify-start flex-wrap gap-3 lg:space-4 mt-5 mb-14">
                            {isLoading ? (
                                Array(5).fill(0).map((_, index) => (
                                    <Skeleton key={index} width={100} height={30} className="rounded-full" />
                                ))
                            ) : categories?.docs.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/blog/category/${category.id}`}
                                    className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-primary font-semibold cursor-pointer hover:scale-105 transition-all py-2 px-6 bg-[#F1F1F2]"
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* <RelatedPosts relatedPosts={blogPostByCategory} /> */}
                    <Newsletter />
                </div>
            </div>
        </main>
    );
};

export default BlogCategoryPage;