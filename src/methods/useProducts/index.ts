import { Context } from '@vue-storefront/core';
import { useProductsFactory, useProductsFactoryParams } from '../../factories';

const params: useProductsFactoryParams = {
  load: async (context: Context) => {
    const response = context.$emk.api.getProduct();

    return Promise.resolve(response);
  }
};

const { useProducts } = useProductsFactory(params);

export default useProducts;
