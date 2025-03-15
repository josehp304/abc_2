"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkTheme, setDarkTheme] = useState(false);

  // Theme toggle handler
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    if (typeof window !== 'undefined') {
      const newTheme = !darkTheme;
      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Initialize theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem("theme");
        const isDark = savedTheme === "dark" || 
          (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        setDarkTheme(isDark);
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (e) {
        console.error("Failed to access localStorage:", e);
      }
    }
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem("theme", darkTheme ? "dark" : "light");
      } catch (e) {
        console.error("Failed to access localStorage:", e);
      }
    }
  }, [darkTheme]);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-card hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring z-50"
      aria-label="Toggle theme"
    >
      {darkTheme ? <FaSun className="text-foreground w-6 h-6" /> : <FaMoon className="text-foreground w-6 h-6" />}
    </button>
  );
}
