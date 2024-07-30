import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
    post: BlogTypes
}

const BigPostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <article
            key={post.id}
            className="flex space-x-4 mb-10 border-b border-[#CACACC] pb-5"
        >
            <div className="hidden lg:block">
                <h3 className='text-primary font-bold text-3xl'>{post.date}</h3>
            </div>
            <div className="relative">
                <Image
                    src={post.bannerImage}
                    alt={post.title}
                    quality={100}
                    width={640}
                    height={301}
                    className="rounded-2xl h-[300px] w-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-black/40 w-24 rounded-lg p-3 lg:hidden">
                    <h3 className='text-white text-center font-bold text-sm'>{post.date}</h3>
                </div>
                <div className="space-y-4 mt-2">
                    <h2 className="text-primary text-xl lg:text-3xl font-clashSemiBold font-semibold">
                        {post.title}
                    </h2>
                    <p className="text-orange-normal text-sm lg:text-base">
                        Read Time: {/* Add read time if available in your Post type */}
                    </p>
                    <h2 className="line-clamp-4 lg:text-xl font-semibold text-violet-dark overflow-hidden">
                        {post.description}
                    </h2>
                    <div className="!mt-8">
                        <Link
                            href={`/blog/${post.id}`}
                            className="rounded-full bg-orange-normal px-6 py-3 text-white transition-opacity duration-300 hover:opacity-90"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            </div>

        </article>
    )
}

export default BigPostCard