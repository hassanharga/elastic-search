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
