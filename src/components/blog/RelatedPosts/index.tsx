import Newsletter from '@/components/newsletter/Newsletter'
import { BlogPost } from '@/types/blog/post'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface RelatedPostsProps {
    relatedPosts: BlogPost[]
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ relatedPosts }) => {
    return (
        <section className="space-y-4 py-6 lg:col-span-4 lg:py-12">
            <h2 className="font-clashBold text-2xl font-extrabold text-violet-normal">
                Related Articles
            </h2>
            <div className="flex flex-col gap-5">
                {relatedPosts
                    ?.slice(0, 3)
                    .map((item) => (
                        <Link
                            href={"/blog/" + item.id}
                            key={item.id}
                            className="grid grid-cols-12 gap-4 rounded-md hover:cursor-pointer hover:bg-violet-50"
                        >
                            <div className="col-span-4 min-h-40">
                                <Image
                                    src={item?.image?.url ?? ""}
                                    alt={item?.title ?? ""}
                                    quality={100}
                                    width={1600}
                                    height={1600}
                                    className="h-full w-full rounded-md object-cover"
                                />
                            </div>
                            <div className="col-span-8 space-y-4">
                                <p className="font-satoshiMedium text-[#381F8C]">
                                    {item.categories}
                                </p>
                                <h2 className="font-clashMedium text-lg text-violet-darker">
                                    {item.title}
                                </h2>
                                {/* <p className="line-clamp-2 font-satoshiMedium text-sm">
                  {item.description}
                </p> */}
                            </div>
                        </Link>
                    ))}
            </div>
            <Newsletter />
        </section>
    )
}

export default RelatedPosts