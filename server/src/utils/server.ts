import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import i18n from 'i18n';
import morgan from 'morgan';
import path from 'path';
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
app.options('*', cors);

// helmet
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', '..', 'public', 'dist')));

// HTTP parameter pollution attacks
app.use(hpp());

// xss attack
app.use(xss());

// log routes
app.use(morgan('dev'));

// routes
const apiBaseUrl = process.env.API_URL;
app.use(`${apiBaseUrl}`, routes);

app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'dist', 'index.html'));
});

app.use(errorHandler);

export default app;
