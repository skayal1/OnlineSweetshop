// Move all types to a dedicated types directory
export interface OrderFormData {
  name: string;
  phone: string;
  quantity: number;
  variant: WatchVariant;
}

export interface Order extends OrderFormData {
  id: string;
  timestamp: string;
}

export interface WatchVariant {
  id: string;
  name: string;
  price: number;
  color: string;
  image: string;
}