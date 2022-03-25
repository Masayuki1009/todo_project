import axios from "axios";
import { TodoItem } from "../TodoItem/index";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../shared/services/auth-service";

export const Home = () => {
  const [todos, addTodo] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const [todoInput, setTodoInput] = useState(""); // get todo's input, and set it

  const clearInputs = () => {
    setTodoInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (todoInput === "") {
        return;
      }
      const newTodo = { title: todoInput };
      clearInputs();
      const createdTodo = await authService.addTodo(newTodo);
      console.log("newTodo", createdTodo);
      setTodoLists((prev) => [...prev, createdTodo]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        // console.log("useEffect start")
        await axios.get("http://localhost:4000/todo/get").then((todos) => {
          setTodoLists(todos.data);
          console.log("useeffect", todos.data);
        });
      } catch (error) {
        // console.log(error)
      }
    };
    // console.log(getTodos())
    getTodos();
  }, []);

  //test as below
  const deleteTodo = async (id) => {
     await authService.deleteTodo(id);
     setTodoLists((prev) => [...prev.filter((todo) => todo.id !== id)]);// pick up todos whose id does not match deleted id
   };

  return (
    <>
      <h1>Todos App</h1>
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
          return <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo}/>;
        })}
      </ul>
    </>
  );
};
