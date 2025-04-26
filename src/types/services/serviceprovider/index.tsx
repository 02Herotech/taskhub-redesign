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






export interface GetServiceProviderOngoingTasksResponse {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: Task[];
}
export interface GetServiceProviderCompletedTasksResponse {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: Task[];
}

export interface Task {
  id: number;
  state: string;
  taskBriefDescription: string;
  displayPictures: string[];
  posterId: number;
  taskDate: string; // ISO date string
  taskTime: TaskTime;
  taskDescription: string;
  taskStatus: "OPEN"; // or union type if more statuses exist
  createdAt: [number, number, number]
  assignedTo: number;
  category: Category;
  taskImage: string;
  termAccepted: boolean;
  taskType: "PHYSICAL_SERVICE"; // or union type if there are other types
  postCode: string;
  suburb: string;
  customerBudget: number;
  deleted: boolean;
  isActive: boolean;
}

export interface TaskTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface Category {
  id: number;
  categoryName: string;
}
