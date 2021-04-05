import { integrationPlugin } from '@vue-storefront/core';

export default integrationPlugin(({ integration }) => {
  integration.configure({ ...<%= serialize(options) %> });
});
