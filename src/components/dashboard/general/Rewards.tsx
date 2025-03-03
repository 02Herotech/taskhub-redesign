'use client'

import useAxios from "@/hooks/useAxios";
import Loading from "@/shared/loading";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const RewardsComponent = () =>{
    const [loading, setLoading] = useState(false);
    const [allRewardPoints, setAllRewardPoints] = useState<RewardPointsHistory[]>(
      [],
    );
    const [rewardsWallet, setRewardsWallet] = useState<RewardsWallet>();
    const [refresh, setRefresh] = useState(0);
    const authInstance = useAxios();
  
    const session = useSession();
    const userId = session?.data?.user?.user?.id;
    const userRewardPoints = (session?.data?.user?.rewardsWallet?.balance ?? 0);

    const formatDate = (rewardedAt) => {
        const date = new Date(
          rewardedAt[0], // Year
          rewardedAt[1] - 1, // Month (adjust for 0-based index)
          rewardedAt[2] // Day
        );
      
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.toLocaleString("en-US", { month: "long" });
      
        // Function to add ordinal suffix (st, nd, rd, th)
        const getOrdinalSuffix = (day) => {
          if (day > 3 && day < 21) return "th"; // Covers 4th - 20th
          switch (day % 10) {
            case 1:
              return "st";
            case 2:
              return "nd";
            case 3:
              return "rd";
            default:
              return "th";
          }
        };
      
        return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    };

    const handleFetchRewardPointsHistory = async () => {
        try {
            setLoading(true);
            const { data } = await authInstance.get("rewards/history");
            setAllRewardPoints(data.data);
            console.log("reds", data.data);
            } catch (error: any) {
                console.error(error.response?.data || error);
            } finally {
                setLoading(false);
        }
    };

    const handleRewardsWallet = async () => {
        try {
            // setLoading(true);
            const { data } = await authInstance.get("rewards/wallet");
            setRewardsWallet(data.data);
            console.log("rewards", data.data);
            } catch (error: any) {
                console.error(error.response?.data || error);
            } 
                // setLoading(false);
    };

    useEffect(() => {
        handleRewardsWallet();
        handleFetchRewardPointsHistory();

        const interval = setInterval(() => {
            handleRewardsWallet();
            // handleFetchRewardPointsHistory();
        }, 30000); // Fetch every 30 seconds
    
        return () => clearInterval(interval);
    // eslint-disable-next-line
    }, [refresh]);

    return (
        <>
            <div className="bg-white flex flex-col justify-center items-center min-h-screen p-4">
                {/* Header Section */}
                <div className="w-full max-w-6xl bg-[#EBE9F4] rounded-2xl p-6 flex items-center justify-between mb-6 shadow-md mt-4">
                <p className="text-2xl md:text-3xl font-bold text-primary">Point/Rewards</p>
                    {/* <p className="text-[30px] font-bold text-primary">Point/Rewards</p> */}
                    {/* <div className="bg-white p-3 rounded-lg shadow-sm">
                        <span className="text-purple-700">
                            <svg width="80" height="39" viewBox="0 0 97 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="80" height="39" rx="16" fill="white"/>
                                <path d="M48.5 32.9179L51.1238 34.506C51.377 34.6671 51.6302 34.6615 51.8833 34.4894C52.1365 34.3172 52.2286 34.0811 52.1595 33.781L51.469 30.7774L53.8167 28.7405C54.0468 28.5333 54.1159 28.2861 54.0238 27.9989C53.9317 27.7117 53.7246 27.5561 53.4024 27.5321L50.3298 27.2905L49.1214 24.4595C49.0063 24.1833 48.7992 24.0452 48.5 24.0452C48.2008 24.0452 47.9937 24.1833 47.8786 24.4595L46.6702 27.2905L43.5976 27.5321C43.2754 27.5552 43.0683 27.7107 42.9762 27.9989C42.8841 28.2871 42.9532 28.5343 43.1833 28.7405L45.531 30.7774L44.8405 33.781C44.7714 34.0802 44.8635 34.3163 45.1167 34.4894C45.3698 34.6625 45.623 34.668 45.8762 34.506L48.5 32.9179ZM43.8738 40.5476H40.2143C39.4548 40.5476 38.8048 40.2774 38.2644 39.737C37.724 39.1966 37.4533 38.5462 37.4524 37.7857V34.1262L34.794 31.4333C34.5409 31.1571 34.3452 30.8524 34.2071 30.5191C34.069 30.1859 34 29.8462 34 29.5C34 29.1538 34.069 28.8146 34.2071 28.4822C34.3452 28.1499 34.5409 27.8447 34.794 27.5667L37.4524 24.8738V21.2143C37.4524 20.4548 37.723 19.8048 38.2644 19.2644C38.8057 18.724 39.4557 18.4533 40.2143 18.4524H43.8738L46.5667 15.794C46.8429 15.5409 47.148 15.3452 47.4822 15.2071C47.8164 15.069 48.1557 15 48.5 15C48.8443 15 49.184 15.069 49.5191 15.2071C49.8543 15.3452 50.159 15.5409 50.4333 15.794L53.1262 18.4524H56.7857C57.5452 18.4524 58.1957 18.723 58.737 19.2644C59.2783 19.8057 59.5485 20.4557 59.5476 21.2143V24.8738L62.206 27.5667C62.4591 27.8429 62.6548 28.148 62.7929 28.4822C62.931 28.8164 63 29.1557 63 29.5C63 29.8443 62.931 30.184 62.7929 30.5191C62.6548 30.8543 62.4591 31.159 62.206 31.4333L59.5476 34.1262V37.7857C59.5476 38.5452 59.2774 39.1957 58.737 39.737C58.1966 40.2783 57.5462 40.5485 56.7857 40.5476H53.1262L50.4333 43.206C50.1571 43.4591 49.8524 43.6548 49.5191 43.7929C49.1859 43.931 48.8462 44 48.5 44C48.1538 44 47.8146 43.931 47.4822 43.7929C47.1499 43.6548 46.8447 43.4591 46.5667 43.206L43.8738 40.5476ZM45.0476 37.7857L48.5 41.2381L51.9524 37.7857H56.7857V32.9524L60.2381 29.5L56.7857 26.0476V21.2143H51.9524L48.5 17.7619L45.0476 21.2143H40.2143V26.0476L36.7619 29.5L40.2143 32.9524V37.7857H45.0476Z" fill="#381F8C"/>
                            </svg>
                        </span>
                    </div> */}
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <span className="text-purple-700">
                            <svg 
                                className="w-20 h-10 md:w-16 md:h-8 sm:w-12 sm:h-6" 
                                viewBox="0 0 97 59" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="80" height="39" rx="16" fill="white"/>
                                <path d="M48.5 32.9179L51.1238 34.506C51.377 34.6671 51.6302 34.6615 51.8833 34.4894C52.1365 34.3172 52.2286 34.0811 52.1595 33.781L51.469 30.7774L53.8167 28.7405C54.0468 28.5333 54.1159 28.2861 54.0238 27.9989C53.9317 27.7117 53.7246 27.5561 53.4024 27.5321L50.3298 27.2905L49.1214 24.4595C49.0063 24.1833 48.7992 24.0452 48.5 24.0452C48.2008 24.0452 47.9937 24.1833 47.8786 24.4595L46.6702 27.2905L43.5976 27.5321C43.2754 27.5552 43.0683 27.7107 42.9762 27.9989C42.8841 28.2871 42.9532 28.5343 43.1833 28.7405L45.531 30.7774L44.8405 33.781C44.7714 34.0802 44.8635 34.3163 45.1167 34.4894C45.3698 34.6625 45.623 34.668 45.8762 34.506L48.5 32.9179ZM43.8738 40.5476H40.2143C39.4548 40.5476 38.8048 40.2774 38.2644 39.737C37.724 39.1966 37.4533 38.5462 37.4524 37.7857V34.1262L34.794 31.4333C34.5409 31.1571 34.3452 30.8524 34.2071 30.5191C34.069 30.1859 34 29.8462 34 29.5C34 29.1538 34.069 28.8146 34.2071 28.4822C34.3452 28.1499 34.5409 27.8447 34.794 27.5667L37.4524 24.8738V21.2143C37.4524 20.4548 37.723 19.8048 38.2644 19.2644C38.8057 18.724 39.4557 18.4533 40.2143 18.4524H43.8738L46.5667 15.794C46.8429 15.5409 47.148 15.3452 47.4822 15.2071C47.8164 15.069 48.1557 15 48.5 15C48.8443 15 49.184 15.069 49.5191 15.2071C49.8543 15.3452 50.159 15.5409 50.4333 15.794L53.1262 18.4524H56.7857C57.5452 18.4524 58.1957 18.723 58.737 19.2644C59.2783 19.8057 59.5485 20.4557 59.5476 21.2143V24.8738L62.206 27.5667C62.4591 27.8429 62.6548 28.148 62.7929 28.4822C62.931 28.8164 63 29.1557 63 29.5C63 29.8443 62.931 30.184 62.7929 30.5191C62.6548 30.8543 62.4591 31.159 62.206 31.4333L59.5476 34.1262V37.7857C59.5476 38.5452 59.2774 39.1957 58.737 39.737C58.1966 40.2783 57.5462 40.5485 56.7857 40.5476H53.1262L50.4333 43.206C50.1571 43.4591 49.8524 43.6548 49.5191 43.7929C49.1859 43.931 48.8462 44 48.5 44C48.1538 44 47.8146 43.931 47.4822 43.7929C47.1499 43.6548 46.8447 43.4591 46.5667 43.206L43.8738 40.5476ZM45.0476 37.7857L48.5 41.2381L51.9524 37.7857H56.7857V32.9524L60.2381 29.5L56.7857 26.0476V21.2143H51.9524L48.5 17.7619L45.0476 21.2143H40.2143V26.0476L36.7619 29.5L40.2143 32.9524V37.7857H45.0476Z" fill="#381F8C"/>
                            </svg>
                        </span>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
                    {/* Points Section */}
                    <div className="w-full bg-[#EBE9F4] rounded-2xl shadow-lg p-8">
                        <div className="bg-white p-6 rounded-lg flex items-center justify-between mb-6">
                            <div>
                                <p className="text-[24px] font-bold text-primary">Points</p>
                                <p className="text-[60px] font-bold text-[#FE9B07] mt-2">25</p>
                                <p className="text-primary text-[18px]">This is you</p>
                            </div>
                            <button className="px-5 py-3 bg-orange-500 text-white rounded-full text-base sm:text-sm font-medium hover:bg-orange-600 active:scale-95 transition-transform">Convert points</button>
                            {/* <button className="px-5 py-3 md:px-4 md:py-2 md:text-sm sm:px-3 sm:py-1 sm:text-xs bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 active:scale-95 transition-transform">
                                Use points
                            </button> */}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 rounded-lg flex flex-col items-start text-left transform transition duration-300 hover:scale-105 hover:shadow-md">
                                <div className="rounded-full text-white mb-2">
                                    <img src="/assets/icons/rewards-green.svg" />
                                </div>
                                <h3 className="font-semibold">Assigning tasks.</h3>
                                <p className="text-sm text-gray-600">Earn 10 points by Assigning tasks.</p>
                            </div>
                            <div className="p-5 rounded-lg flex flex-col items-start text-left transform transition duration-300 hover:scale-105 hover:shadow-md">
                                <div className="rounded-full text-white mb-2">
                                    <img src="/assets/icons/rewards-purple.svg" />
                                </div>
                                <h3 className="font-semibold">Reviews</h3>
                                <p className="text-sm text-gray-600">Earn 10 points by Leaving reviews.</p>
                            </div>
                            <div className="p-5 rounded-lg flex flex-col items-start text-left transform transition duration-300 hover:scale-105 hover:shadow-md">
                                <div className="rounded-full text-white mb-2">
                                    <img src="/assets/icons/rewards-blue.svg" />
                                </div>
                                <h3 className="font-semibold">Bookings</h3>
                                <p className="text-sm text-gray-600">Earn 15 points by Booking services.</p>
                            </div>
                            <div className="p-5 rounded-lg flex flex-col items-start text-left transform transition duration-300 hover:scale-105 hover:shadow-md">
                                <div className=" text-white mb-2">
                                    <img src="/assets/icons/rewards-orange.svg" />
                                </div>
                                <h3 className="font-semibold">Reacting</h3>
                                <p className="text-sm text-gray-600">Earn 5 points by reacting on any offers.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Points/Rewards History Section */}
                    <div className="w-full bg-[#EBE9F4] rounded-2xl shadow-lg p-8">
                        <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Points/rewards history</p>
                        {loading && !refresh ? (
                        <div className="flex min-h-80 items-center justify-center">
                            <Loading />
                        </div>
                        ) : allRewardPoints.length < 1 ? (
                        <div className="svg-part">
                            <svg width="151" height="98" viewBox="0 0 151 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_9033_12700)">
                                <path d="M4.78795 75.2147C5.53628 67.5695 10.0592 59.938 17.2557 57.2686C14.5964 65.1869 14.8212 73.7915 17.8902 81.56C19.0846 84.5517 20.7244 87.7547 19.7542 90.8266C19.1505 92.738 17.5908 94.229 15.8288 95.1819C14.0666 96.1347 12.0961 96.6184 10.1501 97.0927L9.77327 97.4216C6.48365 90.4812 4.03963 82.86 4.78795 75.2147Z" fill="#F0F0F0"/>
                                <path d="M17.3272 57.412C13.264 62.2123 10.7066 68.3429 10.2594 74.6278C10.1628 75.9866 10.1829 77.3734 10.5137 78.7016C10.846 79.9938 11.5181 81.1733 12.4599 82.1176C13.3204 83.0157 14.3045 83.8346 14.932 84.9265C15.5933 86.0773 15.6521 87.403 15.2524 88.6542C14.7635 90.1851 13.7541 91.4488 12.7242 92.6503C11.5806 93.9844 10.3716 95.3519 9.91608 97.0928C9.86089 97.3037 9.53711 97.2057 9.59223 96.9951C10.3848 93.9662 13.2558 92.1825 14.5757 89.4387C15.1916 88.1583 15.4257 86.6844 14.7827 85.3666C14.2205 84.2143 13.2064 83.3689 12.3272 82.4671C11.4041 81.5202 10.688 80.4735 10.2999 79.198C9.90288 77.8933 9.82859 76.5043 9.89012 75.149C10.0526 72.0768 10.6966 69.0492 11.7987 66.1772C13.0383 62.8924 14.8302 59.844 17.0969 57.164C17.2372 56.9982 17.4667 57.2473 17.3272 57.412Z" fill="white"/>
                                <path d="M10.2987 72.5762C9.24722 72.3495 8.31045 71.7561 7.6557 70.902C7.00095 70.0479 6.67086 68.9886 6.72437 67.9134C6.72695 67.8695 6.74643 67.8284 6.7787 67.7987C6.81098 67.7689 6.85353 67.7529 6.89739 67.754C6.94124 67.755 6.98298 67.773 7.0138 67.8043C7.04463 67.8355 7.06213 67.8775 7.06262 67.9214C7.01094 68.9226 7.31852 69.9093 7.92984 70.7034C8.54117 71.4975 9.41598 72.0468 10.3964 72.252C10.6094 72.2969 10.5105 72.6208 10.2987 72.5762Z" fill="white"/>
                                <path d="M11.9682 81.7175C13.826 80.5405 15.1723 78.7057 15.7386 76.5792C15.7945 76.3685 16.1183 76.4665 16.0625 76.677C15.469 78.8888 14.0641 80.7952 12.1281 82.0159C11.9435 82.1321 11.7846 81.8331 11.9682 81.7175Z" fill="white"/>
                                <path d="M13.3612 63.2026C13.7498 63.3751 14.1751 63.4483 14.599 63.4157C15.0228 63.3831 15.432 63.2456 15.7896 63.0155C15.9727 62.897 16.1314 63.1961 15.9496 63.3139C15.5533 63.5662 15.1012 63.7175 14.633 63.7546C14.1648 63.7917 13.6946 63.7134 13.2636 63.5267C13.2214 63.5125 13.1863 63.4828 13.1653 63.4436C13.1443 63.4044 13.139 63.3587 13.1504 63.3158C13.1636 63.2729 13.1931 63.237 13.2326 63.2158C13.272 63.1946 13.3183 63.1898 13.3612 63.2026Z" fill="white"/>
                                <path d="M39.7423 70.3015C39.6301 70.3788 39.5179 70.456 39.4057 70.5361C37.9027 71.5825 36.4871 72.7494 35.173 74.0252C35.0698 74.1222 34.9667 74.2221 34.8665 74.3219C31.7331 77.4295 29.2033 81.0923 27.4058 85.1242C26.692 86.7292 26.1013 88.3863 25.6386 90.081C24.9999 92.4216 24.4934 95.0102 23.1587 96.9459C23.0217 97.1494 22.8723 97.3442 22.7112 97.5292L10.2026 97.8557C10.1738 97.8421 10.145 97.8314 10.116 97.8179L9.61719 97.8538C9.63495 97.7647 9.65528 97.6727 9.67304 97.5836C9.68313 97.5319 9.696 97.4801 9.70609 97.4284C9.7137 97.3939 9.72145 97.3594 9.72634 97.3278C9.72883 97.3164 9.73146 97.3049 9.73402 97.2962C9.73891 97.2646 9.74681 97.2358 9.75178 97.2071C9.86401 96.6926 9.98006 96.1779 10.0999 95.6631C10.0998 95.6602 10.0998 95.6602 10.1025 95.6573C11.0258 91.7372 12.2841 87.8598 14.0903 84.2968C14.1447 84.1896 14.1989 84.0796 14.259 83.9723C15.0821 82.3708 16.0346 80.8393 17.1069 79.3931C17.6967 78.6031 18.326 77.8435 18.9925 77.1172C20.7182 75.2439 22.7275 73.6539 24.9469 72.4055C29.3715 69.9176 34.5418 68.8737 39.3741 70.1968C39.4977 70.2307 39.6187 70.2647 39.7423 70.3015Z" fill="#F0F0F0"/>
                                <path d="M39.7192 70.4616C33.5875 71.8458 27.8578 75.1996 23.7203 79.9483C22.8258 80.9749 22.0076 82.0943 21.4728 83.3542C20.9609 84.5862 20.788 85.9329 20.972 87.2545C21.1188 88.4901 21.412 89.737 21.2561 90.9869C21.0919 92.3043 20.3414 93.3982 19.2697 94.1564C17.9584 95.0841 16.3924 95.4849 14.8472 95.8235C13.1317 96.1995 11.3438 96.5629 9.9329 97.6784C9.76195 97.8135 9.56242 97.5401 9.73311 97.4052C12.1879 95.4644 15.5531 95.7704 18.2575 94.375C19.5194 93.7238 20.5929 92.6881 20.8722 91.2484C21.1165 89.9895 20.8152 88.7034 20.6558 87.4536C20.4883 86.1413 20.5461 84.874 21.0035 83.6217C21.4713 82.3407 22.2475 81.1869 23.1119 80.1419C25.0896 77.7867 27.425 75.7575 30.0326 74.1285C32.9982 72.2528 36.2626 70.8987 39.6845 70.1247C39.8963 70.0769 39.9297 70.4141 39.7192 70.4616Z" fill="white"/>
                                <path d="M24.9862 78.3344C24.283 77.5198 23.892 76.4815 23.883 75.405C23.874 74.3285 24.2476 73.2838 24.9371 72.4575C25.0772 72.2908 25.3426 72.5008 25.2023 72.6678C24.5588 73.436 24.2109 74.4092 24.2213 75.4116C24.2318 76.4141 24.5999 77.3798 25.2592 78.1345C25.4023 78.2986 25.1285 78.4977 24.9862 78.3344Z" fill="white"/>
                                <path d="M20.8158 86.6383C23.0072 86.818 25.1857 86.1644 26.917 84.8078C27.0885 84.6732 27.2881 84.9466 27.1168 85.081C25.3126 86.4893 23.044 87.1649 20.764 86.9729C20.5467 86.9544 20.5996 86.6199 20.8158 86.6383Z" fill="white"/>
                                <path d="M33.0652 72.6979C33.2717 73.0698 33.5672 73.3846 33.9253 73.614C34.2833 73.8433 34.6927 73.9801 35.1166 74.012C35.3341 74.0276 35.2809 74.3621 35.0649 74.3465C34.5967 74.3091 34.1448 74.1575 33.7486 73.905C33.3524 73.6525 33.0241 73.3067 32.7922 72.8978C32.7672 72.8611 32.757 72.8162 32.7638 72.7723C32.7706 72.7284 32.7938 72.6887 32.8288 72.6613C32.8651 72.635 32.9103 72.6241 32.9545 72.6309C32.9988 72.6378 33.0386 72.6618 33.0652 72.6979Z" fill="white"/>
                                <path d="M113.154 6.70772C112.968 6.15576 110.626 4.2795 112.061 3.96414L113.238 5.53482L118.648 0.119141L119.193 0.663833L113.154 6.70772Z" fill="#381F8C"/>
                                <path d="M113.154 25.1237C112.968 24.5718 110.626 22.6955 112.061 22.3802L113.238 23.9508L118.648 18.5352L119.193 19.0798L113.154 25.1237Z" fill="#381F8C"/>
                                <path d="M113.158 43.8024C112.971 43.2505 110.629 41.3742 112.065 41.0589L113.241 42.6296L118.652 37.2139L119.197 37.7586L113.158 43.8024Z" fill="#381F8C"/>
                                <path d="M108.174 28.7008C109.096 28.7008 109.843 27.9526 109.843 27.0296C109.843 26.1066 109.096 25.3584 108.174 25.3584C107.251 25.3584 106.504 26.1066 106.504 27.0296C106.504 27.9526 107.251 28.7008 108.174 28.7008Z" fill="#3F3D56"/>
                                <path d="M108.174 10.485C109.096 10.485 109.843 9.73675 109.843 8.81378C109.843 7.8908 109.096 7.14258 108.174 7.14258C107.251 7.14258 106.504 7.8908 106.504 8.81378C106.504 9.73675 107.251 10.485 108.174 10.485Z" fill="#3F3D56"/>
                                <path d="M150.999 4.96973H124.117V5.30397H150.999V4.96973Z" fill="#3F3D56"/>
                                <path d="M109.01 48.1197C109.932 48.1197 110.679 47.3715 110.679 46.4485C110.679 45.5256 109.932 44.7773 109.01 44.7773C108.087 44.7773 107.34 45.5256 107.34 46.4485C107.34 47.3715 108.087 48.1197 109.01 48.1197Z" fill="#3F3D56"/>
                                <path d="M150.999 23.3857H124.117V23.72H150.999V23.3857Z" fill="#3F3D56"/>
                                <path d="M150.999 42.0635H124.117V42.3977H150.999V42.0635Z" fill="#3F3D56"/>
                                <path d="M117.372 46.2926H109.023V37.7695H114.7V38.1038H109.357V45.9584H117.038V42.1146H117.372V46.2926Z" fill="#3F3D56"/>
                                <path d="M117.372 27.5758H109.023V19.0527H114.7V19.387H109.357V27.2416H117.038V23.3979H117.372V27.5758Z" fill="#3F3D56"/>
                                <path d="M117.372 8.52311H109.023V0H114.7V0.33424H109.357V8.18887H117.038V4.34512H117.372V8.52311Z" fill="#3F3D56"/>
                                <path d="M62.8674 30.3784C62.8674 30.3784 60.6362 39.8075 63.3632 39.8075C66.0902 39.8075 72.5359 29.1377 72.5359 29.1377L70.3047 26.4082L66.2999 31.9733L66.0902 29.1377L62.8674 30.3784Z" fill="#A0616A"/>
                                <path d="M71.9401 29.5482C73.1389 29.5482 74.1107 28.5756 74.1107 27.3757C74.1107 26.1758 73.1389 25.2031 71.9401 25.2031C70.7413 25.2031 69.7695 26.1758 69.7695 27.3757C69.7695 28.5756 70.7413 29.5482 71.9401 29.5482Z" fill="#A0616A"/>
                                <path d="M60.9733 94.5981L63.8624 94.5979L65.237 83.4434L60.9727 83.4435L60.9733 94.5981Z" fill="#A0616A"/>
                                <path d="M60.8712 97.6151L69.7561 97.6147V97.5023C69.756 96.5843 69.3917 95.7039 68.7431 95.0548C68.0946 94.4057 67.215 94.041 66.2979 94.0409H66.2977L64.6747 92.8086L61.6467 94.0411L60.8711 94.0412L60.8712 97.6151Z" fill="#2F2E41"/>
                                <path d="M29.8945 90.9897L32.4797 92.2809L38.6863 82.9146L34.8707 81.0088L29.8945 90.9897Z" fill="#A0616A"/>
                                <path d="M28.4609 93.6431L36.4108 97.6141L36.461 97.5135C36.8705 96.6921 36.9373 95.7415 36.6466 94.8708C36.356 94.0002 35.7317 93.2807 34.9111 92.8707L34.9109 92.8706L34.0086 91.0426L30.7493 90.792L30.0553 90.4453L28.4609 93.6431Z" fill="#2F2E41"/>
                                <path d="M95.147 97.627H0V98.0014H95.147V97.627Z" fill="#CCCCCC"/>
                                <path d="M42.293 47.4827C42.293 47.4827 41.1383 61.3785 40.8904 64.3561C40.7205 66.2226 40.3036 68.0583 39.6509 69.815C39.6509 69.815 39.1551 70.8076 39.1551 71.8001L33.5358 82.0218C33.5358 82.0218 31.8186 83.2851 32.0665 84.2777C32.3144 85.2702 31.0312 85.8656 31.0312 85.8656L36.9489 87.0071C36.9489 87.0071 36.701 86.2627 37.4447 86.0146C38.1884 85.7665 38.7805 83.6143 38.7805 83.6143L47.0882 70.0632L53.038 57.6565C53.038 57.6565 56.5088 68.8225 57.2525 70.0632C57.2525 70.0632 59.9795 83.9587 60.4753 85.1994C60.9711 86.4401 61.219 86.44 60.9711 86.9363C60.7232 87.4326 60.7232 87.9289 60.9711 88.177C61.219 88.4251 65.9293 88.177 65.9293 88.177L64.6898 70.5594L62.4586 49.468L51.0547 45.9941L42.293 47.4827Z" fill="#2F2E41"/>
                                <path d="M53.4561 14.3113C56.3314 14.3113 58.6622 11.9783 58.6622 9.10047C58.6622 6.22261 56.3314 3.88965 53.4561 3.88965C50.5809 3.88965 48.25 6.22261 48.25 9.10047C48.25 11.9783 50.5809 14.3113 53.4561 14.3113Z" fill="#A0616A"/>
                                <path d="M62.9536 21.9255L56.756 18.1672C56.756 18.1672 56.5842 15.8334 54.8184 15.7236C53.9319 15.6684 52.6015 15.5842 50.605 15.4553C50.1831 15.4281 49.8984 17.7385 49.4148 17.7072L42.8729 19.4441L43.8645 36.3173C43.8645 36.3173 42.3771 43.0169 42.8729 44.2576C43.3687 45.4982 41.6333 45.9945 42.1291 46.2426C42.625 46.4908 42.1291 48.2277 42.1291 48.2277C42.1291 48.2277 51.7976 53.1904 62.4577 49.4684L61.4661 46.2426C61.6011 45.821 61.6264 45.3718 61.5396 44.9376C61.4528 44.5034 61.2569 44.0986 60.9703 43.7613C60.9703 43.7613 61.9619 42.2725 60.7224 41.0318C60.7224 41.0318 61.2182 38.7986 59.9786 37.8061L59.7307 34.3322L60.4745 32.5952L62.9536 21.9255Z" fill="#E6E6E6"/>
                                <path d="M48.9422 12.0771L48.7967 11.7388C48.778 11.6951 46.9368 7.33869 48.5688 4.65155C49.3242 3.40754 50.6979 2.70519 52.6514 2.56418C55.7081 2.34296 57.8002 3.06872 58.8712 4.71977C59.0507 4.99959 59.1517 5.32267 59.1634 5.65503C59.175 5.9874 59.097 6.31677 58.9375 6.60852C58.778 6.90028 58.543 7.14363 58.257 7.313C57.9711 7.48237 57.6448 7.57149 57.3125 7.571H57.2714L56.7098 6.84108L56.6771 6.91207C56.4738 7.35239 56.0068 7.59344 55.4598 7.54065C55.3668 7.53396 55.2844 7.61433 55.2182 7.78635C55.1959 7.8616 55.1538 7.92945 55.0963 7.9828C55.0388 8.03614 54.968 8.073 54.8913 8.0895C54.4872 8.16825 53.9111 7.65873 53.6532 7.40479C53.6433 7.46323 53.6209 7.51886 53.5876 7.56791C53.5544 7.61696 53.511 7.65828 53.4603 7.68909C53.1886 7.84601 52.7657 7.64102 52.6443 7.57574C51.6773 7.78138 51.0514 7.72638 50.7832 7.41246C50.6014 8.69988 50.2112 11.0172 49.7433 11.1456C49.6944 11.1569 49.6432 11.1521 49.5972 11.132C49.5513 11.1119 49.513 11.0775 49.488 11.0339C49.3753 10.8875 49.2746 10.8146 49.2118 10.8351C49.0596 10.8835 48.9697 11.3852 48.9568 11.709L48.9422 12.0771Z" fill="#2F2E41"/>
                                <path d="M60.2273 22.1746L62.7003 21.7725C64.4818 23.4857 65.6953 25.7046 66.1771 28.1298C66.9209 32.1 67.1688 32.8444 67.1688 32.8444L61.2189 34.3332L57.9961 28.1298L60.2273 22.1746Z" fill="#E6E6E6"/>
                                <path d="M49.2549 27.3389L47.7266 46.7305L86.7279 49.8098L88.2562 30.4182L49.2549 27.3389Z" fill="white"/>
                                <path d="M53.4221 28.8409C52.4677 28.1587 51.2559 28.1094 50.793 28.1192C50.9342 28.5604 51.3731 29.692 52.3275 30.3745C53.2843 31.0585 54.4946 31.1063 54.9568 31.0967C54.8156 30.6557 54.3767 29.5236 53.4221 28.8409Z" fill="#381F8C"/>
                                <path d="M57.1855 41.1795L50.923 40.685C50.738 40.6704 50.5519 40.6924 50.3753 40.7498C50.1988 40.8072 50.0353 40.8988 49.8941 41.0195C49.753 41.1401 49.6369 41.2874 49.5526 41.4529C49.4683 41.6184 49.4174 41.7989 49.4028 41.9841C49.3882 42.1693 49.4102 42.3556 49.4675 42.5323C49.5249 42.709 49.6164 42.8727 49.7369 43.014C49.8574 43.1553 50.0046 43.2714 50.17 43.3558C50.3353 43.4402 50.5157 43.4911 50.7007 43.5057L56.9632 44.0002C57.3369 44.0297 57.707 43.9094 57.9921 43.6658C58.2772 43.4221 58.454 43.0751 58.4834 42.7011C58.5129 42.327 58.3927 41.9566 58.1493 41.6712C57.9059 41.3859 57.5592 41.209 57.1855 41.1795Z" fill="#381F8C"/>
                                <path d="M86.721 28.5322L51.6092 25.7596C51.2008 25.7274 50.7901 25.7761 50.4005 25.9028C50.0108 26.0295 49.65 26.2317 49.3385 26.498C49.0269 26.7643 48.7709 27.0894 48.5849 27.4547C48.3989 27.8201 48.2866 28.2185 48.2545 28.6273L46.9042 45.7488C46.8392 46.5746 47.1046 47.3924 47.642 48.0223C48.1793 48.6523 48.9446 49.0428 49.7696 49.1082L84.8814 51.8807C85.2898 51.9129 85.7006 51.8642 86.0902 51.7376C86.4798 51.6109 86.8406 51.4086 87.1522 51.1423C87.4637 50.876 87.7197 50.5509 87.9057 50.1856C88.0917 49.8203 88.204 49.4218 88.2361 49.0131L89.5194 32.7397L89.5452 32.4072L89.5861 31.8899C89.6182 31.4811 89.5696 31.07 89.443 30.68C89.3165 30.2901 89.1144 29.9289 88.8483 29.6171C88.5823 29.3053 88.2575 29.049 87.8925 28.8629C87.5275 28.6767 87.1294 28.5643 86.721 28.5322ZM85.6842 43.4289L85.4617 46.2496C85.421 46.7478 85.185 47.2096 84.8051 47.5341C84.4252 47.8585 83.9324 48.0193 83.4344 47.9811L78.7371 47.6106C78.2393 47.5699 77.7779 47.3336 77.4537 46.9534C77.1296 46.5732 76.969 46.0799 77.0071 45.5815L77.2296 42.7608C77.2704 42.2627 77.5066 41.801 77.8864 41.4765C78.2663 41.1521 78.759 40.9913 79.2569 41.0293L83.9526 41.4002C84.4504 41.441 84.9118 41.6773 85.2361 42.0573C85.5605 42.4374 85.7216 42.9304 85.6842 43.4289ZM49.0958 41.958C49.1322 41.5016 49.3481 41.0782 49.696 40.7809C50.0439 40.4835 50.4954 40.3364 50.9515 40.3719L57.2138 40.8667C57.44 40.8841 57.6605 40.9461 57.8628 41.0489C58.0651 41.1518 58.2452 41.2935 58.3927 41.466C58.5403 41.6385 58.6524 41.8385 58.7227 42.0544C58.793 42.2703 58.8201 42.498 58.8025 42.7244C58.7848 42.9508 58.7228 43.1715 58.6199 43.3739C58.5169 43.5763 58.3752 43.7564 58.2027 43.9039C58.0302 44.0515 57.8304 44.1635 57.6146 44.2337C57.3988 44.3039 57.1713 44.3309 56.9451 44.313L56.9419 44.3139L50.6797 43.8191C50.4535 43.8012 50.2331 43.7388 50.031 43.6356C49.8289 43.5323 49.6492 43.3902 49.5021 43.2173C49.355 43.0445 49.2434 42.8443 49.1736 42.6282C49.1039 42.4121 49.0775 42.1844 49.0958 41.958ZM50.4364 28.0066L50.3936 27.8312L50.5737 27.8147C50.6442 27.8071 52.31 27.6574 53.6067 28.5845C54.9034 29.5117 55.3011 31.1383 55.3183 31.2063L55.3595 31.3821L55.1798 31.4002C54.9247 31.4192 54.6684 31.4175 54.4136 31.3951C53.6029 31.3476 52.8199 31.0829 52.1464 30.6287C50.8497 29.7016 50.4521 28.075 50.4364 28.0066Z" fill="#381F8C"/>
                                <path d="M80.4124 45.3L78.3771 45.1393C78.2319 45.1281 78.0882 45.175 77.9775 45.2698C77.8669 45.3645 77.7983 45.4993 77.7869 45.6446C77.7754 45.7899 77.822 45.9338 77.9165 46.0447C78.0109 46.1556 78.1455 46.2245 78.2906 46.2363L80.3259 46.397C80.4711 46.4082 80.6148 46.3612 80.7255 46.2665C80.8361 46.1718 80.9047 46.037 80.9162 45.8917C80.9276 45.7464 80.881 45.6025 80.7865 45.4915C80.6921 45.3806 80.5575 45.3117 80.4124 45.3Z" fill="#381F8C"/>
                                <path d="M84.1737 45.5969L82.1384 45.4362C81.9933 45.4251 81.8497 45.472 81.7391 45.5668C81.6285 45.6615 81.56 45.7962 81.5486 45.9415C81.5371 46.0867 81.5837 46.2305 81.6781 46.3415C81.7724 46.4524 81.9069 46.5213 82.052 46.5331L84.0873 46.6938C84.2324 46.7049 84.376 46.6579 84.4866 46.5632C84.5971 46.4685 84.6657 46.3337 84.6771 46.1885C84.6886 46.0433 84.642 45.8994 84.5476 45.7885C84.4533 45.6776 84.3188 45.6087 84.1737 45.5969Z" fill="#381F8C"/>
                                <path d="M80.5253 43.8898L78.49 43.7291C78.3449 43.718 78.2013 43.765 78.0907 43.8597C77.9801 43.9545 77.9116 44.0892 77.9001 44.2344C77.8887 44.3797 77.9353 44.5235 78.0296 44.6344C78.124 44.7453 78.2585 44.8143 78.4035 44.8261L80.4388 44.9868C80.584 44.998 80.7277 44.9511 80.8384 44.8563C80.949 44.7616 81.0176 44.6268 81.0291 44.4815C81.0405 44.3362 80.9939 44.1923 80.8995 44.0814C80.805 43.9704 80.6704 43.9016 80.5253 43.8898Z" fill="#381F8C"/>
                                <path d="M84.2835 44.1867L82.2482 44.026C82.103 44.0148 81.9593 44.0618 81.8486 44.1565C81.738 44.2512 81.6694 44.386 81.658 44.5313C81.6465 44.6766 81.6931 44.8205 81.7876 44.9314C81.882 45.0424 82.0166 45.1112 82.1617 45.123L84.197 45.2837C84.3422 45.2949 84.4859 45.248 84.5966 45.1532C84.7072 45.0585 84.7758 44.9237 84.7873 44.7784C84.7987 44.6331 84.7521 44.4892 84.6577 44.3783C84.5632 44.2673 84.4286 44.1985 84.2835 44.1867Z" fill="#381F8C"/>
                                <path d="M80.6351 42.4797L78.5998 42.319C78.4546 42.3078 78.3109 42.3547 78.2002 42.4494C78.0895 42.5442 78.021 42.679 78.0095 42.8243C77.9981 42.9696 78.0447 43.1135 78.1391 43.2244C78.2336 43.3354 78.3682 43.4042 78.5133 43.4159L80.5486 43.5766C80.6937 43.5877 80.8373 43.5408 80.9479 43.446C81.0585 43.3513 81.127 43.2166 81.1385 43.0713C81.1499 42.9261 81.1033 42.7823 81.009 42.6714C80.9146 42.5604 80.7801 42.4915 80.6351 42.4797Z" fill="#381F8C"/>
                                <path d="M84.3925 42.7766L82.3572 42.6159C82.2121 42.6048 82.0685 42.6517 81.9579 42.7465C81.8473 42.8412 81.7788 42.9759 81.7673 43.1212C81.7559 43.2664 81.8025 43.4102 81.8968 43.5211C81.9912 43.6321 82.1257 43.701 82.2707 43.7128L84.306 43.8735C84.4512 43.8846 84.5948 43.8376 84.7053 43.7429C84.8159 43.6482 84.8844 43.5134 84.8959 43.3682C84.9073 43.2229 84.8608 43.0791 84.7664 42.9682C84.672 42.8573 84.5376 42.7884 84.3925 42.7766Z" fill="#381F8C"/>
                                <path d="M47.7293 34.029L47.7031 34.3623L88.9198 37.603L88.9459 37.2697L47.7293 34.029Z" fill="white"/>
                                <path d="M89.5403 32.4093L89.5144 32.7419L88.08 32.6292L72.7969 31.4276L72.8244 31.0947L88.1059 32.2967L89.5403 32.4093Z" fill="#3F3D56"/>
                                <path d="M39.1525 28.8735C39.1525 28.8735 36.9214 38.3026 39.6484 38.3026C42.3754 38.3026 48.821 27.6328 48.821 27.6328L46.5898 24.9033L42.5851 30.4684L42.3754 27.6328L39.1525 28.8735Z" fill="#A0616A"/>
                                <path d="M48.2292 28.0424C49.428 28.0424 50.3998 27.0697 50.3998 25.8698C50.3998 24.67 49.428 23.6973 48.2292 23.6973C47.0304 23.6973 46.0586 24.67 46.0586 25.8698C46.0586 27.0697 47.0304 28.0424 48.2292 28.0424Z" fill="#A0616A"/>
                                <path d="M44.6821 20.9331L43.1947 19.4443C43.1947 19.4443 40.2197 21.1813 39.9718 22.9182C39.7239 24.6552 38.4844 30.1141 38.4844 30.1141L43.0707 30.4863L44.5582 28.2531L44.6821 20.9331Z" fill="#E6E6E6"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_9033_12700">
                                <rect width="151" height="98" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <p className="text-purple-800 font-medium text-lg mt-4">
                                Looks like you dont have any rewards yet!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {allRewardPoints.map((reward, index) => (
                                <div key={index} className="flex items-center gap-6 border-b-[2px] border-gray-300 pb-1 transform transition duration-300 hover:scale-105">
                                    <div className="rounded-[10rem] text-white w-12 h-14">
                                        <img src="/assets/icons/rewards-blue.svg" className="rounded-full" />
                                    </div>
                                    <div className="mt-[-1rem]">
                                        <p className="text-base font-bold text-primary">You earned {reward.amount} points for posting a task.</p>
                                        <p className="text-sm text-gray-700">{formatDate(reward.rewardedAt)}</p>
                                    </div>
                                </div>
                            ))}
                        
                            {/* <div className="flex items-center gap-6 border-b pb-4 transform transition duration-300 hover:scale-105">
                                <div className="bg-green-500 p-3 rounded-full text-white">📋</div>
                                <div>
                                    <p className="text-base font-medium text-gray-700">You earned 15 points for assigning a task.</p>
                                    <p className="text-sm text-gray-500">15 of Oct. 2025</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 transform transition duration-300 hover:scale-105">
                                <div className="bg-yellow-500 p-3 rounded-full text-white">🏷️</div>
                                <div>
                                    <p className="text-base font-medium text-gray-700">You earned 5 points for leaving a review.</p>
                                    <p className="text-sm text-gray-500">15 of Oct. 2025</p>
                                </div>
                            </div> */}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RewardsComponent;