import { IndicesIndexSettings, MappingProperty } from '@elastic/elasticsearch/lib/api/types';

export interface Product {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  price?: number;
}

export const productSettings: IndicesIndexSettings | undefined = undefined;

// {
//   index: {
//     analysis: {
//       filter: {},
//       analyzer: {
//         keyword_analyzer: {
//           filter: ['lowercase', 'asciifolding', 'trim'],
//           char_filter: [],
//           type: 'custom',
//           tokenizer: 'keyword',
//         },
//         edge_ngram_analyzer: {
//           type: 'custom',
//           filter: ['lowercase'],
//           tokenizer: 'edge_ngram_tokenizer',
//         },
//         edge_ngram_search_analyzer: {
//           type: 'custom',
//           tokenizer: 'lowercase',
//         },
//       },
//       tokenizer: {
//         edge_ngram_tokenizer: {
//           type: 'edge_ngram',
//           min_gram: 2,
//           max_gram: 5,
//           token_chars: ['letter'],
//         },
//       },
//     },
//   },
// };

export const productMapping: Record<string, MappingProperty> | undefined = {
  id: { type: 'integer' },
  title: { type: 'text', analyzer: 'standard' },
  description: { type: 'text' },
  keywords: { type: 'keyword' },
  price: { type: 'integer' },
};
