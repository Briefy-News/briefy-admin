import { Category } from './category';
import { DayOfWeek } from './dayofweek';

export interface Newsletter {
  title: string;
  category: Category;
  description: string;
  link: string;
  thumbnail: string;
  uploadDays: DayOfWeek[];
}
