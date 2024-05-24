const marketplaceDummyUser: PosterType[] = [
  {
    id: 1,
    address: "123 Main St",
    enabled: true,
    firstName: "John",
    lastName: "Doe",
    profileImage: "image_url",
    emailAddress: "john.doe@example.com",
    stripeId: "stripe_id",
    roles: ["user"],
    accountState: "active",
    deactivatedAt: null,
    phoneNumber: "123-456-7890",
    registeredAt: null,
    appNotificationList: [],
  },
];

const marketplaceDummyCategory: CategoryType[] = [
  { id: 1, categoryName: "Home Service" },
  { id: 1, categoryName: "Home Service" },
  { id: 1, categoryName: "Home Service" },
];

const marketplaceDummySubCategory: SubCategoryType[] = [
  {
    id: 1,
    name: "Land Scrapping",
  },
  {
    id: 1,
    name: "Land Scrapping",
  },
];
