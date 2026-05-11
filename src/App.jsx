import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for window load + a beat so fonts/images warm up
    const ready = () => {
      setTimeout(() => setIsLoading(false), 600);
    };
    if (document.readyState === "complete") {
      ready();
    } else {
      window.addEventListener("load", ready, { once: true });
    }
    // Hard fallback in case `load` never fires
    const fallback = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={`App font-sans bg-ink-950 text-white grain transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <Hero />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
