'use client'
import NewsLetter from '@/components/newsletter'
import Logo from '../Logo'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { usePathname } from 'next/navigation'
import {
    filterMarketPlace,
    setFilterLoadingState,
    setFilterParams,
} from "@/store/Features/marketplace";
import axios from "axios";
import mobileFooter from "../../../../public/assets/images/homepage/mobileFooter.png"

const Footer = () => {
    const router = useRouter()
    const pathname = usePathname()

    const link_1 = [
        {
            label: "About Us",
            url: "/about",
        },

        {
            label: "Marketplace",
            url: "/marketplace",
        },
        {
            label: "Business Hub",
            url: "/coming-soon",

        }
    ]

    const category_link_2 = [
        { id: 1, categoryName: 'Home Service' },

        { id: 2, categoryName: 'Beauty' },

        { id: 3, categoryName: 'Information and Technology' },

        { id: 4, categoryName: 'Events' },

        { id: 5, categoryName: 'Art and Craft' },

        { id: 6, categoryName: 'Petcare' },

        { id: 7, categoryName: 'Custodian' },
        { id: 8, categoryName: 'Grocery' },

    ]

    const link_3 = [
        {
            label: "FAQs",
            url: "/home#FAQSection",
        },

        {
            label: "Contact us",
            url: "/contact",
        },
        {
            label: "Terms and Condition",
            url: "/",

        },
        {
            label: "Privacy",
            url: "/",
        },

    ]

    const dispatch = useDispatch();

    const handleFilterByCategory = async (category: string) => {
        dispatch(setFilterLoadingState(true));
        try {
            const url =
                `${process.env.NEXT_PUBLIC_API_URL}/listing/filter-listings/0?category=` +
                category;
            const { data } = await axios.get(url);
            dispatch(
                filterMarketPlace({ data: data.content, totalPages: data.totalPages }),
            );
            dispatch(setFilterParams(`?category=${category}`));
        } catch (error: any) {
            console.log(error.response.message || error);
        } finally {
            dispatch(setFilterLoadingState(false));
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className=' relative '>
            <div className='lg:h-[650px] h-[900px] bg-[#895404] '>

                <div className='hidden lg:flex justify-between overflow-hidden'>
                    <div
                        style={{
                            position: 'relative',
                            height: '650px',
                            width: '250px',
                            float: 'left',
                            top: '300px',
                            zIndex: '2'

                        }}
                    >
                        <div
                            style={{
                                height: '650px',
                                width: '500px',
                                borderRadius: '50%',
                                backgroundImage: 'radial-gradient(circle, #aa7933, transparent)',
                                filter: 'blur(30px)',
                                position: 'absolute',
                                left: '-250px',
                            }}
                        ></div>
                    </div>

                    <div
                        style={{
                            position: 'relative',
                            height: '500px',
                            width: '250px',
                            float: 'right',
                            // top: '-160px'
                        }}
                    >
                        <div
                            style={{
                                height: '500px',
                                width: '500px',
                                borderRadius: '50%',
                                backgroundImage: 'radial-gradient(circle, #aa7933, transparent)',
                                filter: 'blur(70px)',
                                position: 'absolute',
                                right: '-200px',
                            }}
                        ></div>
                    </div>

                </div>

                <div className="lg:hidden block h-full w-full -z-1 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${mobileFooter.src})` }}>
                </div>

                <div className=' mx-auto max-w-7xl lg:mt-[-500px] mt-[-680px]  z-50'>
                    <div className='w-[85%] mx-auto flex flex-col items-center space-y-8 mt-12 lg:mt-0' >

                        <Link href="/">
                            <Logo />
                        </Link>

                        <p className='font-satoshi lg:text-[16px] text-[13px] text-[#EBE9F4] font-[500] text-center lg:w-[50%]'>
                            This platform aims to help immigrants succeed in the
                            Australian economy by providing resources and opportunities.
                        </p>

                        <div className='flex flex-col items-center lg:space-y-8 space-y-5'>
                            <ul className='flex lg:space-x-5 space-x-2 justify-center '>
                                {link_1.map((eachLink, index) => (
                                    <li key={index} className='flex space-x-2 items-center'>
                                        <span className='h-1 w-1 rounded-full bg-[#EBE9F4]'>

                                        </span>
                                        <Link href={eachLink.url} className='text-[#EBE9F4] font-satoshi font-[500] lg:text-[15px] text-[12px]'>{eachLink.label}</Link>
                                    </li>

                                ))}
                            </ul>

                            <ul className='flex lg:space-x-5 space-x-3 flex-wrap justify-center '>
                                {category_link_2.map((eachLink, index) => (
                                    <li key={index}
                                        onClick={() => {
                                            router.push('/marketplace');
                                            handleFilterByCategory(eachLink.categoryName)
                                        }}
                                        className='flex space-x-2 items-center mb-5 '>

                                        <span className='h-1 w-1 rounded-full bg-[#EBE9F4]'>

                                        </span>
                                        <span className='text-[#EBE9F4] font-satoshi font-[500] lg:text-[15px] text-[12px] hover:cursor-pointer'>
                                            {eachLink.categoryName}
                                        </span>
                                    </li>

                                ))}
                            </ul>

                            <ul className='flex lg:space-x-5 space-x-2 flex-wrap justify-center -mt-3'>
                                {link_3.map((eachLink, index) => (
                                    <li key={index} className='flex space-x-2 items-center mb-5'>
                                        <span className='h-1 w-1 rounded-full bg-[#EBE9F4]'>

                                        </span>
                                        <Link href={eachLink.url} className='text-[#EBE9F4] font-satoshi font-[500] lg:text-[15px] text-[12px]'>{eachLink.label}</Link>
                                    </li>

                                ))}
                            </ul>

                            <div className='flex space-x-3'>
                                <Link href={'https://www.instagram.com/oloja_au?igsh=dzRuYW52MjZ4bjJq'}
                                    target="_blank" rel="noopener noreferrer">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" fill="#C1BADB" />
                                        <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#C6C6C6" />
                                        <g clip-path="url(#clip0_3535_8213)">
                                            <path d="M30.375 12H17.625C14.5184 12 12 14.5184 12 17.625V30.375C12 33.4816 14.5184 36 17.625 36H30.375C33.4816 36 36 33.4816 36 30.375V17.625C36 14.5184 33.4816 12 30.375 12Z" fill="#381F8C" />
                                            <path d="M30.375 12H17.625C14.5184 12 12 14.5184 12 17.625V30.375C12 33.4816 14.5184 36 17.625 36H30.375C33.4816 36 36 33.4816 36 30.375V17.625C36 14.5184 33.4816 12 30.375 12Z" fill="#381F8C" />
                                            <path d="M24.0008 14.625C21.4548 14.625 21.1352 14.6362 20.1353 14.6816C19.1372 14.7274 18.4559 14.8853 17.8598 15.1172C17.2432 15.3566 16.7201 15.677 16.1991 16.1982C15.6775 16.7194 15.3572 17.2424 15.117 17.8588C14.8845 18.4551 14.7263 19.1366 14.6814 20.1342C14.6367 21.1342 14.625 21.4539 14.625 24.0001C14.625 26.5463 14.6363 26.8648 14.6816 27.8647C14.7276 28.8628 14.8855 29.5441 15.1172 30.1402C15.3568 30.7568 15.6772 31.2799 16.1984 31.8009C16.7194 32.3225 17.2424 32.6436 17.8586 32.883C18.4552 33.1148 19.1365 33.2728 20.1344 33.3186C21.1344 33.364 21.4538 33.3752 23.9997 33.3752C26.5461 33.3752 26.8646 33.364 27.8646 33.3186C28.8626 33.2728 29.5447 33.1148 30.1412 32.883C30.7576 32.6436 31.2799 32.3225 31.8007 31.8009C32.3223 31.2799 32.6425 30.7568 32.8828 30.1404C33.1133 29.5441 33.2715 28.8626 33.3184 27.8649C33.3633 26.865 33.375 26.5463 33.375 24.0001C33.375 21.4539 33.3633 21.1344 33.3184 20.1344C33.2715 19.1363 33.1133 18.4552 32.8828 17.8591C32.6425 17.2424 32.3223 16.7194 31.8007 16.1982C31.2793 15.6768 30.7578 15.3564 30.1406 15.1173C29.543 14.8853 28.8613 14.7273 27.8632 14.6816C26.8632 14.6362 26.5448 14.625 23.9979 14.625H24.0008ZM23.1598 16.3145C23.4095 16.3141 23.688 16.3145 24.0008 16.3145C26.5041 16.3145 26.8007 16.3235 27.7892 16.3684C28.7032 16.4102 29.1994 16.5629 29.5298 16.6913C29.9674 16.8611 30.2793 17.0643 30.6072 17.3925C30.9353 17.7206 31.1384 18.0331 31.3088 18.4706C31.4371 18.8006 31.59 19.2968 31.6316 20.2108C31.6765 21.1991 31.6863 21.4959 31.6863 23.9979C31.6863 26.4999 31.6765 26.7968 31.6316 27.7851C31.5898 28.6991 31.4371 29.1952 31.3088 29.5253C31.1389 29.9629 30.9353 30.2744 30.6072 30.6023C30.2791 30.9305 29.9676 31.1335 29.5298 31.3035C29.1997 31.4324 28.7032 31.5848 27.7892 31.6266C26.8009 31.6715 26.5041 31.6812 24.0008 31.6812C21.4975 31.6812 21.2008 31.6715 20.2126 31.6266C19.2985 31.5844 18.8024 31.4317 18.4717 31.3033C18.0342 31.1333 17.7217 30.9303 17.3935 30.6022C17.0654 30.274 16.8623 29.9623 16.692 29.5246C16.5637 29.1945 16.4108 28.6984 16.3691 27.7843C16.3242 26.796 16.3152 26.4992 16.3152 23.9956C16.3152 21.4921 16.3242 21.1968 16.3691 20.2085C16.4109 19.2944 16.5637 18.7983 16.692 18.4678C16.862 18.0303 17.0654 17.7178 17.3936 17.3897C17.7218 17.0616 18.0342 16.8584 18.4717 16.6882C18.8022 16.5592 19.2985 16.4069 20.2126 16.3649C21.0774 16.3258 21.4126 16.3141 23.1598 16.3121V16.3145ZM29.0052 17.8711C28.3841 17.8711 27.8802 18.3745 27.8802 18.9957C27.8802 19.6168 28.3841 20.1207 29.0052 20.1207C29.6263 20.1207 30.1302 19.6168 30.1302 18.9957C30.1302 18.3746 29.6263 17.8707 29.0052 17.8707V17.8711ZM24.0008 19.1856C21.3421 19.1856 19.1864 21.3413 19.1864 24.0001C19.1864 26.6589 21.3421 28.8136 24.0008 28.8136C26.6597 28.8136 28.8146 26.6589 28.8146 24.0001C28.8146 21.3413 26.6595 19.1856 24.0007 19.1856H24.0008ZM24.0008 20.875C25.7267 20.875 27.1259 22.2741 27.1259 24.0001C27.1259 25.7259 25.7267 27.1252 24.0008 27.1252C22.2749 27.1252 20.8759 25.7259 20.8759 24.0001C20.8759 22.2741 22.2749 20.875 24.0008 20.875Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3535_8213">
                                                <rect width="24" height="24" fill="white" transform="translate(12 12)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </Link>

                                {/* <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" fill="#C1BADB" />
                                    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#C6C6C6" />
                                    <g clip-path="url(#clip0_3535_8219)">
                                        <g clip-path="url(#clip1_3535_8219)">
                                            <path d="M33.75 12.5626H14.25C13.8076 12.5581 13.3814 12.7293 13.065 13.0386C12.7487 13.348 12.5679 13.7702 12.5625 14.2126V33.7913C12.5689 34.2331 12.7501 34.6544 13.0663 34.9629C13.3826 35.2714 13.8082 35.4421 14.25 35.4376H33.75C34.1925 35.4411 34.6183 35.2693 34.9345 34.9598C35.2507 34.6503 35.4316 34.2282 35.4375 33.7857V14.207C35.4296 13.7658 35.2479 13.3456 34.9319 13.0377C34.6159 12.7298 34.1912 12.5591 33.75 12.5626Z" fill="#381F8C" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32 32L25.743 22.6749L25.7537 22.6836L31.3953 16H29.51L24.9142 21.44L21.2645 16H16.3201L22.1617 24.7062L22.161 24.7055L16 32H17.8853L22.9948 25.9476L27.0556 32H32ZM20.5176 17.4545L29.2966 30.5455H27.8026L19.0165 17.4545H20.5176Z" fill="white" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3535_8219">
                                            <rect width="24" height="24" fill="white" transform="translate(12 12)" />
                                        </clipPath>
                                        <clipPath id="clip1_3535_8219">
                                            <rect width="24" height="24" fill="white" transform="translate(12 12)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" fill="#C1BADB" />
                                    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#EEEEEF" />
                                    <g clip-path="url(#clip0_3535_8224)">
                                        <path d="M30.375 12H17.625C14.5184 12 12 14.5184 12 17.625V30.375C12 33.4816 14.5184 36 17.625 36H30.375C33.4816 36 36 33.4816 36 30.375V17.625C36 14.5184 33.4816 12 30.375 12Z" fill="white" />
                                        <path d="M30.375 12H17.625C14.5184 12 12 14.5184 12 17.625V30.375C12 33.4816 14.5184 36 17.625 36H30.375C33.4816 36 36 33.4816 36 30.375V17.625C36 14.5184 33.4816 12 30.375 12Z" fill="#381F8C" />
                                        <path d="M30.7054 20.3482C31.0268 21.4732 31.0268 23.8839 31.0268 23.8839C31.0268 23.8839 31.0268 26.2679 30.7054 27.4196C30.5446 28.0625 30.0357 28.5446 29.4196 28.7054C28.2679 29 23.7143 29 23.7143 29C23.7143 29 19.1339 29 17.9821 28.7054C17.3661 28.5446 16.8571 28.0625 16.6964 27.4196C16.375 26.2679 16.375 23.8839 16.375 23.8839C16.375 23.8839 16.375 21.4732 16.6964 20.3482C16.8571 19.7054 17.3661 19.1964 17.9821 19.0357C19.1339 18.7143 23.7143 18.7143 23.7143 18.7143C23.7143 18.7143 28.2679 18.7143 29.4196 19.0357C30.0357 19.1964 30.5446 19.7054 30.7054 20.3482ZM22.2143 26.0536L26.0179 23.8839L22.2143 21.7143V26.0536Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3535_8224">
                                            <rect width="24" height="24" fill="white" transform="translate(12 12)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" fill="#C1BADB" />
                                    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#C6C6C6" />
                                    <g clip-path="url(#clip0_3535_8230)">
                                        <path d="M30.375 12H17.625C14.5184 12 12 14.5184 12 17.625V30.375C12 33.4816 14.5184 36 17.625 36H30.375C33.4816 36 36 33.4816 36 30.375V17.625C36 14.5184 33.4816 12 30.375 12Z" fill="white" />
                                        <path d="M30.375 12H17.625C14.5184 12 12 14.5184 12 17.625V30.375C12 33.4816 14.5184 36 17.625 36H30.375C33.4816 36 36 33.4816 36 30.375V17.625C36 14.5184 33.4816 12 30.375 12Z" fill="#381F8C" />
                                        <path d="M34 24C34 18.48 29.52 14 24 14C18.48 14 14 18.48 14 24C14 28.84 17.44 32.87 22 33.8V27H20V24H22V21.5C22 19.57 23.57 18 25.5 18H28V21H26C25.45 21 25 21.45 25 22V24H28V27H25V33.95C30.05 33.45 34 29.19 34 24Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3535_8230">
                                            <rect width="24" height="24" fill="white" transform="translate(12 12)" />
                                        </clipPath>
                                    </defs>
                                </svg> */}

                            </div>
                            <p className='
                            flex space-x-2 items-center font-satoshi font-[500] lg:text-[15px] text-[12px] text-[#EBE9F4]'>

                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 0C3.134 0 0 3.134 0 7C0 10.866 3.134 14 7 14C10.866 14 14 10.866 14 7C14 3.134 10.866 0 7 0ZM10.3062 9.78738C10.2613 9.84008 9.18349 11.0782 7.20557 11.0782C4.81507 11.0782 3.12739 9.29261 3.12739 6.96943C3.12739 4.67459 4.8775 2.92182 7.18519 2.92182C9.0751 2.92182 10.0632 3.97507 10.1044 4.01992C10.155 4.07515 10.186 4.14564 10.1923 4.22033C10.1986 4.29502 10.18 4.3697 10.1393 4.43267L9.50761 5.41083C9.39332 5.58772 9.14705 5.61832 8.99294 5.47561C8.98636 5.46957 8.24414 4.80158 7.24633 4.80158C5.94466 4.80158 5.15999 5.74926 5.15999 6.94905C5.15999 8.06685 5.88014 9.19842 7.25652 9.19842C8.34877 9.19842 9.0991 8.39856 9.10655 8.39046C9.2514 8.23338 9.50338 8.2484 9.62895 8.42018L10.3218 9.36778C10.3668 9.42928 10.3897 9.50415 10.3869 9.58029C10.384 9.65643 10.3556 9.72939 10.3062 9.78738Z" fill="white" />
                                </svg>

                                <span>
                                    {currentYear} Olójà, a trading name of Jacinth Solutions. ABN 48672884472. All Rights Reserved.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {(pathname === '/home' || pathname === '/about') && (
                <div className='absolute lg:-top-24 -top-44 w-full   overflow-hidden z-20'>
                    <NewsLetter />
                </div>
            )}

        </footer>
    )
}

export default Footer