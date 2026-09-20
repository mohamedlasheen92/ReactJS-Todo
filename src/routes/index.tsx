import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import ErrorHandler from "../components/errors/ErrorHandler";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Home from "../pages";
import RootLayout from "../pages/RootLayout";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";

const isLoggedIn = false;
const userData: { email: string } | null = isLoggedIn ? { email: "ali@gmail.com" } : null;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath="/login" data={userData}>
            <Home />
          </ProtectedRoute>} />

        <Route path="login"
          element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/" data={userData} >
            <Login />
          </ProtectedRoute>
          }
        />

        <Route path="register"
          element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/login" data={userData}>
            <Register />
          </ProtectedRoute>
          }
        />
      </Route>


      {/* Handle Page not found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
)

export default router