import { useGetUserByIdQuery } from '@/services/blog'
import { BlogPost } from '@/types/blog/post'
import Image from 'next/image'

type FeaturedPostProps = {
    post: BlogPost
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
    const authorId = post?.authors[0]?.id;
    const { data: author, isLoading: isAuthorLoading, error: authorError } = useGetUserByIdQuery(authorId!, {
        skip: !authorId
    });

    return (
        <div className="lg:flex lg:space-x-4 max-sm:space-y-4 w-full mb-14">
            <div className="flex-shrink-0">
                <Image
                    src={post.image?.url || "/assets/images/blog/blogImage1.png"}
                    alt={post.title || "Blog post image"}
                    quality={100}
                    width={590}
                    height={790}
                    className="h-[300px] object-cover rounded-2xl"
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

// Helper function to format the date
function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} of ${month}, ${year}`;
}

export default FeaturedPost