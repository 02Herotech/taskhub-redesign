"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogsinglePage = () => {
  const [blog, setBlog] = useState<BlogTypes | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const tempBlog = localStorage.getItem("blogs");
    if (tempBlog) {
      const allBlogs: BlogTypes[] = JSON.parse(tempBlog);
      const newBlog = allBlogs.find((blog) => blog.id === Number(id));
      if (newBlog) {
        setBlog(newBlog);
      }
    }
  }, []);
  return (
    <main className="container mt-20 min-h-96 max-w-screen-2xl  space-y-8 py-10 ">
      <h2 className="text-center font-clashBold text-4xl font-extrabold text-violet-normal max-md:text-2xl">
        {blog?.title}
      </h2>
      <div>
        <Image
          src={blog?.bannerImage ?? ""}
          alt={blog?.title ?? ""}
          quality={100}
          width={1600}
          height={1600}
        />
      </div>
      <article className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
        <section className="space-y-3 lg:col-span-8 lg:space-y-9">
          <div className="gap flex flex-wrap border-b border-b-violet-light py-2 lg:gap-12 lg:py-4 ">
            <p className="flex gap-2 text-lg font-semibold text-violet-normal max-md:text-sm ">
              <span>Posted on {blog?.date}</span>
              <span className="text-orange-normal">By Admin</span>
            </p>
            <p className="flex gap-2 text-lg font-semibold  text-violet-normal max-md:text-sm ">
              <span>Read time</span>
              <span className="text-orange-normal"> {blog?.readTime} </span>
            </p>
          </div>
          <p className="whitespace-pre-wrap  font-semibold  text-violet-darkHover">
            {blog?.description}
          </p>
          <div>
            <h2 className="text-xl font-semibold text-violet-darker">
              {blog?.subheader}
            </h2>
            <div className="space-y-5">
              {blog?.subheaderList.map((item, index) => (
                <div key={item.title} className="space-y-2">
                  <p className="flex gap-2 text-lg font-semibold text-violet-normal">
                    <span> {index + 1} </span> <span>{item.title}</span>
                  </p>
                  <p className="whitespace-pre-wrap  text-violet-darkHover">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 lg:col-span-3">
          <h2 className="text-center font-clashBold text-2xl font-extrabold text-violet-normal">
            Featured Blog Post
          </h2>
        </section>
      </article>
    </main>
  );
};

export default BlogsinglePage;
