import { Surcharge } from '../../virtualTerminalTypes'
import { calculateSurcharge } from './calculateSurcharge'

describe('calculateSurcharge', () => {
  interface TestCase {
    amount: number
    surcharge: Surcharge
    expectedSurchargeAmount: number
  }

  ;[
    {
      amount: 1,
      surcharge: {},
      expectedSurchargeAmount: 0,
    },
    {
      amount: 1,
      surcharge: {
        surcharge_rate: 12,
      },
      expectedSurchargeAmount: 0.12,
    },
    {
      amount: 1,
      surcharge: {
        surcharge_fee: 2,
      },
      expectedSurchargeAmount: 2,
    },
    {
      amount: 1,
      surcharge: {
        surcharge_rate: 12.9,
        surcharge_fee: 2,
      },
      expectedSurchargeAmount: 2.13,
    },
    {
      amount: 1.45,
      surcharge: {
        surcharge_rate: 12.9,
        surcharge_fee: 2.12,
      },
      expectedSurchargeAmount: 2.31,
    },
    {
      amount: 1.45,
      surcharge: {
        surcharge_rate: 12.9,
        surcharge_fee: 2.12,
        min_fee_amount: 10,
        max_fee_amount: 20,
      },
      expectedSurchargeAmount: 10,
    },
    {
      amount: 1.45,
      surcharge: {
        surcharge_rate: 12.9,
        surcharge_fee: 2.12,
        min_fee_amount: 1,
        max_fee_amount: 2,
      },
      expectedSurchargeAmount: 2,
    },
    {
      amount: 1.45,
      surcharge: {
        surcharge_rate: 12.9,
        surcharge_fee: 2.12,
        min_fee_amount: 1,
        max_fee_amount: 20,
      },
      expectedSurchargeAmount: 2.31,
    },
  ].forEach(({ amount, surcharge, expectedSurchargeAmount }: TestCase) => {
    test(`given ${amount} and a surcharge object with ${JSON.stringify(
      surcharge
    )}, returns ${expectedSurchargeAmount}`, () => {
      expect(calculateSurcharge(amount, surcharge)).toBe(
        expectedSurchargeAmount
      )
    })
  })
})
