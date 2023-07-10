interface GoodType {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  rating: number;
}
interface Busket {
  product: GoodType;
  quantity: number;
  createdAt: string;
}

export type {GoodType, Busket}