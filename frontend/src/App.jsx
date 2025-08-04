import React, { useState } from "react";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Dummy functions so app doesn't crash – real logic to be added
  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = {
      _id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleTodo = (todo) => {
    setTodos(
      todos.map((t) =>
        t._id === todo._id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">📝 MERN TODO App</h1>

      <div className="flex space-x-2 mb-6">
        <input
          className="px-4 py-2 rounded border border-gray-400 focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {Array.isArray(todos) &&
          todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-white shadow p-3 rounded"
            >
              <span
                onClick={() => toggleTodo(todo)}
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : "text-black"
                }`}
              >
                {todo.text}
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(todo._id)}
              >
                ❌
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
