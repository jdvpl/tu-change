export interface IStudent{
  studentName: string;
  fatherName: string;
  motherName: string;
  grade: number;
  section: string;
  birthDate: string;
  admissionDate: string;
}

export interface IStudentResponse{
  id: number;
  studentName: string;
  fatherName: string;
  motherName: string;
  gradeCode: number;
  gradeSection: string;
  birthDate: string;
  admissionDate: string;
}
export interface IStudentResponseData{
  data: IStudentResponse[];
  lastPage: number;
  perPage: number;
  totalStudents: number;
}