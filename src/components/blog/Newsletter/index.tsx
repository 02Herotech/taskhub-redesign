import React from 'react'

const Newsletter = () => {
    return (
        <div className="space-y-3">
            <h2 className="font-clashBold text-3xl font-extrabold text-violet-normal">
                Newsletter
            </h2>
            <p className="font-satoshiMedium text-sm">Join our newsletter for an exclusive pass to the latest– breaking news, in-depth analyses, and insider perspectives delivered straight to your inbox.</p>
            <form className="w-full px-2 py-4">
                <input type="email" placeholder="Enter your email" className="w-full px-2 py-4 rounded-full border border-[#C6C6C6] bg-[#EEEEEF] appearance-none outline-none placeholder:text-[#C1BADB] placeholder:font-bold" name="" id="" />
                <button></button>
            </form>
        </div>
    )
}

export default Newsletter