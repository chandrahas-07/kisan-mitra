import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {

  const [username, setUsername] = useState("");

  const [role, setRole] = useState("Farmer");

  const { login } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {

    e.preventDefault();

    login(username, role);

    navigate("/dashboard");
  }

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      dark:bg-black
      transition-colors
    ">

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-gray-900
          border
          border-gray-200
          dark:border-gray-800
          rounded-2xl
          p-8
        "
      >

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Login
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Access operational monitoring dashboard.
        </p>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
            mt-8
            w-full
            bg-gray-100
            dark:bg-gray-800
            border
            border-gray-300
            dark:border-gray-700
            rounded-xl
            px-4
            py-3
            text-gray-900
            dark:text-white
            outline-none
          "
          required
        />

        <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="
    mt-4
    w-full
    bg-gray-100
    dark:bg-gray-800
    border
    border-gray-300
    dark:border-gray-700
    rounded-xl
    px-4
    py-3
    text-gray-900
    dark:text-white
    outline-none
  "
>

  <option>Farmer</option>
  <option>Manager</option>
  <option>Admin</option>

</select>

        <button
          type="submit"
          className="
            mt-6
            w-full
            bg-green-500
            hover:bg-green-600
            transition
            rounded-xl
            py-3
            text-white
            font-semibold
          "
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;