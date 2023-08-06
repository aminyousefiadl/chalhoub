export enum SortOptions {
  Recommended = "Recommended",
  New = "New",
  Cheapest = "Cheapest",
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  imageUrl: string;
  price: number;
}
export interface Products {
  data: Array<Product>;
  nextPage?: number;
  prevPage?: number;
  totalCount: number;
  totalPages: number;
}

export type DisplayColsOptions = "4" | "6" | "8";

export type ConfigStateType = {
  priceRange: Array<number>;
  color: string;
  limit: string;
  displayCols: DisplayColsOptions;
  page: number;
  sortType: SortOptions;
};
