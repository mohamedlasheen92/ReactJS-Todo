import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-black duration-200 font-semibold text-lg">
          <Link to="/">Home</Link>
        </li>

        <p className="flex items-center space-x-3">
          <li className="text-black duration-200 font-semibold text-lg">
            <Link to="/register">Register</Link>
          </li>
          <li className="text-black duration-200 font-semibold text-lg">
            <Link to="/login">Login</Link>
          </li>
        </p>
      </ul>
    </nav>
  );
};

export default Navbar;