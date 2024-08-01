import Image from 'next/image'

const FeaturedPost = () => {
  return (
      <div className="lg:flex lg:space-x-4 max-sm:space-y-4 w-full mb-14">
          <div className="flex-shrink-0">
              <Image
                  src="/assets/images/blog/blogImage1.png"
                  alt="blog.title"
                  quality={100}
                  width={590}
                  height={790}
                  className="h-full object-cover rounded-2xl"
              />
          </div>
          <div className="lg:px-5 lg:py-2 space-y-4">
              <h3 className="text-tc-orange text-base lg:text-xl font-satoshiBold font-bold">Career & Transportations</h3>
              <h1 className="text-primary text-xl lg:text-3xl font-clashSemiBold font-semibold">How to Start Import Business in Australia in 9 Key Steps</h1>
              <h3 className="text-tc-orange font-satoshi text-sm lg:text-lg">Read Time: 10 Mins</h3>
              <p className="text-[#140B31] font-satoshi text-sm lg:text-lg line-clamp-2">Are you interested in learning how to start import business in Australia? If so, we will provide you with thorough information to answer your questionnnsss</p>
              <div className="flex items-center space-x-3">
                  <Image
                      src="/assets/images/blog/blogImage1.png"
                      alt="blog.title"
                      width={66}
                      height={66}
                      className="rounded-full object-cover size-14"
                  />
                  <div className="">
                      <h5 className="text-sm lg:text-base text-[#381F8C] font-satoshiBold font-bold">Posted by admin</h5>
                      <h5 className="text-sm lg:text-base text-[#262528]">20 of April,2024</h5>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default FeaturedPost