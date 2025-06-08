import { login } from '../services/api';

export async function loginUser(email, password) {
  return await login(email, password);
}
