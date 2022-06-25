
import { TodoItem } from "../TodoItem/index";
import React, { useState, useEffect } from "react";
import { authService } from "../../shared/services/auth-service";
import { tokenManager } from '../../shared/utils/token-manager';
import { useNavigate } from 'react-router-dom';
import styles from "./home.module.css";

export const Home = () => {
  const navigate = useNavigate();
  const [todoLists, setTodoLists] = useState([]);
  const [todoInput, setTodoInput] = useState(""); // get todo's input, and set it

  const clearInputs = () => {
    setTodoInput("")
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
    <div className={styles.container}>
      <div className={styles.header}>
      <h1>Todos App</h1>
          <button
            onClick={(e) => {
              tokenManager.remove()
              navigate('/signin');
            }}
            className={styles.signoutBtn}
          >
            Sign out
          </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item"
          placeholder="write todos"
          value={todoInput}
          className={styles.addTodoContentInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button className={styles.addBtn}>add</button>
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
      </div>
    </>
  );
};
