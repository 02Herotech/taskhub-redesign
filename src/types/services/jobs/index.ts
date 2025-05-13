export type Job = {
  id: number;
  invoiceId: number;
  customerId: number;
  bookingId: number;
  providerId: number;
  jobTitle: string;
  jobAddress: string;
  taskTime: [number, number] | null;
  taskDate: [number, number, number] | null;
  jobDescription: string;
  createdAt: [number, number, number, number, number, number, number];
  jobStart: [number, number, number, number, number, number, number];
  jobEnd: [number, number, number, number, number, number, number] | null;
  total: number;
  jobStatus: string;
  paymentMode: string | null;
  deleted: boolean;
  customerAcceptance: string;
  reports: any[];
};

export interface JobInfo {
  id: number;
  bookingId: number;
  createdAt: [number, number, number, number, number, number, number]; // [year, month, day, hour, min, sec, ns]
  deleted: boolean;
  taskDate: [number, number, number] | null; // [year, month, day]
  taskTime: [number, number] | null; // [hour, minute]
  invoiceId: number;
  customerId: number;
  jobStatus: string;
  providerId: number;
  total: number;
  jobTitle: string;
  jobAddress: string;
  jobDescription: string;
  categoryId: number;
}

export interface AssignedDTO {
  id: number;
  fullName: string;
  profileImage: string;
}

export interface JobItem {
  jobInfo: JobInfo;
  taskImage: string[];
  assignedDTO: AssignedDTO;
}

export interface GetServiceProviderOngoingJobsResponse {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: JobItem[];
}

export interface Booking {
  id: number;
  updatedAt: DateTuple | null;
  userAddress: {
    postCode: string;
    suburb: string;
    state: string;
  };
  bookingStage: string;
  startDate: DateTuple;
  startTime: TimeTuple;
  price: number;
  bookingDescription: string;
  customer: {
    id: number;
    user: {
      id: number;
      fullName: string;
      profileImage: string | null;
    };
  };
  listing: {
    id: string;
  };
  bookingTitle: string;
  bookedAt: DateTuple;
  invoiceSent: boolean;
  task: {
    id: number;
    displayPictures: string[];
  };
}

type DateTuple = [number, number, number];
type TimeTuple = [number, number];

export type GetServiceProviderPendingJobsResponse = Booking[];
