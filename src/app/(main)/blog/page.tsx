"use client";

import "../../../styles/serviceProviderStyles.css";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from 'react';
import { BlogPost } from "@/types/blog/post";
import PostCard from "@/components/blog/PostCard";
import { useRouter } from "next/navigation";
import FeaturedPost from "@/components/blog/FeaturedPost";
import { useGetAllPostsQuery } from "@/services/blog";

const AllBlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const { data: blogPosts, isLoading, error } = useGetAllPostsQuery();
  console.log("blogPosts", blogPosts?.docs);

  const handleSearch = (searchTerm: string) => {
    router.push(`/blog/results?query=${encodeURIComponent(searchTerm)}`)
  }

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  const categories = ["Immigrants", "Business & Finance", "Housing & Accommodation", "Medical & Education", "Career & Transports"]

  return (
    <main className="container mt-20 min-h-96 max-w-screen-xl space-y-14 px-4 py-10">
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
          <form className="relative w-full flex" onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchTerm);
          }}>
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
              <CiSearch className="size-5" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 rounded-l-2xl drop-shadow-lg bg-[#EEEEEF] appearance-none outline-none border-none placeholder:text-[#C1BADB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 rounded-r-2xl"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center flex-wrap max-lg:gap-4 lg:justify-center lg:space-x-4 mb-14">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog/category/${category}`}
            className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-primary font-semibold cursor-pointer hover:scale-105 transition-all py-2 px-6 bg-[#F1F1F2]"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Link>
        ))}
      </div>

      <hr className="border-[1.5px] border-[#CACACC]" />

      {/* Featured Post */}
      <FeaturedPost />

      {/* Blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts?.docs.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </div>
    </main>
  );
};

export default AllBlogsPage;



