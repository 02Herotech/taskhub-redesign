export interface TaskTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface Category {
  id: number;
  categoryName: string;
  description: string;
}

export interface TaskContent {
  id: number;
  posterId: number;
  assignedTo: number;
  taskBriefDescription: string;
  taskDescription: string;
  taskImage: string;
  taskTime: TaskTime;
  taskDate: string;
  termAccepted: boolean;
  taskType: string;
  taskStatus: string;
  suburb: string;
  state: string;
  postCode: string;
  createdAt: [number, number, number];
  deleted: boolean;
  available: boolean;
  customerBudget: number;
  category: Category;
  displayPictures: string[];
  active: boolean;
}

export interface GetAllTasksByServicesProviderResponse {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: TaskContent[];
}

///

export interface GetServiceProviderListingResponse {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: Listing[];
}

export interface Listing {
  id: number;
  state: string;
  serviceProvider: ServiceProvider;
  stripeId: string;
  available: boolean;
  createdAt: string;
  category: Category;
  availableDays: string[]; // or enum if you want ("MONDAY", etc.)
  listingDescription: string;
  listingTitle: string;
  planOneDescription: string;
  planOnePrice: number;
  planTwoDescription: string;
  planTwoPrice: number;
  planThreeDescription: string;
  planThreePrice: number;
  businessPictures: string[];
  taskType: "PHYSICAL_SERVICE"; // could be union if there are other task types
  postCode: string;
  suburb: string;
  reviews: Review[];
  subCategory: SubCategory;
  deleted: boolean;
}

export interface ServiceProvider {
  id: number;
  user: User;
}

export interface User {
  id: number;
  roles: ("SUPER_ADMIN")[]; // array of role strings
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  deactivatedAt: string; // ISO date
  accountState: "NOT_VERIFIED"; // could also be a union type if there are more states
  profileImage: string;
  stripeId: string;
  createdAt: string;
  lastPasswordChangeDate: string;
  dateOfBirth: string;
  userAddress: UserAddress;
  phoneNumber: string;
  isEnabled: boolean;
}

export interface UserAddress {
  id: number;
  state: string;
  postCode: string;
  suburb: string;
  streetName: string;
  streetNumber: string;
  unitNumber: string;
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface SubCategory {
  name: string;
}

export interface Review {
  id: number;
  comment: string;
  serviceProvider: ServiceProvider;
  createdAt: string;
  customer: Customer;
  reviewerUserId: number;
  rating: number;
  serviceCategory: Category;
}

export interface Customer {
  id: number;
  user: User;
}


export interface GetServiceProviderOngoingJobsResponse {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: JobItem[];
}
export interface GetServiceProviderCompletedJobsResponse {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: JobItem[];
}

export interface JobItem {
  jobInfo: JobInfo;
  taskImage: string[];
  assignedDTO: AssignedDTO;
}

export interface JobInfo {
  id: number;
  deleted: boolean;
  jobStatus: string;
  taskDate: [number, number, number] | null
  taskTime: [number, number] | null;
  total: number;
  providerId: number;
  customerId: number;
  bookingId: number;
  createdAt: [number, number, number, number, number, number, number]; // e.g. [2025, 4, 22, 11, 15, 31, 616872000]
  invoiceId: number;
  jobTitle: string;
  jobAddress: string;
  jobDescription: string;
  categoryId: number;
}

export interface AssignedDTO {
  id: number;
  fullName: string;
  profileImage: string | null;
}
