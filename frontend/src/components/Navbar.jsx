import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      
      <div className="text-2xl font-bold">
        Kisan Mitra
      </div>

      <div className="flex gap-6">
        <Link to="/">Home</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;