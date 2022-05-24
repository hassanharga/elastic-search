import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';

export interface User {
  id: string;
  text: string;
  userId: string;
  results: number[];
  date: Date;
  updatedAt: Date;
}

export const userMapping: Record<string, MappingProperty> | undefined = {
  userId: { type: 'text' },
  id: { type: 'text' },
  text: { type: 'text' },
  results: { type: 'keyword' },
  date: { type: 'date' },
  updatedAt: { type: 'date' },
};
