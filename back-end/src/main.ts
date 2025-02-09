import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './common';
import { AllExceptionsFilter } from './handlers/exception-handler/exception-dhandler';

async function bootstrap() {
  const logger = new Logger('Main-alumnus');

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(envs.PORT);
  logger.log(`Server is running on  port ${envs.PORT}`);
}
bootstrap();
