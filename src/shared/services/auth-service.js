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
  //  console.log(token)
   return true;
  } catch(error) {
            return false
  }
}

//DB通信を行なって、URLとともにtitle(todoの内容部分)をbackendに飛ばす
const addTodo = async (title) => {
  try {
    const token = tokenManager.get();
    console.log(token)
    if (!token) throw new Error('unauthorized');
    
      await axios.post(`${API_URL}/todo/add`, { title });//titleを渡してる

  } catch (error) {
  }
}

const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/todo/delete/${id}`)
  } catch(error) {
  }
}

export const authService = Object.freeze({ signin, signup, checkAuth, addTodo, deleteTodo})
// Object.freeze: 1つのvaluable(authService)にまとめてる
