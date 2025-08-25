import React from "react";
import TaskContainer from "./TaskContainer";
import Header from "./Header";

function Hero() {
  return (
    <div
      className="min-h-screen w-full bg-[#2f4639] relative text-gray-200"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255, 255, 255, 0.05) 19px, rgba(255, 255, 255, 0.05) 20px, transparent 20px, transparent 39px, rgba(255, 255, 255, 0.05) 39px, rgba(255, 255, 255, 0.05) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255, 255, 255, 0.05) 19px, rgba(255, 255, 255, 0.05) 20px, transparent 20px, transparent 39px, rgba(255, 255, 255, 0.05) 39px, rgba(255, 255, 255, 0.05) 40px),
          radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.08) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, rgba(255, 255, 255, 0.08) 2px, transparent 2px)
        `,
        backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
      }}
    >
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4">
          <Header />
        </header>
        <main className="flex-1">
          <TaskContainer />
        </main>
      </div>
    </div>
  );
}

export default Hero;
