import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useUser } from "@clerk/clerk-react";

function Hero() {
  const { user } = useUser();
  const [habits, setHabits] = useState([]);
  const [newHabitText, setNewHabitText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addHabit = () => {
    if (!newHabitText.trim()) return;
    const newHabit = {
      _id: Date.now(),
      text: newHabitText,
      completed: false,
    };
    setHabits([...habits, newHabit]);
    setNewHabitText("");
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit._id !== id));
  };

  const toggleHabit = (habit) => {
    const updated = habits.map((h) =>
      h._id === habit._id ? { ...h, completed: !h.completed } : h
    );
    setHabits(updated);
  };

  const saveEditedHabit = (id) => {
    const updatedHabits = habits.map((habit) =>
      habit._id === id ? { ...habit, text: editingText } : habit
    );
    setHabits(updatedHabits);
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="min-h w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      <div className="relative z-10 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
        {/* Habits section */}
        <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
          {/* Input */}
          <div className="relative flex items-center mb-6">
            <input
              value={newHabitText}
              onChange={(e) => setNewHabitText(e.target.value)}
              placeholder="Add a new habit..."
              className="w-full p-3 sm:p-4 bg-gray-700 text-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addHabit();
                }
              }}
            />
            <button
              onClick={addHabit}
              className="ml-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>

          {/* Habit list */}
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit._id}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-700 shadow-md"
              >
                {editingId === habit._id ? (
                  <div className="flex w-full gap-2">
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 p-2 bg-gray-600 rounded-lg text-white"
                    />
                    <button
                      onClick={() => saveEditedHabit(habit._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Left side text with ✔ if completed */}
                    <div className="flex items-center gap-2 flex-1">
                      {habit.completed && (
                        <MdDone
                          size={16}
                          className="text-gray-400 opacity-70"
                        />
                      )}
                      <span
                        className={`text-white break-words ${
                          habit.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {habit.text}
                      </span>
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => toggleHabit(habit)}
                        className={`p-1 sm:p-2 rounded-full transition ${
                          habit.completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-600 text-gray-300 hover:bg-green-500 hover:text-white"
                        }`}
                      >
                        <MdDone size={18} className="sm:size-20" />
                      </button>
                      <button
                        onClick={() => deleteHabit(habit._id)}
                        className="p-1 sm:p-2 rounded-full bg-gray-600 text-gray-300 hover:text-red-500 transition"
                      >
                        <AiOutlineClose size={18} className="sm:size-20" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(habit._id);
                          setEditingText(habit.text);
                        }}
                        className="p-1 sm:px-3 sm:py-1 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
                      >
                        <FiEdit2 size={16} className="sm:size-18" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
