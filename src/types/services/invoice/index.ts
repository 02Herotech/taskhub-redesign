type ServiceProvider = {
    id: number;
    user: {
        emailAddresses: string;
        firstName: string;
        fullName: string;
        id: number;
        lastName: string;
        profileImage: string;
        stripeId: string;
    };
};

type Customer = {
    id: number;
    user: {
        emailAddresses: string;
        firstName: string;
        id: number;
        lastName: string;
        profileImage: string;
        stripeId: string;
    };
};

export type Invoice = {
    id: number;
    bookingTitle: string;
    serviceProvider: ServiceProvider;
    bookingId: number;
    customer: Customer;
    total: number;
    serviceStartOn: string;
    gst: number;
    platformCharge: number;
    invoiceStatus: string;
    subTotal: number;
    createdAt: any;
    invoiceNumber: string;
    expiredAt: any;
    updatedAt: any;
};

export type GetInvoiceByCustomerIdResponse = Invoice[]

export type Receipt = {
    bookingCategory: string;
    bookingTitle: string;
    createdAt: [number, number, number, number, number, number, number];
    id: number;
    invoiceId: number;
    serviceProvider: ServiceProvider;
    total: number;
}

export type GetReceiptByCustomerIdResponse = Receipt[]