import axios from "axios";

export async function getUsers({ token }: { token: string }) {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/user-crud/summaries";
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
    process.env.NEXT_PUBLIC_API_URL +
    "/api/v1/user-crud/messages/" +
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
    process.env.NEXT_PUBLIC_API_URL +
    "/api/v1/user-crud/messages/" +
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
  id: number;
  token: string;
}) {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/v1/user-crud/messages/" + id;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
}
