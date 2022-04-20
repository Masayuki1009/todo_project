//this is dev branch
import { TodoItem } from "../TodoItem/index";
import React, { useState, useEffect } from "react";
import { authService } from "../../shared/services/auth-service";
import { tokenManager } from '../../shared/utils/token-manager';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [todoLists, setTodoLists] = useState([]);
  const [todoInput, setTodoInput] = useState(""); // get todo's input, and set it

  const clearInputs = () => {
    setTodoInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (todoInput === "") {
        return
      }
      const newTodo = { title: todoInput };
      clearInputs();
      const createdTodo = await authService.addTodo(newTodo);
      setTodoLists((prev) => [...prev, createdTodo]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authService
      .getTodos()
      .then((todos) => {
        setTodoLists(todos.data);
        console.log("useeffect todos.json", todos.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //test as below
  const deleteTodo = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete it?");
    if (!confirmed) return alert("delete is canceled");
    await authService.deleteTodo(id);
    setTodoLists((prev) => [...prev.filter((todo) => todo.id !== id)]); // pick up todos whose id does not match deleted id
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1>Todos App</h1>
      <div>
          <button
            style={{
              border: 'none',
              padding: '0.5rem',
              borderRadius: '2px',
              background: '#f44336',
              color: 'white',
              fontSize: '12px',
            }}
            onClick={(e) => {
              tokenManager.remove()
              navigate('/signin');
            }}
          >
            Sign out
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item"
          placeholder="write todos"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button>add</button>
      </form>

      <ul>
        {todoLists.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              setTodoLists={setTodoLists}
            />
          );
        })}
      </ul>
    </>
  );
};
