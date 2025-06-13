import { ref } from "vue";
import { getProfile } from "../services/api";

export const useUserProfile = () => {
  const userProfile = ref(null);
  const error = ref(null);

  const fetchUserProfile = async (token) => {
    try {
      userProfile.value = await getProfile(token);
    } catch (err) {
      error.value = err;
    }
  };

  return {
    userProfile,
    error,
    fetchUserProfile,
  };
};
