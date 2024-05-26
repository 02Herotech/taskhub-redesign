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
        url: "/customer/profile"
    }
];

export const serviceProviderLinks: Link[] = [
    {
        label: "Provide a service",
        url: "/service-provider/provide-service",
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
        url: "/service-provider/provide-service",
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
                url: "/service-provider/dashboard",
            },
            {
                label: "My Services",
                url: "/service-provider/dashboard/services",
            },
            {
                label: "My Notifications",
                url: "/service-provider/dashboard/notifications",
            },
            {
                label: "Payments and wallet",
                url: "/service-provider/dashboard/payment",
            },
            {
                label: "Settings",
                url: "/service-provider/dashbaord/settings",
                sublinks: [
                    {
                        label: "General",
                        url: "/service-provider/dashboard/settings/general",
                    },
                    {
                        label: "Security",
                        url: "/service-provider/dashboard/settings/security",
                    },
                    {
                        label: "Privacy",
                        url: "/service-provider/dashboard/settings/privacy",
                    },
                ]
            },
        ]
    }
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
                label: "Payments settings",
                url: "/customer/payments",
            },
            {
                label: "Settings",
                url: "/customer/settings",
            },
        ]
    }
];