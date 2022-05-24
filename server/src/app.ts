import { PORT } from './config/constants';
import { initElasticSearch } from './utils/elastic';
import app from './utils/server';

const main = async () => {
  try {
    // run elastic
    await initElasticSearch();

    // start listening to server
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening in port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error[main]', err);
    process.exit(1);
  }
};

// init server
main();
