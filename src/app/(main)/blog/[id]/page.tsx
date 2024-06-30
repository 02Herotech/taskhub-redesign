"use client";
import Image from "next/image";
import "../../../../styles/serviceProviderStyles.css";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BlogsinglePage = () => {
  const [blog, setBlog] = useState<BlogTypes | null>(null);
  const [allBlogs, setallBlogs] = useState<BlogTypes[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const tempBlog = localStorage.getItem("blogs");
    if (tempBlog) {
      const blogs: BlogTypes[] = JSON.parse(tempBlog);
      setallBlogs(blogs);
      const newBlog = blogs.find((blog) => blog.id === Number(id));
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
        <section className="space-y-3 lg:col-span-8 lg:space-y-6">
          <div className="gap flex flex-wrap border-b border-b-violet-light py-2 lg:gap-8 lg:py-4 ">
            <p className="flex gap-2 text-lg font-semibold text-violet-normal max-md:text-sm ">
              <span>Posted on {blog?.date}</span>
              <span className="text-orange-normal">By Admin</span>
            </p>
            <p className="flex gap-2 text-lg font-semibold  text-violet-normal max-md:text-sm ">
              <span>Read time</span>
              <span className="text-orange-normal"> {blog?.readTime} </span>
            </p>
          </div>
          <p
            className="whitespace-pre-wrap  font-satoshiMedium  text-violet-darkHover"
            dangerouslySetInnerHTML={{ __html: blog?.description || "" }}
          />
          {/* {blog?.description}
          </p> */}
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-violet-darker">
              {blog?.subheader}
            </h2>
            <div className="space-y-5">
              {blog?.subheaderList.map((item, index) => (
                <div key={item.title} className="space-y-2">
                  <p className="flex gap-2 text-lg font-semibold text-violet-normal">
                    {blog.isSubheaderListNumbered && <span> {index + 1} </span>}
                    <span>{item.title}</span>
                  </p>
                  <p className="whitespace-pre-wrap  font-satoshiMedium text-violet-darker">
                    {item.content.subtitle}
                  </p>
                  <div className="ml-4 space-y-3 py-2 lg:ml-8">
                    {item.content.list?.map((text) => (
                      <p
                        key={text}
                        className=" flex items-center gap-3 font-satoshiMedium text-violet-normal   "
                      >
                        <span className="size-1 rounded-full bg-violet-normal p-1" />
                        <span>{text}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-semibold text-violet-darker">
              Conclusion
            </h2>
            <p
              className="whitespace-pre-wrap  font-satoshiMedium  text-violet-darkHover"
              dangerouslySetInnerHTML={{ __html: blog?.conclusion || "" }}
            />
          </div>
        </section>

        <section className="space-y-4 py-6 lg:col-span-4 lg:py-12">
          <h2 className="font-clashBold text-2xl font-extrabold text-violet-normal max-lg:text-center">
            Featured Blog Post
          </h2>
          <div className="flex flex-col gap-5">
            {allBlogs
              ?.filter((item) => item.id !== blog?.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  href={"/blog/" + item.id}
                  key={item.id}
                  className="grid grid-cols-12 gap-4 rounded-md  hover:cursor-pointer hover:bg-violet-50 "
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
                    <p className="font-satoshiMedium text-violet-normal">
                      {item.blogType || "Finance"}
                    </p>
                    <h2 className="font-clashBold text-lg font-extrabold text-violet-darker">
                      {item.title}
                    </h2>
                    <p className="line-clamp-2 font-satoshiMedium  text-sm">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </article>
    </main>
  );
};

export default BlogsinglePage;
