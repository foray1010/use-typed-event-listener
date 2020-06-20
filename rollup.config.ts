// @ts-ignore
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import type { ModuleFormat, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

const formats: ModuleFormat[] = ['cjs', 'esm']

const rollupOptions: RollupOptions[] = [
  ...formats.map(
    (format): RollupOptions => ({
      external: Object.keys(packageJson.dependencies),
      input: 'src/index.ts',
      output: {
        file: `dist/index.${format}.js`,
        format,
        plugins: [getBabelOutputPlugin()],
        sourcemap: true,
      },
      plugins: [
        replace({
          'fast-equals': `fast-equals/dist/fast-equals.${format}`,
        }),
        babel({
          babelHelpers: 'runtime',
          extensions: ['.js', '.ts'],
        }),
        terser(),
      ],
    }),
  ),
  {
    input: 'build/dts/index.d.ts',
    output: { file: 'dist/index.d.ts' },
    plugins: [dts()],
  },
]

export default rollupOptions
