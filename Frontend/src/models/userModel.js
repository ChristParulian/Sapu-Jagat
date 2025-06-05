// Model untuk user (akses API user)
import { login, register } from '../services/api';

export async function loginUser(email, password) {
  return await login(email, password);
}

export async function registerUser(username, email, password) {
  return await register(username, email, password);
}
