"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./newsletter.module.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [resOK, setResOk] = useState(false);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setResOk(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [resOK]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/util/blog/subscribe-to-newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (response.ok) {
        setResOk(true);
        setEmail("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="z-50 mx-auto hidden overflow-hidden lg:block lg:h-[200px] lg:w-[70%] xl:w-[53%]">
        <div className="flex h-[200px] justify-between !overflow-hidden !rounded-3xl">
          <svg
            width="391"
            height="194"
            className="rounded-3xl"
            viewBox="0 0 391 207"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M61.2185 59.3549C10.1179 38.9515 -6.75186 85.4965 -8.79918 111.319C-11.3509 159.754 15.7118 141.397 31.0403 181.946C46.3688 222.495 55.8798 182.868 80.72 177.001C105.56 171.134 90.9645 225.91 136.38 214.018C181.795 202.126 187.752 116.101 128.842 146.351C69.9312 176.601 125.094 84.859 61.2185 59.3549Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M65.893 76.8159C26.5258 61.1188 13.5318 96.922 11.9557 116.786C9.99203 154.043 30.8395 139.923 42.6498 171.116C54.4601 202.308 61.7854 171.826 80.9213 167.314C100.057 162.802 88.8154 204.937 123.801 195.791C158.787 186.645 163.373 120.472 117.991 143.739C72.6099 167.005 115.102 96.4372 65.893 76.8159Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M56.8438 43.1852C-5.2347 18.42 -25.7264 74.9098 -28.2124 106.25C-31.3102 165.034 1.56511 142.756 20.1881 191.97C38.8111 241.184 50.3635 193.09 80.5395 185.97C110.716 178.851 92.9866 245.331 148.157 230.9C203.327 216.468 210.561 112.062 138.997 148.773C67.433 185.484 134.442 74.1417 56.8438 43.1852Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M53.2231 29.6039C-17.9388 1.17992 -41.4325 66.0249 -44.2842 102C-47.8386 169.477 -10.151 143.903 11.1945 200.394C32.54 256.884 45.7858 201.678 80.3783 193.504C114.971 185.329 94.6436 261.642 157.889 245.073C221.134 228.505 229.431 108.658 147.393 150.802C65.3538 192.946 142.175 65.134 53.2231 29.6039Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M47.9308 10.1992C-36.4813 -23.4619 -64.3437 53.3161 -67.7233 95.9128C-71.9343 175.809 -27.2324 145.53 -1.90862 212.42C23.4152 279.31 39.1225 213.943 80.1544 204.267C121.186 194.591 97.0808 284.948 172.099 265.334C247.117 245.721 256.95 103.817 159.641 153.711C62.3328 203.606 153.446 52.2756 47.9308 10.1992Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M41.7347 -12.4426C-58.1999 -52.216 -91.1778 38.4832 -95.1749 88.8045C-100.153 183.189 -47.2349 147.424 -17.249 226.446C12.7368 305.469 31.326 228.249 79.9007 216.823C128.476 205.396 99.9466 312.136 188.755 288.973C277.563 265.81 289.191 98.1726 173.997 157.106C58.8025 216.039 166.653 37.2742 41.7347 -12.4426Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
          </svg>

          <svg
            width="381"
            height="194"
            className="rounded-3xl"
            viewBox="0 0 381 207"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M314.303 29.8719C363.438 5.1049 384.288 50.0077 388.572 75.555C395.323 123.584 366.768 107.649 355.021 149.377C343.275 191.104 330.356 152.454 305.1 148.768C279.844 145.082 299.145 198.382 252.868 190.482C206.591 182.581 193.18 97.3999 254.497 122.416C315.813 147.431 252.886 60.8307 314.303 29.8719Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M311.164 47.6732C349.018 28.6143 365.074 63.1528 368.371 82.8044C373.565 119.75 351.569 107.496 342.514 139.596C333.46 171.697 323.513 141.967 304.057 139.135C284.602 136.303 299.463 177.302 263.814 171.231C228.166 165.16 217.847 99.6359 265.079 118.871C312.311 138.105 263.847 71.4967 311.164 47.6732Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M317.257 13.3825C376.948 -16.6839 402.271 37.8114 407.472 68.8173C415.666 127.109 380.979 107.773 366.704 158.419C352.428 209.065 336.74 162.157 306.059 157.687C275.379 153.217 298.818 217.904 242.602 208.322C186.386 198.74 170.107 95.3577 244.591 125.71C319.074 156.063 242.642 50.9655 317.257 13.3825Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M319.684 -0.461601C388.106 -34.9624 417.146 27.5956 423.114 63.1872C432.519 130.1 392.751 107.897 376.396 166.029C360.04 224.162 342.047 170.315 306.875 165.178C271.703 160.041 298.585 234.298 234.139 223.288C169.694 212.279 151.012 93.6068 236.403 128.462C321.794 163.317 234.156 42.6644 319.684 -0.461601Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M323.269 -20.2532C404.436 -61.1228 438.866 12.9434 445.934 55.0852C457.073 134.313 409.909 108.034 390.494 176.871C371.079 245.708 349.75 181.954 308.033 175.881C266.315 169.807 298.182 257.727 221.743 244.707C145.305 231.688 123.177 91.1754 224.453 132.424C325.729 173.673 221.81 30.8338 323.269 -20.2532Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M327.474 -43.348C423.574 -91.6557 464.31 -4.1656 472.665 45.6179C485.826 139.213 430.001 108.182 406.996 189.511C383.991 270.841 358.761 195.529 309.377 188.367C259.993 181.205 297.69 285.062 207.205 269.704C116.719 254.346 90.5674 88.3539 210.447 137.053C330.327 185.753 207.349 17.0368 327.474 -43.348Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="z-10 mt-[-200px] h-[194px] rounded-3xl bg-[#140B31] px-10 py-10">
          <div className="z-10 flex items-center gap-[5%]">
            <div className="flex w-[40%] flex-col">
              <h2 className="text-left font-clashSemiBold text-[28px]  text-white xl:text-[32px]">
                Newsletter
              </h2>

              <p className="font-satoshi text-[12px] text-white">
                Join our newsletter for an exclusive pass to the latest breaking
                news, in-depth analysis, and insider perspectives delivered
                straight to your inbox.
              </p>
            </div>

            <div className="w-[55%]">
              {message && (
                <p
                  className={`mb-2 text-center text-[12px] ${message.includes("Successfully") ? "text-green-500" : "text-red-500"}`}
                >
                  {message}
                </p>
              )}
              {resOK ? (
                <div
                  className={`flex items-center ${styles.animation} text-[#EEEEEF]`}
                >
                  <span className="text-[15px] ">
                    <AiOutlineCheckCircle />
                  </span>
                  <p className="ml-2 text-[15px]">Thank you for Subscribing</p>
                </div>
              ) : (
                <form
                  className={`flex w-full items-center justify-between rounded-[60px]  bg-white px-2   `}
                  onSubmit={onSubmit}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className={`h-[50px] w-[70%] rounded-[60px]  px-5 text-left text-[12px] font-semibold text-[#381F8C] outline-none  `}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <button
                    className={`h-[40px]   w-[140px] rounded-[60px] bg-[#E58C06] px-3 font-satoshi text-[17px] font-[600] text-[#EEEEEF] `}
                    type="submit"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="z-50 mx-auto  h-[392px] w-[90%] overflow-hidden rounded-3xl 
             bg-[#140B31] lg:hidden"
      >
        <span className="flex h-[190px] justify-end overflow-hidden">
          <svg
            width="229"
            height="221"
            viewBox="0 0 229 221"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M130.313 34.7593C120.07 6.05817 146.177 -2.32227 160.511 -2.92485C187.37 -3.34203 176.655 11.2589 198.782 20.5756C220.909 29.8924 198.782 34.3422 195.024 47.9697C191.267 61.5971 221.883 54.6443 214.368 79.5354C206.853 104.426 159.12 105.956 177.072 73.9731C195.024 41.9902 143.116 70.6358 130.313 34.7593Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M139.882 37.7035C132.003 15.593 152.086 9.13696 163.112 8.67275C183.773 8.35137 175.53 19.5995 192.551 26.7768C209.572 33.9542 192.551 37.3822 189.66 47.8804C186.77 58.3786 210.321 53.0224 204.54 72.1977C198.76 91.373 162.042 92.5514 175.851 67.9127C189.66 43.274 149.731 65.3417 139.882 37.7035Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M121.455 32.0048C109.024 -2.86182 140.71 -13.0425 158.107 -13.7745C190.705 -14.2813 177.699 3.45605 204.555 14.7742C231.41 26.0923 204.555 31.498 199.994 48.0529C195.434 64.6077 232.592 56.1614 223.471 86.3994C214.351 116.637 156.418 118.496 178.206 79.6423C199.994 40.789 136.994 75.588 121.455 32.0048Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M114.013 29.7214C99.7435 -10.2477 136.115 -21.9182 156.085 -22.7574C193.503 -23.3383 178.575 -3.00523 209.401 9.96921C240.228 22.9437 209.401 29.1404 204.167 48.1179C198.932 67.0955 241.585 57.4131 231.116 92.0761C220.646 126.739 154.146 128.869 179.156 84.3302C204.167 39.7911 131.85 79.6826 114.013 29.7214Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M103.382 26.394C86.4862 -21.0161 129.552 -34.8593 153.197 -35.8547C197.502 -36.5438 179.826 -12.4253 216.326 2.96458C252.827 18.3545 216.326 25.7049 210.128 48.2155C203.93 70.7261 254.434 59.2411 242.037 100.357C229.641 141.474 150.901 144 180.515 91.1694C210.128 38.3384 124.502 85.6566 103.382 26.394Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M90.979 22.4997C71.0193 -33.627 121.895 -50.0155 149.828 -51.1938C202.168 -52.0096 181.286 -23.4568 224.406 -5.23737C267.525 12.9821 224.406 21.6839 217.083 48.3332C209.761 74.9825 269.424 61.3859 254.779 110.062C240.135 158.738 147.116 161.729 182.1 99.1845C217.083 36.6401 115.929 92.6581 90.979 22.4997Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
          </svg>
        </span>

        <span>
          <svg
            width="194"
            height="208"
            viewBox="0 0 194 208"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45.1302 103.09C21.4266 86.7138 7.38535 108.504 3.32769 121.447C-3.62535 145.872 12.3302 139.659 15.4239 162.145C18.5176 184.631 27.9955 165.514 41.3595 165.417C54.7235 165.32 40.8827 191.578 65.452 190.806C90.0213 190.034 103.098 146.818 69.4986 155.386C35.8991 163.954 74.7597 123.561 45.1302 103.09Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M45.4783 112.547C27.2149 99.942 16.4052 116.702 13.2833 126.657C7.93441 145.446 20.2231 140.671 22.6126 157.97C25.0021 175.27 32.2974 160.565 42.5915 160.495C52.8857 160.424 42.2317 180.62 61.1571 180.033C80.0824 179.446 90.1431 146.204 64.264 152.786C38.385 159.367 68.3076 128.304 45.4783 112.547Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M44.7838 94.3253C15.9854 74.4418 -1.06477 100.886 -5.99007 116.594C-14.4292 146.238 4.95077 138.702 8.71526 165.995C12.4797 193.289 23.9874 170.087 40.2212 169.974C56.4549 169.86 39.6495 201.726 69.4945 200.796C99.3395 199.866 115.212 147.416 74.3999 157.806C33.5878 168.196 80.7817 119.18 44.7838 94.3253Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M44.5179 86.9707C11.5098 64.1598 -8.04749 94.5186 -13.7001 112.549C-23.3866 146.578 -1.16561 137.92 3.13961 169.246C7.44484 200.572 20.6467 173.937 39.2578 173.8C57.869 173.664 38.5902 210.245 72.8062 209.166C107.022 208.087 125.239 147.881 78.4466 159.822C31.6538 171.763 85.7779 115.484 44.5179 86.9707Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M44.0793 76.4486C4.91879 49.4187 -18.2606 85.359 -24.9553 106.708C-36.4257 146.999 -10.0755 136.759 -4.95279 173.856C0.169938 210.954 15.8136 179.421 37.8869 179.269C59.9601 179.117 37.1143 222.426 77.6949 221.167C118.275 219.907 139.85 148.62 84.3584 162.736C28.8671 176.852 93.03 110.236 44.0793 76.4486Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
            <path
              d="M43.5604 64.1674C-2.81043 32.2065 -30.2251 74.656 -38.1361 99.8758C-51.6882 147.473 -20.5042 135.391 -14.4173 179.225C-8.33026 223.06 10.1672 185.813 36.295 185.647C62.4227 185.481 35.4075 236.638 83.4415 235.175C131.476 233.712 156.968 149.499 91.2924 166.143C25.6169 182.786 101.524 104.119 43.5604 64.1674Z"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
          </svg>
        </span>

        <div className="z-50 -mt-[400px] space-y-5 px-5 py-10">
          <h2 className=" text-left font-clashSemiBold  text-[28px] text-white">
            Newsletter
          </h2>

          <p className="font-satoshi text-[16px] text-white">
            Join our newsletter for an exclusive pass to the latest breaking
            news, in-depth analysis, and insider perspectives delivered straight
            to your inbox.
          </p>

          <div className=" ">
            {message && (
              <p
                className={`mb-2 text-center text-[10px] ${message.includes("Successfully") ? "text-green-500" : "text-red-500"}`}
              >
                {message}
              </p>
            )}

            {resOK ? (
              <div
                className={`flex items-center ${styles.animation} text-[#EEEEEF]`}
              >
                <span className="text-[15px] ">
                  <AiOutlineCheckCircle />
                </span>
                <p className="ml-2 text-[15px]">Thank you for Subscribing</p>
              </div>
            ) : (
              <form
                className={`flex w-full flex-col items-center space-y-5`}
                onSubmit={onSubmit}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className={`h-[50px] w-full rounded-[60px]  px-5 text-left text-[12px] font-semibold text-[#381F8C] outline-none  `}
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  className={`h-[40px] w-[130px] rounded-[60px] bg-[#E58C06] px-3 font-satoshi text-[15px] font-[600] text-[#EEEEEF]`}
                  type="submit"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
