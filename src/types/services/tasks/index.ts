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

export interface TaskCategory {
  id: number;
  categoryName: string;
}

export interface TaskInfo {
  id: number;
  state: string;
  taskImage: string;
  suburb: string;
  postCode: string;
  taskType: string;
  posterId: number;
  category: TaskCategory;
  taskStatus: string;
  createdAt: string; // ISO date string e.g., '2025-04-08'
  assignedTo: number;
  taskDate: [number, number, number]; // ISO date string e.g., '2025-04-08'
  taskTime: [number, number];
  taskDescription: string;
  taskBriefDescription: string;
  termAccepted: boolean;
  customerBudget: number;
  deleted: boolean;
  isActive: boolean;
}

export interface PosterInfo {
  id: number;
  fullName: string;
  profileImage: string;
  email: string;
}

export interface TaskResponse {
  taskInfo: TaskInfo;
  posterInfo: PosterInfo;
}

// export type OngoingTask = {
//     invoiceId: number;
//     bookingId: number;
//     total: number;
//     createdAt: [number, number, number, number, number, number, number];
//     customerId: number;
//     taskTime: [number, number];
//     jobTitle: string;
//     jobStatus: "IN_PROGRESS" | "PENDING" | "INSPECTION" | "COMPLETED"
//     jobDescription: string;
//     id: number
// };

export type OngoingTask = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: OngoingTaskDetails[];
};
export type CompletedTasks = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: TaskDetails[];
};

export type TaskTime = [number, number, number];

export type OngoingTaskDetails = {
  jobInfo: TaskDetails;
  taskStatus: string;
};
export type TaskDetails = {
  id: number;
  categoryId: number;
  bookingId: number;
  createdAt: TaskTime;
  deleted: boolean;
  taskDate: [number, number, number];
  taskTime: [number, number];
  total: number;
  jobStatus:
    | "PENDING"
    | "ONGOING"
    | "COMPLETED"
    | "IN_PROGRES"
    | "CANCELED "
    | "INSPECTION";
  providerId: number;
  invoiceId: number;
  customerId: number;
  jobTitle: string;
  jobAddress: string;
  jobDescription: string;
};

export type JobInfo = {
  id: number;
  invoiceId: number;
  createdAt: string;
  deleted: boolean;
  total: number;
  bookingId: number;
  taskDate: [number, number, number];
  taskTime: [number, number];
  customerId: number;
  jobStatus:
    | "PENDING"
    | "ONGOING"
    | "COMPLETED"
    | "IN_PROGRES"
    | "CANCELED "
    | "INSPECTION";
  providerId: number;
  jobTitle: string;
  jobAddress: string;
  jobDescription: string;
  categoryId: number;
};

type AssignedDTO = {
  id: number;
  fullName: string;
  profileImage: string;
};

export type JobDataDetails = {
  jobInfo: JobInfo;
  taskImage: string;
  assignedDTO: AssignedDTO;
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

export type GetAllCustomerTasksResponse = AllTask[];

export type GetCustomerOngoingTasksResponse = OngoingTask;

export type GetCustomerTasksResponse = CustomerTasks[];

export type GetTasksRequest = number;

export type GetTasksResponse = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: string;
  content: Task[];
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
