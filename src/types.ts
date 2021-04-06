type Scope<T> = {
  [x: string]: T;
}

type I18n = {
  useNuxtI18nConfig: boolean;
}

type Faceting = {
  host: string;
}

type FacetItem = {
  facet: string;
  type: string;
  option: string;
  name: string;
  [x: string]: string;
}

type ApiCredentials = {
  uri: string;
  authHost: string,
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes: Array<Scope<string>>;
}

export interface ApiConfigs {
  api: ApiCredentials;
  i18n: I18n;
  faceting: Faceting,
  availableFacets: Array<FacetItem>
}

export interface ApiInstance {
  getProduct (options: any): Promise<void>;
}
