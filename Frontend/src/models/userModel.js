import { reactive, readonly } from 'vue'

const state = reactive({
  username: 'User',
})

function setUsername(newName) {
  state.username = newName
  const user = localStorage.getItem('user')
  let userData = {}
  if (user) {
    try {
      userData = JSON.parse(user)
    } catch (e) {}
  }
  userData.name = newName
  userData.username = newName
  localStorage.setItem('user', JSON.stringify(userData))
}

function setUserFromApi(userData) {
  // userData: { id, username, email, token }
  if (!userData) return;
  state.username = userData.username || userData.name || userData.email || 'User';
  // Simpan ke localStorage
  localStorage.setItem('user', JSON.stringify({
    id: userData.id,
    username: userData.username,
    name: userData.username,
    email: userData.email,
  }));
  if (userData.token) localStorage.setItem('token', userData.token);
}

function initUserFromLocalStorage() {
  const user = localStorage.getItem('user')
  if (user) {
    try {
      const userData = JSON.parse(user)
      
      state.username = userData.username || userData.name || userData.email || 'User'
    } catch (e) {
      state.username = 'User'
    }
  } else {
    state.username = 'User'
  }
}

export function useUserStore() {
  return {
    username: readonly(state).username,
    setUsername,
    setUserFromApi,
    initUserFromLocalStorage,
  }
}

export { useUserStore as useUserModel }
