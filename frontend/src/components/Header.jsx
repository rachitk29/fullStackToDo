import React from "react";
import { Target, Github } from "lucide-react"; 

function Header() {
  return (
    <div className="mt-4 relative z-10 max-w-2xl mx-auto px-4 sm:px-8 w-full">
      <div className="flex justify-between items-center text-sm">
        <a
          href="/"
          className="flex flex-col items-center text-gray-700 dark:text-gray-300"
        >
          <Target size={20} />
          <span className="mt-1 text-xs">karmly</span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/rachitk29"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900"
        >
          <Github size={20} />
          <span className="mt-1 text-xs">GitHub</span>
        </a>
      </div>
    </div>
  );
}

export default Header;
