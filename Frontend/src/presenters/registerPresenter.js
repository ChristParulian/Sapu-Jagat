// Presenter untuk register
import { registerUser } from '../models/registerModel';

export default {
  async register(username, email, password) {
    if (!username || !email || !password) {
      throw new Error('Semua field wajib diisi');
    }
    return await registerUser(username, email, password);
  }
};
