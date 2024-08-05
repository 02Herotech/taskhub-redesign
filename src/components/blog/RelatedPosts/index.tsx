import { BlogPost } from '@/types/blog/post'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface RelatedPostsProps {
    relatedPosts: BlogPost[]
    isLoading?: boolean
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ relatedPosts, isLoading }) => {
    return (
        <aside>
            {relatedPosts && relatedPosts.length > 0 ? (
                <>
                    <h2 className="font-clashBold text-2xl !mb-7 font-extrabold text-violet-normal">
                        Related Articles
                    </h2>
                    <div className="flex flex-col gap-5">
                        {relatedPosts
                            .slice(0, 3)
                            .map((item) => (
                                <Link
                                    href={"/blog/" + item.id}
                                    key={item.id}
                                    className="grid grid-cols-12 gap-4 hover:cursor-pointer"
                                >
                                    <div className="col-span-4 min-h-40">
                                        <Image
                                            src={item?.image?.url ?? ""}
                                            alt={item?.title ?? ""}
                                            quality={100}
                                            width={1600}
                                            height={1600}
                                            className="h-[210px] w-full object-cover"
                                        />
                                    </div>
                                    <div className="col-span-8 flex flex-col space-y-4 h-full">
                                        <p className="font-satoshiMedium text-[#381F8C] capitalize">
                                            {item.category.title}
                                        </p>
                                        <h2 className="font-clashMedium text-lg text-violet-darker">
                                            {item.title}
                                        </h2>
                                        <p className="line-clamp-2 font-satoshiMedium text-sm">
                                            {item.postSummary}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </>
            ) : (
                <h1>No related articles</h1>
            )}
        </aside>
    )
}

export default RelatedPosts
