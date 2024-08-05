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

        // Function to get the ordinal suffix
        function getOrdinalSuffix(day: number) {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }

        const ordinalSuffix = getOrdinalSuffix(day);

        return { day: `${day}${ordinalSuffix}`, rest: `${month}, ${year}` };
    }
    const { day, rest } = formatDate(post.publishedAt);

    return (
        <article
            key={post.id}
            className="flex flex-col lg:flex-row mb-10 border-b border-[#CACACC] pb-5"
        >
            <div className="max-lg:hidden w-24 flex-shrink-0 mr-4 text-primary">
                <div className='text-primary font-bold flex flex-col items-start'>
                    <span className="text-4xl block">{day}</span>
                    <span className='text-sm'>{rest}</span>
                </div>
            </div>
            <div className="flex-grow">
                {post.image && (
                    <div className="relative w-full">
                        <Image
                            src={post.image.url}
                            alt={post.title}
                            quality={100}
                            width={640}
                            height={301}
                            className="rounded-2xl h-[300px] w-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-black/40 w-24 rounded-lg p-3 lg:hidden">
                            <h3 className='text-white text-center font-bold'>
                                <span className="text-lg block">{day}</span>
                                <span>{rest}</span>
                            </h3>
                        </div>
                    </div>
                )}
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

export default BigPostCard;