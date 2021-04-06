import { integrationPluginFactory } from "@vue-storefront/core";
import { createApiClient } from './config';

const integrationPlugin = integrationPluginFactory(createApiClient);

export {
  integrationPlugin
}

export * from './types';
