"use client"

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PostCard from '@/components/blog/PostCard'
import { BlogPost } from '@/types/blog/post'
import { debounce } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import BigPostCard from '@/components/blog/BigPostCard'
import Newsletter from '@/components/newsletter/Newsletter'
import { CiSearch } from 'react-icons/ci'

const SearchResultsContent = () => {
    const [searchResults, setSearchResults] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const [searchTerm, setSearchTerm] = useState(query)
    const router = useRouter()

    const [blog, setBlog] = useState<BlogTypes | null>(null);
    const [allBlogs, setallBlogs] = useState<BlogTypes[] | null>(null);

    useEffect(() => {
        const tempBlog = localStorage.getItem("blogs");
        if (tempBlog) {
            const blogs: BlogTypes[] = JSON.parse(tempBlog);
            setallBlogs(blogs);
        }
    }, []);

    const categories = ["Afrik immigrant", "Business & Finance", "Housing & Accommodation", "Medical & Education", "Career & Transports"]

    const fetchSearchResults = useCallback(async (searchTerm: string) => {
        if (!searchTerm.trim()) return
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`)
            if (!response.ok) throw new Error('Failed to fetch search results')
            const data = await response.json()
            setSearchResults(data)
        } catch (error) {
            console.error('Error fetching search results:', error)
            setError('An error occurred while fetching results. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (query) {
            fetchSearchResults(query)
        }
    }, [query, fetchSearchResults])

    const debouncedSearch = useCallback(
        debounce((term: string) => {
            router.push(`/blog/results?query=${encodeURIComponent(term)}`, { scroll: false })
        }, 300),
        [router]
    )

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        debouncedSearch(searchTerm)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        debouncedSearch(e.target.value)
    }

    return (
        <div className="container mt-14 lg:mt-24 min-h-screen max-w-screen-xl space-y-14 px-4 py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
                <h1 className="lg:text-5xl text-3xl text-[#C1BADB] font-clashBold font-bold">
                    Results for <span className='text-primary'>{query}</span>
                </h1>
                <form onSubmit={handleSearch} className="flex items-center bg-[#EEEEEF] rounded-2xl drop-shadow-xl p-1 w-full max-w-[400px]">
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-grow px-6 py-3 bg-transparent outline-none text-gray-600 placeholder-gray-400"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="bg-primary/90 text-white py-2 px-4 rounded-2xl hover:bg-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Categories */}
            <div className="flex items-center flex-wrap w-full max-lg:gap-4 lg:justify-start lg:space-x-4 mb-14">
                {categories.map((category) => (
                    <Link
                        key={category}
                        href={`/blog/category/${category}`}
                        className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-primary font-semibold cursor-pointer hover:scale-105 transition-all py-2 px-6 bg-[#F1F1F2]"
                    >
                        {category}
                    </Link>
                ))}
            </div>

            <hr className="border-[1.5px] border-[#CACACC]" />

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && (
                searchResults.length > 0 ? (
                    <div className="lg:grid lg:grid-cols-12 max-sm:space-y-5 gap-7">
                        <div className="col-span-8">
                            {allBlogs?.map((item) => (
                                <BigPostCard key={item.id} post={item} />
                            ))}
                        </div>
                        <div className="col-span-4 space-y-20 max-sm:hidden">
                            <div className="">
                                <h2 className="font-clashBold text-2xl font-extrabold text-violet-normal">
                                    Trending Categories
                                </h2>
                                <div className="flex items-center justify-start flex-wrap gap-3 lg:space-4 mt-5 mb-14">
                                    {categories.map((category) => (
                                        <Link
                                            key={category}
                                            href={`/blog/category/${category}`}
                                            className="border border-primary rounded-full font-satoshiBold text-xs lg:text-sm text-primary font-semibold cursor-pointer hover:scale-105 transition-all py-2 px-6 bg-[#F1F1F2]"
                                        >
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <h2 className="font-clashBold text-2xl font-extrabold text-violet-normal">
                                    Related Articles
                                </h2>
                                <div className="flex flex-col gap-5 mt-5">
                                    {allBlogs
                                        ?.filter((item) => item.id !== blog?.id)
                                        .slice(0, 3)
                                        .map((item) => (
                                            <Link
                                                href={"/blog/" + item.id}
                                                key={item.id}
                                                className="grid grid-cols-12 gap-4 rounded-md hover:cursor-pointer hover:bg-violet-50 "
                                            >
                                                <div className="col-span-4 min-h-40">
                                                    <Image
                                                        src={item?.bannerImage ?? ""}
                                                        alt={item?.title ?? ""}
                                                        quality={100}
                                                        width={1600}
                                                        height={1600}
                                                        className="h-full w-full rounded-md object-cover"
                                                    />
                                                </div>
                                                <div className="col-span-8 space-y-4 ">
                                                    <p className="font-satoshiMedium text-[#381F8C]">
                                                        {item.blogType || "Finance"}
                                                    </p>
                                                    <h2 className="font-clashMedium text-lg text-violet-darker">
                                                        {item.title}
                                                    </h2>
                                                    <p className="line-clamp-2 font-satoshiMedium text-sm">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                            <Newsletter />
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[50vh] flex items-center justify-center flex-col">
                        <CiSearch className='size-8 text-[#C1BADB]' />
                        <h3 className='text-[#C1BADB] lg:text-2xl font-clashSemiBold font-semibold'>No Result for <span className='text-primary'>{query}</span></h3>
                    </div>
                )
            )}
        </div>
    )
}

export default SearchResultsContent