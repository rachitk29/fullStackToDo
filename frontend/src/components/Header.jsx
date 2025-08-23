import React from "react";
import { Target, Github } from "lucide-react"; 
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="mt-4 relative z-10 max-w-2xl mx-auto px-4 sm:px-8 w-full">
      <div className="flex justify-between items-center text-sm">
        {/* Logo + Target */}
        <a
          href="/"
          className="flex items-center space-x-2 text-gray-300 "
        >
          <Target size={14} />
          <img
            src={logo}
            alt="Karmly Logo"
            className="w-16 max-w-[120px] h-auto"
          />
        </a>

        {/* GitHub link */}
        <a
          href="https://github.com/rachitk29"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-gray-300"
        >
          <Github size={20} />
          <span className="mt-1 text-xs">GitHub</span>
        </a>
      </div>
    </div>
  );
}

export default Header;
