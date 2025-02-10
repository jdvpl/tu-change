import { useState } from "react"
import ModalContainer from "../../../../../shared/components/modal/Modal"
import CreateStudenForm from "../../../shared/components/CreateStudenForm"
import ShowStudents from "../../../shared/components/showStudents.tsx/ShowStudents"

const Students = () => {

  const [open, setOpen] = useState(false)
  return (
    <div>
    <div className="">
      <ModalContainer open={open} setOpen={setOpen}>
        <CreateStudenForm setOpen={setOpen} />
      </ModalContainer>
        <button onClick={() => setOpen(true)} className='bg-blue-500 text-white p-2 rounded-md'>Crear Alumno</button>

    </div>

    <h2 className="text-center text-3xl font-semibold">Alumnos</h2>

    <ShowStudents />

    </div>
  )
}

export default Students