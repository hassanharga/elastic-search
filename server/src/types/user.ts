import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';

export interface User {
  id: string;
  text: string;
  userId: number;
  results: number[];
  date: Date;
  updatedAt: Date;
}

export const userMapping: Record<string, MappingProperty> | undefined = {
  userId: { type: 'integer' },
  id: { type: 'text' },
  text: { type: 'text' },
  results: { type: 'keyword' },
  date: { type: 'date' },
  updatedAt: { type: 'date' },
};
