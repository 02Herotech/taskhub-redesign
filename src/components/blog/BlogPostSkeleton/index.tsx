import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BlogPostSkeleton = () => (
    <div className="space-y-6 lg:col-span-8 lg:space-y-6 lg:py-12 pb-8">
        <Skeleton height={40} width="80%" />
        <Skeleton height={450} />
        <div className="flex justify-between">
            <Skeleton width={100} />
            <Skeleton width={100} />
        </div>
        <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
                <Skeleton circle width={56} height={56} />
                <div>
                    <Skeleton width={150} />
                    <Skeleton width={100} />
                </div>
            </div>
            <Skeleton width={100} />
        </div>
        <Skeleton count={5} />
    </div>
);

export default BlogPostSkeleton;