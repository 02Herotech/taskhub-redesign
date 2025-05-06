import React from "react";
import Image from "next/image";
import RichTextRenderer from "@/components/blog/RichText";
import { Metadata } from "next";

type Props = {
  params: { categoryId: string; postId: string };
};

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

type Author = {
  id: string;
  name: string;
  image: Record<string, unknown>;
  email: string;
  createdAt: string;
  updatedAt: string;
  loginAttempts: number;
};

type Meta = {
  title: string;
  description: string;
  image: Image;
};

type Post = {
  id: string;
  title: string;
  postSummary: string;
  postContent: any[];
  image: Image;
  featuredPost: boolean;
  readTime: string;
  category: Category;
  publishedAt: string;
  authors: Author[];
  slug: string;
  meta: Meta | undefined;
  _status: string;
  createdAt: string;
  updatedAt: string;
  populatedAuthors: any[];
};

export async function generateStaticParams() {
  const result = await fetch(`${process.env.BLOG_API}/posts`);
  const posts: { docs: Post[] } = await result.json();
  return posts.docs.map(({ slug, category }) => ({
    postId: slug,
    categoryId: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await fetch(
    `${process.env.BLOG_API}/posts?where[slug][equals]=${params.postId}`,
  );
  const posts: { docs: Post[] } = await result.json();
  const post = posts.docs[0];
  const { title, postSummary, image, meta } = post;
  return {
    title: meta?.title || title,
    description: meta?.description || postSummary,
    openGraph: { images: [meta?.image?.url || image.url] },
  };
}

export const revalidate = 60;

async function Page({ params }: Props) {
  const result = await fetch(
    `${process.env.BLOG_API}/posts?where[slug][equals]=${params.postId}`,
  );
  const posts: { docs: Post[] } = await result.json();

  const post = posts.docs[0];
  return (
    <main className="mx-auto max-w-7xl px-5 md:px-20">
      <article>
        <header className="my-10">
          <h1 className="mx-auto mb-8 max-w-3xl text-center font-clashSemiBold text-2xl md:text-4xl">
            {post.title}
          </h1>
          <Image
            src={post.image.url}
            width={post.image.width}
            height={post.image.height}
            alt="Business page header image"
            className="mx-auto h-[250px] w-full rounded-3xl object-cover object-center md:h-[400px]"
          />
        </header>
        <div className="mx-auto max-w-screen-sm pb-10 text-base font-medium md:text-lg">
          <RichTextRenderer content={post.postContent} />
        </div>
      </article>
    </main>
  );
}

export default Page;
