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
    label: "My Dashboard",
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
        url: "/service-provider/settings/password",
      },

    ],
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
    label: "Messages",
    url: "/message",
  },
  {
    label: "Contact us", 
    url: "/contact",
  }
];

export const mobileCustomerLinks: LinkRouteTypes[] = [
  {
    label: "My Dashboard",
    sublinks: [
      {
        label: "Profile",
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
        label: "Payment",
        url: "/customer/payment/payment-history",
      },
      {
        label: "Settings",
        url: "/customer/settings",
      },
    ],
  },
  {
    label: "Marketplace",
    url: "/marketplace",
  },
  {
    label: "Messages",
    url: "/message",
  },
  {
    label: "Contact us",
    url: "/contact",
  }
];
