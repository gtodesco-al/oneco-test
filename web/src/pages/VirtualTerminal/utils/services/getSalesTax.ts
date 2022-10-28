import { api } from '../../../../api'

export const getSalesTaxByZipCode = async (zipCode: string) => {
  const results = await api.service('sales-taxes').find({
    query: {
      'filter[country]': '"US"',
      'filter[zip_code]': `"${zipCode}"`,
    },
  })

  if (results.length === 0) {
    return undefined
  }

  return results[0].rate
}
