"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MobileNavigation from "../MobileNavigation";
import { AnimatePresence } from "framer-motion";
import { BsChat } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { RiMenu3Fill } from "react-icons/ri";
import Dropdown from "@/components/global/Dropdown";
import { signOut, useSession } from "next-auth/react";
import Logo from "../Logo";
import axios from "axios";
import PlaceholderImage from "../../../../public/assets/images/placeholder.jpeg";
import {
  customerLinks,
  homeLinks,
  LinkRouteTypes,
  serviceProviderLinks,
} from "@/lib/links";
import Button from "@/components/global/Button";
import Image from "next/image";
import { handleFetchNotifications } from "@/lib/serviceproviderutil";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  removeUserProfile,
  setAuthLoading,
  setUserProfileAuth,
  setWalletBalance,
  setWalletLoading,
  updateUserProfile,
} from "@/store/Features/userProfile";
import ChatSocket from "@/components/main/message/ChatSocket";
import HomeMobileNavigation from "../HomeMobileNavigation";
import { HamburgerIcon } from "@/lib/svgIcons";

const initialAuthState = {
  token: null,
  role: null,
};

const Navigation = () => {
  const router = useRouter();
  const session = useSession();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [auth, setAuth] = useState<{
    token: string | null;
    role: string[] | null;
  }>(initialAuthState);
  const [currentLinks, setCurrentLinks] = useState<LinkRouteTypes[]>([]);

  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const { totalUnreadMessages } = useSelector((state: RootState) => state.chat);

  const pathname = usePathname();

  const userRole = session?.data?.user.user.roles;
  const token = session?.data?.user?.accessToken;
  const user = session?.data?.user?.user;
  const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      setAuth(initialAuthState);
      dispatch(removeUserProfile());
      await signOut({ callbackUrl: "https://taskhub.com.au/home" });
      router.push("/home");
    } catch (error: any) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    dispatch(setAuthLoading(true));
    const authStatus = localStorage.getItem("auth");
    let auth: { token: string | null; role: string[] | null } =
      initialAuthState;
    if (authStatus) {
      auth = JSON.parse(authStatus);
      setAuth(auth);
      const activeLink = !auth.token
        ? homeLinks
        : auth.role && auth.role[0] === "SERVICE_PROVIDER"
          ? serviceProviderLinks
          : customerLinks;
      setCurrentLinks(activeLink);
      dispatch(setUserProfileAuth(auth));
    }
    dispatch(setAuthLoading(false));
    // eslint-disable-next-line
  }, []);

  const dropdownItems = [
    {
      label: "Profile",
      onClick: () => {
        router.push(
          isServiceProvider ? "/service-provider/profile" : "/customer/profile",
        );
      },
    },
    // {
    //   label: "Settings",
    //   onClick: () => {
    //     router.push(
    //       isServiceProvider
    //         ? "/service-provider/settings"
    //         : "/customer/settings",
    //     );
    //   },
    // },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    if (user && user.id && token) {
      const fetchNotification = async () => {
        try {
          const data: NotificationTypes[] = await handleFetchNotifications({
            userId: user.id,
            token,
          });
          const unreadNotifications = data.filter(
            (notification) => notification.read === false,
          );
          setNotifications(unreadNotifications);
        } catch (error) {
          console.error(error);
        }
      };

      fetchNotification();
      const interval = setInterval(fetchNotification, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      try {
        dispatch(setWalletLoading(true));
        const url =
          "https://smp.jacinthsolutions.com.au/api/v1/user/user-profile/" +
          user.id;
        const { data } = await axios.get(url);
        const userData: UserProfileTypes = data;
        dispatch(updateUserProfile(data));
        if (isServiceProvider) {
          const walleturl =
            "https://smp.jacinthsolutions.com.au/api/v1/booking/wallet/provider/" +
            userData.serviceProviderId;
          const response = await axios.get(walleturl, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setWalletBalance(response.data.walletBalance));
        }
      } catch (error: any) {
        console.error(error?.response?.data || error);
      } finally {
        dispatch(setWalletLoading(false));
      }
    };
    fetchUserProfile();
    // eslint-disable-next-line
  }, [user, userProfile.refresh, dispatch, userProfile.walletRefresh]);

  const notificationRoute = isServiceProvider
    ? "/service-provider/notification"
    : "/customer/notifications";

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 w-full ${currentLinks === homeLinks ? `bg-[#F5E2FC]` : `bg-white`} drop-shadow-sm`}
      >
        <ChatSocket />
        {userProfile.authLoading ? (
          <div className="container flex min-h-20 items-center justify-between px-7 py-4 lg:py-5 " />
        ) : (
          <div className="container flex items-center justify-between px-7 py-4 lg:py-5">
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex items-center gap-3 lg:hidden">
              <Link href="/message" className="relative cursor-pointer">
                <BsChat className="size-6 text-black" />
                {totalUnreadMessages > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                    {totalUnreadMessages}
                  </span>
                )}
              </Link>
              <button
                className="relative cursor-pointer"
                onClick={() => router.push(notificationRoute)}
              >
                <IoMdNotificationsOutline className="size-7 text-black" />
                {/* display notification length here */}
                {notifications.length > 0 && (
                  <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                    {notifications.length}
                  </div>
                )}
              </button>
              <button
                onClick={() => setShowMobileNav((state) => !state)}
                className="lg:hidden"
              >
                {HamburgerIcon}
              </button>
            </div>
            <ul className="hidden items-center space-x-8 lg:flex">
              {currentLinks.map((link) => {
                return (
                  <li key={link.url} className="relative">
                    <Link
                      href={link.url as string}
                      className={cn("text-xl font-semibold text-primary", {
                        "text-tc-orange":
                          link.url === "/" && pathname === "/"
                            ? true
                            : link.url !== "/" && pathname.includes(link.url!)
                              ? true
                              : false,
                      })}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="hidden items-center space-x-5 lg:flex">
              {!auth.token ? (
                <div className="hidden items-center space-x-5 lg:flex">
                  <Link href="/auth">
                    <Button className="rounded-full">Sign Up</Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button
                      theme="outline"
                      className="rounded-full bg-transparent"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {/* UnreadMessages */}
                  <Link href="/message" className="relative cursor-pointer">
                    <BsChat className="size-7 text-black" />
                    {totalUnreadMessages > 0 && (
                      <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                        {totalUnreadMessages}
                      </span>
                    )}
                  </Link>
                  <button
                    className="relative cursor-pointer"
                    onClick={() => router.push(notificationRoute)}
                  >
                    <IoMdNotificationsOutline className="size-8 text-black" />
                    {/* display notification length here */}
                    {notifications.length > 0 && (
                      <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                        {notifications.length}
                      </div>
                    )}
                  </button>
                  <Dropdown
                    trigger={() => (
                      <div className="flex cursor-pointer items-center space-x-1">
                        <Image
                          src={
                            userProfile?.profile?.profileImage ||
                            PlaceholderImage.src
                          }
                          alt="Profile"
                          className="size-[46px] rounded-full object-cover"
                          width={46}
                          height={46}
                        />
                        <BiChevronDown className="size-6" />
                      </div>
                    )}
                    className="-left-32 top-14"
                  >
                    <div className="w-[200px] space-y-2 rounded-md bg-white p-3">
                      {dropdownItems.map((button, index) => (
                        <button
                          key={index}
                          onClick={button.onClick}
                          className="dropdown-item text-md flex w-full items-center justify-between font-semibold text-primary transition-all hover:opacity-80"
                        >
                          {button.label}
                        </button>
                      ))}
                    </div>
                  </Dropdown>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <AnimatePresence initial={false}>
        {showMobileNav &&
          (token ? (
            <MobileNavigation
              setShowMobileNav={setShowMobileNav}
              showMobileNav={showMobileNav}
            />
          ) : (
            <HomeMobileNavigation
              setShowMobileNav={setShowMobileNav}
              showMobileNav={showMobileNav}
              links={homeLinks}
            />
          ))}
      </AnimatePresence>
    </>
  );
};

export default Navigation;