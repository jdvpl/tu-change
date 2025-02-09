import { IsDate, IsNumber, IsString } from 'class-validator';

export class StudentEntity {
  @IsString()
  studentName: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  fatherName: string;

  @IsString()
  motherName: string;

  @IsNumber()
  grade: number;

  @IsString()
  section: string;

  @IsDate()
  admisiontDate: Date;
}
