import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function Hero() {
  const [habits, setHabits] = useState([]);
  const [newHabitText, setNewHabitText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const addHabit = () => {
    if (!newHabitText.trim()) return;

    const newHabit = {
      id: Date.now(),
      text: newHabitText,
      completed: { [today]: false },
      priority: "medium",
      dueTime: "",
    };
    setHabits([...habits, newHabit]);
    setNewHabitText("");
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const toggleHabit = (habit) => {
    const updated = habits.map((h) =>
      h.id === habit.id
        ? { ...h, completed: { ...h.completed, [today]: !h.completed[today] } }
        : h
    );
    setHabits(updated);
  };

  const saveEditedHabit = (id) => {
    const updatedHabits = habits.map((h) =>
      h.id === id ? { ...h, text: editingText } : h
    );
    setHabits(updatedHabits);
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Geometry Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#1c2a1f",
          backgroundImage: `
            radial-gradient(circle, rgba(28,42,31,0.4) 1px, transparent 1px),
            radial-gradient(circle, rgba(28,42,31,0.3) 1px, transparent 1px),
            radial-gradient(circle, rgba(28,42,31,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 40px 40px, 60px 60px",
          backgroundPosition: "0 0, 10px 10px, 30px 30px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-6">
        <div className="bg-[#24322b] rounded-2xl p-6 sm:p-8 shadow-lg">
          {/* Input */}
          <div className="flex items-center gap-2 mb-6">
            <input
              value={newHabitText}
              onChange={(e) => setNewHabitText(e.target.value)}
              placeholder="Add a new habit..."
              className="flex-1 p-3 sm:p-4 bg-[#2f4639] text-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={(e) => e.key === "Enter" && addHabit()}
            />
            <motion.button
              onClick={addHabit}
              whileTap={{ scale: 0.95 }}
              className="px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Add
            </motion.button>
          </div>

          {/* Habit List */}
          <AnimatePresence>
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between p-4 rounded-xl bg-[#2f4639] shadow-md"
              >
                {editingId === habit.id ? (
                  <div className="flex w-full gap-2">
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 p-2 bg-[#24322b] rounded-lg text-white"
                    />
                    <motion.button
                      onClick={() => saveEditedHabit(habit.id)}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-green-400 text-white rounded-lg"
                    >
                      Save
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-1">
                      {habit.completed[today] && (
                        <MdDone size={16} className="text-green-400" />
                      )}
                      <motion.span
                        layout
                        animate={{
                          opacity: habit.completed[today] ? 0.5 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`text-white break-words ${
                          habit.completed[today] ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {habit.text}
                      </motion.span>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleHabit(habit)}
                        className={`p-1 sm:p-2 rounded-full transition ${
                          habit.completed[today]
                            ? "bg-green-500 text-white"
                            : "bg-gray-600 text-gray-300 hover:bg-green-500 hover:text-white"
                        }`}
                      >
                        <MdDone size={18} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteHabit(habit.id)}
                        className="p-1 sm:p-2 rounded-full bg-gray-600 text-gray-300 hover:text-red-500 transition"
                      >
                        <AiOutlineClose size={18} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setEditingId(habit.id);
                          setEditingText(habit.text);
                        }}
                        className="p-1 sm:px-3 sm:py-1 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
                      >
                        <FiEdit2 size={16} />
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

export default Hero;
