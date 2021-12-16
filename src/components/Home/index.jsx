import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../shared/services/auth-service';



export const Home = () => {
          // let navigate = useNavigate();
          // let location = useLocation();
          // console.log('hello from signin', location)
          // let from = location.state?.from?.pathname || '/';//??
          // console.log(from)

          const [todos, setTodos] = useState("")

          const handleSubmit  = async (e) => {
                    e.preventDefault();
                    await authService.addTodos(todos)
                    // navigate(from === '/' ? '/home': from, { replace: true })
          }
          return (
          <>
                    <h1>Todos App</h1>
                     <form onSubmit={handleSubmit}>
                      <input type="text" name="item" placeholder="write todos" onChange={(e) => setTodos(e.target.value)}/>
                      <button>add</button>
                     </form>
                    <ul>
                    {/* <div>{todos.title}</div> */}
                    </ul>
          </>
          )
}
