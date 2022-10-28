type ObjectWithProperties = { [key: string]: any }

/**
 * Takes an object of the form:
 * {
 *    billing: {
 *      street: "ASC"
 *    }
 * }
 * And turns it into an object of the form:
 * {
 *    "billing.street": "ASC"
 * }
 */
export function objectToDottedString(
  obj?: ObjectWithProperties,
  parent?: any,
  res: ObjectWithProperties = {}
): ObjectWithProperties {
  if (!obj) return res

  for (const key of Object.keys(obj)) {
    const propName = parent ? parent + '.' + key : key
    if (typeof obj[key] === 'object') {
      objectToDottedString(obj[key], propName, res)
    } else {
      res[propName] = obj[key]
    }
  }
  return res
}

/**
 * convert a string like "billing_address.street" to an object
 * of the shape:
 * {
 *    billing_address: {
 *      street: <value>
 *    }
 * }
 */
export function dottedStringToObject(column: string, value: string): any {
  if (column.includes('.')) {
    const properties = column.split('.')
    return properties.reduceRight((all: any, column: string, i: number) => {
      return {
        [column]: i === properties.length - 1 ? value : all,
      }
    }, {})
  }
  return { [column]: value }
}
