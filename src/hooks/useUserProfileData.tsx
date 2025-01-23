import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { defaultUserDetails } from "@/data/data";
import axios from "axios";

/**
 * Fetches user details from server and updates the enabled field in the session object
 * @param setLoadingProfile 
 * @returns User profile data fetched from server or default user object with empty string for user details
 */
function useUserProfileData(
  setLoadingProfile?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [fetchedUserData, setFetchedUserData] = useState(defaultUserDetails);
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const url = isServiceProvider
          ? `${process.env.NEXT_PUBLIC_API_URL}/service_provider/profile`
          : `${process.env.NEXT_PUBLIC_API_URL}/customer/profile`;
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setFetchedUserData(data);
        const user = session.data?.user;
        if (!user || !data.isEnabled) return;
        const { user: userInfo } = user;
        if (userInfo.enabled) return;
        userInfo.enabled = data.isEnabled;
        await session.update({ user: userInfo });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfile && setLoadingProfile(false);
      }
    };
    fetchUserData();
  }, [token, isServiceProvider]);

  return fetchedUserData;
}

export default useUserProfileData;
