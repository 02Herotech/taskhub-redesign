"use client";

import Image from "next/image";
import "../../../../styles/serviceProviderStyles.css";
import { useParams, usePathname, } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline, IoIosShareAlt } from "react-icons/io";
import ShareComponent from "@/components/blog/SharePost";
import { useGetPostByIdQuery, useGetUserByIdQuery } from "@/services/blog";
import Newsletter from "@/components/blog/Newsletter";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogPostSkeleton from "@/components/blog/BlogPostSkeleton";
import RichTextRenderer from "@/components/blog/RichText";

const SingleBlogPost = () => {
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const { id } = useParams();
  const { data: blog, isLoading: isBlogLoading, error: blogError } = useGetPostByIdQuery(id as string);
  const authorId = blog?.authors[0]?.id;
  const { data: author, isLoading: isAuthorLoading, error: authorError } = useGetUserByIdQuery(authorId!, {
    skip: !authorId
  });
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShareDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();

    // Function to get the ordinal suffix
    function getOrdinalSuffix(day: number) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    }

    const ordinalSuffix = getOrdinalSuffix(day);

    return `${day}${ordinalSuffix} ${month}, ${year}`;
  }

  const formattedDate = formatDate(blog?.createdAt!);

  return (
    <main className="container mt-20 min-h-96 max-w-screen-2xl space-y-8 py-10">
      <article className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
        {isBlogLoading ? (
          <BlogPostSkeleton />
        ) : (
          <section className="space-y-3 lg:col-span-8 lg:space-y-6 lg:py-12 pb-8">
            <h2 className="font-clashBold text-4xl font-extrabold text-violet-normal max-md:text-2xl">
              {blog?.title}
            </h2>
            <div>
              <Image
                src={blog?.image.url ?? ""}
                alt={blog?.title ?? ""}
                quality={100}
                width={1600}
                height={450}
                className="rounded-lg h-[450px]"
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-primary text-base lg:text-lg font-satoshiBold font-bold capitalize">{blog?.category.title}</h3>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setShareDropdownOpen(!shareDropdownOpen);
                      }
                    }}
                    className="flex items-center space-x-2 text-tc-orange cursor-pointer"
                    aria-expanded={shareDropdownOpen}
                    aria-haspopup="true"
                  >
                    <IoIosShareAlt className="max-sm:size-8" />
                    <p className="font-satoshiBold font-bold cursor-pointer hidden lg:block">Share post</p>
                  </button>

                  <div
                    className={`fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity ${shareDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    onClick={() => setShareDropdownOpen(false)}
                  ></div>

                  <div
                    className={`fixed sm:absolute left-0 right-0 sm:left-auto sm:right-0 bottom-0 sm:top-full sm:bottom-auto mt-2 w-full lg:w-64 rounded-t-2xl sm:rounded-md bg-white transition-all duration-300 overflow-hidden z-30 ${shareDropdownOpen ? "max-h-[80vh] p-5 drop-shadow" : "max-h-0"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-clashBold text-primary text-start font-bold">Share this post</h2>
                      <IoIosCloseCircleOutline className="size-6 text-primary cursor-pointer" onClick={() => setShareDropdownOpen(false)} />
                    </div>
                    <ShareComponent pathname={pathname} />
                  </div>
                </div>
            </div>
            <div className="gap flex items-center justify-between flex-wrap border-b-[1.5px] border-[#CACACC] py-2 lg:gap-8 lg:py-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/assets/images/blog/blogImage1.png"
                  alt="blog.title"
                  width={66}
                  height={66}
                  className="rounded-full object-cover size-14"
                />
                <div className="">
                  <h5 className="text-sm lg:text-base text-[#381F8C] font-satoshiBold font-bold">
                    Posted by <span className="text-tc-orange">{author?.name}</span>
                  </h5>
                  <h5 className="text-sm lg:text-base text-[#262528]">{formattedDate}</h5>
                </div>
              </div>
              <p className="flex gap-2 text-lg font-semibold text-violet-normal max-md:text-sm">
                <span>Read time:</span>
                <span className="text-orange-normal">{blog?.readTime || "N/A"} </span>
              </p>
            </div>
            {blog?.postContent && <RichTextRenderer content={blog.postContent} />}
          </section>
        )}

        <div className="space-y-10 py-6 lg:col-span-4 lg:py-12">
          <RelatedPosts relatedPosts={blog?.relatedPosts!} isLoading={isAuthorLoading} />
          <Newsletter />
        </div>
      </article>
    </main>
  );
};

export default SingleBlogPost;
