import { BadRequestException } from '@nestjs/common';
import 'dotenv/config';
import * as joi from 'joi';

interface IEnvs {
  PORT: string;
  DATABASE_URL: string;
  API_KEY: string;
}

const envsSchema = joi
  .object<IEnvs>({
    PORT: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    API_KEY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new BadRequestException(error.message);
}

const envVars: IEnvs = value;

export const envs = {
  PORT: envVars.PORT,
  API_KEY: envVars.API_KEY,
  DATABASE_URL: envVars.DATABASE_URL,
};
