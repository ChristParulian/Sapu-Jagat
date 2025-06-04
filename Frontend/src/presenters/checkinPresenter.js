// Presenter untuk checkin
import { dailyCheckin, getCheckinHistory, getCheckinHistoryByMonth } from '../models/checkinModel';

export default {
  async checkin(token) {
    if (!token) throw new Error('Token tidak ditemukan');
    return await dailyCheckin(token);
  },
  async getHistory(token) {
    if (!token) throw new Error('Token tidak ditemukan');
    return await getCheckinHistory(token);
  },
  async getHistoryByMonth(token, month) {
    if (!token) throw new Error('Token tidak ditemukan');
    if (!month) throw new Error('Parameter bulan wajib diisi');
    return await getCheckinHistoryByMonth(token, month);
  }
};
