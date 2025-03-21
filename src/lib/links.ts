import { FiLogOut } from "react-icons/fi";
import {
  AboutUsSvg,
  BlogSvg,
  BusinessHubSvg,
  ContactUsSvg,
  DashboardSvg,
  HomeIcon,
  HomeSvg,
  LoginSvg,
  MarketPlaceSvg,
  MessagesSvg,
  MonetizeSVG,
  RentShopSvg,
} from "./svgIcons";
import React from "react";
import { FiUser } from "react-icons/fi";
import { LuClipboard, LuStore } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";

import { IconType } from "react-icons";
import { TbSmartHome } from "react-icons/tb";
import { MdMailOutline } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";

import { IoMdInformationCircleOutline } from "react-icons/io";

import { MdOutlineHub } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

export type LinkRouteTypes = {
  label: string;
  url?: string;
  icon?: IconType;
  sublinks?: {
    label: string;
    url: string;
    sublinks?: {
      label: string;
      url: string;
    }[];
  }[];
};

export const homeMobileLinks: LinkRouteTypes[] = [
  {
    label: "Home",
    url: "/home",
    icon: TbSmartHome,
  },
  {
    label: "Marketplace",
    url: "/marketplace",
    icon: LuStore,
  },
  {
    label: "Log in",
    url: "/auth/login",
    icon: FiLogIn,
  },
  // {
  //   label: "About us",
  //   url: "/about",
  //   icon: AboutUsSvg,
  // },
  {
    label: "How Olója Works",
    url: "/how-oloja-works",
    icon: IoMdInformationCircleOutline,
  },
  {
    label: "Business Hub",
    url: "/business-hub",
    icon: MdOutlineHub,
  },
  // {
  //   label: "Rent a shop",
  //   url: "/coming-soon",
  //   icon: RentShopSvg,
  // },
  {
    label: "Monetize your skills",
    url: "/monetize-your-skills",
    icon: FaRegMoneyBillAlt,
  },
];

export const customerLinks: LinkRouteTypes[] = [
  {
    label: "Post a task",
    url: "/customer/add-task",
  },
  {
    label: "Marketplace",
    url: "/marketplace",
  },
  {
    label: "Profile",
    url: "/customer/profile",
  },
  // {
  //   label: "Blog",
  //   url: "/blog",
  // },
];

export const serviceProviderLinks: LinkRouteTypes[] = [
  {
    label: "Provide a service",
    url: "/provide-service",
  },
  {
    label: "Explore Tasks",
    url: "/explore",
  },
  {
    label: "Marketplace",
    url: "/marketplace",
  },
  // {
  //   label: "Blog",
  //   url: "/blog",
  // },
];

export const homeLinks: LinkRouteTypes[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/about",
  },
  {
    label: "Marketplace",
    url: "/marketplace",
  },
  {
    label: "Blog",
    url: "/blog",
  },
  {
    label: "Contact Us",
    url: "/contact",
  },
];

export const mobileServiceProviderLinks: LinkRouteTypes[] = [
  {
    label: "My Dashboard",
    icon: LuLayoutDashboard,
    sublinks: [
      {
        label: "Profile",
        url: "/service-provider/profile",
      },
      {
        label: "My Services",
        url: "/service-provider/services",
      },
      {
        label: "View Jobs",
        url: "/service-provider/jobs",
      },
      {
        label: "My Notifications",
        url: "/service-provider/notification",
      },
      {
        label: "Payment and wallet",
        url: "/service-provider/payment",
      },
      {
        label: "Settings",
        url: "/service-provider/settings",
        sublinks: [
          {
            label: "Change Password",
            url: "/service-provider/settings/password",
          },
          {
            label: "Notification settings",
            url: "/service-provider/settings/notification",
          },
        ],
      },
    ],
  },
  {
    label: "Explore Tasks",
    url: "/explore",
    icon: LuStore,
  },
  {
    label: "Marketplace",
    url: "/marketplace",
    icon: LuStore,
  },
  {
    label: "Messages",
    url: "/message",
    icon: MdMailOutline,
  },
  // {
  //   label: "Contact us",
  //   url: "/contact",
  //   icon: ContactUsSvg
  // }
];

export const mobileCustomerLinks: LinkRouteTypes[] = [
  {
    label: "Home",
    url: "/customer/home",
    icon: TbSmartHome,
  },
  {
    label: "Profile",
    url: "/customer/profile",
    icon: FiUser,
  },
  {
    label: "My Tasks",
    url: "/customer/tasks",
    icon: LuClipboard,
  },
  {
    label: "Payments",
    url: "/customer/payment?tab=paymentHistory",
    icon: IoWalletOutline,
  },
  {
    label: "Marketplace",
    url: "#",
    icon: LuStore,
  },
  // {
  //   label: "My Dashboard",
  //   icon: DashboardSvg,
  //   sublinks: [
  //     {
  //       label: "Profile",
  //       url: "/customer/profile",
  //     },
  //     {
  //       label: "My Tasks",
  //       url: "/customer/tasks",
  //     },
  //     {
  //       label: "My Notifications",
  //       url: "/customer/notifications",
  //     },
  //     {
  //       label: "Payment",
  //       url: "/customer/payment?tab=paymentHistory",
  //     },
  //     {
  //       label: "Settings",
  //       url: "/customer/settings",
  //       sublinks: [
  //         {
  //           label: "Change Password",
  //           url: "/customer/password",
  //         },
  //         {
  //           label: "Notification settings",
  //           url: "/customer/notification-settings",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    label: "Marketplace",
    url: "/marketplace",
    icon: LuStore,
  },
  {
    label: "Messages",
    url: "/message",
    icon: MdMailOutline,
  },
  {
    label: "Settings",
    url: "/customer/settings",
    icon: IoSettingsOutline,
    sublinks: [
      {
        label: "Change Password",
        url: "/customer/password",
      },
      {
        label: "Notification settings",
        url: "/customer/notification-settings",
      },
    ],
  },
  // {
  //   label: "Contact us",
  //   url: "/contact",
  //   icon: ContactUsSvg
  // }
];
