import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentInterface } from './student.interface';
import {
  CreateGradeDto,
  CreateStudentRequestDto,
} from '../../services/dto/create-student.request.dto';
import { StudentRepoInterface } from '../../repository/student.repo.interface';
import { StudentEntity } from 'src/students/repository/entities/student.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import JsonData from '../../../common/db/seed.json';

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
        admisiontDate: new Date(body.admissionDate),
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

  createGrade(body: CreateGradeDto) {
    return this.studentRepoImp.createGrade(body);
  }
  getAllGrades(): Promise<CreateGradeDto[]> {
    return this.studentRepoImp.getAllGrades();
  }
  seed() {
    try {
      return this.studentRepoImp.seed(JsonData as unknown as StudentEntity[]);
    } catch (error) {
      throw new HttpException(
        `Error seeding data: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
