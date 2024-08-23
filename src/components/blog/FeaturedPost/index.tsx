import { useGetUserByIdQuery } from '@/services/blog'
import { BlogPost } from '@/types/blog/post'
import Image from 'next/image'

type FeaturedPostProps = {
    post: BlogPost
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
    if (!post) {
        return (
            <div>
                No Featured post
            </div>
        )
    }

    const authorId = post?.authors[0]?.id;
    const { data: author, isLoading: isAuthorLoading, error: authorError } = useGetUserByIdQuery(authorId!, {
        skip: !authorId
    });

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

        return `${day}${ordinalSuffix} ${month}, ${year}`;
    }

    return (
        <div className="lg:flex lg:space-x-4 max-sm:space-y-4 w-full mb-14 relative">
            <div className="absolute top-0 right-0 bg-black/40 min-w-24 rounded-lg m-2 p-3 lg:hidden">
                <h3 className='text-white text-center font-bold text-sm'>{formatDate(post.createdAt)}</h3>
            </div>
            <div className="flex-shrink-0">
                <Image
                    src={post.image?.url || "/assets/images/blog/blogImage1.png"}
                    alt={post.title || "Blog post image"}
                    quality={100}
                    width={590}
                    height={790}
                    className="h-[320px] object-cover rounded-2xl"
                />
            </div>
            <div className="lg:px-5 lg:py-2 space-y-4 flex flex-col justify-between">
                <h3 className="text-tc-orange text-base lg:text-xl font-satoshiBold font-bold">{post.category.title}</h3>
                <h1 className="text-primary text-xl lg:text-3xl font-clashSemiBold font-semibold">{post.title}</h1>
                <h3 className="text-tc-orange font-satoshi text-sm lg:text-lg">Read Time: {post.readTime} Mins</h3>
                <p className="text-[#140B31] font-satoshi font-semibold text-sm lg:text-lg line-clamp-2">{post.postSummary}</p>
                <div className="flex items-center space-x-3">
                    <Image
                        src={"/assets/images/blog/blogImage1.png"}
                        alt={`'Author'}'s avatar`}
                        width={66}
                        height={66}
                        className="rounded-full object-cover size-14"
                    />
                    <div className="">
                        <h5 className="text-sm lg:text-base text-[#381F8C] font-satoshiBold font-bold">Posted by {author?.name || 'admin'}</h5>
                        <h5 className="text-sm lg:text-base text-[#262528]">{formatDate(post.createdAt)}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedPost