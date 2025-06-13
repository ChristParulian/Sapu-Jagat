// Presenter for user profile (fetch profile)
import { getProfile } from "../services/api";

export const getProfilePresenter = async (token) => {
  return await getProfile(token);
};
