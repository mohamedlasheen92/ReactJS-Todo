import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className="max-w-96 sm:max-w-2xl lg:max-w-4xl mx-auto">
        <Navbar />
        <div className="">
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default RootLayout;