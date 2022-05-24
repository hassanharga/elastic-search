import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';

export interface Product {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  price?: number;
  category?: string;
}

export const productMapping: Record<string, MappingProperty> | undefined = {
  id: { type: 'integer' },
  title: { type: 'text', analyzer: 'standard' },
  description: { type: 'text' },
  keywords: { type: 'keyword' },
  price: { type: 'integer' },
  category: { type: 'text' },
};
