import { BlogPost } from '@/types/blog/post'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
    post: BlogPost
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
            <article
                key={post._id.toString()}
                className="space-y-4 max-sm:flex max-sm:space-x-4"
            >
                {/* {post.hero.media && (
                    <Image
                        src={post.hero.media.url} // Assuming media has a url property
                        alt={post.title}
                        quality={100}
                        width={370}
                        height={301}
                        className="rounded-2xl h-[300px] max-sm:w-[115px] object-cover"
                    />
                )}
                <div className="space-y-4">
                    <h3 className="text-tc-orange text-sm lg:text-base font-satoshiBold font-bold">
                        {post.categories} 
                    </h3>
                    <h2 className="text-primary text-base lg:text-xl font-clashSemiBold font-semibold">
                        {post.title}
                    </h2>
                    <p className="text-orange-normal text-sm lg:text-base">
                        Read Time: 
                    </p>
                    <h2 className="line-clamp-4 font-semibold text-violet-dark overflow-hidden">
                        {post.meta.description}
                    </h2>
                    <div className="!mt-8">
                        <Link
                            href={`/blog/${post._id}`}
                            className="rounded-full bg-orange-normal px-6 py-3 text-white transition-opacity duration-300 hover:opacity-90"
                        >
                            Read More
                        </Link>
                    </div>
                </div> */}
            </article>
    )
}

export default PostCard