import React, { useState } from "react";
import "./index.css";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

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

    if (!todo.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
    setEditingText("");
  };

  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-4 
                    mt-24 sm:mt-24 md:mt-10 md:self-start transition-all duration-300">
        <SignedOut>
          <SignIn />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {user?.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              )}
              <div className="text-sm">
                <p className="text-gray-700 font-medium">
                  {user?.fullName || user?.username}
                </p>
                <p className="text-gray-500 text-xs">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            {/* Sign out button already exists */}
            <UserButton afterSignOutUrl="/" />
          </div>

        </SignedOut>

        <SignedIn>
          {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">📝 Task Manager</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex space-x-2">
            <input
              className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
              placeholder="Add a task"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={addTodo}
            >
              Add
            </button>
          </div>

          <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            <AnimatePresence>
              {todos
                .sort((a, b) => b.completed - a.completed)
                .map((todo) => (
                  <motion.li
                    key={todo._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                    transition={{ type: "spring", duration: 0.25 }}
                    className={`flex justify-between items-center p-3 rounded-xl shadow-md ${todo.completed ? "bg-green-100" : "bg-gray-50"
                      }`}
                  >
                    {editingId === todo._id ? (
                      <input
                        className="border p-2 rounded w-full focus:outline-none"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => saveEditedTodo(todo._id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEditedTodo(todo._id);
                        }}
                        autoFocus
                      />
                    ) : (
                      <>
                        <span
                          className={`flex-1 pr-4 ${todo.completed
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                            }`}
                          onDoubleClick={() => {
                            setEditingId(todo._id);
                            setEditingText(todo.text);
                          }}
                        >
                          {todo.text}
                        </span>

                        <div className="flex items-center gap-3">
                          <button onClick={() => toggleTodo(todo)} title="Mark done">
                            <MdDone
                              className={`w-6 h-6 ${todo.completed ? "text-green-600" : "text-gray-400 hover:text-green-600"
                                }`}
                            />
                          </button>
                          <button onClick={() => deleteTodo(todo._id)} title="Delete">
                            <AiOutlineClose className="w-5 h-5 text-red-500 hover:text-red-700" />
                          </button>
                        </div>
                      </>
                    )}
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
        </SignedIn>
      </div>
    </div>
  );

}

export default App;
