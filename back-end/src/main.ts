import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './common';
import { AllExceptionsFilter } from './handlers/exception-handler/exception-dhandler';
import { ApiKeyGuard } from './guards/api-key.guard';

async function bootstrap() {
  const logger = new Logger('Main-alumnus');

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(new ApiKeyGuard());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(envs.PORT);
  logger.log(`Server is running on  port ${envs.PORT}`);
}
bootstrap();
