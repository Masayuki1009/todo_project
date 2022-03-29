import React, { useState, useEffect } from "react";
import { authService } from "../../shared/services/auth-service";

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
      style={{
        display: "flex",
        justifyContent:  "space-between",
        marginTop: "1rem",
        border: "1px gray solid",
        padding: "0.5rem",
        borderRadius: "10px",
        background: "white",
        maxWidth: "1000px",
      }}
    >
      <div>
        {isEditing ? (
          <input
            type="text"
            value={newTodoTitle}
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
      <div style={{ paddingRight: '0.5rem' }}>
        {isEditing ? (
          <button onClick={(e) => handleSave(todo)}>save</button>
        ) : (
          <button onClick={(e) => setIsEditing(true)}>edit</button>
        )}
      </div>
      <div style={{ paddingLeft: '0.5rem' }}>
        {isEditing ? (
          <button onClick={(e) => setIsEditing(false)}>cancel</button>
        ) : (
          <button
            onClick={() => {
              deleteTodo(todo.id);
            }}
          >
            delete
          </button>
        )}
      </div>
      </div>
    </li>
  );
};
