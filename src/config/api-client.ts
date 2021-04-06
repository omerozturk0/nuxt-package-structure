import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { apiClientFactory } from '@vue-storefront/core';
import * as ApiCalls from '../api';

const onSetup = (options) => {
  const {
    api: {
      authHost,
      projectKey,
      clientId,
      clientSecret,
      scopes
    },
    faceting: {
      host
    }
  } = options;

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: authHost,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret
    },
    scopes
  });

  const httpMiddleware = createHttpMiddleware({ host });
  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  });

  return {
    client: client,
    config: { ...options }
  }
}

const { createApiClient } = apiClientFactory({
  tag: 'emk',
  onSetup,
  api: ApiCalls
} as any);

export { createApiClient };
