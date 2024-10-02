declare interface ChatContactTypes {
  id: number;
  name: string;
  profilePicture: string | null;
  newMessages: number | null;
  lastChatTimestamp: number[] | null;
  lastMessage: string | null;
}

declare interface ChatMessageRecievedType {
  id: string;
  chatId: string;
  senderId: number;
  recipientId: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: number[];
  status: string;
}

declare interface ChatMessageDisplayedType {
  content: string;
  time: string | number[];
  senderId: number;
}

declare interface Offer {
  id: string;
  taskId: number;
  userId: number;
  serviceProviderId: number;
  fullName: string;
  message: string;
  createdAt: number[];
  service_provider_profile_Image: string;
  offerThreadList: {
    taskId: number;
    offerId: string;
    message: string;
    fullName: string;
    userId: number;
    timeStamp: number[];
    userProfileImage: string;
  }[];
}
