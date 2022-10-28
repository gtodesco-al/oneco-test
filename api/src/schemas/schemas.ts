import { Ajv, Infer, schema } from '@feathersjs/schema'
import addFormats from 'ajv-formats'
import { definitions } from './schemas.oas'

const ajv = addFormats(
  new Ajv({
    strict: false,
    logger: false,
    allErrors: true,
  }),
  ['email', 'regex']
)

const contactDefinition = definitions['/v1/contacts']

export const contactSchema = schema(
  {
    $id: '/v1/contacts',
    ...contactDefinition,
    required: ['last_name'],
  } as const,
  ajv
)

export const loginSchema = schema(
  {
    $id: '/login',
    type: 'object',
    additionalProperties: false,
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        minLength: 1,
      },
      password: {
        type: 'string',
        minLength: 1,
      },
    },
  } as const,
  ajv
)

export type LoginData = Infer<typeof loginSchema>
