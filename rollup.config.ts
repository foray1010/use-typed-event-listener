import { babel } from '@rollup/plugin-babel'
import type { OutputOptions, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

const outputDir = 'dist'
const commonOutputOptions: Readonly<OutputOptions> = {
  dir: outputDir,
  exports: 'named',
  generatedCode: {
    constBindings: true,
    preset: 'es2015',
  },
  sourcemap: true,
}

const rollupOptions: readonly RollupOptions[] = [
  {
    external: /\/node_modules\//,
    input: 'src/index.ts',
    output: [
      {
        ...commonOutputOptions,
        entryFileNames: '[name].cjs',
        format: 'cjs',
      },
      {
        ...commonOutputOptions,
        entryFileNames: '[name].mjs',
        format: 'esm',
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
