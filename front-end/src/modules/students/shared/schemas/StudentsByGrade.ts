import {  object, string } from 'yup';


export const STUDENTS_GRADESCHEMA = object({
  grade: string().required(),
  section: string().notRequired(),
})