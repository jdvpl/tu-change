import { IsDateString, IsString } from 'class-validator';

export class CreateStudentRequestDto {
  @IsString()
  studentName: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  fatherName: string;

  @IsString()
  motherName: string;

  @IsString()
  grade: string;

  @IsString()
  section: string;

  @IsDateString()
  admisiontDate: string;
}

export class GetStudentRequestDto {
  @IsString()
  code: string;
}
