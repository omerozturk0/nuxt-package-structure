import { createRequestBuilder } from '@commercetools/api-request-builder';

const getProduct = async (options) => {
  const requestBuilder = createRequestBuilder({ projectKey: options.api.projectKey });
  const productProjectionsService = requestBuilder.productProjections;

  const uri = productProjectionsService.build()

  const response = await options.client.execute({
    uri,
    method: 'GET'
  });

  console.log('response', response);
}

export default getProduct;
