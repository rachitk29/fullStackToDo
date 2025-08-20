import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

function Hero() {
  const { user } = useUser();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

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
    const updated = todos.map((t) =>
      t._id === todo._id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updated);

   
  };

  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
            radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 w-full py-10">
        <div className="flex justify-between items-center text-gray-400 text-sm mb-4 w-full">
          <span>IN </span>
          <span className="flex items-center gap-1">
            Meerut (UP), India
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.firstName || "User"} 👋
        </h1>


        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between p-2 mb-2 border rounded bg-white shadow"
            >
              {editingId === todo._id ? (
                <>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 p-1 border rounded"
                  />
                  <button
                    onClick={() => saveEditedTodo(todo._id)}
                    className="ml-2 px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`flex-1 ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTodo(todo)}
                      className="p-1 text-green-600"
                    >
                      <MdDone size={20} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="p-1 text-red-600"
                    >
                      <AiOutlineClose size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(todo._id);
                        setEditingText(todo.text);
                      }}
                      className="px-2 py-1 bg-yellow-400 text-black rounded"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Hero;
