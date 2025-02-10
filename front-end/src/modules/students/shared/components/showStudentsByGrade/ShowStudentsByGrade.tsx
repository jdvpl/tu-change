import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { STUDENTS_GRADESCHEMA } from "../../schemas/StudentsByGrade";
import useFetchGrades from "../../../../../shared/hooks/useFetchGrades";
import Select from "../../../../../shared/components/select/Select";
import { getStudentsByGrade } from "../../../core/use-case/create-user";
import { useState } from "react";
import { IStudentResponse } from "../../../interfaces/student";

const ShowStudentsByGrade = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(STUDENTS_GRADESCHEMA),
  });

  const [students, setstudents] = useState<IStudentResponse[]>([])

  const onSubmit = async(event:React.FormEvent) => {
    event.preventDefault()
        try {
          const { grade, section } = getValues();
          const validGrade = grade ?? undefined;
          const validSection = section ?? undefined;
          
          const data=await getStudentsByGrade(validGrade, validSection);
          setstudents(data);
          
        } catch (error) {
          console.log(error);
        }
  }

  const { grades, sections } = useFetchGrades()
  return (
    <>

    <form onSubmit={onSubmit} className='grid grid-cols-1  p-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Select
        options={
          grades.map(grade => ({ label: grade.toString(), value: grade.toString() }))
        }
        value={watch('grade')}
        onChange={value =>
          setValue('grade', value, {
            shouldValidate: true,
          })
        }
        placeholder="Grado"
        name="Grade"
        helperText={errors?.grade?.message}
        error={!!errors?.grade}

      />
      <Select
        options={
          sections.map(section => ({ label: section.toString(), value: section }))
        }
        {...register('section')}
        value={watch('section') ?? undefined}
        onChange={value =>
          setValue('section', value, {
            shouldValidate: true,
          })
        }
        
        placeholder="Seccion"
        name="Section"
        helperText={errors?.grade?.message}
        error={!!errors?.grade}
      />
      <button
        type="submit"
        className={`${isValid?'bg-blue-500':'bg-slate-600'} text-white rounded-md p-2`}
        disabled={!isValid}
      >Mostrar estudiantes</button>
    </form>
    
    {
      students.length>0?
      (
        <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg mt-5 lg:max-w-4xl md:max-w-[400px] max-w-[280px] mx-auto">
        <table className="w-full overflow-x-auto text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-blue-600">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Nombre Madre</th>
              <th className="px-4 py-2">Nombre paadre</th>
              <th className="px-4 py-2">Fecha de Admisión</th>
              <th className="px-4 py-2">Fecha de Nacimiento</th>
              <th className="px-4 py-2">Grado</th>
              <th className="px-4 py-2">Sección</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{student.studentName}</td>
                <td className="px-4 py-2">{student.motherName}</td>
                <td className="px-4 py-2">{student.fatherName}</td>
                <td className="px-4 py-2">{student.admissionDate}</td>
                <td className="px-4 py-2">{student.birthDate}</td>
                <td className="px-4 py-2">{student.gradeCode}</td>
                <td className="px-4 py-2">{student.gradeSection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ):
      (
        <div className='text-center text-gray-700 mt-4'>
          No hay estudiantes
        </div>
      )
    }
  
    </>
  )
}

export default ShowStudentsByGrade