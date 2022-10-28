export const currency = (value: number) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const numberString = (value: number) => value.toLocaleString('en-US')
