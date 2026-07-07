import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {

  const { darkMode, toggleTheme } = useTheme();

  return (

    <button
      onClick={toggleTheme}
      className="bg-gray-900 dark:bg-gray-800 border border-gray-700 p-3 rounded-xl hover:border-green-500 transition"
    >

      <span className="text-xl">

        {darkMode ? "☀️" : "🌙"}

      </span>

    </button>

  );
}

export default ThemeToggle;