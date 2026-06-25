import type { Product } from './Product';

export interface CartItem extends Product {
  lineId: string;
  qty: number;
  size: string | null;
  color: string | null;
}

export interface AddToCartPayload extends Product {
  qty?: number;
  size?: string | null;
  color?: string | null;
}