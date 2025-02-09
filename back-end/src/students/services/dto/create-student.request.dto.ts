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
  admisiontDate: string;
}

export class GetStudentRequestDto {
  @IsString()
  code: string;
}
