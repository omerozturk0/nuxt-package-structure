import { Context } from '@vue-storefront/core';
import { Ref } from '@vue/composition-api';
import { Product } from './product';

export type ComputedProperty<T> = Readonly<Ref<Readonly<T>>>;
export type Maybe<T> = Readonly<T> | null;
export type Field<T> = Readonly<T>;

export interface I18n {
  useNuxtI18nConfig: boolean;
}

export interface Faceting {
  host: string;
}

export interface FacetItem {
  facet: Readonly<string>;
  type: Readonly<string>;
  option: Readonly<string>;
  name: Readonly<string>;
  [x: string]: Readonly<string>;
}

export interface ApiCredentials {
  uri: Readonly<string>;
  authHost: Readonly<string>,
  projectKey: Readonly<string>;
  clientId: Readonly<string>;
  clientSecret: Readonly<string>;
  scopes: Array<Field<string>>;
}

export interface ApiConfigs {
  api: ApiCredentials;
  i18n: I18n;
  faceting: Faceting,
  availableFacets: Array<FacetItem>
}

export interface ClientConfigs {
  client: any;
  config: ApiConfigs;
}

export interface Body<RESPONSE_ITEMS> {
  limit: Readonly<number>;
  offset: Readonly<number>;
  count: Readonly<number>;
  total: Readonly<number>;
  results: Readonly<Array<RESPONSE_ITEMS>>;
}

export interface QueryResults<RESPONSE_ITEMS> {
  body: Body<RESPONSE_ITEMS>;
  statusCode: Readonly<number>;
}

export interface UseProducts {
  load: () => void;
  products: ComputedProperty<Product[]>;
}

export interface ApiInstance {
  getProduct(options: any): Promise<QueryResults<Product>>;
}
