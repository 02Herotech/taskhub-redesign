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
    transactionDate: [number, number, number, number, number, number, number]; 
}

type GetServiceProviderPaymentHistoryResponse = ServiceProviderPaymentHistory[];