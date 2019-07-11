// @ts-ignore
import babel from 'rollup-plugin-babel'
import dts from 'rollup-plugin-dts'
import replace from 'rollup-plugin-replace'
import {terser} from 'rollup-plugin-terser'

export default [
  ...['cjs', 'esm'].map((build) => ({
    input: 'src/index.ts',
    output: {
      file: `dist/index.${build}.js`,
      format: build,
      sourcemap: true
    },
    plugins: [
      babel({
        extensions: ['.ts']
      }),
      replace({
        'fast-equals': `fast-equals/dist/fast-equals.${build}`
      }),
      terser()
    ]
  })),
  {
    input: 'dist-dts/index.d.ts',
    output: {file: 'dist/index.d.ts'},
    plugins: [dts()]
  }
]
