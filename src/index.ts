import { integrationPluginFactory } from "@vue-storefront/core";
import { createApiClient } from './utils/api-client';

const integrationPlugin = integrationPluginFactory(createApiClient);

export {
  integrationPlugin
}

export * from './types';
export * from './factories';
export * from './methods';
