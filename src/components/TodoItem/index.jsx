import React, { useState, useEffect } from "react";
import { authService } from "../../shared/services/auth-service";

export const TodoItem = ({ todo, deleteTodo }) => {
  console.log("todo", todo);
  const [todoLists, setTodoLists] = useState([]);

  // about todoItem as below
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  const handleSave = async (todo) => {
    const updatedTodo = { ...todo, title: newTodoTitle }; //??

    await authService.updateTodo(updatedTodo);
  };

  return (
    <li
      key={todo.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
        border: "1px gray solid",
        padding: "0.5rem",
        borderRadius: "2px",
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

      <div>
        {isEditing ? (
          <button onClick={(e) => handleSave()}>save</button>
        ) : (
          <button onClick={(e) => setIsEditing(true)}>edit</button>
        )}
      </div>

      <div>
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
    </li>
  );
};
