import { Maybe } from './api';

export interface ValueValue {
  key?: Maybe<string>;
  label?: Maybe<string>;
  de?: Maybe<string>;
  en?: Maybe<string>;
}

export interface SearchKeywords {
  en?: Maybe<En[]>;
}

export interface En {
  text: Readonly<string>;
}

export interface Availability {
  isOnStock: Readonly<boolean>;
  availableQuantity: Readonly<number>;
}

export interface MasterVariantAttribute {
  name: Readonly<string>;
  value: Readonly<string[] | ValueValue | string>;
}

export interface Dimensions {
  w: Readonly<number>;
  h: Readonly<number>;
}

export interface Image {
  url: Readonly<string>;
  dimensions: Readonly<Dimensions>;
}

export interface Discounted {
  value: Readonly<DiscountedValue>;
  discount: Readonly<ProductType>;
}

export interface DiscountedValue {
  type: Readonly<string>;
  currencyCode: Readonly<string>;
  centAmount: Readonly<number>;
  fractionDigits: Readonly<number>;
}

export interface Price {
  value: Readonly<DiscountedValue>;
  id: Readonly<string>;
  discounted?: Maybe<Discounted>;
}

export interface VariantAttribute {
  name: Readonly<string>;
  value: Readonly<ValueValue | string>;
}

export interface Variant {
  id: Readonly<number>;
  sku: Readonly<string>;
  prices: Readonly<Price[]>;
  images: Readonly<Image[]>;
  attributes: Readonly<VariantAttribute[]>;
  assets: Readonly<any[]>;
}

export interface MasterVariant {
  id: Readonly<number>;
  sku: Readonly<string>;
  prices: Readonly<Price[]>;
  images: Readonly<Image[]>;
  attributes: Readonly<MasterVariantAttribute[]>;
  assets: Readonly<any[]>;
  availability?: Maybe<Availability>;
}

export interface CategoryOrderHints {}

export interface Description {
  en: Readonly<string>;
  de: Readonly<string>;
}

export interface ProductType {
  typeId: Readonly<string>;
  id: Readonly<string>;
}

export interface Product {
  id: Readonly<string>;
  version: Readonly<number>;
  productType: Readonly<ProductType>;
  name: Readonly<Description>;
  description: Readonly<Description>;
  categories: Readonly<ProductType[]>;
  categoryOrderHints: Readonly<CategoryOrderHints>;
  slug: Readonly<Description>;
  masterVariant: Readonly<MasterVariant>;
  variants: Readonly<Variant[]>;
  searchKeywords: Readonly<SearchKeywords>;
  hasStagedChanges: Readonly<boolean>;
  published: Readonly<boolean>;
  taxCategory: Readonly<ProductType>;
  createdAt: Readonly<string>;
  lastModifiedAt: Readonly<string>;
  metaTitle?: Maybe<Description>;
  metaDescription?: Maybe<Description>;
}
