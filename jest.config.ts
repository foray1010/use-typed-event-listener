import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{cjs,js,mjs,ts,tsx}'],
  coverageReporters: ['lcov', 'text-summary'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.{spec,test}.{cjs,js,mjs,ts,tsx}'],
}

export default config
