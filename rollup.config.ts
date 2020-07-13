import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import fastEqualsPkg from 'fast-equals/package.json'
import type { RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const outputDir = 'dist'

const rollupOptions: RollupOptions[] = [
  {
    external: Object.keys(pkg.dependencies),
    input: 'src/index.ts',
    output: [
      {
        dir: outputDir,
        entryFileNames: '[name].[format].js',
        format: 'cjs',
        paths: {
          'fast-equals': `fast-equals/${fastEqualsPkg.main}`,
        },
        plugins: [getBabelOutputPlugin()],
        preferConst: true,
        sourcemap: true,
      },
      {
        dir: outputDir,
        entryFileNames: '[name].esm.js',
        format: 'esm',
        paths: {
          'fast-equals': `fast-equals/${fastEqualsPkg.module}`,
        },
        plugins: [getBabelOutputPlugin()],
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'],
      }),
      terser(),
    ],
  },
  {
    input: 'build/dts/index.d.ts',
    output: {
      dir: outputDir,
      entryFileNames: '[name].ts',
    },
    plugins: [dts()],
  },
]

export default rollupOptions
