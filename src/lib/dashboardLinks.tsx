import { IconType } from "react-icons";
import { TbSmartHome } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuClipboard } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { LuStore } from "react-icons/lu";
import { LuClipboardPenLine } from "react-icons/lu";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

//Service Provider
import { GoTasklist } from "react-icons/go";

interface DashboardLinks {
  link: string;
  label: string;
  icon: IconType;
}

export const customerDashboardLinks: DashboardLinks[] = [
  { label: "Home", link: "/customer/home", icon: TbSmartHome },
  {
    label: "Profile",
    link: "/customer/profile",
    icon: FiUser,
  },
  {
    label: "My Tasks",
    link: "/customer/tasks",
    icon: LuClipboard,
  },
  // {
  //   label: "My Notifications",
  //   link: "/customer/notifications",
  //   icon: IoMdNotificationsOutline,
  // },
  {
    label: "Payments",
    link: "/customer/payment?tab=paymentHistory",
    icon: IoWalletOutline,
  },
  {
    label: "Marketplace",
    link: "#",
    icon: LuStore,
  },
  // {
  //   label: "Create a listing",
  //   link: "#",
  //   icon: AiOutlineFileSearch,
  // },
  // {
  //   label: "Explore tasks",
  //   link: "#",
  //   icon: LuClipboardPenLine,
  // },
  // {
  //   label: "Rewards",
  //   link: "/customer/rewards",
  //   icon: PaymentIcon,
  // },
  // {
  //   label: "Settings",
  //   link: "/customer/settings",
  //   icon: SettingsIcon,
  // },
];

export const serviceProviderDashboardLinks: DashboardLinks[] = [
  { label: "Home", link: "/service-provider/home", icon: TbSmartHome },
  {
    label: "Profile",
    link: "/service-provider/profile",
    icon: TbSmartHome,
  },
  {
    label: "My Services",
    link: "/service-provider/services",
    icon: LuClipboard,
  },
  {
    label: "View Jobs",
    link: "/service-provider/jobs",
    icon: GoTasklist,
  },
  // {
  //   label: "My Notification",
  //   link: "/service-provider/notification",
  //   icon: NotificationIcon,
  // },
  {
    label: "Payment and Wallet",
    link: "/service-provider/payment",
    icon: IoWalletOutline,
  },
  // {
  //   label: "Rewards",
  //   link: "/service-provider/rewards",
  //   icon: PaymentIcon,
  // },
  // {
  //   title: "Settings",
  //   link: "/service-provider/dashboard/settings",
  //   icon: IoSettingsOutline
  // },
];

export const customerDashboardDropdown = [
  {
    label: "Change Password",
    link: "/customer/password",
  },
  {
    label: "Notification Settings",
    link: "/customer/notification-settings",
  },
];
export const serviceProviderDashboardDropdown = [
  {
    label: "Change Password",
    link: "/service-provider/settings/password",
  },
  {
    label: "Notification Settings",
    link: "/service-provider/settings/notification",
  },
];
