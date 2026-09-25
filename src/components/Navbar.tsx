import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className=" mx-auto mt-7 mb-20 ">
      <ul className="flex items-center justify-between bg-indigo-700 px-6 py-5 rounded-md  text-white mx-2">
        <li className=" duration-200 font-semibold text-lg">
          <Link to="/">Home</Link>
        </li>

        <p className="flex items-center space-x-3">
          <li className=" duration-200 font-semibold text-lg">
            <Link to="/register">Register</Link>
          </li>
          <li className=" duration-200 font-semibold text-lg">
            <Link to="/login">Login</Link>
          </li>
        </p>
      </ul>
    </nav>
  );
};

export default Navbar;