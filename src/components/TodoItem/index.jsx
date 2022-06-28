import React, { useState } from "react";
import { authService } from "../../shared/services/auth-service";
import styles from "./todoItem.module.css"


// export const TodoItem = ({ todo, deleteTodo, setTodoLists, newDate }) => {
export const TodoItem = ({ todo, deleteTodo, setTodoLists }) => {
  // about todoItem as below
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  const handleSave = async (todo) => {
    try {
      const updatedTodo = { ...todo, title: newTodoTitle }; //??
      await authService.updateTodo(updatedTodo);

      //firstly return updatedTodo after todo is updated, then map all todos???
      setTodoLists((prev) =>
      [...prev.map((todo) => {
          if (todo.id === updatedTodo.id) return { ...updatedTodo };
          console.log("after", {...updatedTodo })
          return todo;
        }),
      ]);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  let date = new Date(todo.createdAt)
  console.log("date", date)
  const translatedDate = date.toLocaleString()

  return (
    <li
      key={todo.id}
      className={styles.todoItem}
    >
      <div>
        {isEditing ? (
          <input
            type="text"
            value={newTodoTitle}
            className={styles.input}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
        ) : (
          <div>{todo.title}</div>
        )}
        <small className={styles.time}>{translatedDate}</small>
      </div>
      <div
      style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
      <div className={styles.saveEditBtnContainer}>
        {isEditing ? (
          <button onClick={(e) => handleSave(todo)} className={styles.btn}>save</button>
        ) : (
          <button onClick={(e) => setIsEditing(true)} className={styles.btn}>edit</button>
        )}
      </div>
      <div className={styles.deleteBtnContainer}>
        {isEditing ? (
          <button onClick={(e) => setIsEditing(false)} className={styles.btn}>cancel</button>
        ) : (
          <button
            onClick={() => {
              deleteTodo(todo.id);
            }}
            className={styles.btn}
          >
            delete
          </button>
        )}
      </div>
      </div>
    </li>
  );
};
