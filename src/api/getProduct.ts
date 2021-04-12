import { createRequestBuilder } from '@commercetools/api-request-builder';
import { QueryResults, Product, ClientConfigs } from '../types';

const getProduct = async (context: ClientConfigs, options?): Promise<QueryResults<Product>> => {
  const { config, client } = context;

  const requestBuilder = createRequestBuilder({ projectKey: config.api.projectKey });
  const productProjectionsService = requestBuilder.productProjections;

  const uri = productProjectionsService.build()

  return await client.execute({ uri, method: 'GET' });
}

export default getProduct;
