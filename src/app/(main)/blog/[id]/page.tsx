"use client";

import Image from "next/image";
import "../../../../styles/serviceProviderStyles.css";
import { useParams, } from "next/navigation";
import React, { useState } from "react";
import { IoIosCloseCircleOutline, IoIosShareAlt } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import ShareComponent from "@/components/blog/SharePost";
import { useGetPostByIdQuery, useGetUserByIdQuery } from "@/services/blog";
import Newsletter from "@/components/blog/Newsletter";
import RelatedPosts from "@/components/blog/RelatedPosts";
import BlogPostSkeleton from "@/components/blog/BlogPostSkeleton";

const SingleBlogPost = () => {
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const { id } = useParams();
  const { data: blog, isLoading: isBlogLoading, error: blogError } = useGetPostByIdQuery(id as string);
  const authorId = blog?.authors[0]?.id;
  const { data: author, isLoading: isAuthorLoading, error: authorError } = useGetUserByIdQuery(authorId!, {
    skip: !authorId
  });

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();

    return `${day} of ${month}, ${year}`;
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
              <h3 className="text-primary text-base lg:text-lg font-satoshiBold font-bold capitalize">{blog?.categories}</h3>
              <div className="relative">
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

                {shareDropdownOpen && (
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShareDropdownOpen(false)}
                  ></div>
                )}

                <div
                  className={`absolute left-0 top-full mt-2 w-full lg:min-w-60 rounded-md bg-white transition-all duration-300 overflow-hidden z-30 ${shareDropdownOpen ? "max-h-64 p-5 drop-shadow" : "max-h-0"
                    }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-clashBold text-primary text-start font-bold">Share this post</h2>
                    <IoIosCloseCircleOutline className="size-6 text-primary cursor-pointer" onClick={() => setShareDropdownOpen(false)} />
                  </div>
                  <ShareComponent pathname="" />
                </div>
              </div>
            </div>
            <div className="gap flex items-center justify-between flex-wrap max-sm:border-none border-y-[1.5px] border-[#CACACC] py-2 lg:gap-8 lg:py-4">
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
              <div className="hidden lg:flex space-x-6">
                <div className="flex space-x-2 text-primary">
                  <AiFillLike className="size-6 text-primary" />
                  <span>23</span>
                </div>
                <div className="flex space-x-2 text-primary">
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.12382 20.4675C5.2053 19.6624 4.55013 18.5996 4.2434 17.4173C3.93667 16.2349 3.99257 14.9877 4.40382 13.8376L6.53382 7.90755C6.58279 7.77052 6.66983 7.65031 6.78472 7.56101C6.8996 7.47171 7.03758 7.41702 7.18245 7.40338C7.32732 7.38973 7.47308 7.41768 7.60262 7.48396C7.73217 7.55023 7.84012 7.65208 7.91382 7.77755L8.22382 8.32755C8.46382 8.71755 8.51382 9.19755 8.36382 9.62755L7.38382 12.3675L7.81382 12.7476L13.7738 5.99755C14.1238 5.59755 14.7238 5.55755 15.1338 5.90755C15.5238 6.25755 15.5638 6.86755 15.2238 7.25755L10.7738 12.2875L11.3538 12.7976L16.8038 6.61755C17.1538 6.21755 17.7638 6.17755 18.1538 6.52755C18.5538 6.87755 18.5938 7.49755 18.2238 7.88755L12.7838 14.0675L13.3638 14.5775L18.0538 9.25755C18.4038 8.85755 19.0138 8.81755 19.4038 9.16755C19.7938 9.51755 19.8438 10.1276 19.4938 10.4976L14.8038 15.8376L15.3738 16.3475L18.5438 12.7576C18.8938 12.3576 19.5038 12.3175 19.9038 12.6676C20.3038 13.0176 20.3338 13.6276 19.9838 13.9976L14.7838 19.9175C14.2517 20.523 13.6055 21.0175 12.8821 21.3729C12.1587 21.7282 11.3723 21.9374 10.5679 21.9885C9.76351 22.0396 8.95696 21.9316 8.19439 21.6706C7.43182 21.4096 6.72821 21.0008 6.12382 20.4675ZM9.81382 8.21755L12.6538 4.99755C12.8938 4.72755 13.1938 4.49755 13.5238 4.36755L13.9038 3.58755C13.9604 3.47487 13.9938 3.35203 14.0023 3.22625C14.0107 3.10046 13.9939 2.97426 13.9529 2.85504C13.912 2.73582 13.8476 2.62598 13.7636 2.53197C13.6796 2.43796 13.5777 2.36166 13.4638 2.30755C13.2354 2.19803 12.9731 2.1828 12.7336 2.26513C12.4941 2.34747 12.2966 2.52076 12.1838 2.74755L9.67382 7.88755C9.72382 7.99755 9.78382 8.10755 9.81382 8.21755ZM9.22382 6.99755V7.04755L12.0038 1.37755C12.1124 1.14791 12.126 0.884736 12.0418 0.645113C11.9575 0.405491 11.7822 0.208743 11.5538 0.0975498C11.4411 0.0414329 11.3183 0.00829848 11.1926 7.43133e-05C11.0669 -0.00814986 10.9408 0.00870031 10.8217 0.0496446C10.7026 0.090589 10.5928 0.15481 10.4988 0.238572C10.4047 0.322333 10.3282 0.423964 10.2738 0.53755L7.63382 5.94755C8.28382 6.05755 8.85382 6.42755 9.22382 6.99755ZM2.99382 13.3275L5.12382 7.39755C5.39382 6.64755 6.02382 6.13755 6.77382 5.96755L8.91382 1.57755C9.02442 1.34934 9.04022 1.08664 8.95778 0.846814C8.87534 0.606991 8.70136 0.409529 8.47382 0.29755C8.36106 0.241433 8.23827 0.208299 8.11259 0.200074C7.9869 0.19185 7.86084 0.2087 7.74173 0.249645C7.62262 0.290589 7.51284 0.35481 7.41878 0.438572C7.32471 0.522333 7.24825 0.623964 7.19382 0.73755L3.22382 8.83755L2.72382 8.58755L2.93382 5.67755C2.97382 5.22755 2.79382 4.77755 2.47382 4.45755L2.01382 3.99755C1.54382 3.56755 0.773821 3.85755 0.723821 4.49755L0.223821 10.7875C0.093821 12.8275 0.993821 14.7775 2.57382 15.9976C2.55382 15.1175 2.68382 14.2076 2.99382 13.3275Z" fill="#442C93" />
                  </svg>
                  <span>23</span>
                </div>
              </div>
            </div>
            <div className="lg:hidden flex items-center justify-between space-x-6 border-y-[1.5px] border-[#CACACC] p-2">
              <div className="flex space-x-2 text-primary">
                <AiFillLike className="size-6 text-primary" />
                <span>23</span>
              </div>
              <div className="flex space-x-2 text-primary">
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.12382 20.4675C5.2053 19.6624 4.55013 18.5996 4.2434 17.4173C3.93667 16.2349 3.99257 14.9877 4.40382 13.8376L6.53382 7.90755C6.58279 7.77052 6.66983 7.65031 6.78472 7.56101C6.8996 7.47171 7.03758 7.41702 7.18245 7.40338C7.32732 7.38973 7.47308 7.41768 7.60262 7.48396C7.73217 7.55023 7.84012 7.65208 7.91382 7.77755L8.22382 8.32755C8.46382 8.71755 8.51382 9.19755 8.36382 9.62755L7.38382 12.3675L7.81382 12.7476L13.7738 5.99755C14.1238 5.59755 14.7238 5.55755 15.1338 5.90755C15.5238 6.25755 15.5638 6.86755 15.2238 7.25755L10.7738 12.2875L11.3538 12.7976L16.8038 6.61755C17.1538 6.21755 17.7638 6.17755 18.1538 6.52755C18.5538 6.87755 18.5938 7.49755 18.2238 7.88755L12.7838 14.0675L13.3638 14.5775L18.0538 9.25755C18.4038 8.85755 19.0138 8.81755 19.4038 9.16755C19.7938 9.51755 19.8438 10.1276 19.4938 10.4976L14.8038 15.8376L15.3738 16.3475L18.5438 12.7576C18.8938 12.3576 19.5038 12.3175 19.9038 12.6676C20.3038 13.0176 20.3338 13.6276 19.9838 13.9976L14.7838 19.9175C14.2517 20.523 13.6055 21.0175 12.8821 21.3729C12.1587 21.7282 11.3723 21.9374 10.5679 21.9885C9.76351 22.0396 8.95696 21.9316 8.19439 21.6706C7.43182 21.4096 6.72821 21.0008 6.12382 20.4675ZM9.81382 8.21755L12.6538 4.99755C12.8938 4.72755 13.1938 4.49755 13.5238 4.36755L13.9038 3.58755C13.9604 3.47487 13.9938 3.35203 14.0023 3.22625C14.0107 3.10046 13.9939 2.97426 13.9529 2.85504C13.912 2.73582 13.8476 2.62598 13.7636 2.53197C13.6796 2.43796 13.5777 2.36166 13.4638 2.30755C13.2354 2.19803 12.9731 2.1828 12.7336 2.26513C12.4941 2.34747 12.2966 2.52076 12.1838 2.74755L9.67382 7.88755C9.72382 7.99755 9.78382 8.10755 9.81382 8.21755ZM9.22382 6.99755V7.04755L12.0038 1.37755C12.1124 1.14791 12.126 0.884736 12.0418 0.645113C11.9575 0.405491 11.7822 0.208743 11.5538 0.0975498C11.4411 0.0414329 11.3183 0.00829848 11.1926 7.43133e-05C11.0669 -0.00814986 10.9408 0.00870031 10.8217 0.0496446C10.7026 0.090589 10.5928 0.15481 10.4988 0.238572C10.4047 0.322333 10.3282 0.423964 10.2738 0.53755L7.63382 5.94755C8.28382 6.05755 8.85382 6.42755 9.22382 6.99755ZM2.99382 13.3275L5.12382 7.39755C5.39382 6.64755 6.02382 6.13755 6.77382 5.96755L8.91382 1.57755C9.02442 1.34934 9.04022 1.08664 8.95778 0.846814C8.87534 0.606991 8.70136 0.409529 8.47382 0.29755C8.36106 0.241433 8.23827 0.208299 8.11259 0.200074C7.9869 0.19185 7.86084 0.2087 7.74173 0.249645C7.62262 0.290589 7.51284 0.35481 7.41878 0.438572C7.32471 0.522333 7.24825 0.623964 7.19382 0.73755L3.22382 8.83755L2.72382 8.58755L2.93382 5.67755C2.97382 5.22755 2.79382 4.77755 2.47382 4.45755L2.01382 3.99755C1.54382 3.56755 0.773821 3.85755 0.723821 4.49755L0.223821 10.7875C0.093821 12.8275 0.993821 14.7775 2.57382 15.9976C2.55382 15.1175 2.68382 14.2076 2.99382 13.3275Z" fill="#442C93" />
                </svg>
                <span>23</span>
              </div>
            </div>
            {/* <p
            className="whitespace-pre-wrap font-satoshiMedium text-violet-darkHover"
            dangerouslySetInnerHTML={{ __html: blog?.description || "" }}
          /> */}

            {/* <div className="space-y-5">
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
          </div> */}
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
