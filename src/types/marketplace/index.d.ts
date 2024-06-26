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
  state: string;
  postCode: string;
  suburb: string;
  serviceProvider: {
    id: number;
    user: { id: number; fullName: string; profileImage: string };
  };
  category: {
    categoryName: string;
  };
  stripeId: string;
  negotiable: boolean;
  createdAt: number[];
  availableDays: string[];
  reviews: number[];
  businessPictures: string[];
  listingTitle: string;
  listingDescription: string;
  planOneDescription: string;
  planOnePrice: number;
  planTwoDescription: string | null;
  planTwoPrice: number | null;
  planThreeDescription: string | null;
  planThreePrice: number | null;
  available: boolean;
  taskType: string;
  subCategory: {
    name: string;
  };
  deleted: bolean;
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
  serviceProvider: {
    id: number;
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
  available: boolean;
  deleted: boolean;
  stripeId: string;
  businessPictures: string[];
}

declare interface FilterDataStructureTypes {
  category: string;
  location: string;
  typeOfService: string;
  typeOfServiceDisplay: string;
  minPrice: number;
  maxPrice: number;
}

declare interface BookingType {
  id: 0;
  userAddress: {
    id: number;
    state: string;
    postCode: string;
    suburb: string;
  };
  startDate: number[];
  startTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  price: number;
  bookingTitle: string;
  customer: {
    id: number;
    user: {
      id: number;
      fullName: string;
      profileImage: string | null;
    };
  };

  bookingDescription: string;
  bookingStage: string;
  listing: { id: number };
  bookedAt: string;
  invoiceSent: boolean;
  updatedAt: string | null;
}

declare interface UserProfileTypes {
  id: number;
  stripeId: string | null;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  address: {
    id: string | null;
    streetNumber: string | null;
    streetName: string | null;
    suburb: string | null;
    postCode: string | null;
    state: string | null;
    unitNumber: string | null;
  };
  profileImage: string | null;
  enabled: boolean | null;
  accountState: string;
  deactivatedAt: string | null;
  registeredAt: string;
  roles: string[];
  appNotificationList: any[];
}
