declare interface DefaultUserDetailsType {
  dateOfBirth: Date | null | string;
  firstName: string;
  idImage: string;
  idNumber: string;
  idType: string;
  lastName: string;
  postalCode: string;
  profileImage: string;
  state: string;
  suburbs: string;
  bio: string | null;
}

declare interface ModalDataType {
  isModalShown: boolean;
  message: string | number;
  isStartService: boolean;
  error: string;
  isCompleteService: boolean;
  isReportService: boolean;
}

declare interface NotificationTypes {
  id: number;
  message: string;
  read: boolean;
  notificationImage: null;
  type: string;
  subType: string;
  notificationTime: number[];
  notificationImage: string;
  subType: string | null;
}

declare interface InvoiceDraftType {
  bookingId: number;
  subTotal: number;
  total: number;
  serviceStartOn: date;
  issuedOn: string;
  dueOn: string;
  serviceProviderId: number | undefined;
  customerId: number;
  gst: number;
  platformCharge: number;
  price: number;
}

declare interface JobsType {
  id: number;
  invoiceId: number;
  customerId: number;
  providerId: number;
  jobTitle: string;
  bookingId: number;
  taskTime: number[];
  jobDescription: string;
  createdAt: number[];
  jobStart: number[];
  jobEnd: number[];
  total: number;
  jobStatus: string;
  customerAcceptance: string;
  reports: {
    job: string;
  }[];
}
