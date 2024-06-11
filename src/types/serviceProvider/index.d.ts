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
}

declare interface ModalDataType {
  isModalShown: boolean;
  message: string | number;
  isStartService: boolean;
  error: string;
  isCompleteService: boolean;
  isReportService: boolean;
}
