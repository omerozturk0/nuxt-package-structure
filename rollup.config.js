import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import alias from 'rollup-plugin-alias'
import { terser } from 'rollup-plugin-terser'
import path from 'path'
import rimraf from 'rimraf'
import pascalcase from 'pascalcase'

const cwd = process.cwd()
// eslint-disable-next-line
const pkg = require(path.join(cwd, 'package.json'))

rimraf.sync(path.join(cwd, './lib'))

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Ömer Öztürk
  * @license MIT
  */`

const exportName = pascalcase(pkg.name)

function createEntry(
  {
    format, // Rollup format (iife, umd, cjs, es)
    external = [
      '@vue/composition-api'
    ],
    input = 'src/index.ts', // entry point
    env = 'development', // NODE_ENV variable
    minify = false,
    isBrowser = false, // produce a browser module version or not
  } = {
    input: 'src/index.ts',
    env: 'development',
    minify: false,
    isBrowser: false,
  }
) {
  // force production mode when minifying
  if (minify) env = 'production'

  const config = {
    input,
    plugins: [
      replace({
        __VERSION__: pkg.version,
        'process.env.NODE_ENV': `'${env}'`,
      }),
      alias({
        resolve: ['.ts', '.js']
      }),
    ],
    output: {
      banner,
      globals: {
        '@vue/composition-api': 'VueCompositionApi',
        '@vue-storefront/commercetools': 'commercetools',
        '@vue-storefront/core': 'core',
        '@vue-storefront/commercetools-api': 'commercetoolsApi',
        '@commercetools/sdk-client': 'SdkClient',
        '@commercetools/sdk-middleware-auth': 'SdkMiddlewareAuth',
        '@commercetools/sdk-middleware-http': 'SdkMiddlewareHttp'
      },
      file: `lib/${pkg.name}.UNKNOWN.js`,
      format,
    },
  }

  if (format === 'iife') {
    config.output.file = pkg.unpkg
    config.output.name = exportName
  } else if (format === 'es') {
    config.output.file = isBrowser ? pkg.browser : pkg.module
  } else if (format === 'cjs') {
    config.output.file = pkg.main
  }

  if (!external) {
    config.plugins.push(resolve(), commonjs())
  } else {
    config.external = Object.keys(pkg.dependencies)
  }

  config.plugins.push(
    ts({
      // only check once, during the es version with browser (it includes external libs)
      check: format === 'es' && isBrowser && !minify,
      tsconfigOverride: {
        exclude: ['__tests__'],
        compilerOptions: {
          // same for d.ts files
          declaration: format === 'es' && isBrowser && !minify,
          target: format === 'es' && !isBrowser ? 'esnext' : 'es5',
        },
      },
    })
  )

  if (minify) {
    config.plugins.push(
      terser({
        module: format === 'es',
        output: {
          preamble: banner,
        },
      })
    )
    config.output.file = config.output.file.replace(/\.js$/i, '.min.js')
  }

  config.output.exports = 'named';
  config.output.sourcemap = true;

  return config
}

const builds = [createEntry({ format: 'es', isBrowser: true })]

if (pkg.unpkg) {
  builds.push(
    createEntry({ format: 'iife' }),
    createEntry({ format: 'iife', minify: true }),
    createEntry({ format: 'es', isBrowser: true, minify: true })
  )
}

export default builds
