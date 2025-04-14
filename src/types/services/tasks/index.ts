export type Task = {
  id: number;
  posterId: number;
  taskBriefDescription: string;
  taskDescription: string;
  taskImage: any;
  category: {
    id: number;
    categoryName: string;
  };
  taskTime: [number, number];
  taskDate: [number, number, number];
  hubTime: string | null;
  taskType: string;
  taskStatus: string;
  state: string | null;
  postCode: string | number | null;
  suburb: string | null;
  createdAt: [number, number, number];
  customerBudget: number;
  active: boolean;
};

export type CustomerTasks = {
  id: number;
  posterId: number;
  taskBriefDescription: string;
  taskDescription: string;
  taskImage: any;
  taskTime: [number, number];
  taskDate: [number, number, number];
  category: {
    id: number;
    categoryName: string;
  };
  hubTime: string | null;
  taskType: string;
  taskStatus: string;
  state: string | null;
  postCode: string | number | null;
  suburb: string | null;
  createdAt: [number, number, number];
  customerBudget: number;
  active: boolean;
};

export type OngoingTask = {
  invoiceId: number;
  bookingId: number;
  total: number;
  createdAt: [number, number, number, number, number, number, number];
  customerId: number;
  taskTime: [number, number];
  jobTitle: string;
  jobStatus: "IN_PROGRESS" | "PENDING" | "INSPECTION" | "COMPLETED";
  jobDescription: string;
  id: number;
};

export type AllTask = {
  id: number;
  posterId: number;
  taskBriefDescription: string;
  taskDescription: string;
  taskImage: any;
  taskTime: [number, number];
  taskDate: [number, number, number];
  category: {
    id: number;
    categoryName: string;
  };
  hubTime: string | null;
  taskType: string;
  taskStatus: string;
  state: string | null;
  postCode: string | number | null;
  suburb: string | null;
  createdAt: [number, number, number];
  customerBudget: number;
  active: boolean;
};

export type GetAllCustomerTasksResponse = AllTask;

export type GetCustomerOngoingTasksResponse = OngoingTask;

export type GetCustomerTasksResponse = CustomerTasks[];

export type GetTasksRequest = number;

export type GetTasksResponse = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: string;
  content: Task[];
};

export type CompletedTask = {
  id: number;
  invoiceId: number;
  bookingId: number;
  total: number;
  createdAt: [number, number, number, number, number, number, number];
  taskTime: [number, number];
  customerId: number;
  jobTitle: string;
  jobDescription: string;
  providerId: number;
  categoryId: number;
};

export type GetCustomerCompletedTasksResponse = CompletedTasks;

export type GetSingleTasksResponse = TaskResponse;

export type GetFilterTaskByPriceRequest = {
  page: number;
  minPrice: number;
  maxPrice: number;
};

export type GetFilterTasksRequest = {
  pageNumber: number;
  category?: string;
  location?: string;
  typeOfService?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type GetFilterTaskByTypeRequest = {
  page: number;
  type: string;
};

export type GetTaskByTextRequest = {
  pageNumber: number;
  text: string;
};

export type PaymentIntentResponse = {
  intentID: string;
  clientSecret: string;
};

export type AcceptInvoiceResponse = {
  data: string | null;
  message: string;
  status: string;
};

export type RejectInvoiceResponse = {
  data: string | null;
  message: string;
  status: string;
};

export type Receipt = {
  task?: {
    id: number;
    taskBriefDescription: string;
    taskDescription: string;
    taskImage?: null;
    taskTime?: null;
    taskDate?: null;
  } | null;
  invoiceId: number;
  jobId: number;
  listing?: {
    listingTitle: string;
    listingDescription: string;
    businessPictures: string[];
  } | null;
  transactionHistory: {
    id: number;
    serviceProvider: number;
    transactionStatus: "SUCCESSFUL";
    transactionType: "DEPOSIT";
    transactionDate: [number, number, number, number, number, number, number];
  };
};

export type ServiceProviderReciepts = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: Receipt[];
};
