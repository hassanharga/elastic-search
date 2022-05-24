import 'dotenv-safe/config';

import { readFileSync } from 'fs';
import path from 'path';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const PORT = process.env.PORT ?? 3000;

// elastic search config
export const ELASTIC_URL = process.env.ELASTIC_URL;
export const ELASTIC_USERNAME = `${process.env.ELASTIC_USERNAME}`;
export const ELASTIC_PASSWORD = `${process.env.ELASTIC_PASSWORD}`;
export const ELASTIC_CERT = readFileSync(
  path.join(__dirname, '../../../../Downloads/elasticsearch-8.1.3/config/certs/http_ca.crt'),
);

export const PRODUCTS_INDEX = 'products';
export const USERS_INDEX = 'users';
