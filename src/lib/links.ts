export type LinkRouteTypes = {
  label: string;
  url?: string;
  sublinks?: {
    label: string;
    url: string;
    sublinks?: {
      label: string;
      url: string;
    }[];
  }[];
};

export const customerLinks: LinkRouteTypes[] = [
  {
    label: "Add a task",
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
  {
    label: "Blog",
    url: "/blog",
  },
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
  {
    label: "Blog",
    url: "/blog",
  },
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
    label: "Contact Us",
    url: "/contact",
  },
];

export const mobileServiceProviderLinks: LinkRouteTypes[] = [
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
  {
    label: "Blog",
    url: "/blog",
  },
  {
    label: "Profile",
    sublinks: [
      {
        label: "My Profile",
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
        label: "Payments and wallet",
        url: "/service-provider/payment",
      },
      {
        label: "Password Settings",
        url: "/service-provider/settings/password",
        // sublinks: [
        //   {
        //     label: "Password",
        //     url: "/service-provider/dashboard/settings/security",
        //   },
        //   {
        //     label: "Notification",
        //     url: "/service-provider/dashboard/settings/privacy",
        //   },
        // ],
      },
      {
        label: "Notification Settings",
        url: "/service-provider/settings/notification",
        // sublinks: [
        //   {
        //     label: "Password",
        //     url: "/service-provider/dashboard/settings/security",
        //   },
        //   {
        //     label: "Notification",
        //     url: "/service-provider/dashboard/settings/privacy",
        //   },
        // ],
      },
    ],
  },
];

export const mobileCustomerLinks: LinkRouteTypes[] = [
  {
    label: "Add a task",
    url: "/customer/add-task",
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
    label: "Profile",
    sublinks: [
      {
        label: "My Profile",
        url: "/customer/profile",
      },
      {
        label: "My Tasks",
        url: "/customer/tasks",
      },
      {
        label: "My Notifications",
        url: "/customer/notifications",
      },
      {
        label: "Payment settings",
        url: "/customer/payment/payment-history",
      },
      {
        label: "Settings",
        url: "/customer/settings",
      },
    ],
  },
];
