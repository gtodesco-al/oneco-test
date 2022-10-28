#!/usr/bin/node

// This script takes the schema definitions from the oas.json and writes it
// as a statically typed TypeScript definition file
const path = require('path')
const fs = require('fs/promises')
const configuration = require('./configuration.json')
const oas = require(path.join(__dirname, 'oas.json'))

const {
  paths,
  components: { schemas },
} = oas

// The regular expressions in the oas.json are not compatible with JavaScript
// so we have to convert their escaping
const sanitize = (str) =>
  str
    .replaceAll('{4}\\\\-){3}', '{4}-){3}')
    .replaceAll('\\\\#', '#')
    .replaceAll('\\\\,', ',')
    .replaceAll('\\\\.', '.')
    .replaceAll("\\\\'", "'")
    .replaceAll('\\\\&', '&')
    .replaceAll('\\\\/', '/')
    .replaceAll('\\\\_', '_')

const writeTypes = async (config, target) => {
  const result = {}

  for (const componentName of config.components || []) {
    if (!schemas[componentName]) {
      console.error(`Schema ${componentName} does not exist in components`)
    } else {
      result[componentName] = schemas[componentName]
    }
  }

  for (const apiPath of config.paths || []) {
    const pathSpec = paths[apiPath]
    const { schema } =
      (pathSpec?.post || pathSpec?.patch)?.requestBody?.content[
        'application/json'
      ] || {}

    if (!schema) {
      console.error(`No definition for path ${apiPath}`)
    } else {
      result[apiPath] = schema
    }
  }

  await fs.writeFile(
    target,
    `// AUTO GENERATED - do not modify
export const definitions = ${sanitize(JSON.stringify(result, null, '  '))} as const
  
export type OpenApiSpec = typeof definitions
  `
  )

  console.log(`Wrote spec to file ${target}`)
}

;(async () => {
  const schemaFolder = path.join(__dirname, '..', 'src', 'schemas')
  
  await writeTypes(configuration.types, path.join(schemaFolder, 'types.oas.ts'))
  await writeTypes(configuration.schemas, path.join(schemaFolder, 'schemas.oas.ts'))
})()
