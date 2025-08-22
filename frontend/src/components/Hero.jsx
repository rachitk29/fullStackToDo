import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
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

  // Helpers
  const getDayOfWeek = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const getFormattedDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const today = new Date();
  const todayFormatted = getFormattedDate(today);
  const todayDayOfWeek = getDayOfWeek(today);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    return date;
  });

  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Background pattern */}
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

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 w-full py-10">
        
        {/* Calendar header */}
        <div className="flex justify-between items-center text-xl font-bold mb-6">
          <div className="flex items-center gap-2">
            <span>{todayDayOfWeek}</span>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              <MdDone size={16} />
            </span>
          </div>
          <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
            {todayFormatted}
          </span>
        </div>

        {/* Weekly calendar */}
        <div className="flex justify-center items-center gap-2 mb-6 text-gray-500 dark:text-gray-400">
          <span className="cursor-pointer">&lt;</span>
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth()
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  : ""
              }`}
            >
              <span className="text-xs font-semibold">
                {getDayOfWeek(date)}
              </span>
              <span className="text-sm">{date.getDate()}</span>
              <span className="text-xs text-gray-400">
                {date.toLocaleString("default", { month: "short" })}
              </span>
            </div>
          ))}
          <span className="cursor-pointer">&gt;</span>
        </div>

        {/* Habits section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4 text-gray-300">
            <span className="text-lg">Do Kaam, be Calm</span>
          </div>

          {/* Input */}
          <div className="relative flex items-center mb-4">
            <input
              value={newHabitText}
              onChange={(e) => setNewHabitText(e.target.value)}
              placeholder="Add a new habit..."
              className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addHabit();
                }
              }}
            />
          </div>

          {/* Habit list */}
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit._id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-700 shadow-md"
              >
                {editingId === habit._id ? (
                  <>
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 p-1 bg-gray-600 rounded-lg text-white"
                    />
                    <button
                      onClick={() => saveEditedHabit(habit._id)}
                      className="ml-2 px-3 py-1 bg-green-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      className={`flex-1 text-white ${
                        habit.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {habit.text}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleHabit(habit)}
                        className={`p-1 rounded-full ${
                          habit.completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        <MdDone size={20} />
                      </button>
                      <button
                        onClick={() => deleteHabit(habit._id)}
                        className="p-1 rounded-full bg-gray-600 text-gray-300 hover:text-red-500"
                      >
                        <AiOutlineClose size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(habit._id);
                          setEditingText(habit.text);
                        }}
                        className="px-2 py-1 bg-yellow-400 text-black rounded-lg"
                      >
                        Edit
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
