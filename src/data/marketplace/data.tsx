const marketplaceDummyData: ListingDataType2[] = [
  {
    id: 1,
    category: {
      id: 1,
      categoryName: "Home Service",
    },
    subCategory: {
      id: 1,
      name: "Landscaper/ ground keeper",
    },
    listingTitle: "Cleaning",
    listingDescription: "Rug Cleaning",
    planOneDescription: "Small Rug",
    planOnePrice: 10,
    planTwoDescription: "Mid Rug",
    planTwoPrice: 20,
    planThreeDescription: "Big rug",
    planThreePrice: 30,
    price: null,
    taskType: "PHYSICAL_SERVICE",
    suburb: "Kent",
    state: "Tasmania",
    postCode: "8099",
    availableDays: ["SATURDAY", "SUNDAY", "FRIDAY"],
    createdAt: [2024, 5, 22],
    available: true,
    deleted: false,
    stripeId: "prod_Q9T1Sf2iLURrb8",
    businessPictures: [
      "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1716364799/glzmbnephtuzhhruwspi.png",
      "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1716364799/wrbi870lbrbtq25hj0jb.png",
      "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1716364800/ftbiukeuxez3akmxreow.png",
      "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1716364800/azgq2wytogkljzwc2tsf.png",
    ],
  },
  {
    id: 2,
    category: {
      id: 2,
      categoryName: "Beauty",
    },
    subCategory: {
      id: 3,
      name: "House Keeping",
    },
    listingTitle: "Qwerty",
    listingDescription: "Qwerty",
    planOneDescription: "dgyt",
    planOnePrice: 122,
    planTwoDescription: "wqqewtw",
    planTwoPrice: 111,
    planThreeDescription: "hwjdjdhjec",
    planThreePrice: 1234,
    price: null,
    taskType: "PHYSICAL_SERVICE",
    suburb: "hbgduwhjh",
    state: "hyduqwyd",
    postCode: "1234",
    availableDays: ["WEDNESDAY"],
    createdAt: [2024, 5, 22],
    available: false,
    deleted: false,
    stripeId: "prod_Q9V7XxGV9PdVAt",
    businessPictures: [
      "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1716372595/dv0jjd0vj85ejbbgfjhr.png",
      "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1716372596/ezjphmn6smkbnfoemab2.png",
      "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1716372596/pntlnzbtuzfxqozgk6xv.png",
      "http://res.cloudinary.com/ddgm9zdnr/image/upload/v1716372596/p7qu3zbnwks1f5zpmrix.png",
    ],
  },
];

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
