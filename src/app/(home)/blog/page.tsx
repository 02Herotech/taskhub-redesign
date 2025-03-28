"use client";

import Image from "next/image";
import PostCard from "@/components/blog/PostCard";
import FeaturedPost from "@/components/blog/FeaturedPost";
import { useGetAllPostsQuery } from "@/services/blog";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BlogCategries from "@/components/blog/AllCategories";
import BlogSearch from "@/components/blog/Search";

const AllBlogsPage = () => {
  const { data: blogPosts, isLoading, error } = useGetAllPostsQuery();

  const featuredPost = blogPosts?.docs.find((post) => post.featuredPost);

  const LoadingSkeleton = () => (
    <>
      <div className="relative mb-14 w-full">
        <Skeleton height={202} className="rounded-3xl" />
        <div className="absolute bottom-0 left-1/2 w-1/2 max-w-md -translate-x-1/2 translate-y-1/2 transform">
          <Skeleton height={40} />
        </div>
      </div>

      <div className="mb-14 flex flex-wrap items-center max-lg:gap-4 lg:justify-center lg:space-x-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} width={120} height={40} className="rounded-full" />
        ))}
      </div>

      <hr className="border-[1.5px] border-[#CACACC]" />

      <div className="mb-14">
        <Skeleton height={300} />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <Skeleton height={200} />
            <Skeleton count={3} />
          </div>
        ))}
      </div>
    </>
  );

  if (isLoading)
    return (
      <main className="container mt-20 min-h-96 max-w-screen-xl space-y-14 px-4 py-10">
        <LoadingSkeleton />
      </main>
    );

  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <main className="container mt-20 min-h-96 max-w-screen-xl space-y-14 px-4 py-10">
      <BlogSearch />

      {/* Categories */}
      <BlogCategries />

      <hr className="border-[1.5px] border-[#CACACC]" />

      {/* Featured Post */}
      <FeaturedPost post={featuredPost!} />

      {/* Blog posts */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts?.docs.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </div>
    </main>
  );
};

export default AllBlogsPage;
