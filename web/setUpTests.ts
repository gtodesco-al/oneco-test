import '@testing-library/jest-dom/extend-expect'
import { join } from 'path'
import { config } from 'dotenv'

config({
  path: join(__dirname, '.env'),
})

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
