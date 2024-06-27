import Button from "@/components/global/Button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import Logo from "../Logo";
import {
  homeLinks,
  mobileCustomerLinks,
  mobileServiceProviderLinks,
} from "@/lib/links";
import SmallLogo from "../SmallLogo";
import { useState } from "react";

type Props = {
  showMobileNav: boolean;
  setShowMobileNav: (value: boolean) => void;
};

const MobileNavigation = ({ setShowMobileNav }: Props) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const serviceProviderParams = new URLSearchParams({
    userType: "serviceProvider",
  });
  const profileImage = session?.data?.user.user.profileImage;
  const userRole = session?.data?.user.user.roles;
  const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";
  const isAuth = session.status === "authenticated";
  // const isCustomer = userRole && userRole[0] === "CUSTOMER";

  const currentLinks = !isAuth
    ? homeLinks
    : isServiceProvider
      ? mobileServiceProviderLinks
      : mobileCustomerLinks;
  const currentYear = new Date().getFullYear();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: 'https://taskhub.com.au/home' })
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      router.push("/home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = (index: any) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      <div
        onClick={() => setShowMobileNav(false)}
        className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-transparent"
      ></div>
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { type: "just" } }}
        exit={{ x: 100, opacity: 0, transition: { type: "just", delay: 0.1 } }}
        className="container fixed right-0 top-0 z-50 flex h-screen w-full flex-col justify-between space-y-8 overflow-auto bg-white p-8 drop-shadow-md"
      >
        {/* <div className="relative min-h-screen font-satoshi"> */}
        <div className="">
          <div className="">
            <div className="flex w-full items-center justify-between">
              <Logo />
              <button onClick={() => setShowMobileNav(false)} type="button">
                <IoMdCloseCircle className="h-9 w-9 text-primary" />
              </button>
            </div>
            {!isAuth && (
              <div className="mt-8 flex w-full items-center justify-center">
                <button className="w-[250px] rounded-[50px] bg-[#FE9B07] px-3 py-2 text-[#FFF5E6] hover:bg-[#e79823] xl:text-[16px]">
                  <Link
                    href={`/auth/sign-up?${serviceProviderParams.toString()}`}
                    className="flex items-center justify-center"
                  >
                    <p className="">Become a Service Provider</p>
                  </Link>
                </button>
              </div>
            )}
          </div>
          <ul className="my-8 space-y-5">
            {currentLinks.map((link, index) => {
              const isActive =
                (link.url === "/" && pathname === "/") ||
                (link.url !== "/" && pathname.includes(link.url!));

              return (
                <li key={link.label} className="w-full">
                  {link.sublinks ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between"
                        onClick={() => toggleDropdown(index)}
                      >
                        <h4
                          className={cn("text-lg font-medium text-primary", {
                            "text-tc-orange": isActive,
                          })}
                        >
                          {link.label}
                        </h4>
                        <FaAngleDown
                          className={cn("size-4 text-primary transition-all", {
                            "rotate-[180deg]": openDropdown,
                          })}
                        />
                      </button>
                      {openDropdown === index && (
                        <ul>
                          {link.sublinks.map((sublink) => (
                            <li
                              key={sublink.label}
                              className="space-y-7 overflow-y-scroll pl-2 pt-3"
                            >
                              <Link
                                onClick={() => setShowMobileNav(false)}
                                href={sublink.url}
                                passHref
                                className={cn(
                                  "text-lg font-medium text-primary",
                                  {
                                    "text-tc-orange":
                                      sublink.url === "/" && pathname === "/"
                                        ? true
                                        : sublink.url !== "/" &&
                                            pathname.includes(sublink.url)
                                          ? true
                                          : false,
                                  },
                                )}
                              >
                                {sublink.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      onClick={() => setShowMobileNav(false)}
                      href={link.url!}
                      passHref
                      className={cn("text-lg font-medium text-primary", {
                        "text-tc-orange": isActive,
                      })}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
            <div
              onClick={handleLogout}
              className="mb-10 cursor-pointer text-lg font-medium text-primary"
            >
              Logout
            </div>
          </ul>
        </div>
        <div className="mt-8 w-full">
          {!isAuth && (
            <div className="my-5 flex w-full items-center justify-center space-x-5">
              <Link href="/auth">
                <Button className="rounded-full">Sign Up</Button>
              </Link>
              <Link href="/auth/login">
                <Button theme="outline" className="rounded-full bg-transparent">
                  Login
                </Button>
              </Link>
            </div>
          )}
          <div className="flex flex-col items-center justify-center space-y-8">
            <SmallLogo />
            <p className="text-center text-[13px] font-normal text-primary">
              Online platform that connects Service Provider with Customers who
              are seeking various services. The platform offers a wide range of
              services.
            </p>
            <div className="flex items-center justify-center space-x-3">
              <Link
                href="/faq"
                className="text-[13px] font-medium text-primary underline underline-offset-2"
              >
                FAQs
              </Link>
              <div className="h-[4px] w-[4px] rounded-full bg-primary" />
              <Link
                href="/terms-and-conditions"
                className="text-[13px] font-medium text-primary underline underline-offset-2"
              >
                Terms and Conditions
              </Link>
              <div className="h-[4px] w-[4px] rounded-full bg-primary" />
              <Link
                href="/privacy"
                className="text-[13px] font-medium text-primary underline underline-offset-2"
              >
                Privacy
              </Link>
            </div>
            <h5 className="text-center text-[10px] text-black">
              {currentYear} TaskHub. All Rights Reserved.
            </h5>
          </div>
        </div>
        {/* </div> */}
      </motion.nav>
    </>
  );
};

export default MobileNavigation;
