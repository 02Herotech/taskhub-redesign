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
import { updateUserProfile } from "@/store/Features/userProfile";

const initialAuthState = {
  token: null,
  roles: null,
};

const Navigation = () => {
  const router = useRouter();
  const session = useSession();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [authLooading, setAuthLooading] = useState(true);
  // const [userProfile, setUserProfile] = useState<UserProfileTypes>();
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile);

  const pathname = usePathname();
  const [auth, setAuth] = useState<{
    token: string | null;
    roles: string[] | null;
  }>(initialAuthState);
  const [currentLinks, setCurrentLinks] = useState<LinkRouteTypes[]>([]);

  const handleLogout = async () => {
    try {
      setAuth(initialAuthState);
      localStorage.setItem("auth", JSON.stringify(initialAuthState));
      await signOut();
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      router.push("/home");
    } catch (error: any) {
      console.log(error);
    }
  };

  const userRole = session?.data?.user.user.roles;
  const token = session?.data?.user?.accessToken;
  const user = session?.data?.user?.user;
  const isServiceProvider = userRole && userRole[0] === "SERVICE_PROVIDER";

  useLayoutEffect(() => {
    setAuthLooading(true);
    const authStatus = localStorage.getItem("auth");
    let auth: { token: string | null; roles: string[] | null } =
      initialAuthState;
    if (authStatus) {
      auth = JSON.parse(authStatus);
      setAuth(auth);
      setCurrentLinks(
        !auth.token
          ? homeLinks
          : isServiceProvider
            ? serviceProviderLinks
            : customerLinks,
      );
    }
    setAuthLooading(false);
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
    {
      label: "Settings",
      onClick: () => {
        router.push(
          isServiceProvider
            ? "/service-provider/settings"
            : "/customer/settings",
        );
      },
    },
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
      try {
        const url =
          "https://smp.jacinthsolutions.com.au/api/v1/user/user-profile/" +
          user?.id;
        const { data } = await axios.get(url);
        dispatch(updateUserProfile(data));
      } catch (error: any) {
        console.error(error.response.data);
      }
    };
    fetchUserProfile();
  }, [userProfile.refresh]);

  console.log(userProfile.refresh, "refresh");

  const notificationRoute = isServiceProvider
    ? "/service-provider/notification"
    : "/customer/notifications";

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 w-full ${currentLinks === homeLinks ? `bg-[#F5E2FC]` : `bg-white`} drop-shadow-sm`}
      >
        {authLooading ? (
          <div className="container flex min-h-20 items-center justify-between px-7 py-4 lg:py-5 " />
        ) : (
          <div className="container flex items-center justify-between px-7 py-4 lg:py-5">
            <Link href="/">
              <Logo />
            </Link>
            <button
              onClick={() => setShowMobileNav((state) => !state)}
              className="lg:hidden"
            >
              <RiMenu3Fill className="h-9 w-9 text-primary" />
            </button>
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
                  <Link href="/message" className="relative cursor-pointer">
                    <BsChat className="size-[22px] text-black" />
                    {/* display a number chat nummber here */}
                    {/* <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tc-orange text-xs text-white">
                  </span> */}
                  </Link>
                  <button
                    className="relative cursor-pointer"
                    onClick={() => router.push(notificationRoute)}
                  >
                    <IoMdNotificationsOutline className="size-[24px] text-black" />
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
                    <div className="w-[200px] rounded-md bg-white">
                      {dropdownItems.map((button, index) => (
                        <button
                          key={index}
                          onClick={button.onClick}
                          className="dropdown-item text-md flex w-full items-center justify-between p-3 font-semibold text-primary transition-all hover:opacity-80"
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
        {showMobileNav && (
          <MobileNavigation
            setShowMobileNav={setShowMobileNav}
            showMobileNav={showMobileNav}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
