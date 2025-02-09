import { Injectable } from '@nestjs/common';
import { GradeEntity, StudentEntity } from './entities/student.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateGradeDto } from '../services/dto/create-student.request.dto';

@Injectable()
export abstract class StudentRepoInterface {
  abstract createStudent(student: StudentEntity): Promise<StudentEntity>;
  abstract getStudentByGrade(
    studentId: number,
    section?: string,
  ): Promise<StudentEntity[]>;
  abstract getAllStudents(pageDto: PaginationDto): Promise<StudentEntity[]>;
  abstract createGrade(body: CreateGradeDto): Promise<GradeEntity>;
}
