import {  object, string } from 'yup';


export const CREATE_SCHMEMA_VALIDATION = object({
  studentName: string().required('El nombre del estudiante es requerido'),
  birthDate: string().required(),
  fatherName: string().required(),
  motherName: string().required(),
  grade: string().required(),
  section: string().required(),
  admisiontDate: string().required(),
})