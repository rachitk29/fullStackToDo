import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero"

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-TaskContainerBg">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1}}
            transition={{ duration: 1 }}
          >
            <Intro />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 6}}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

}

export default App;
