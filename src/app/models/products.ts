export interface IProducts {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  thumbnail: string;
  images: string[]; 
}

export interface IProductResponse {
  products: IProducts[];
  total: number;
  skip: number;
  limit: number;
}