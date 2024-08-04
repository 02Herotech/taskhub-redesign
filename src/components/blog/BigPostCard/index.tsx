import { BlogPost } from '@/types/blog/post'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
    post: BlogPost
}

const BigPostCard: React.FC<PostCardProps> = ({ post }) => {
    function formatDate(dateString: string) {
        const date = new Date(dateString);

        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getUTCFullYear();

        return `${day} of ${month}, ${year}`;
    }

    const formattedDate = formatDate(post.publishedAt);
    return (
        <article
            key={post.id}
            className="flex space-x-4 mb-10 border-b border-[#CACACC] pb-5"
        >
            <div className="hidden lg:block">
                <h3 className='text-primary font-bold text-3xl'>{formattedDate}</h3>
            </div>
            <div className="relative w-full">
                <Image
                    src={post.image?.url || "/assets/images/blog/blogImage1.png"}
                    alt={post.title}
                    quality={100}
                    width={640}
                    height={301}
                    className="rounded-2xl h-[300px] w-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-black/40 w-24 rounded-lg p-3 lg:hidden">
                    <h3 className='text-white text-center font-bold text-sm'>{formattedDate}</h3>
                </div>
                <div className="space-y-4 mt-2">
                    <h2 className="text-primary text-xl lg:text-3xl font-clashSemiBold font-semibold">
                        {post.title}
                    </h2>
                    <p className="text-orange-normal text-sm lg:text-base">
                        Read Time: {post.readTime}
                    </p>
                    <h2 className="line-clamp-4 lg:text-xl font-semibold text-violet-dark overflow-hidden">
                        {post.postSummary}
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