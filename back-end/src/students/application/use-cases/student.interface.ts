import { Injectable } from '@nestjs/common';
import {
  CreateGradeDto,
  CreateStudentRequestDto,
} from '../../services/dto/create-student.request.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { StudentEntity } from 'src/students/repository/entities/student.entity';

@Injectable()
export abstract class StudentInterface {
  abstract createStudent(body: CreateStudentRequestDto);
  abstract getStudentsByGrade(code: number, section?: string);
  abstract getAllStudents(query: PaginationDto): Promise<StudentEntity[]>;
  abstract createGrade(body: CreateGradeDto);
  abstract getAllGrades(): Promise<CreateGradeDto[]>;
  abstract seed();
}
