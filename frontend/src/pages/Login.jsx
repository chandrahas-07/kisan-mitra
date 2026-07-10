import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      await login(email, password);

      navigate("/dashboard");

    } catch (err) {

      setError(
        err.message || "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        dark:bg-black
        transition-colors
      "
    >

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

        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Login
        </h1>

        <p
          className="
            mt-3
            text-gray-600
            dark:text-gray-400
          "
        >
          Access operational monitoring dashboard.
        </p>

        {error && (

          <div
            className="
              mt-6
              bg-red-500/10
              border
              border-red-500/30
              rounded-xl
              p-3
              text-red-500
              text-sm
            "
          >
            {error}
          </div>

        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="
            mt-6
            w-full
            bg-green-500
            hover:bg-green-600
            disabled:opacity-50
            transition
            rounded-xl
            py-3
            text-white
            font-semibold
          "
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>

    </div>

  );
}

export default Login;