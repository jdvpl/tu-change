import { Module } from '@nestjs/common';
import { StudentsController } from './services/controller/students.controller';
import { StudentImplementation } from './application/use-cases/student.implementation';
import { StudentInterface } from './application/use-cases/student.interface';
import { StudentRepoInterface } from './repository/student.repo.interface';
import { StudentRepoImplementation } from './repository/student.repo.implementation';

@Module({
  controllers: [StudentsController],
  providers: [
    {
      useClass: StudentImplementation,
      provide: StudentInterface,
    },
    {
      useClass: StudentRepoImplementation,
      provide: StudentRepoInterface,
    },
  ],
})
export class StudentsModule {}
