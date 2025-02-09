import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateGradeDto,
  CreateStudentRequestDto,
} from '../dto/create-student.request.dto';
import { StudentInterface } from 'src/students/application/use-cases/student.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentInterface) {}

  @Post('crear-alumno')
  async createStudent(@Body() data: CreateStudentRequestDto) {
    return this.studentsService.createStudent(data);
  }

  @Get('consultar-alumno/:grade/:section?')
  async getStudents(
    @Param('grade', ParseIntPipe) grade: number,
    @Param('section') section?: string,
  ) {
    return this.studentsService.getStudentsByGrade(grade, section);
  }
  @Get('get-all')
  async getAllStudens(@Query() query: PaginationDto) {
    return this.studentsService.getAllStudents(query);
  }
  @Post('create-grade')
  async createGrade(@Body() body: CreateGradeDto) {
    return this.studentsService.createGrade(body);
  }
  @Get('get-all-grades')
  async getAllGrades() {
    return this.studentsService.getAllGrades();
  }

  @Post('seed')
  async seed() {
    return this.studentsService.seed();
  }
}
