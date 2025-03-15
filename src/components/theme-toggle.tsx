"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    // Initialize from localStorage if available, otherwise use system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        return savedTheme === "dark";
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Theme toggle handler
  const toggleTheme = () => {
    setDarkTheme(prev => {
      const newTheme = !prev;
      if (typeof window !== 'undefined') {
        // Save to localStorage
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        // Update document class
        document.documentElement.classList.toggle("dark", newTheme);
      }
      return newTheme;
    });
  };

  // Initialize theme on mount and handle system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Apply initial theme
    document.documentElement.classList.toggle("dark", darkTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        // Only update if user hasn't set a preference
        setDarkTheme(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-card hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring z-50"
      aria-label={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkTheme ? <FaSun className="text-foreground w-6 h-6" /> : <FaMoon className="text-foreground w-6 h-6" />}
    </button>
  );
}
