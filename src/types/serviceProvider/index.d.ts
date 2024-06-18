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
