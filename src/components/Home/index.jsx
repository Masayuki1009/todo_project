import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../shared/services/auth-service';



export const Home = () => {

          const [todos, addTodo] = useState("")
          const [todoLists, setTodoLists] = useState([])

          const handleSubmit  = async (e) => {
                    e.preventDefault();
                    if(todos === "") {
                    return
                    }
                    // const newTodo = { title: todoInput }
                    // const createdTodo = 
                    await authService.addTodo(todos)
                    // setTodoLists((prev) => [...prev, createdTodo])

                    // add todo on browser

                    // todoLists.map((todos) => {
                    //      todos.title
                    // })
          }

          const deleteTodo = async (id) => {
                    await authService.deleteTodo(id)
          }

          useEffect(() => {
                    const getTodos = async () => {
                    console.log("useEffect start")
                    await axios.get("http://localhost:4000/todo/get")
                    .then((todos) => {
                    setTodoLists(todos.data)
                    })
                    }
                    console.log(getTodos())
                    getTodos()
                }, [])

          return (
          <>
                    <h1>Todos App</h1>
                     <form onSubmit={handleSubmit}>
                      <input type="text" name="item" placeholder="write todos" 
                    //   value={todoInput}
                      onChange={(e) => {
                      addTodo(e.target.value)
                      }}/>
                      <button>add</button>
                     </form>
                    
                    <ul>
                    {todoLists.map((todo, key) => {
                    return(
                    <li key={key}>
                    {todo.title}
                    <button>edit</button>
                    <button onClick={() => {
                    
                    deleteTodo(todo.id)
                    }}>
                    delete
                    </button>
                    </li>
                    )}
                    )}
                    </ul>
          </>
     )
}
