import {
  applyConfig,
  eslintIgnoresConfig,
  eslintNodeConfig,
  eslintReactConfig,
} from '@foray1010/eslint-config'

const reactDirs = ['src']

const config = [
  ...eslintIgnoresConfig,
  ...applyConfig(
    {
      filePrefixes: '.',
      ignores: reactDirs.map((dir) => `${dir}/**`),
    },
    eslintNodeConfig,
  ),
  ...applyConfig(
    {
      filePrefixes: reactDirs,
    },
    eslintReactConfig,
  ),
]
export default config
