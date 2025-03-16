"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkTheme, setDarkTheme] = useState<boolean | null>(null);

  // Theme toggle handler
  const toggleTheme = () => {
    setDarkTheme(prev => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newTheme);
      return newTheme;
    });
  };

  // Initialize theme on mount and handle system theme changes
  useEffect(() => {
    // Get user's preference from localStorage or system
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // If user has a saved preference, use that
    // Otherwise, use system preference
    const isDark = savedTheme ? savedTheme === "dark" : systemDark;
    setDarkTheme(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem("theme")) {
        setDarkTheme(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Don't render until we know the theme
  if (darkTheme === null) return null;

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
