import { UpdateResponse, WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';
import { Request, RequestHandler } from 'express';
import { USERS_INDEX } from '../config/constants';
import { Product } from '../types/product';
import { User } from '../types/user';
import ApiError from '../utils/ApiError';
import { client } from '../utils/elastic';
// import { moveArrayItemToNewIndex } from '../utils/orderArray';

const getIpAddress = (req: Request) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  // console.log('ip', ip);
  // console.log('Browser: ' + req.headers['user-agent']);
  return ip.toString().replace('::ffff:', '');
};

export const search: RequestHandler = async (req, res) => {
  const { q } = req.query as { q: string; userId: string };

  const data = await client.search<Product>({
    query: {
      match_phrase: { NAME_AR: q },
    },
    size: 0,
    aggs: {
      myagg: {
        terms: {
          field: 'NAME_AR',
          include: '.*',
        },
      },
    },
  });

  const buckets = (data?.aggregations?.myagg as { buckets: { key: string; doc_count: number }[] }).buckets;
  // const searchTerms = buckets.map((ele) => ele.key);
  const word = buckets.find((ele) => ele.key.includes(q.split(' ')[0]))?.key;
  const matchExactWord = word ? word : buckets.length ? buckets[0].key : '';
  const searchTerms = buckets.map((ele) => {
    if (matchExactWord === ele.key) return matchExactWord;
    else return `${matchExactWord} ${ele.key}`;
  });
  res.send(searchTerms);

  // const userId = getIpAddress(req);

  // // get user previous search results if exists
  // let userSerchResults: string[] = [];
  // if (userId && q) {
  //   // eslint-disable-next-line @typescript-eslint/no-empty-function
  //   const data = await client.get<User>({ index: USERS_INDEX, id: `${userId}-${q}` }).catch(() => {});

  //   if (data && data._source) {
  //     userSerchResults = data._source.results || [];
  //   }
  // }

  // // search for provided query
  // const { hits } = await client.search<Product>({
  //   index: PRODUCTS_INDEX,
  //   query: {
  //     bool: {
  //       should: [
  //         {
  //           wildcard: {
  //             NAME_AR: {
  //               value: `*${q}*`,
  //               case_insensitive: true,
  //             },
  //           },
  //         },
  //         {
  //           match: { NAME_AR: q },
  //         },
  //         {
  //           fuzzy: { NAME_AR: q },
  //         },
  //         {
  //           fuzzy: { keywords: q },
  //         },
  //       ],
  //     },
  //   },
  // });

  // // compare results of user with search results and add user previous search results to top
  // let results = hits.hits.map((ele) => ele._source) || [];

  // if (userSerchResults.length) {
  //   for await (const resId of userSerchResults) {
  //     // check if user result in search result
  //     const resIdx = results.findIndex((ele) => ele?.DEVICE_ID === resId);
  //     // move to the top off array
  //     if (resIdx >= 0) {
  //       results = moveArrayItemToNewIndex(results, resIdx, 0);
  //     } else {
  //       // eslint-disable-next-line @typescript-eslint/no-empty-function
  //       const product = await client.get<Product>({ index: PRODUCTS_INDEX, id: resId.toString() }).catch(() => {});
  //       if (product) {
  //         results.unshift(product._source);
  //       }
  //     }
  //   }
  // }

  // res.send(results);
};

export const searchProducts: RequestHandler = async (req, res) => {
  const { q } = req.query as { q: string };

  const { hits } = await client.search<Product>({
    query: {
      multi_match: {
        query: q,
        fields: ['NAME_AR^2', 'NAME_EN^2', 'SUMMARY_AR', 'SUMMARY_EN'],
      },
    },
  });

  res.json(hits.hits.map((ele) => ele._source));
};

export const setUserSearchHistory: RequestHandler = async (req, res) => {
  const { searchText, searchResult } = req.body;
  if (!searchText || !searchResult) throw new ApiError('bad credentials', 400);

  const userId = getIpAddress(req);
  const id = `${userId}-${searchText}`;

  const userPrevSearchExists = await client.exists({ index: USERS_INDEX, id });

  // console.log('userPrevSearch', userPrevSearchExists);
  let data: WriteResponseBase | UpdateResponse<User>;

  if (userPrevSearchExists) {
    const userSearch = await client.get<User>({ index: USERS_INDEX, id });
    data = await client.update<User, Partial<User>, User>({
      index: USERS_INDEX,
      refresh: true,
      id,
      doc: {
        results: [...new Set([...(userSearch._source?.results || []), searchResult])],
        updatedAt: new Date(),
      },
    });
  } else {
    data = await client.index<User>({
      index: USERS_INDEX,
      refresh: true,
      id,
      document: {
        id,
        userId,
        text: searchText,
        results: [searchResult],
        date: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  res.send(data);
};

export const getUserSearchHistory: RequestHandler = async (req, res) => {
  // const { userId } = req.query as { userId: string };
  // if (!userId) throw new ApiError('no user id', 400);

  const userId = getIpAddress(req);

  const { hits } = await client.search<User>({
    index: USERS_INDEX,
    sort: [{ updatedAt: 'desc' }] as any[],
    query: {
      match: { userId },
    },
    ignore_unavailable: true,
  });

  res.send(hits.hits.map((ele) => ele._source));
};
