import { Client } from '@elastic/elasticsearch';
import { IndicesIndexSettings, MappingProperty } from '@elastic/elasticsearch/lib/api/types';
import { createReadStream } from 'fs';
import path from 'path';
import split from 'split2';
import {
  ELASTIC_CERT,
  ELASTIC_PASSWORD,
  ELASTIC_URL,
  ELASTIC_USERNAME,
  PRODUCTS_INDEX,
  USERS_INDEX,
} from '../config/constants';
import { Product, productMapping } from '../types/product';
import { userMapping } from '../types/user';

export const client = new Client({
  auth: { username: ELASTIC_USERNAME, password: ELASTIC_PASSWORD },
  node: ELASTIC_URL,
  tls: {
    ca: ELASTIC_CERT,
    rejectUnauthorized: false,
  },
});

const seedIndexData = async () => {
  // create product index
  const isExists = await createIndex(PRODUCTS_INDEX, productMapping);
  // create user index
  await createIndex(USERS_INDEX, userMapping);

  if (isExists) return;

  const result = await client.helpers.bulk<Product>({
    datasource: createReadStream(path.join(__dirname, '..', 'data', 'products.ndjson')).pipe(split(JSON.parse)),
    refreshOnCompletion: PRODUCTS_INDEX,
    onDocument(doc) {
      return { index: { _index: PRODUCTS_INDEX, _id: doc.id.toString() } };
    },
    onDrop(doc) {
      console.log(`can't index document ${doc.document.id}`, doc.error);
      process.exit(1);
    },
  });

  console.log('seeding result', result);
};

export const deleteIndex = async (index: string) => {
  const data = await client.indices.delete({
    index,
  });
  console.log('deleteIndex', data);
};

export const initElasticSearch = async () => {
  const data = await client.info();
  // eslint-disable-next-line no-console
  console.log('connected to elastic version ', data.version.number);
  await seedIndexData();
  // await deleteIndex(USERS_INDEX);
};

export const createIndex = async (
  index: string,
  properties: Record<string, MappingProperty> | undefined,
  settings: IndicesIndexSettings | undefined = undefined,
) => {
  const exists = await client.indices.exists({ index });
  console.log(`${index} index exists ==>`, exists);
  if (exists) return exists;

  await client.indices.create({
    index,
    settings,
    mappings: { properties, dynamic: 'strict' },
  });
  return false;
};
