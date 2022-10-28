/**
 * Currency strings can be in various formats.  This method will do its best to translate them to a number that can be used by the API
 */
export const preprocessCurrencyAmount = (
  amount: string | number | undefined | null
): number => {
  if (amount === undefined) {
    return 0
  }

  if (typeof amount === 'string') {
    amount = amount.replace(',', '') //API will add commas to larger numbers
  }

  const numAmount = Number(amount)

  if (isNaN(numAmount)) {
    return 0
  }

  return numAmount * 100
}
