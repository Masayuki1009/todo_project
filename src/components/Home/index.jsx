import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../shared/services/auth-service';



export const Home = () => {
          // let navigate = useNavigate();
          // let location = useLocation();
          // console.log('hello from signin', location)
          // let from = location.state?.from?.pathname || '/';//??
          // console.log(from)

          const [todos, addTodos] = useState("")
          const [todoLists, setTodoLists] = useState([])

          const handleSubmit  = async (e) => {
                    
                    await authService.addTodos(todos)
          }

          useEffect(
                    async () => {
                    await axios.get(`http://localhost:4000/todo/get`)
                    .then((todos) => {
                    setTodoLists(todos.data)
                    console.log(todos.data)
                    })
                }, [])

          return (
          <>
                    <h1>Todos App</h1>
                     <form onSubmit={handleSubmit}>
                      <input type="text" name="item" placeholder="write todos"
                      onChange={(e) => {
                      e.preventDefault();
                      if (e.target.value === ''){
                              return
                      }
                      console.log(e.target.value)
                      addTodos(e.target.value)
                      }}/>
                      <button>add</button>
                     </form>
                    <ul>
                    {todoLists.map((val, key) => <div key={key}>{val.title}</div>)}
                    </ul>
          </>
          )
}
