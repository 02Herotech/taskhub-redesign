export const fetchServiceProviderUserData = async (token: string) => {
  try {
    const url = process.env.NEXTAUTH_URL + "/api/v1/user/user-profile/";
  } catch (error) {
    throw error;
  }
};
