import axios from "axios";

export async function getUsers({ token }: { token: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/chat/chatted-withs`;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
}

export async function countNewMessages({
  senderId,
  recipientId,
  token,
}: {
  senderId: number;
  recipientId: number;
  token: string;
}) {
  const url =
    `${process.env.NEXT_PUBLIC_API_URL}/chat/messages/` +
    senderId +
    "/" +
    recipientId +
    "/count";
  const { data } = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
}

export async function findChatMessages({
  senderId,
  recipientId,
  token,
}: {
  senderId: number;
  recipientId: number;
  token: string;
}) {
  const url =
    `${process.env.NEXT_PUBLIC_API_URL}/chat/messages/` +
    senderId +
    "/" +
    recipientId;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
}

export async function findChatMessage({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/chat/messages/` + id;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
}
