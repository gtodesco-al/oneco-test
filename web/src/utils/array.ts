/**
 * Divide array 'a' into equal parts with a length 'of'
 *
 * @param a An array of any type that is divisible 'by'
 * @param of The number of equal parts to divide 'a' in to
 * @returns An array of equal length arrays
 */
export function partitionArray<T>(a: T[], of: number): T[][] {
  if (a.length % of !== 0)
    throw Error(`Array must have a lenth divisible by '${of}'`)

  const result = []
  for (let i = 0; i < a.length; i += of) {
    result.push(a.slice(i, i + of))
  }
  return result
}
