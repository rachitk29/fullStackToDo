import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TaskContainer() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add new task
  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  // Save edit
  const saveEdit = (id) => {
    if (editText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editText } : task
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="w-full">
      <div className="relative z-10 max-w-3xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 flex flex-col gap-6">
        <div className="p-4 sm:p-8">
          {/* Input */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a task..."
              className="flex-1 px-4 py-2 rounded-lg bg-[#1f2a25] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-white font-medium transition"
            >
              Add
            </button>
          </div>

          {/* Tasks List */}
          <ul className="space-y-2">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.li
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1f2a25] text-gray-200 shadow-sm hover:bg-[#25332d] transition"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4 accent-green-500"
                    />

                    {/* Inline editing */}
                    {editingId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEdit(task.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(task.id);
                        }}
                        autoFocus
                        className="bg-transparent border-b border-gray-500 focus:outline-none flex-1"
                      />
                    ) : (
                      <span
                        className={`${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-gray-200"
                        }`}
                      >
                        {task.text}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 text-sm">
                    {editingId === task.id ? null : (
                      <button
                        onClick={() => startEditing(task)}
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Delete
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskContainer;
