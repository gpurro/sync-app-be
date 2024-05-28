import 'dotenv/config';
import { get } from 'env-var';

export const environment = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}