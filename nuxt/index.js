const path = require('path');

const getCommercetoolsApiConfig = (options, moduleOptions) => {
  const moduleName = '@vsf-enterprise/commercetools/nuxt' || '@vue-storefront/commercetools/nuxt';
  const modules = [...options.buildModules, ...options.modules];

  const ctModule = modules.find(m => m === moduleName || m[0] === moduleName)

  if (Array.isArray(ctModule)) {
    return ctModule[1]
  }

  return {};
}

// eslint-disable-next-line
module.exports = function Emakina(moduleOptions) {
  const ctConfiguration = getCommercetoolsApiConfig(this.options, moduleOptions);

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: { ...moduleOptions, ...ctConfiguration },
  })
}
