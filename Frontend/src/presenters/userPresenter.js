import { editUser as editUserApi } from '../services/api'

export const editUserPresenter = async (payload, token) => {
  // Call API
  const data = await editUserApi(payload, token)
  // Return the full response data (should include id, username, email, token)
  return data
}
