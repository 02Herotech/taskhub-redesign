export type Category = {
  id: number;
  categoryName: string;
};

export type Task = {
  id: number;
  state: string;
  isActive: boolean;
  taskDate: [number, number, number] | null;
  taskTime: [number, number] | null;
  taskDescription: string;
  termAccepted: boolean;
  taskType: string;
  postCode: string;
  suburb: string;
  customerBudget: number;
  taskImage: string | null;
  displayPictures: string[];
  posterId: number;
  taskStatus: string;
  createdAt: [number, number, number];
  assignedTo: number | null;
  category: Category;
  taskBriefDescription: string;
  deleted: boolean;
};

export type GetServiceProvidersOfferResponse = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: Task[];
};

export type OfferThread = {
  taskId: number;
  offerId: string;
  offerAmount: number | null;
  message: string;
  fullName: string;
  userId: number;
  userProfileImage: string;
  timeStamp: number;
};

export type Offer = {
  id: string;
  taskId: number;
  customerId: number;
  serviceProviderId: number;
  fullName: string;
  message: string;
  offerAmount: number | null;
  createdAt: number;
  service_provider_profile_Image: string;
  acceptedOffer: boolean;
  offerThreadList: OfferThread[];
  paid: boolean;
  mine: boolean;
  finalSent: boolean;
};
