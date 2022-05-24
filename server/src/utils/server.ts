import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import i18n from 'i18n';
import morgan from 'morgan';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import xss from 'xss-clean';
import routes from '../routes';
import errorHandler from './errorHandler';

const app = express();

i18n.configure({
  locales: ['en', 'ar'],
  directory: `${__dirname}/../../locales`,
  syncFiles: true,
  objectNotation: true,
  queryParameter: 'lang',
});

// middlewares

// localization
app.use(i18n.init);

// cors
app.use(cors());

// helmet
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP parameter pollution attacks
app.use(hpp());

// xss attack
app.use(xss());

// log routes
app.use(morgan('dev'));

// routes
const apiBaseUrl = process.env.API_URL;
app.use(`${apiBaseUrl}`, routes);

app.use(errorHandler);

export default app;
