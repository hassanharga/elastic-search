import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';

export interface User {
  id: string;
  text: string;
  userId: string;
  results: string[];
  date: Date;
  updatedAt: Date;
}

export const userMapping: Record<string, MappingProperty> | undefined = {
  userId: { type: 'keyword' },
  id: { type: 'keyword' },
  text: { type: 'keyword' },
  results: { type: 'keyword' },
  date: { type: 'date' },
  updatedAt: { type: 'date' },
};
