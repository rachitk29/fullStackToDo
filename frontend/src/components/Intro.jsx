import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function Intro({ onFinish }) {
  const fullText = "Organize. Focus. Achieve";
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        const char = fullText[i];
        if (char !== undefined) {
          setDisplayedText((prev) => prev + char);
        }
        i++;
      } else {
        clearInterval(typingInterval);
        setDone(true); // typing finished
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (done && onFinish) {
      const timeout = setTimeout(() => onFinish(), 500);
      return () => clearTimeout(timeout);
    }
  }, [done, onFinish]);

  return (
    <motion.div
      className="flex flex-col font-semibold items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <img src={logo} alt="Karmly Logo" className="w-24 max-w-[150px] h-auto mb-2" />
        <p className="mt-1 text-sm text-gray-400 min-h-[20px]">
          {displayedText}
          {!done && <span className="animate-pulse">|</span>}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Intro;