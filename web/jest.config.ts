import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setUpTests.ts'],
  testTimeout: 30000,
  // Jest does not use Parcel for build modules therefore
  // we must provides the proper aliases here as well
  moduleNameMapper: {
    '^react$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    '^react-dom$': 'preact/compat',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
    '@testing-library/react$': '@testing-library/preact',
  },
}

export default config
