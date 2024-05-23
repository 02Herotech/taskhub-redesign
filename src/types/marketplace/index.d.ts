declare interface CategoryType {
  id: number;
  categoryName: string;
}

declare interface PosterType {
  id: number;
  address: string | null;
  enabled: boolean;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  emailAddress: string;
  stripeId: string;
  roles: string[];
  accountState: string;
  deactivatedAt: null;
  phoneNumber: string;
  registeredAt: null;
  appNotificationList: never[];
}

declare interface SubCategoryType {
  id: number;
  name: string;
}

declare interface ListingDataType {
  id: number;
  posterId: number;
  businessName: string;
  serviceCategory: string;
  subCategory: string;
  serviceDescription: string;
  serviceName: string;
  pricing: number;
  availableDays: [string];
  available: boolean;
  startHour: number;
  closeMinute: number;
  closeHour: number;
  startMinute: number;
  availableFrom: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  availableTo: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  userAddress: {
    id: number;
    streetNumber: string;
    streetName: string;
    unitNumber: string;
    suburb: string;
    state: string;
    postCode: string;
  };
  deleted: boolean;
  stripeId: string;
  businessPictures: string[]; // Updated to an array of strings
}

declare interface ListingDataType2 {
  id: number;
  category: {
    id: number;
    categoryName: string;
  };
  subCategory: {
    id: number;
    name: string;
  };
  listingTitle: string;
  listingDescription: string;
  planOneDescription: string;
  planOnePrice: number;
  planTwoDescription: string;
  planTwoPrice: number;
  planThreeDescription: string;
  planThreePrice: number;
  price: number | null;
  taskType: string;
  suburb: string;
  state: string;
  postCode: string;
  availableDays: string[];
  createdAt: number[];
  available: true;
  deleted: false;
  stripeId: string;
  businessPictures: string[];
}
