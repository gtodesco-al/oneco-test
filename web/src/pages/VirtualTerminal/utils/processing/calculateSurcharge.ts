import { round } from 'lodash'
import { Surcharge } from '../../virtualTerminalTypes'

export const calculateSurcharge = (
  amount: number,
  { surcharge_rate, surcharge_fee, min_fee_amount, max_fee_amount }: Surcharge
) => {
  const surcharge_amount =
    amount * ((surcharge_rate ?? 0) / 100) + (surcharge_fee ?? 0)

  if (min_fee_amount !== undefined && surcharge_amount < min_fee_amount) {
    return round(min_fee_amount, 2)
  }

  if (max_fee_amount !== undefined && surcharge_amount > max_fee_amount) {
    return round(max_fee_amount, 2)
  }

  return round(surcharge_amount, 2)
}
