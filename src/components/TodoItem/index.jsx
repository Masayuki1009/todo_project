import React, { useState } from "react";
import { authService } from "../../shared/services/auth-service";
import styles from "./todoItem.module.css";

export const TodoItem = ({ todo, deleteTodo, setTodoLists }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  const handleSave = async (todo) => {
    try {
      let date = new Date();
      const updateDate = date.toLocaleString();
      const updatedTodo = {
        ...todo,
        title: newTodoTitle,
        updatedAt: updateDate,
      };
      await authService.updateTodo(updatedTodo);
      console.log("uodatedTodo", updatedTodo);

      setTodoLists((prev) => [
        ...prev.map((todo) => {
          if (todo.id === updatedTodo.id) return { ...updatedTodo };
          console.log("success!", todo);
          return todo;
        }),
      ]);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  let date = new Date(todo.createdAt);
  let translatedDate = "created at:" + date.toLocaleString();

  let updated = new Date(todo.updatedAt);
  let updatedDate = "updated at:" + updated.toLocaleString();
  const isInvalidDate = (date) => Number.isNaN(date.getTime());
  const result = isInvalidDate(updated);

  if (result === true) {
    updatedDate = "";
  } else {
    translatedDate = "";
  }


  return (
    <li key={todo.id} className={styles.todoItem}>
      <div className={styles.item}>
        {isEditing ? (
          <input
            type="text"
            value={newTodoTitle}
            className={styles.input}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            autoFocus={true}
          />
        ) : (
          <div>{todo.title.substr(0, 24)}</div>
        )}
        <small className={styles.time}>{updatedDate}</small>
        <small className={styles.time}>{translatedDate}</small>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.saveEditBtnContainer}>
          {isEditing ? (
            <button onClick={(e) => handleSave(todo)} className={styles.saveBtn}>
              save
            </button>
          ) : (
            <button
              onClick={(e) => {
                setIsEditing(true);
              }}
              className={styles.editBtn}
            >
              edit
            </button>
          )}
        </div>
        <div className={styles.deleteBtnContainer}>
          {isEditing ? (
            <button onClick={(e) => setIsEditing(false)} className={styles.cancelBtn}>
              cancel
            </button>
          ) : (
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
              className={styles.deleteBtn}
            >
              delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
