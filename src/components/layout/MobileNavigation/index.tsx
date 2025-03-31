import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSortDown } from "react-icons/fa";
import Button from "@/components/global/Button";
import { cn } from "@/lib/utils";
import {
  homeLinks,
  mobileCustomerLinks,
  mobileServiceProviderLinks,
} from "@/lib/links";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { removeUserProfile } from "@/store/Features/userProfile";

type Props = {
  showMobileNav: boolean;
  setShowMobileNav: (value: boolean) => void;
};

interface NavLink {
  label: string;
  url?: string;
  icon?: IconType;
  sublinks?: NavLink[];
}

/**Navigation sidebar for logged in users*/
const MobileNavigation: React.FC<Props> = ({
  showMobileNav,
  setShowMobileNav,
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [openSubDropdown, setOpenSubDropdown] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const userRole = session?.data?.user?.user?.roles;
  const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";
  const isAuth = session.status === "authenticated";
  const dispatch = useDispatch();

  const currentLinks: NavLink[] = !isAuth
    ? homeLinks
    : isServiceProvider
      ? mobileServiceProviderLinks
      : mobileCustomerLinks;

  const handleLogout = async () => {
    try {
      dispatch(removeUserProfile());
      localStorage.removeItem("auth");
      await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/home` });
      router.push("/home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.2 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {showMobileNav && (
        <div
          onClick={() => setShowMobileNav(false)}
          className="fixed inset-0 z-40 bg-black bg-opacity-20"
        />
      )}
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{
          x: showMobileNav ? 0 : "-100%",
          transition: { type: "tween", duration: 0.3 },
        }}
        exit={{ x: "-100%", transition: { type: "tween", duration: 0.3 } }}
        className="fixed left-0 top-0 z-50 flex h-screen w-4/5 flex-col justify-between overflow-hidden rounded-br-xl rounded-tr-xl bg-[#EBE9F4] p-5 shadow drop-shadow-md"
      >
        <div className="pb-20">
          <div className="flex w-full items-center justify-between border-b border-primary pb-3">
            <IoCloseCircleOutline
              onClick={() => setShowMobileNav(false)}
              type="button"
              className="size-6 text-primary"
            />
            {isServiceProvider ? (
              <Button
                className="rounded-full border-tc-orange bg-tc-orange"
                onClick={() => router.push("/provide-service")}
              >
                Provide a service
              </Button>
            ) : (
              <Button
                className="rounded-full"
                onClick={() => router.push("/customer/add-task")}
              >
                Post a task
              </Button>
            )}
          </div>

          <ul className="mt-8 h-[65vh] space-y-4 overflow-y-auto">
            {currentLinks.map((link) => {
              const isActive =
                (link.url === "/" && pathname === "/") ||
                (link.url !== "/" && pathname.includes(link.url!));
              const sublinkIsActive = link.sublinks?.some((sublink) =>
                pathname.includes(sublink.url!),
              );

              return (
                <li key={link.label} className="w-full">
                  {link.sublinks ? (
                    <>
                      <button
                        className={cn(
                          "flex w-full items-center rounded-md px-5 py-3 text-lg font-bold text-primary",
                          {
                            "rounded-xl bg-primary text-white":
                              openDropdown || sublinkIsActive,
                          },
                        )}
                        onClick={() => toggleDropdown()}
                      >
                        {link.icon && <link.icon className="mr-5" />}
                        <h4 className="text-lg font-bold">{link.label}</h4>
                        <FaSortDown
                          className={cn(
                            "ml-auto size-4 text-tc-orange transition-all",
                            { "rotate-180": openDropdown },
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown && (
                          <motion.ul
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="ml-6 mt-4 space-y-4 border-l-[1.5px] border-[#C1BADB] pl-6"
                          >
                            {link.sublinks.map((sublink) =>
                              sublink.sublinks ? (
                                <li key={sublink.label} className="w-full">
                                  <button
                                    className={cn(
                                      "flex w-full items-center justify-between rounded-md px-5 py-3 text-lg font-bold text-primary",
                                    )}
                                    onClick={() =>
                                      setOpenSubDropdown(!openSubDropdown)
                                    }
                                  >
                                    <div
                                      className={cn(
                                        "flex items-center rounded-md text-lg font-bold text-primary",
                                      )}
                                    >
                                      {sublink.icon && (
                                        <sublink.icon className="mr-5" />
                                      )}
                                      <h4 className="text-lg font-bold text-primary">
                                        {sublink.label}
                                      </h4>
                                    </div>
                                    <FaSortDown
                                      className={cn(
                                        "size-4 text-tc-orange transition-all",
                                        {
                                          "rotate-180": openSubDropdown,
                                        },
                                      )}
                                    />
                                  </button>
                                  <AnimatePresence>
                                    {openSubDropdown && (
                                      <motion.ul
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={dropdownVariants}
                                        className="mt-3 space-y-2 pl-3 pr-2"
                                      >
                                        {sublink.sublinks.map((subsublink) => (
                                          <li key={subsublink.label}>
                                            <Link
                                              onClick={() =>
                                                setShowMobileNav(false)
                                              }
                                              href={subsublink.url!}
                                              className={cn(
                                                "flex items-center py-2 pl-3 text-lg font-bold text-primary",
                                                {
                                                  "rounded-xl bg-primary text-white":
                                                    pathname.includes(
                                                      subsublink.url!,
                                                    ),
                                                },
                                              )}
                                            >
                                              {subsublink.icon && (
                                                <subsublink.icon className="mr-5" />
                                              )}
                                              {subsublink.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </li>
                              ) : (
                                <li key={sublink.label} className="w-full">
                                  <Link
                                    onClick={() => setShowMobileNav(false)}
                                    href={sublink.url!}
                                    className={cn(
                                      "flex items-center px-5 py-2 text-lg font-bold text-primary",
                                      {
                                        "rounded-xl bg-primary text-white":
                                          pathname.includes(sublink.url!),
                                      },
                                    )}
                                  >
                                    {sublink.icon && (
                                      <sublink.icon className="mr-5" />
                                    )}
                                    {sublink.label}
                                  </Link>
                                </li>
                              ),
                            )}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      onClick={() => setShowMobileNav(false)}
                      href={link.url!}
                      className={cn(
                        "flex items-center px-5 py-2 text-lg font-bold text-primary",
                        { "rounded-xl bg-primary text-white": isActive },
                      )}
                    >
                      {link.icon && <link.icon className="mr-5" />}
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div
            className={cn(
              "fixed bottom-20 flex items-center rounded-md px-5 py-1 text-lg font-bold text-primary",
            )}
            onClick={handleLogout}
          >
            <FiLogOut className="mr-5 size-6 text-primary" />
            <h4 className="text-lg font-bold text-primary">Logout</h4>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default MobileNavigation;
