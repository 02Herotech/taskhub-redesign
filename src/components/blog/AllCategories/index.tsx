import { useGetPostCategoriesQuery } from '@/services/blog';
import Link from 'next/link'
import React from 'react'

const BlogCategries = () => {
    const { data: categories } = useGetPostCategoriesQuery();
    return (
        <div className="flex items-center flex-wrap max-lg:gap-4 lg:justify-center lg:space-x-4 mb-14">
            {categories?.docs.slice().reverse().map((category) => (
                <Link
                    key={category.id}
                    href={`/blog/category/${category.id}`}
                    className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-primary font-semibold cursor-pointer hover:scale-105 transition-all py-2 px-6 bg-[#F1F1F2]"
                >
                    {category.title}
                </Link>
            ))}
        </div>
    )
}

export default BlogCategries