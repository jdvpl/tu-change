import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StudentRepoInterface } from './student.repo.interface';
import { GradeEntity, StudentEntity } from './entities/student.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { convertDate } from 'src/helpers/convertDate';
import { CreateGradeDto } from '../services/dto/create-student.request.dto';

@Injectable()
export class StudentRepoImplementation
  extends PrismaClient
  implements OnModuleInit, StudentRepoInterface
{
  private readonly logger = new Logger(StudentRepoImplementation.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }
  async createStudent(student: StudentEntity): Promise<StudentEntity> {
    try {
      const studentInserted = await this.student.create({
        data: {
          studentName: student.studentName,
          birthDate: student.birthDate,
          motherName: student.motherName,
          fatherName: student.fatherName,
          admissionDate: student.admisiontDate,
          grade: {
            connectOrCreate: {
              where: {
                code_section: { code: student.grade, section: student.section },
              },
              create: { code: student.grade, section: student.section },
            },
          },
        },
        select: {
          studentName: true,
          birthDate: true,
          motherName: true,
          fatherName: true,
          admissionDate: true,
          grade: { select: { code: true, section: true } },
        },
      });
      const formattedResponse = {
        ...studentInserted,
        gradeCode: studentInserted.grade.code,
        gradeSection: studentInserted.grade.section,
        birthDate: convertDate(studentInserted.birthDate),
        admissionDate: convertDate(studentInserted.admissionDate),
        grade: undefined,
      };
      return formattedResponse as unknown as StudentEntity;
    } catch (error) {
      throw new HttpException(
        `Error setting data: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getStudentByGrade(
    studentId: number,
    section?: string,
  ): Promise<StudentEntity[]> {
    try {
      const data = await this.student.findMany({
        where: {
          grade: {
            code: studentId,
            ...(section && { section }),
          },
        },
        select: {
          studentName: true,
          birthDate: true,
          motherName: true,
          fatherName: true,
          admissionDate: true,
          grade: { select: { code: true, section: true } },
        },
      });
      if (!data.length) {
        throw new HttpException(
          `There are not students with ${studentId} ${section ? `and Section ${section} ` : ''}`,
          HttpStatus.NOT_FOUND,
        );
      }
      const formattedData = data.map((student) => ({
        ...student,
        birthDate: convertDate(student.birthDate),
        admissionDate: convertDate(student.admissionDate),
        gradeCode: student.grade.code,
        gradeSection: student.grade.section,
        grade: undefined,
      }));
      return formattedData as unknown as StudentEntity[];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllStudents(pageDto: PaginationDto): Promise<any> {
    const currentPage = pageDto.page;
    const perPage = pageDto.limit;
    const totalStudents = await this.student.count();
    const data = await this.student.findMany({
      skip: (currentPage - 1) * perPage,
      take: perPage,
      select: {
        studentName: true,
        birthDate: true,
        motherName: true,
        fatherName: true,
        admissionDate: true,
        grade: { select: { code: true, section: true } },
      },
    });

    const formattedData = data.map((student) => ({
      ...student,
      birthDate: convertDate(student.birthDate),
      admissionDate: convertDate(student.admissionDate),
      gradeCode: student.grade.code,
      gradeSection: student.grade.section,
      grade: undefined,
    }));

    return {
      data: formattedData,
      totalStudents,
      currentPage,
      perPage,
      lastPage: Math.ceil(totalStudents / perPage),
    };
  }
  async createGrade(body: CreateGradeDto): Promise<GradeEntity> {
    try {
      const gradeExist = await this.grade.findUnique({
        where: { code_section: { code: body.grade, section: body.section } },
      });
      if (gradeExist) {
        throw new HttpException(
          `Grade ${body.grade} ${body.section} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const grade = await this.grade.create({
        data: {
          code: body.grade,
          section: body.section,
        },
      });
      return grade as unknown as GradeEntity;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
