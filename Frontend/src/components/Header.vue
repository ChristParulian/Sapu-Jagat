<template>  <header class="shadow-md fixed top-0 left-0 right-0 z-50" style="background-color: #626F47;">
    <div class="container mx-auto px-4 py-0 flex items-center justify-between min-h-[5rem]"><!-- Logo Section --><div class="flex items-center">
        <img 
          src="/logo/logo.png" 
          alt="Sapu Jagat Logo" 
          class="h-32 w-32 object-contain"
        >
      </div>

      <!-- User Info & Logout Section -->
      <div class="flex items-center space-x-4">        <!-- User Greeting -->
        <div class="hidden sm:block">
          <span class="font-opensans text-sm" style="color: #FFCF50;">
            Hi, {{ userName || 'User' }}!
          </span>
        </div>        <!-- Logout Button -->        <button
          @click="handleLogout"
          :disabled="isLoggingOut"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-opensans"
          style="background-color: #FFCF50; color: #626F47;"
        >
          <svg 
            v-if="!isLoggingOut"
            class="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          
          <!-- Loading Spinner -->
          <div 
            v-if="isLoggingOut"
            class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
          ></div>
          
          <span class="hidden sm:inline">
            {{ isLoggingOut ? 'Keluar...' : 'Keluar' }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    const userName = ref('')
    const isLoggingOut = ref(false)

    // Get user name from localStorage or fetch from API
    onMounted(async () => {
      // First try to get from localStorage
      const user = localStorage.getItem('user')
      if (user) {
        try {
          const userData = JSON.parse(user)
          userName.value = userData.name || userData.username || userData.email
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }

      // If no user data in localStorage, try to get from token
      const token = localStorage.getItem('token')
      if (token && !userName.value) {
        try {
          // Decode JWT token to get user info
          const payload = JSON.parse(atob(token.split('.')[1]))
          userName.value = payload.username || payload.email || 'User'
        } catch (error) {
          console.error('Error decoding token:', error)
          userName.value = 'User'
        }
      }
    })

    const handleLogout = async () => {
      try {
        isLoggingOut.value = true
        
        // Clear localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('isLoggedIn')
        
        // Small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Redirect to login page
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        isLoggingOut.value = false
      }
    }

    return {
      userName,
      isLoggingOut,
      handleLogout
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
.container {
  max-width: 1200px;
}

/* Enhanced logo styling */
img[alt="Sapu Jagat Logo"] {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  transition: all 0.3s ease;
  margin: -1rem 0; /* Negative margin to reduce header height impact */
}

img[alt="Sapu Jagat Logo"]:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2));
}

/* Font utilities */
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}

.font-opensans {
  font-family: 'Open Sans', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  /* Responsive logo size on mobile */
  img[alt="Sapu Jagat Logo"] {
    height: 6rem;
    width: 6rem;
  }
}
</style>
