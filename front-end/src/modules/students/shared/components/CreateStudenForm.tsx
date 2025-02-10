import { XCircleIcon } from "@heroicons/react/24/solid"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_SCHMEMA_VALIDATION } from "../schemas/CreateStudentSchema";
import Input from "../../../../shared/components/Input/Input";
import useFetchGrades from "../../../../shared/hooks/useFetchGrades";
import Select from "../../../../shared/components/select/Select";
import { createUser } from "../../core/use-case/create-user";

interface CreateStudenFormProps {
  setOpen: (value: boolean) => void
}

const CreateStudenForm = ({ setOpen }: CreateStudenFormProps) => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(CREATE_SCHMEMA_VALIDATION),
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const data = getValues()
      const datatoSend = { ...data, grade: parseInt(data.grade) }
      await createUser(datatoSend);
      setOpen(false)
    } catch (error) {
      console.log(error);
    }
  }
  const { grades, sections } = useFetchGrades()
  return (
    <div className='bg-white p-3 rounded-md border border-gray-200 w-full md:w-[70%] relative'>
      <div className="flex justify-end absolute top-2 right-2">
        <button onClick={() => setOpen(false)}>
          <XCircleIcon className="size-8 text-blue-600" title="cerrar" />
        </button>
      </div>
      <h2 className='text-center font-semibold text-3xl mt-3'>Crear Alumno</h2>

      <form onSubmit={onSubmit} className="lg:w-1/2 mx-auto flex flex-col px-4 gap-3 py-5 mt-5">
        <Input
          placeholder="Nombre del estudiante"
          value={watch('studentName')}
          label="Nombre del estudiante"
          {...register('studentName')}
          error={!!errors?.studentName}
          helperText={errors?.studentName?.message}
          onChange={e => {
            setValue(
              'studentName',
              e.target.value,
              {
                shouldValidate: true,
              }
            );
          }}
        />
        <Input
          label="Nombre del padre"
          value={watch('fatherName')}
          onChange={e => {
            setValue(
              'fatherName',
              e.target.value,
              {
                shouldValidate: true,
              }
            );
          }} />
        <Input label="Nombre de la madre" value={watch('motherName')}
          onChange={e => {
            setValue(
              'motherName',
              e.target.value,
              {
                shouldValidate: true,
              }
            );
          }} />

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
          value={watch('section')}
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

        <Input
          type="date"
          label="Fecha de nacimiento"
          value={watch('birthDate')}
          helperText={errors?.birthDate?.message}
          error={!!errors?.birthDate}
          name="birthDate"
          onChange={e =>
            setValue('birthDate', e.target.value, {
              shouldValidate: true,
            })
          }
        />
        <Input
          type="date"
          label="Fecha de admision"
          value={watch('admissionDate')}
          helperText={errors?.admissionDate?.message}
          error={!!errors?.admissionDate}
          name="admisiontDate"
          onChange={e =>
            setValue('admissionDate', e.target.value, {
              shouldValidate: true,
            })
          }
        />
        <button disabled={!isValid} className={`${!isValid ? 'bg-gray-300' : 'bg-blue-800'}  text-white rounded-md p-2 mt-3`} type="submit" >Crear alumno

        </button>
      </form>
    </div>
  )
}

export default CreateStudenForm



