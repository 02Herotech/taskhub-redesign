import React from "react";
import Link from "next/link";
import Image from "next/image";
import { truncateText } from "@/utils/marketplace";
import { Metadata } from "next";

type Image = {
  id: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  createdAt: string;
  updatedAt: string;
  url: string;
};

type Category = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  image: Image;
  longTitle: string;
  shortDescription: string;
  slug: string;
  blogsHeader: string;
};

type Post = {
  id: string;
  title: string;
  briefDescription: string;
  postSummary: string;
  image: Image;
  slug: string;
};

type Props = { params: { categoryId: string } };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await fetch(
    `${process.env.BLOG_API}/postCategory?where[slug][equals]=${params.categoryId}&sort=createdAt`,
  );
  const categories: { docs: Category[] } = await result.json();
  const currentCategory = categories.docs[0];
  const { title, shortDescription, image } = currentCategory;
  return {
    title,
    description: shortDescription,
    openGraph: { images: [{ url: image.url }] },
  };
}

export async function generateStaticParams() {
  const result = await fetch(`${process.env.BLOG_API}/postCategory`);
  const categories: { docs: Category[] } = await result.json();
  return categories.docs.map(({ slug }) => ({ categoryId: slug }));
}

async function Page({ params }: Props) {
  const result = await fetch(
    `${process.env.BLOG_API}/postCategory?where[slug][equals]=${params.categoryId}&sort=createdAt`,
  );
  const categories: { docs: Category[] } = await result.json();
  const currentCategory = categories.docs[0];

  const postsResult = await fetch(
    `${process.env.BLOG_API}/posts?where[category][equals]=${currentCategory.id}&sort=createdAt&limit=0`,
  );
  const posts: { docs: Post[] } = await postsResult.json();
  return (
    <main className="mx-auto max-w-7xl px-5 md:px-20">
      <header className="my-10">
        <h1 className="mb-8 text-center font-clashSemiBold text-4xl font-black uppercase md:text-6xl">
          {currentCategory.longTitle}
        </h1>

        <p className="mx-auto mb-7 max-w-[947px] text-center text-lg font-medium text-[#666] md:text-2xl">
          {currentCategory.shortDescription}
        </p>

        <Image
          src={currentCategory.image.url}
          width={currentCategory.image.width}
          height={currentCategory.image.height}
          alt="Business page header image"
          className="mx-auto h-[250px] w-full rounded-3xl object-cover object-center md:h-[400px]"
        />
      </header>

      <section aria-label="Blogs">
        <h2 className="mb-10 text-left font-clashSemiBold text-xl md:text-2xl">
          {currentCategory.blogsHeader}
        </h2>
        <ul
          aria-label="List of blogs"
          className="mb-10 grid grid-cols-1 items-stretch gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.docs.map((post) => (
            <li key={post.id}>
              <div className="">
                <Image
                  src={post.image.url}
                  width={post.image.width}
                  height={post.image.height}
                  alt="Blog image"
                  className="mb-3 h-[200px] rounded-xl object-cover"
                />
                <h2 className="mb-2 font-clashSemiBold text-2xl">
                  {post.title}
                </h2>
                <p className="mb-3 text-[#666]">
                  {truncateText(post.postSummary, 150)}
                </p>
                <Link
                  href={`/business-hub/${currentCategory.slug}/${post.slug}`}
                  className="mt-3 block w-max rounded-full bg-primary px-5 py-2 font-clashMedium text-white"
                >
                  Read more
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {posts.docs.length == 0 && (
          <div className="-mt-20 flex h-60 items-center justify-center">
            <p className="font-satoshiMedium text-2xl md:text-3xl">
              No blogs for this category
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Page;
