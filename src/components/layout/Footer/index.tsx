"use client";
import NewsLetter from "@/components/newsletter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import {
  filterMarketPlace,
  setFilterLoadingState,
  setFilterParams,
} from "@/store/Features/marketplace";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const link_1 = [
    { label: "About Us", url: "/about" },
    { label: "Marketplace", url: "/marketplace" },
    { label: "Business Hub", url: "/coming-soon" },
  ];

  const category_link_2 = [
    { id: 1, categoryName: "Home Service" },
    { id: 2, categoryName: "Beauty" },
    { id: 3, categoryName: "Information and Technology" },
    { id: 4, categoryName: "Events" },
    { id: 5, categoryName: "Art and Craft" },
    { id: 6, categoryName: "Petcare" },
    { id: 7, categoryName: "Custodian" },
    { id: 8, categoryName: "Grocery" },
  ];

  const link_3 = [
    // { label: "FAQs", url: "/home#FAQSection" },
    { label: "Contact us", url: "/contact" },
    { label: "Terms and Condition", url: "/terms-and-condition" },
    { label: "Privacy", url: "/privacy" },
  ];

  const handleFilterByCategory = async (category: string) => {
    dispatch(setFilterLoadingState(true));
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/filter-listings/0?category=${category}`;
      const { data } = await axios.get(url);
      dispatch(
        filterMarketPlace({
          data: data.content,
          totalPages: data.totalPages,
        }),
      );
      dispatch(setFilterParams(`?category=${category}`));
    } catch (error: any) {
      console.log(error.response?.message || error);
    } finally {
      dispatch(setFilterLoadingState(false));
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto w-full bg-[#895404]">
      <div
        className={
          "relative w-full overflow-hidden " +
          (pathname === "/home" || pathname === "/about" ? "pt-28" : "")
        }
      >
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/2 hidden h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-radial from-[#aa7933] to-transparent blur-3xl lg:block"></div>
          <div className="absolute right-0 top-0 hidden h-96 w-96 translate-x-1/4 rounded-full bg-gradient-radial from-[#aa7933] to-transparent blur-3xl lg:block"></div>
        </div>

        {/* Main content container */}
        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col items-center space-y-8 lg:space-y-12">
            {/* Logo */}
            <div className="mt-20 flex w-full justify-center sm:mt-0">
              <Link href="/" className="block">
                <div className="relative">
                  <Image
                    src="/assets/images/oloja-logo.png"
                    alt="Ologo Logo"
                    width={133}
                    height={48}
                  />
                </div>
              </Link>
            </div>

            {/* Description */}
            <p className="max-w-2xl px-4 text-center text-sm text-[#EBE9F4] lg:text-base">
              This platform is here to support everyone in thriving within the
              Australian economy by offering helpful resources and
              opportunities.
            </p>

            {/* Navigation Links */}
            <div className="flex w-full flex-col items-center space-y-8">
              {/* Primary Links */}
              <nav className="flex flex-wrap justify-center gap-4 px-4">
                {link_1.map((link, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2 h-1 w-1 rounded-full bg-[#EBE9F4]"></span>
                    <Link
                      href={link.url}
                      className="whitespace-nowrap text-sm text-[#EBE9F4] transition-colors hover:text-white lg:text-base"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Category Links */}
              <nav className="flex max-w-full flex-wrap justify-center gap-3 px-4">
                {category_link_2.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      router.push("/marketplace");
                      handleFilterByCategory(category.categoryName);
                    }}
                    className="group flex items-center"
                  >
                    <span className="mr-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#EBE9F4]"></span>
                    <span className="text-sm text-[#EBE9F4] transition-colors hover:text-white lg:text-base">
                      {category.categoryName}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Secondary Links */}
              <nav className="flex flex-wrap justify-center gap-4 px-4">
                {link_3.map((link, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2 h-1 w-1 rounded-full bg-[#EBE9F4]"></span>
                    <Link
                      href={link.url}
                      className="whitespace-nowrap text-sm text-[#EBE9F4] transition-colors hover:text-white lg:text-base"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <Link
                  href="https://www.instagram.com/oloja_au?igsh=dzRuYW52MjZ4bjJq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="47"
                      height="47"
                      rx="23.5"
                      fill="#C1BADB"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="47"
                      height="47"
                      rx="23.5"
                      stroke="#C6C6C6"
                    />
                    <g clipPath="url(#clip0_3535_8213)">
                      <path
                        d="M30.375 12H17.625C14.5184 12 12 14.5184 12 17.625V30.375C12 33.4816 14.5184 36 17.625 36H30.375C33.4816 36 36 33.4816 36 30.375V17.625C36 14.5184 33.4816 12 30.375 12Z"
                        fill="#381F8C"
                      />
                      <path
                        d="M30.375 12H17.625C14.5184 12 12 14.5184 12 17.625V30.375C12 33.4816 14.5184 36 17.625 36H30.375C33.4816 36 36 33.4816 36 30.375V17.625C36 14.5184 33.4816 12 30.375 12Z"
                        fill="#381F8C"
                      />
                      <path
                        d="M24.0008 14.625C21.4548 14.625 21.1352 14.6362 20.1353 14.6816C19.1372 14.7274 18.4559 14.8853 17.8598 15.1172C17.2432 15.3566 16.7201 15.677 16.1991 16.1982C15.6775 16.7194 15.3572 17.2424 15.117 17.8588C14.8845 18.4551 14.7263 19.1366 14.6814 20.1342C14.6367 21.1342 14.625 21.4539 14.625 24.0001C14.625 26.5463 14.6363 26.8648 14.6816 27.8647C14.7276 28.8628 14.8855 29.5441 15.1172 30.1402C15.3568 30.7568 15.6772 31.2799 16.1984 31.8009C16.7194 32.3225 17.2424 32.6436 17.8586 32.883C18.4552 33.1148 19.1365 33.2728 20.1344 33.3186C21.1344 33.364 21.4538 33.3752 23.9997 33.3752C26.5461 33.3752 26.8646 33.364 27.8646 33.3186C28.8626 33.2728 29.5447 33.1148 30.1412 32.883C30.7576 32.6436 31.2799 32.3225 31.8007 31.8009C32.3223 31.2799 32.6425 30.7568 32.8828 30.1404C33.1133 29.5441 33.2715 28.8626 33.3184 27.8649C33.3633 26.865 33.375 26.5463 33.375 24.0001C33.375 21.4539 33.3633 21.1344 33.3184 20.1344C33.2715 19.1363 33.1133 18.4552 32.8828 17.8591C32.6425 17.2424 32.3223 16.7194 31.8007 16.1982C31.2793 15.6768 30.7578 15.3564 30.1406 15.1173C29.543 14.8853 28.8613 14.7273 27.8632 14.6816C26.8632 14.6362 26.5448 14.625 23.9979 14.625H24.0008ZM23.1598 16.3145C23.4095 16.3141 23.688 16.3145 24.0008 16.3145C26.5041 16.3145 26.8007 16.3235 27.7892 16.3684C28.7032 16.4102 29.1994 16.5629 29.5298 16.6913C29.9674 16.8611 30.2793 17.0643 30.6072 17.3925C30.9353 17.7206 31.1384 18.0331 31.3088 18.4706C31.4371 18.8006 31.59 19.2968 31.6316 20.2108C31.6765 21.1991 31.6863 21.4959 31.6863 23.9979C31.6863 26.4999 31.6765 26.7968 31.6316 27.7851C31.5898 28.6991 31.4371 29.1952 31.3088 29.5253C31.1389 29.9629 30.9353 30.2744 30.6072 30.6023C30.2791 30.9305 29.9676 31.1335 29.5298 31.3035C29.1997 31.4324 28.7032 31.5848 27.7892 31.6266C26.8009 31.6715 26.5041 31.6812 24.0008 31.6812C21.4975 31.6812 21.2008 31.6715 20.2126 31.6266C19.2985 31.5844 18.8024 31.4317 18.4717 31.3033C18.0342 31.1333 17.7217 30.9303 17.3935 30.6022C17.0654 30.274 16.8623 29.9623 16.692 29.5246C16.5637 29.1945 16.4108 28.6984 16.3691 27.7843C16.3242 26.796 16.3152 26.4992 16.3152 23.9956C16.3152 21.4921 16.3242 21.1968 16.3691 20.2085C16.4109 19.2944 16.5637 18.7983 16.692 18.4678C16.862 18.0303 17.0654 17.7178 17.3936 17.3897C17.7218 17.0616 18.0342 16.8584 18.4717 16.6882C18.8022 16.5592 19.2985 16.4069 20.2126 16.3649C21.0774 16.3258 21.4126 16.3141 23.1598 16.3121V16.3145ZM29.0052 17.8711C28.3841 17.8711 27.8802 18.3745 27.8802 18.9957C27.8802 19.6168 28.3841 20.1207 29.0052 20.1207C29.6263 20.1207 30.1302 19.6168 30.1302 18.9957C30.1302 18.3746 29.6263 17.8707 29.0052 17.8707V17.8711ZM24.0008 19.1856C21.3421 19.1856 19.1864 21.3413 19.1864 24.0001C19.1864 26.6589 21.3421 28.8136 24.0008 28.8136C26.6597 28.8136 28.8146 26.6589 28.8146 24.0001C28.8146 21.3413 26.6595 19.1856 24.0007 19.1856H24.0008ZM24.0008 20.875C25.7267 20.875 27.1259 22.2741 27.1259 24.0001C27.1259 25.7259 25.7267 27.1252 24.0008 27.1252C22.2749 27.1252 20.8759 25.7259 20.8759 24.0001C20.8759 22.2741 22.2749 20.875 24.0008 20.875Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3535_8213">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(12 12)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link
                  href="https://www.facebook.com/share/18efaCJ7CG/?mibextid=wwXIfr"
                  target="_blank"
                >
                  <div className="rounded-full bg-[#C1BADB] p-2">
                    <FaFacebook fill="#381f8c" size={30} />
                  </div>
                </Link>
              </div>

              {/* Copyright */}
              <div className="w-full border-t border-[#EBE9F4]/20 pt-8 text-center text-xs text-[#EBE9F4] lg:text-sm">
                <p className="px-4">
                  © {currentYear} Olójà, a trading name of Jacinth Solutions.
                  <br className="sm:hidden" /> ABN 48672884472. All Rights
                  Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      {pathname === "/home" && (
        <div className="absolute -top-44 z-20 w-full overflow-hidden lg:-top-24">
          <NewsLetter />
        </div>
      )}
    </footer>
  );
};

export default Footer;
