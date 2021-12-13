import axios from 'axios';
import { tokenManager } from '../utils/token-manager';

const API_URL = 'http://localhost:4000'

//外部通信する場合はasync
const signin = async (email, password) => {
  console.log("hello from signin", email, password)
  try {
  const res = await axios.post(`${API_URL}/login/signin`, { email, password })
  const {accessToken, expiresIn } = res.data;//accesstoken
  tokenManager.set(accessToken)
  } catch(err) {
  }
}
const signup = async (email, password) => {
  console.log("hello from signup", email, password)
  try {
  const res = await axios.post(`${API_URL}/login/signup`, { email, password })
  const {accessToken, expiresIn } = res.data;//accesstoken
  tokenManager.set(accessToken)

  } catch(err) {
  }
}

const checkAuth = async () => {
  try {
   const token = tokenManager.get()
   if(!token) return false

   const res = await axios.get(`${API_URL}/accounts/check-auth`, {
             headers: {
                       Authorization: `Bearer ${token}`
             },
   })
   console.log(token)
   return true;
  } catch(error) {
            return false
  }
}

export const authService = Object.freeze({ signin, signup, checkAuth})
// Object.freeze: 1つのvaluable(authService)にまとめてる