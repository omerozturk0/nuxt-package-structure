import { integrationPluginFactory } from "@vue-storefront/core";
import { createApiClient } from './config/api-client';

const integrationPlugin = integrationPluginFactory(createApiClient);

export {
  integrationPlugin
}

export * from './types';
