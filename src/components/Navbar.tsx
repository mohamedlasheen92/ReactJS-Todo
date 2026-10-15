import { Link } from "react-router";
import Button from "./ui/Button";

const Navbar = () => {
  const dataStr = localStorage.getItem("loggedInUser");
  const userData = dataStr ? JSON.parse(dataStr) : null;

  const onLogout = () => {
    localStorage.removeItem("loggedInUser");
    location.reload();
  }
  return (
    <nav className=" mx-auto mt-7 mb-20 ">
      <ul className="flex items-center justify-between  px-6 py-5 rounded-md   mx-2">
        <li className=" duration-200 font-semibold text-lg">
          <Link to="/">Home</Link>
        </li>

        {userData?.jwt ?
          (<ul className="flex items-center space-x-3">
            <li className=" duration-200 font-semibold text-lg">
              <Link to="/profile">Profile</Link>
            </li>
            <li className=" duration-200 font-semibold text-lg">
              <Button onClick={() => onLogout()}>Logout</Button>
            </li>
          </ul>)
          : (<ul className="flex items-center space-x-3">
            <li className=" duration-200 font-semibold text-lg">
              <Link to="/register">Register</Link>
            </li>
            <li className=" duration-200 font-semibold text-lg">
              <Link to="/login">Login</Link>
            </li>
          </ul>)}
      </ul>
    </nav>
  );
};

export default Navbar;