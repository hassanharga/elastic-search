import { IndicesIndexSettings, MappingProperty } from '@elastic/elasticsearch/lib/api/types';

interface TechDetails {
  title: string;
  values: string[];
}
export interface Product {
  DEVICE_ID: string;
  SECTION_ID: number;
  NAME_AR: string;
  NAME_EN: string;
  SORT_ORDER: number;
  MANUFACTURER_ID: number | string;
  RELEASE_DATE: Date;
  FEATURED_FLAG: string;
  PREORDER_FLAG: string;
  LEGACY: string;
  BROADBAND_FLAG: string;
  INSERT_DATE: Date;
  SUMMARY_AR: string;
  SUMMARY_EN: string;
  TECH_DETAILS_AR: TechDetails[] | string;
  TECH_DETAILS_EN: TechDetails[] | string;
  STC_PROTECT: string;
  VIDEOS: string;
  DEEPLINK: string;
  PRODUCT_LINE_ID: number;
}

export const productSettings: IndicesIndexSettings | undefined = {
  index: {
    max_shingle_diff: 10,
    analysis: {
      analyzer: {
        trigram: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['lowercase', 'shingle'],
        },
        reverse: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['lowercase', 'reverse'],
        },
      },
      filter: {
        shingle: {
          type: 'shingle',
          min_shingle_size: 2,
          max_shingle_size: 3,
        },
      },
    },
  },
};

export const techDetailsProperty: MappingProperty = {
  properties: {
    title: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
    values: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
  },
};

const titleProperty: MappingProperty = {
  type: 'text',
  fielddata: true,
  fields: {
    keyword: {
      type: 'keyword',
      ignore_above: 256,
    },
    trigram: {
      type: 'text',
      analyzer: 'trigram',
    },
    reverse: {
      type: 'text',
      analyzer: 'reverse',
    },
  },
};

export const productMapping: Record<string, MappingProperty> | undefined = {
  DEVICE_ID: { type: 'text' },
  SECTION_ID: { type: 'integer' },
  NAME_AR: titleProperty,
  NAME_EN: titleProperty,
  SORT_ORDER: { type: 'integer' },
  MANUFACTURER_ID: { type: 'text' },
  RELEASE_DATE: { type: 'date', format: 'yyyy-MM-dd HH:mm:ss' },
  FEATURED_FLAG: { type: 'text' },
  PREORDER_FLAG: { type: 'text' },
  LEGACY: { type: 'text' },
  BROADBAND_FLAG: { type: 'text' },
  INSERT_DATE: { type: 'date', format: 'yyyy-MM-dd HH:mm:ss' },
  SUMMARY_AR: { type: 'text' },
  SUMMARY_EN: { type: 'text' },
  TECH_DETAILS_AR: techDetailsProperty,
  TECH_DETAILS_EN: techDetailsProperty,
  STC_PROTECT: { type: 'text' },
  VIDEOS: { type: 'text' },
  DEEPLINK: { type: 'text' },
  PRODUCT_LINE_ID: { type: 'integer' },
};
