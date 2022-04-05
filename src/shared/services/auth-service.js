import axios from 'axios';
import { tokenManager } from '../utils/token-manager';

const API_URL = 'http://localhost:4000'

//外部通信する場合はasync
const signin = async (email, password) => {
  try {
  const res = await axios.post(`${API_URL}/login/signin`, { email, password })
  const {accessToken, expiresIn } = res.data;//accesstoken
  tokenManager.set(accessToken)
  } catch(err) {
  }
}

const signup = async (email, password) => {
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
   return true;
  } catch(error) {
            return false
  }
}

//DB通信を行なって、URLとともにtitle(todoの内容部分)をbackendに飛ばす
const addTodo = async (title) => {
  try {
    const token = tokenManager.get();
    if (!token) throw new Error('unauthorized');

    const res = await axios.post(`${API_URL}/todo/add`, title, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("addした際のresの内容です", res.headers)

    const data = await res.data//ここりゅうのと少し違う
    return data
  } catch (error) {
    console.log(error)
  }
}

// add cancel function when confirmed is false
const deleteTodo = async (id) => {
  try {
    const confirmed = window.confirm('Are you sure you want to delete it?');
    // if (confirmed === false) {
    //   return
    // };
    const token = tokenManager.get();

    if (!token) throw new Error('unauthorized');

    await axios.delete(`${API_URL}/todo/delete/${id}`)
  } catch(error) {
  }
}

const updateTodo = async (updatedTodo) => {
  try {
    // could get id and updated content of todo
    
    const token = tokenManager.get();
    if (!token) throw new Error('unauthorized')

    const title = updatedTodo.title

    await axios.put(`${API_URL}/todo/update/${updatedTodo.id}`, { title })//titleを渡してる

  } catch (error) {
    console.log(error)
  }
};

export const authService = Object.freeze({ signin, signup, checkAuth, addTodo, deleteTodo, updateTodo})
// Object.freeze: 1つのvaluable(authService)にまとめてる
