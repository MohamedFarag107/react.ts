import { Brand } from "./brand.type";
import { Category } from "./category.type";
import { SubCategory } from "./subCategory.type";

export interface Product {
  _id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  images: string[];
  price: number;
  discount: number;
  category: string | Category;
  subCategory: string | SubCategory;
  brand: string | Brand;
  rating: number;
  sold: number;
  piecesSold: number;
}
