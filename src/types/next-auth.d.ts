import NextAuth from "next-auth";

interface Address {
    id: number;
    streetNumber: string;
    streetName: string;
    unitNumber: string;
    suburb: string;
    state: string;
    postCode: string;
}

interface NotificationTime {
    [key: number]: number;
}

interface AppNotification {
    id: number;
    message: string;
    read: boolean | null;
    bookingId: number;
    notificationTime: NotificationTime;
}

interface User {
    id: number;
    address: Address;
    enabled: boolean;
    firstName: string;
    lastName: string;
    profileImage: string;
    emailAddress: string;
    roles: string[];
    accountState: string;
    deactivatedAt: null | any; // You might want to replace `any` with a more specific type if you know the possible types
    stripeId: null | any; // Same as above
    phoneNumber: string;
    registeredAt: number[]; // Assuming registeredAt is an array of numbers
    appNotificationList: AppNotification[];
}

// Extend the NextAuth session interface
declare module "next-auth" {
    interface Session {
        user: User;
        accessToken: string;
        refreshToken: string;
        message: string;
    }
}
