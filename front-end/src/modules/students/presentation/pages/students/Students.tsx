import { useState } from "react"
import ModalContainer from "../../../../../shared/components/modal/Modal"
import CreateStudenForm from "../../../shared/components/CreateStudenForm"

const Students = () => {

  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col items-end">
      <button onClick={() => setOpen(true)} className='bg-blue-500 text-white p-2 rounded-md'>Crear Alumno</button>
      <ModalContainer open={open} setOpen={setOpen}>
        <CreateStudenForm setOpen={setOpen}/>
      </ModalContainer>
    </div>
  )
}

export default Students