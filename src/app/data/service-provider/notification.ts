interface NotificationType {
  description: string;
  jobLabel: string;
  time: string;
  image: string | null;
}

export const notificationData: NotificationType[] = [
  {
    description: "Your house cleaning task has been completed successfully.",
    jobLabel: "House Cleaning",
    time: "2024-05-28T14:30:00Z",
    image: null
  },
  {
    description: "The dog walking task is scheduled for tomorrow.",
    jobLabel: "Dog Walking",
    time: "2024-05-28T09:00:00Z",
    image: null
  },
  {
    description: "The gardening service is on its way.",
    jobLabel: "Gardening Service",
    time: "2024-05-30T11:15:00Z",
    image: null
  },
  {
    description: "Your personal training session is starting soon.",
    jobLabel: "Personal Training",
    time: "2024-06-01T17:00:00Z",
    image: null
  },
  {
    description: "The car wash service is complete.",
    jobLabel: "Car Wash",
    time: "2024-06-02T13:45:00Z",
    image: null
  }
];
