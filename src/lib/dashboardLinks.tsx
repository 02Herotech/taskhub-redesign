import React from "react";
import {
  JobsIcon,
  NotificationIcon,
  PaymentIcon,
  ProfileIcon,
  ServiceIcon,
  SettingsIcon,
} from "./svgIcons";

interface DashboardLinks {
  link: string;
  label: string;
  icon: React.ReactNode;
}

export const customerDashboardLinks: DashboardLinks[] = [
  {
    label: "My Profile",
    link: "/customer/profile",
    icon: ProfileIcon,
  },
  {
    label: "My Tasks",
    link: "/customer/tasks",
    icon: JobsIcon,
  },
  {
    label: "My Notifications",
    link: "/customer/notifications",
    icon: NotificationIcon,
  },
  {
    label: "Payment Settings",
    link: "/customer/payment/payment-history",
    icon: PaymentIcon,
  },
  // {
  //   label: "Settings",
  //   link: "/customer/settings",
  //   icon: SettingsIcon,
  // },
];

export const serviceProviderDashboardLinks: DashboardLinks[] = [
  {
    label: "Profile",
    link: "/service-provider/profile",
    icon: ProfileIcon,
  },
  {
    label: "My Services",
    link: "/service-provider/services",
    icon: ServiceIcon,
  },
  {
    label: "View Jobs",
    link: "/service-provider/jobs",
    icon: JobsIcon,
  },
  {
    label: "My Notification",
    link: "/service-provider/notification",
    icon: NotificationIcon,
  },
  {
    label: "Payments and Wallet",
    link: "/service-provider/payment",
    icon: PaymentIcon,
  },
  // {
  //   title: "Settings",
  //   link: "/service-provider/dashboard/settings",
  //   icon: (
  //     <svg width="26" height="28" viewBox="0 0 26 28" fill="none">
  //       <path
  //         d="M0.0389123 9.69057C0.630858 7.81214 1.6028 6.08367 2.89089 4.61872C2.99743 4.49771 3.13656 4.41197 3.29061 4.37239C3.44466 4.33281 3.60668 4.34117 3.75609 4.39641L6.82917 5.52605C7.04795 5.60634 7.28109 5.63678 7.51245 5.61525C7.7438 5.59373 7.96784 5.52075 8.16902 5.40139C8.37021 5.28203 8.54373 5.11913 8.67757 4.92399C8.81141 4.72885 8.90236 4.50613 8.94412 4.27126L9.53054 0.967973C9.55886 0.80717 9.6331 0.658667 9.74381 0.541369C9.85451 0.42407 9.99668 0.343282 10.1522 0.309291C12.0291 -0.103097 13.9696 -0.103097 15.8465 0.309291C16.0021 0.343282 16.1442 0.42407 16.2549 0.541369C16.3656 0.658667 16.4399 0.80717 16.4682 0.967973L17.0546 4.27126C17.0964 4.50613 17.1873 4.72885 17.3212 4.92399C17.455 5.11913 17.6285 5.28203 17.8297 5.40139C18.0309 5.52075 18.2549 5.59373 18.4863 5.61525C18.7177 5.63678 18.9508 5.60634 19.1696 5.52605L22.2443 4.39641C22.3938 4.34137 22.5559 4.33326 22.71 4.37314C22.8641 4.41302 23.0031 4.49907 23.1095 4.62037C24.3974 6.08484 25.3693 7.81272 25.9614 9.69057C26.0101 9.84586 26.0128 10.0125 25.9691 10.1694C25.9255 10.3262 25.8375 10.4662 25.7163 10.5716L23.2248 12.7452C23.0478 12.8998 22.9057 13.0921 22.8082 13.3088C22.7107 13.5254 22.6602 13.7613 22.6602 14C22.6602 14.2387 22.7107 14.4746 22.8082 14.6912C22.9057 14.9079 23.0478 15.1002 23.2248 15.2548L25.7163 17.4284C25.8372 17.534 25.9249 17.6741 25.9682 17.8309C26.0116 17.9878 26.0087 18.1543 25.9598 18.3094C25.3679 20.1879 24.3959 21.9163 23.1079 23.3813C23.0013 23.5023 22.8622 23.588 22.7081 23.6276C22.5541 23.6672 22.3921 23.6588 22.2426 23.6036L19.1696 22.4739C18.9508 22.3937 18.7177 22.3632 18.4863 22.3847C18.2549 22.4063 18.0309 22.4792 17.8297 22.5986C17.6285 22.718 17.455 22.8809 17.3212 23.076C17.1873 23.2712 17.0964 23.4939 17.0546 23.7287L16.4682 27.0337C16.4396 27.1942 16.3652 27.3423 16.2545 27.4593C16.1439 27.5763 16.0018 27.6568 15.8465 27.6907C13.9696 28.1031 12.0291 28.1031 10.1522 27.6907C9.99668 27.6567 9.85451 27.5759 9.74381 27.4586C9.6331 27.3413 9.55886 27.1928 9.53054 27.032L8.94412 23.7287C8.90236 23.4939 8.81141 23.2712 8.67757 23.076C8.54373 22.8809 8.37021 22.718 8.16902 22.5986C7.96784 22.4792 7.7438 22.4063 7.51245 22.3847C7.28109 22.3632 7.04795 22.3937 6.82917 22.4739L3.75609 23.6036C3.60652 23.6586 3.44441 23.6667 3.29035 23.6269C3.13629 23.587 2.99724 23.5009 2.89089 23.3796C1.60299 21.9152 0.631063 20.1873 0.0389123 18.3094C-0.00992988 18.1543 -0.0128582 17.9878 0.0304985 17.8309C0.0738552 17.6741 0.161545 17.534 0.282452 17.4284L2.77392 15.2548C2.95091 15.1002 3.09308 14.9079 3.19059 14.6912C3.28809 14.4746 3.33859 14.2387 3.33859 14C3.33859 13.7613 3.28809 13.5254 3.19059 13.3088C3.09308 13.0921 2.95091 12.8998 2.77392 12.7452L0.282452 10.5716C0.161545 10.466 0.0738552 10.3259 0.0304985 10.1691C-0.0128582 10.0122 -0.00992988 9.8457 0.0389123 9.69057ZM1.73728 9.68069L3.81057 11.4888C4.1651 11.7979 4.44992 12.1827 4.64526 12.6164C4.8406 13.05 4.94178 13.5221 4.94178 14C4.94178 14.4779 4.8406 14.95 4.64526 15.3836C4.44992 15.8173 4.1651 16.2021 3.81057 16.5112L1.73888 18.3193C2.20673 19.607 2.88127 20.8058 3.73206 21.863L6.28922 20.9244C6.45478 20.864 6.62302 20.8174 6.79392 20.7844C7.62999 20.6279 8.4923 20.8191 9.1912 21.316C9.8901 21.8129 10.3683 22.5747 10.5207 23.434L11.0078 26.1823C12.3265 26.407 13.6722 26.407 14.9909 26.1823L15.478 23.4323C15.561 22.9621 15.7426 22.5162 16.0103 22.1254C16.2779 21.7347 16.6252 21.4085 17.0279 21.1697C17.4306 20.9309 17.8791 20.785 18.3422 20.7424C18.8053 20.6998 19.2719 20.7613 19.7095 20.9228L22.2667 21.863C23.1188 20.8041 23.793 19.6064 24.2615 18.3193L22.1882 16.5112C21.8332 16.2024 21.5479 15.8177 21.3522 15.384C21.1566 14.9503 21.0552 14.478 21.0552 14C21.0552 13.522 21.1566 13.0497 21.3522 12.616C21.5479 12.1823 21.8332 11.7976 22.1882 11.4888L24.2615 9.68069C23.793 8.39362 23.1188 7.19594 22.2667 6.13698L19.7095 7.0756C19.272 7.23618 18.8057 7.29706 18.343 7.254C17.8803 7.21095 17.4322 7.065 17.0298 6.82628C16.6274 6.58755 16.2804 6.26176 16.0127 5.87147C15.745 5.48119 15.5631 5.03575 15.4796 4.56602L14.9909 1.81767C13.6722 1.59298 12.3265 1.59298 11.0078 1.81767L10.5207 4.56602C10.4374 5.03589 10.2556 5.48152 9.98805 5.87199C9.72046 6.26247 9.37343 6.58846 8.97104 6.82736C8.56864 7.06625 8.1205 7.21234 7.65769 7.25549C7.19488 7.29864 6.72848 7.23782 6.29082 7.07725L3.73206 6.13698C2.88051 7.19605 2.20526 8.39374 1.73728 9.68069ZM8.99699 14C8.99699 12.9082 9.41901 11.8611 10.1702 11.089C10.9214 10.317 11.9402 9.88324 13.0026 9.88324C14.0649 9.88324 15.0838 10.317 15.8349 11.089C16.5861 11.8611 17.0082 12.9082 17.0082 14C17.0082 15.0918 16.5861 16.139 15.8349 16.911C15.0838 17.683 14.0649 18.1168 13.0026 18.1168C11.9402 18.1168 10.9214 17.683 10.1702 16.911C9.41901 16.139 8.99699 15.0918 8.99699 14ZM10.5992 14C10.5992 14.6551 10.8524 15.2834 11.3032 15.7466C11.7539 16.2098 12.3652 16.4701 13.0026 16.4701C13.64 16.4701 14.2513 16.2098 14.702 15.7466C15.1527 15.2834 15.4059 14.6551 15.4059 14C15.4059 13.3449 15.1527 12.7166 14.702 12.2534C14.2513 11.7902 13.64 11.5299 13.0026 11.5299C12.3652 11.5299 11.7539 11.7902 11.3032 12.2534C10.8524 12.7166 10.5992 13.3449 10.5992 14Z"
  //         fill="#EBE9F3"
  //       />
  //     </svg>
  //   ),
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
    label: "Password",
    link: "/service-provider/settings/password",
  },
  {
    label: "Notification",
    link: "/service-provider/settings/notification",
  },
];
