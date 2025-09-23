"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";


export function ThemeSwitch() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }

  return (
    <button
      onClick={toggleTheme}
      className=" flex h-8 w-16 items-center rounded-full bg-gray-200 p-1 transition-colors duration-300 dark:bg-gray-800 shadow-md shadow-purple-400 *:transition-all *:ease-in-out *:duration-300 dark:shadow-amber-400 absolute bottom-4 md:top-8.5 right-4"
    >
      <span
        className={`md:absolute fixed flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          theme === "light" ? "translate-x-0" : "translate-x-8"
        }`}
      >
        {theme === "light" ? (
          <FaMoon className="text-purple-400" />
        ) : (
          <FaSun className="text-amber-400" />
        )}
      </span>
    </button>
  );
}
