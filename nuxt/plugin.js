import { integrationPlugin } from 'emakina-lib';

export default integrationPlugin(({ integration }) => {
  integration.configure({ ...<%= serialize(options) %> });
});
