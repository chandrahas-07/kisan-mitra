import { Link } from "react-router-dom";
import NotificationCenter from "./NotificationCenter";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import RoleBadge from "./RoleBadge";

function Navbar() {
  // 1. Hooks must be inside the component
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      
      <div className="text-2xl font-bold">
        Kisan Mitra
      </div>

      <div className="flex items-center gap-6">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        {/* 2. Conditionally show auth links or user controls inside the layout */}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">
                Active Session
              </p>
            </div>

            <RoleBadge role={user.role} />

            <button
              onClick={logout}
              className="
                bg-red-500/10
                border
                border-red-500/30
                text-red-400
                px-4
                py-2
                rounded-xl
                hover:bg-red-500/20
                transition
              "
            >
              Logout
            </button>
          </div>
        )}

        <NotificationCenter />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
