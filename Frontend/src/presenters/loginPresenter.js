// Presenter untuk login
import { loginUser } from '../models/loginModel';

export default {
  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email dan password wajib diisi');
    }
    return await loginUser(email, password);
  }
};
