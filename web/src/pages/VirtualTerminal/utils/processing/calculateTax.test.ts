import { calculateTax } from './calculateTax'

describe('calculateTax', () => {
  ;[
    {
      subtotal: 1,
      taxRate: 99.99,
      expectedTax: 1.0,
    },
    {
      subtotal: 1,
      taxRate: 0,
      expectedTax: 0,
    },
    {
      subtotal: 1,
      taxRate: 50,
      expectedTax: 0.5,
    },
    {
      subtotal: 33.58,
      taxRate: 12.73,
      expectedTax: 4.27,
    },
  ].forEach(({ subtotal, taxRate, expectedTax }) => {
    test(`given an amount of ${subtotal} and tax rate of ${taxRate}, returns ${expectedTax}.`, () => {
      expect(calculateTax(subtotal, taxRate)).toBe(expectedTax)
    })
  })
})
