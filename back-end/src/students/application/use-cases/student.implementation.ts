import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentInterface } from './student.interface';
import { CreateStudentRequestDto } from 'src/students/services/dto/create-student.request.dto';
import { StudentRepoInterface } from '../../repository/student.repo.interface';
import { StudentEntity } from 'src/students/repository/entities/student.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class StudentImplementation implements StudentInterface {
  constructor(private readonly studentRepoImp: StudentRepoInterface) {}

  async createStudent(body: CreateStudentRequestDto) {
    try {
      const bodyToInsert: StudentEntity = {
        studentName: body.studentName,
        birthDate: new Date(body.birthDate),
        fatherName: body.fatherName,
        motherName: body.motherName,
        grade: body.grade,
        section: body.section,
        admisiontDate: new Date(body.admisiontDate),
      };
      const student = await this.studentRepoImp.createStudent(bodyToInsert);

      return student;
    } catch (error) {
      throw new HttpException(
        `error creating Data ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  getStudentsByGrade(code: number, section?: string) {
    return this.studentRepoImp.getStudentByGrade(code, section);
  }

  getAllStudents(query: PaginationDto) {
    return this.studentRepoImp.getAllStudents(query);
  }
}
