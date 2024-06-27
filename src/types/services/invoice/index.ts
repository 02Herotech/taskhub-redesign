type ServiceProvider = {
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
    subTotal: number;
    createdAt: any;
    invoiceNumber: string;
    expiredAt: any;
    updatedAt: any;
};

export type GetInvoiceByCustomerIdResponse = Invoice[]

export type Receipt = {
    id: number;
    bookingTitle: string;
    serviceProvider: ServiceProvider;
    bookingId: number;
    customer: Customer;
    total: number;
    serviceStartOn: [number, number, number] | string;
    gst: number;
    platformCharge: number;
    subTotal: number;
    createdAt: [number, number, number] | string;
    invoiceNumber: string;
    expiredAt: [number, number, number] | string;
    updatedAt: [number, number, number] | string;
}

export type GetReceiptByCustomerIdResponse = Receipt[]