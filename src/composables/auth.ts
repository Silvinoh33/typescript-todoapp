import { auth } from '@/configs/firebase'
import { signInWithEmailAndPassword, type User } from 'firebase/auth'
import { computed, ref } from 'vue'
import { useAuth as useVueUseAuth } from '@vueuse/firebase'

const getUser = computed<User | null>({
  get: () => useVueUseAuth(auth).user,
  set: (newUser: User | null) => {
    user.value = newUser
  }
})
const user = ref<User | null>(getUser.value)

const useAuth = () => {
  //login
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      //   user.value = userCredential.user
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(`Erreur ${errorCode}: ${errorMessage}`)
    }
  }
  //register
  const register = async () => {}
  //logout
  const logout = async () => {}

  return {
    user,
    login,
    register,
    logout
  }
}

export { useAuth }
