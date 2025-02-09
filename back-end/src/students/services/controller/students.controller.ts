import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiKeyGuard } from 'src/guards/api-key.guard';
import { CreateStudentRequestDto } from '../dto/create-student.request.dto';
import { StudentInterface } from 'src/students/application/use-cases/student.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentInterface) {}

  @UseGuards(ApiKeyGuard)
  @Post('crear-alumno')
  async createStudent(@Body() data: CreateStudentRequestDto) {
    return this.studentsService.createStudent(data);
  }

  @UseGuards(ApiKeyGuard)
  @Get('consultar-alumno/:grade/:section?')
  async getStudents(
    @Param('grade', ParseIntPipe) grade: number,
    @Param('section') section?: string,
  ) {
    return this.studentsService.getStudentsByGrade(grade, section);
  }
  @UseGuards(ApiKeyGuard)
  @Get('get-all')
  async getAllStudens(@Query() query: PaginationDto) {
    return this.studentsService.getAllStudents(query);
  }
  @UseGuards(ApiKeyGuard)
  @Get('create-grade')
  async createGrade(@Query() query: PaginationDto) {
    return this.studentsService.getAllStudents(query);
  }
}
