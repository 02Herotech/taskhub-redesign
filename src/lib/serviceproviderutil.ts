import axios from "axios";

export const fetchListingById = async (id: string, token: string) => {
  try {
    // const url = process.env.NEXTAUTH_URL + "/api/v1/listing/by-id/" + id;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/1`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleFetchNotifications = async ({
  userId,
  token,
}: {
  userId: number;
  token: string;
}) => {
  try {
    const url =
      `${process.env.NEXT_PUBLIC_API_URL}/notification?userId=` +
      userId;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
