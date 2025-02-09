import { IsDate, IsString } from 'class-validator';

export class StudentEntity {
  @IsString()
  studentName: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  fatherName: string;

  @IsString()
  motherName: string;

  @IsString()
  grade: string;

  @IsString()
  section: string;

  @IsDate()
  admisiontDate: Date;
}
