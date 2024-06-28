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
  bookingId: number;
  type: null;
  notificationTime: number[];
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

const f = {
  id: 5,
  invoiceId: 7,
  customerId: 11,
  providerId: 6,
  jobTitle: "Novels Store",
  taskTime: [21, 30],
  jobDescription: "I need this novel",
  createdAt: [2024, 6, 28, 0, 54, 21, 691824000],
  jobStart: null,
  jobEnd: null,
  total: 50,
  jobStatus: "PENDING",
  customerAcceptance: "PENDING",
  reports: [
    {
      job: "string",
    },
  ],
};

declare interface JobsType {
  id: number;
  invoiceId: number;
  customerId: number;
  providerId: number;
  jobTitle: string;
  taskTime: number[];
  jobDescription: string;
  createdAt: number[];
  jobStart: string | null;
  jobEnd: string | null;
  total: number;
  jobStatus: string;
  customerAcceptance: string;
  reports: {
    job: string;
  }[];
}
