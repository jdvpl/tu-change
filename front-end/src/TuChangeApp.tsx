import { RouterProvider } from "react-router-dom"
import { router } from "./shared/router/router"

const TuChangeApp = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default TuChangeApp