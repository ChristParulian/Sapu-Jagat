// Model untuk checkin (akses API checkin)
import {
  checkIn,
  getCheckinHistoryByMonth as getCheckinHistoryByMonthApi,
} from "../services/api";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export async function dailyCheckin(token) {
  return await checkIn(token);
}

export async function getCheckinHistory(token) {
  // Implementasi langsung di sini karena tidak ada named export getCheckinHistory di api.js
  try {
    const response = await axios.get(`${API_URL}/checkin/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw response.data.message || "Gagal mengambil riwayat check-in";
    }
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Gagal mengambil riwayat check-in"
    );
  }
}

export async function getCheckinHistoryByMonth(token, month) {
  return await getCheckinHistoryByMonthApi(token, month);
}
