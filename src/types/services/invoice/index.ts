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

type User = {
    name: string;
    id: number;
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

type Invoice = {
    id: number;
    total: number;
    subTotal: number;
    serviceStartOn: string;
    gst: number;
    platformCharge: number;
    invoiceNumber: string;
    createdAt: string;
    serviceProvider: ServiceProvider;
    customer: Customer;
    bookingId: number;
    expiredAt: string;
    updatedAt: string;
};

type GetInvoiceByCustomerIdResponse = Invoice[]