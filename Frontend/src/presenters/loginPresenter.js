// Presenter untuk login
import { loginUser } from '../models/userModel';

export default {
  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email dan password wajib diisi');
    }
    return await loginUser(email, password);
  }
};
