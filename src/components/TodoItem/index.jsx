import React, { useState } from "react";
import { authService } from "../../shared/services/auth-service";
import "./todoItem.css"

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

  return (
    <li
      key={todo.id}
      className="todo-item"
    >
      <div>
        {isEditing ? (
          <input
            type="text"
            value={newTodoTitle}
            className="input"
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
        ) : (
          <div>{todo.title}</div>
        )}
      </div>
      <div
      style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
      <div className="save-edit-btn-container">
        {isEditing ? (
          <button onClick={(e) => handleSave(todo)} className="btn">save</button>
        ) : (
          <button onClick={(e) => setIsEditing(true)} className="btn">edit</button>
        )}
      </div>
      <div className="delete-btn-container">
        {isEditing ? (
          <button onClick={(e) => setIsEditing(false)} className="btn">cancel</button>
        ) : (
          <button
            onClick={() => {
              deleteTodo(todo.id);
            }}
            className="btn"
          >
            delete
          </button>
        )}
      </div>
      </div>
    </li>
  );
};
