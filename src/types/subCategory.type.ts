import { Category } from "./category.type";

export interface SubCategory {
  _id: string;
  name_ar: string;
  name_en: string;
  image?: string;
  category: string | Category;
}
