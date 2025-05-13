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


// export type DropdownItems = {
//   id: number;
//   icon: any;
//   label: string;
//   onClick: () => void;
// }[];

export type DropdownItems = {
  id: number;
  icon: any;
  label: string;
  onClick: () => void;
}[];
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
  displayPictures: string[];
  taskStatus: string;
  createdAt: [number, number, number]; // ISO date string e.g., '2025-04-08'
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

export type AcceptOfferData = {
  data: {
    clientSecret: string;
    hasCard: boolean;
  };
  message: string;
  successful: boolean;
};
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

export type GetAllCustomerTasksResponse = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
} & { content: AllTask[] };

export type GetCustomerOngoingTasksResponse = OngoingTaskResponse;

export type GetCustomerTasksResponse = GetAllCustomerTasksResponse;

export type GetTasksRequest = number;

export type GetJobsByIdResponse = JobDataDetails;

export type OngoingTaskResponse = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: string;
  content: OngoingTaskDetails[];
};

export type OngoingTaskDetails = {
  jobInfo: JobInfo;
  taskStatus: string;
};
export type GetTasksResponse = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: string;
  content: Task[];
};

export type JobDataDetails = {
  jobInfo: JobInfo;
  assignedDTO: AssignedDTO;
  taskImage: string;
};

export type JobInfo = {
  id: number;
  bookingId: number;
  total: number;
  deleted: boolean;
  taskDate: string; // YYYY-MM-DD format
  createdAt: [number, number, number];
  taskTime: [number, number];
  providerId: number;
  customerId: number;
  invoiceId: number;
  jobStatus: string;
  categoryId: number;
  jobTitle: string;
  jobAddress: string;
  jobDescription: string;
};

export type AssignedDTO = {
  id: number;
  fullName: string;
  profileImage: string;
};

export type CompletedTask = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: string;
  content: CompletedTaskDetails[];
};

export type CompletedTaskDetails = {
  id: number;
  invoiceId: number;
  bookingId: number;
  total: number;
  createdAt: [number, number, number, number, number, number, number];
  taskTime: [number, number];
  customerId: number;
  jobTitle: string;
  jobStatus: string;
  jobAddress: string;
  jobDescription: string;
  providerId: number;
  categoryId: number;
};

export type GetCustomerCompletedTasksResponse = CompletedTask;

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

export type ServiceProviderBookingsResponse = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: ServiceProviderBooking[];
};

export type ServiceProviderBooking = {
  assignedDTO: { fullName: string; id: number; profileImage: string | null };
  jobInfo: {
    bookingId: number;
    categoryId: number;
    createdAt: number[];
    customerId: number;
    deleted: number;
    id: number;
    invoiceId: number;
    jobAddress: string;
    jobDescription: string;
    jobStatus: "PENDING" | "COMPLETED";
    jobTitle: string;
    providerId: number;
    taskDate: number[] | null;
    taskTime: [number, number] | null;
    total: number;
  };
  taskImage: string[] | null;
};

export type BookingRequestResponse = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: Booking[];
};

export type Booking = {
  id: number;
  userAddress: Address;
  customer: {
    id: number;
    user: User;
  };
  bookingStage: string;
  listing: Listing;
  bookingTitle: string;
  startDate: string;
  startTime: Time;
  price: number;
  bookingDescription: string;
  updatedAt: string;
  bookedAt: [number, number, number];
  invoiceSent: boolean;
};

export type Address = {
  id: number;
  state: string;
  suburb: string;
  postCode: string;
  streetNumber: string;
  unitNumber: string;
  streetName: string;
};

export type User = {
  id: number;
  stripeId: string;
  userAddress: Address;
  emailAddress: string;
  firstName: string;
  password: string;
  lastName: string;
  dateOfBirth: string;
  accountState: string;
  roles: string[];
  profileImage: string;
  deactivatedAt: string;
  phoneNumber: string;
  lastPasswordChangeDate: string;
  createdAt: string;
  isEnabled: boolean;
};

export type Listing = {
  id: number;
  state: string;
  planOneDescription: string;
  planOnePrice: number;
  planTwoDescription: string;
  planTwoPrice: number;
  planThreeDescription: string;
  planThreePrice: number;
  suburb: string;
  postCode: string;
  taskType: string;
  businessPictures: string[];
  stripeId: string;
  category: {
    id: number;
    categoryName: string;
  };
  serviceProvider: {
    id: number;
    user: User;
  };
  availableDays: string[];
  listingDescription: string;
  listingTitle: string;
  available: boolean;
  subCategory: {
    id: number;
    name: string;
  };
  reviews: Review[];
  negotiable: boolean;
};

export type Review = {
  id: number;
  comment: string;
  serviceProvider: {
    id: number;
    user: User;
  };
  customer: {
    id: number;
    user: User;
  };
  createdAt: string;
  reviewerUserId: number;
  rating: number;
  serviceCategory: {
    id: number;
    categoryName: string;
  };
};

export type Time = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
};
