import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import ClerkWrapper from "./components/ClerkWrapper";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1300); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
  <AnimatePresence mode="wait">
    {showIntro ? (
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Intro />
      </motion.div>
    ) : (
      <motion.div
        key="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ClerkWrapper />
      </motion.div>
    )}
  </AnimatePresence>
</div>

  );
}

export default App;