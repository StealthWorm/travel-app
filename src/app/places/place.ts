import { Category } from "../category/category";

export class Place {
  id?: string;
  name?: string;
  category?: Category;
  location?: string;
  imageUrl?: string;
  rating?: number;
}
