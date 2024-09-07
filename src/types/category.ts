export enum Category {
  BUSINESS = 'business',
  TECH = 'tech',
  HEALTH = 'health',
  ENTER = 'enter',
  SPORTS = 'sports',
  ENV = 'env',
  SCIENCE = 'science',
  TRAVEL = 'travel',
  MEDIA = 'media',
  FOOD = 'food',
}

type CategorykName = '비지니스' | '기술' | '건강' | '엔터테이먼트' | '스포츠' | '환경' | '과학' | '여행' | '미디어' | '푸드';

export const categoryName: Record<Category, CategorykName> = {
  [Category.BUSINESS]: '비지니스',
  [Category.TECH]: '기술',
  [Category.HEALTH]: '건강',
  [Category.ENTER]: '엔터테이먼트',
  [Category.SPORTS]: '스포츠',
  [Category.ENV]: '환경',
  [Category.SCIENCE]: '과학',
  [Category.TRAVEL]: '여행',
  [Category.MEDIA]: '미디어',
  [Category.FOOD]: '푸드',
};
