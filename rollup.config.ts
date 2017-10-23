import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import camelCase from 'lodash.camelcase';

const pkg = require('./package.json');

const libraryName = 'poa';

export default {
  input: `compiled/${libraryName}.js`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd' },
    { file: pkg.module, format: 'es' }
  ],
  sourcemap: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    'mobx',
    'mobx-react',
    'satcheljs',
    'js-logger',
    'i18next'
  ],
  watch: {
    include: 'compiled/**'
  },
  plugins: [
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    uglify({}, minify),

    // Resolve source maps to the original source
    sourceMaps()
  ]
};
