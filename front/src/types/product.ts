export interface Product {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  price?: number;
  category?: string;
}
