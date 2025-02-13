import { SideBarMenuItems } from '../components/sideBar/SideBarMenuItems'
import { menuRoutes } from '../router/router'
import { Outlet } from 'react-router-dom'

const CommonLayout = () => {
  return (
    <main className="flex flex-row py-7 bg-gray-50-50 m-0 p-0 overflow-x-hidden" >
    <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-gray-400 bg-opacity-10 p-5 rounded-3xl">
    <span className="text-xl bg-gradient-to-r from-teal-600 to-red-600 text-transparent bg-clip-text">
  TuChance-Alumnos
</span>


      <div className="border-gray-700 border my-3 mt-2" />

      {
        menuRoutes.map(option=>(
        <SideBarMenuItems key={option.to} {...option}/>
        ))
      }
    </nav>

    <section className="mx-3 sm:mx-5 flex flex-col w-full h-full  bg-gray-500 bg-opacity-10 p-2 rounded-3xl">
      <div className="flex flex-row h-full">
        <div className="flex flex-col flex-auto h-full p-1">
          <Outlet />
        </div>
      </div>
    </section>
  </main>
  )
}

export default CommonLayout