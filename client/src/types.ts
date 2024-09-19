export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
};

export type NewBook = {
  title: string;
  author: string;
  price: number;
  quantity: number;
};

export type AlertVariant = 'success' | 'danger' | 'warning' | 'info';

export type AlertState = {
  variant: AlertVariant;
  message: string;
} | null;
