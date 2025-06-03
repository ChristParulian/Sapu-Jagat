import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const register = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/users`,
      { username, password }
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

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { username, password }
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