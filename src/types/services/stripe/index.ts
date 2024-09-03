type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER"; 
type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED"; 

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