import { User } from '@fortis/api'
import { round } from 'lodash'
import {
  DepositAccount,
  Surcharge,
  TransactionType,
} from '../../virtualTerminalTypes'
import { calculateSurcharge } from './calculateSurcharge'
import { calculateTax } from './calculateTax'

interface ReturnType {
  surcharge_amount?: number
  tax?: number
  transaction_amount: number
}

const calculateTaxForTotals = (
  account: DepositAccount,
  subtotal: number,
  taxRate: number | undefined
) => {
  if (!account.vt_enable_sales_tax || taxRate === undefined) {
    return
  }

  return calculateTax(subtotal, taxRate)
}

const calculateSurchargeForTotals = (
  user: User,
  transactionType: TransactionType,
  subtotal: number,
  surcharge: Surcharge | undefined
) => {
  if (
    !surcharge ||
    (surcharge.apply_to_user_type_id !== undefined &&
      surcharge.apply_to_user_type_id !== user.user_type_id) ||
    (transactionType === 'refund' && !surcharge.refund_surcharges)
  ) {
    return
  }

  return calculateSurcharge(subtotal, surcharge)
}

/**
 * Calculates totals for the virtual terminal.  The structure returned is designed to be spread over a transaction form.
 */
export const calculateTransactionTotals = (
  user: User,
  account: DepositAccount,
  transactionType: TransactionType,
  subtotal: number | string, //May be stored as a string, accepting strings simplifies this.
  taxRate: number | undefined = undefined,
  taxOverride: number | undefined = undefined
): ReturnType => {
  //Start by handling string subtotals.  If it's a string and isn't valid, just return a transaction amount of 0.
  if (typeof subtotal === 'string') {
    subtotal = Number(subtotal.replace(',', '')) //Remove commas from large numbers (ie. 1,000,000)
  }

  if (isNaN(subtotal)) {
    return { transaction_amount: 0 }
  }

  const { surcharge, tax_surcharge_config } = account

  const taxFirst = tax_surcharge_config === 3

  let transaction_amount = round(subtotal, 2)

  if (taxFirst) {
    const tax =
      taxOverride ?? calculateTaxForTotals(account, transaction_amount, taxRate)

    transaction_amount += tax ?? 0

    const surcharge_amount = calculateSurchargeForTotals(
      user,
      transactionType,
      transaction_amount,
      surcharge
    )

    transaction_amount += surcharge_amount ?? 0

    return {
      transaction_amount,
      surcharge_amount,
      tax,
    }
  } else {
    const surcharge_amount = calculateSurchargeForTotals(
      user,
      transactionType,
      transaction_amount,
      surcharge
    )

    transaction_amount += surcharge_amount ?? 0

    const tax =
      taxOverride ?? calculateTaxForTotals(account, transaction_amount, taxRate)

    transaction_amount += tax ?? 0

    return {
      transaction_amount,
      surcharge_amount,
      tax,
    }
  }
}
