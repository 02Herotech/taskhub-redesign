import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const BlogSearch = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const handleSearch = (searchTerm: string) => {
        router.push(`/blog/results?query=${encodeURIComponent(searchTerm)}`)
    }

    return (
        <div className="relative w-full mb-14">
            <div className="flex items-center justify-center">
                <Image
                    src="/assets/images/blog/blog_banner.png"
                    alt="Blog banner"
                    width={1200}
                    quality={100}
                    height={202}
                    className="rounded-3xl h-[110px] lg:h-[202px]"
                />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1/2 max-w-md text-[#C1BADB]">
                <form className="relative w-full flex" onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(searchTerm);
                }}>
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
                        <CiSearch className="size-5" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-12 pr-4 py-3 rounded-l-2xl drop-shadow-lg bg-[#EEEEEF] appearance-none outline-none border-none placeholder:text-[#C1BADB]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 rounded-r-2xl"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BlogSearch