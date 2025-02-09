import { Injectable } from '@nestjs/common';
import { StudentEntity } from './entities/student.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export abstract class StudentRepoInterface {
  abstract createStudent(student: StudentEntity): Promise<any>;
  abstract getStudentByGrade(studentId: string, section?: string): Promise<any>;
  abstract getAllStudents(pageDto: PaginationDto): Promise<StudentEntity[]>;
}
