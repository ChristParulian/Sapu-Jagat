import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/users`,
      { username, email, password }
    )

    if (response.data.status === 'success') {
      return response.data.data
    } else {
      throw response.data.message || 'Register gagal'
    }
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Register gagal'
  }
}

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password }
    )
    if (response.data.status === 'success') {
      return response.data.data
    } else {
      throw response.data.message || 'Login gagal'
    }
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Login gagal'
  }
}

export const checkIn = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/checkin`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (response.data.status === 'success') {
      return response.data
    } else {
      throw response.data.message || 'Check-in gagal'
    }
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Check-in gagal'
  }
}

export const getCheckinHistoryByMonth = async (token, month) => {
  try {
    const response = await axios.get(
      `${API_URL}/checkin/history/month?month=${month}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (response.data.status === 'success') {
      return response.data.data
    } else {
      throw response.data.message || 'Gagal mengambil riwayat check-in bulanan'
    }
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Gagal mengambil riwayat check-in bulanan'
  }
}

export const editUser = async (payload, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/users`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.status === 'success') {
      return response.data.data;
    } else {
      throw response.data.message || 'Edit profil gagal';
    }
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Edit profil gagal';
  }
};