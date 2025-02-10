import { createBrowserRouter, Navigate } from "react-router-dom";
import Grades from "../../modules/grades/presentation/pages/grades/Grades";
import CommonLayout from "../layouts/CommonLayout";
import Students from "../../modules/students/presentation/pages/students/Students";
import StudentsByGrade from "../../modules/students/presentation/pages/studentByGrade/StudentsByGrade";


export const menuRoutes = [
  {
    to: "/students",
    title: "Estudiantes",
    description: "Gestión de estudiantes",
    component: <Students />
  },
  {
    to: "/grades",
    title: "Grados",
    description: "Gestión de estudiantes",
    component: <Grades />
  },
  {
    to: "/studiantes-by-grade",
    title: "Estudiantes por grado",
    description: "Gestión de estudiantes",
    component: <StudentsByGrade />
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