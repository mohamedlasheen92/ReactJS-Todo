import { RouterProvider } from "react-router"
import router from "./routes"

function App() {

  return (
    <>
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  )
}

export default App
