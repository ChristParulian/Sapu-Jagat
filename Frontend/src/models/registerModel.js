import { register } from "../services/api";

export async function registerUser(username, email, password) {
  return await register(username, email, password);
}
