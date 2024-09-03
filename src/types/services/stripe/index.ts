type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER"; // Add other transaction types if needed
type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED"; // Add other statuses if needed

type ServiceProvider = {
    id: number;
}

type ServiceProviderPaymentHistory = {
    amount: number;
    serviceProvider: ServiceProvider;
    transactionType: TransactionType;
    transactionStatus: TransactionStatus;
    transactionID: string;
    referenceNumber: string;
    transactionDate: string; // ISO 8601 date string
}

type GetServiceProviderPaymentHistoryResponse = ServiceProviderPaymentHistory[];