import 'dotenv-safe/config';

import { readFileSync } from 'fs';
import path from 'path';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const PORT = process.env.PORT ?? 3000;

export const STATIC_FILES = path.join(__dirname, '../../public/dist');

const CERT_PATH = IS_PROD
  ? path.join(__dirname, '../../http_ca.crt')
  : path.join(__dirname, '../../../../../Downloads/elasticsearch-8.1.3/config/certs/http_ca.crt');

// elastic search config
export const ELASTIC_URL = process.env.ELASTIC_URL;
export const ELASTIC_USERNAME = `${process.env.ELASTIC_USERNAME}`;
export const ELASTIC_PASSWORD = `${process.env.ELASTIC_PASSWORD}`;
export const ELASTIC_CERT = readFileSync(CERT_PATH);

export const PRODUCTS_INDEX = 'products';
export const USERS_INDEX = 'users';
