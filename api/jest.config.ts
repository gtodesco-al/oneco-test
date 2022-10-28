import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./setUpTests.ts'],
  testTimeout: 30000,
}

export default config
