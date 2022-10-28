import { round } from 'lodash'

export const calculateTax = (subtotal: number, taxRate: number) =>
  round(round(subtotal, 2) * (taxRate / 100), 2)
