type Link = {
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

export const customerLinks: Link[] = [
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
];

export const serviceProviderLinks: Link[] = [
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
];

export const homeLinks: Link[] = [
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

export const mobileServiceProviderLinks: Link[] = [
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
        label: "My Notifications",
        url: "/service-provider/notification",
      },
      {
        label: "Payments and wallet",
        url: "/service-provider/payment",
      },
      {
        label: "Settings",
        url: "/service-provider/settings",
        sublinks: [
          {
            label: "Password",
            url: "/service-provider/dashboard/settings/security",
          },
          {
            label: "notification",
            url: "/service-provider/dashboard/settings/privacy",
          },
        ],
      },
    ],
  },
];

export const mobileCustomerLinks: Link[] = [
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
        ]
    }
];

