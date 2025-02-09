import { createBrowserRouter, Navigate } from "react-router-dom";
import Grades from "../pages/grades/Grades";
import CommonLayout from "../layouts/CommonLayout";
import Students from "../pages/students/Students";


export const menuRoutes = [
  {
    to: "/students",
    title: "Estudiantes",
    description: "Gestión de estudiantes",
    component: <Students />
  },
  {
    to: "/grades",
    title: "Estudiantes",
    description: "Gestión de estudiantes",
    component: <Grades />
  },
]

export const router=createBrowserRouter([
  {
    path:'/',
    element:<CommonLayout/>,
    children:[
      ...menuRoutes.map(route=>({
        path:route.to,
        element:route.component
      })),
      {
        path:'',
        element:<Navigate to={menuRoutes[0].to}/>
      }
    ]
  }
])