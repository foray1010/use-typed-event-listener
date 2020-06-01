// @ts-ignore
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

export default [
  ...['cjs', 'esm'].map((build) => ({
    external: Object.keys(packageJson.dependencies),
    input: 'src/index.ts',
    output: {
      file: `dist/index.${build}.js`,
      format: build,
      plugins: [getBabelOutputPlugin()],
      sourcemap: true,
    },
    plugins: [
      replace({
        'fast-equals': `fast-equals/dist/fast-equals.${build}`,
      }),
      babel({
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'],
      }),
      terser(),
    ],
  })),
  {
    input: 'build/dts/index.d.ts',
    output: { file: 'dist/index.d.ts' },
    plugins: [dts()],
  },
]
