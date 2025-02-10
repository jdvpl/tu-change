import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateGradeDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  grade: number;

  @IsString()
  section: string;
}
export class CreateStudentRequestDto extends CreateGradeDto {
  @IsString()
  studentName: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  fatherName: string;

  @IsString()
  motherName: string;

  @IsDateString()
  admissionDate: string;
}

export class GetStudentRequestDto {
  @IsString()
  code: string;
}
