import React, { useState } from "react";

function TaskContainer() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  return (
    <div className="w-full">
      <div className="relative z-10 max-w-3xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 flex flex-col gap-6">
        <div className="bg-[#24322b] rounded-2xl p-4 sm:p-8 shadow-lg">
          {/* Input + Add Button */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a task..."
              className="flex-1 px-4 py-2 rounded-lg bg-[#1f2a25] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-medium"
            >
              Add
            </button>
          </div>

          {/* Tasks List */}
          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="px-4 py-2 rounded-lg bg-[#1f2a25] text-gray-200 shadow"
              >
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskContainer;
