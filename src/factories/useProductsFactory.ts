import {
  Context,
  FactoryParams,
  generateContext,
  sharedRef
} from '@vue-storefront/core';
import { computed, reactive, ref } from '@vue/composition-api';
import { UseProducts, QueryResults, Product } from '../types';

export interface useProductsFactoryParams extends FactoryParams {
  load: (context: Context) => Promise<QueryResults<Product>>;
}

export const useProductsFactory = (factoryParams: useProductsFactoryParams) => {
  const useProducts = (): UseProducts => {
    const context: Context = generateContext(factoryParams);
    const products = sharedRef('emakina-lib-products', {});
    const loading = reactive({
      loadProducts: ref(false)
    });

    const load = async () => {
      loading.loadProducts = true;

      try {
        const response = await factoryParams.load(context);

        products.value = response.body.results;
      } catch (e) {
        console.log(e.toString());
      } finally {
        loading.loadProducts = false;
      }
    }

    return {
      products: computed(() => products.value),
      load
    }
  }

  return { useProducts }
}
