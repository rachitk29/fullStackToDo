import React from "react";
import { MdOutlineTrackChanges } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 w-full">
      <div className="flex justify-between items-center text-sm text-gray-200">
        {/* Left logo + title */}
        <a href="/" className="flex items-center space-x-2">
          <MdOutlineTrackChanges size={18} />
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
          className="flex flex-col items-center"
        >
          <FaGithub size={20} />
          <span className="mt-1 text-xs">GitHub</span>
        </a>
      </div>
    </div>
  );
}

export default Header;
