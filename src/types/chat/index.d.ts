declare interface ChatContactTypes {
  id: number;
  name: string;
  profilePicture: string | null;
  newMessages: number | null;
}

declare interface ChatMessageRecievedType {
  id: string;
  chatId: string;
  senderId: number;
  recipientId: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: number;
  status: string;
}

declare interface ChatMessageDisplayedType {
  content: string;
  time: string;
  status: string;
}