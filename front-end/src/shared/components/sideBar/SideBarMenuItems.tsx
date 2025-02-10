import { NavLink } from 'react-router-dom'

interface SideBarMenuItemsProps {
  to: string;
  title: string;
}
export const SideBarMenuItems = ({ to, title }: SideBarMenuItemsProps) => {
  return (
    <NavLink
      to={to}
      className={
        ({ isActive }) =>
          isActive ? 'flex justify-center items-center text-white  bg-blue-600 rounded-md p-2 transition-colors'
            : 'flex justify-center items-center hover:bg-blue-600 hover:text-white rounded-md p-2 my-2 transition-colors'
      }

    >
      <div className="flex flex-col flex-grow">
        <span className=" text-lg font-semibold">
          {title}
        </span>

      </div>
    </NavLink>
  )
}
