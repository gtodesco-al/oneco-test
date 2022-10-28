import { preprocessCurrencyAmount } from './preprocessCurrencyAmount'

describe('preprocessCurrencyAmount', () => {
  interface TestCase {
    input: number | string | undefined
    expected: number
  }

  ;[
    {
      input: undefined,
      expected: 0,
    },
    {
      input: '',
      expected: 0,
    },
    {
      input: 'test',
      expected: 0,
    },
    {
      input: 0,
      expected: 0,
    },
    {
      input: 123,
      expected: 12300,
    },
    {
      input: 123.45,
      expected: 12345,
    },
    {
      input: '123,456.78',
      expected: 12345678,
    },
    {
      input: '123456',
      expected: 12345600,
    },
    {
      input: '12345.6',
      expected: 1234560,
    },
  ].forEach(({ input, expected }: TestCase) => {
    test(`returns ${expected} given ${input}`, () => {
      expect(preprocessCurrencyAmount(input)).toBe(expected)
    })
  })
})
