import { schema, Schema } from '@fortis/api'
import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { Field } from 'formik'
import FormContainer from '../FormContainer/FormContainer'
import { FormField } from './FormField'

describe('FormField', () => {
  const testLabel = 'Test Label'
  const fieldName = 'testfield'
  const errorText = 'This is an error'

  const renderField = (
    errorMessage: { type: string; message: string } | string = errorText,
    schema?: Schema<any>
  ) =>
    render(
      <FormContainer
        initialValues={{ [fieldName]: '1' }}
        onSubmit={() => Promise.resolve()}
        validateOnChange={true}
        {...(schema
          ? { jsonSchema: schema }
          : { validate: () => ({ [fieldName]: errorMessage }) })}
      >
        <FormField
          label={testLabel}
          name={fieldName}
          errorMessage={(msg) =>
            typeof msg === 'string'
              ? msg
              : `${msg.message} (${msg.type || 'unknown'})`
          }
        >
          <Field type="text" id={fieldName} name={fieldName} />
        </FormField>
      </FormContainer>
    )

  test('Renders the label', () => {
    const { getByText } = renderField()

    expect(getByText(testLabel)).toBeInTheDocument()
  })

  test('does not render the errors if no errors in fields', () => {
    const { queryByRole } = renderField()

    expect(queryByRole('alert')).not.toBeInTheDocument()
  })

  test('errorMessage option can convert errors', async () => {
    const { getByRole, getByLabelText } = renderField({
      type: 'BadRequest',
      message: 'Something went wrong',
    })

    await user.type(getByLabelText(testLabel), 'test')

    await user.tab()
    await waitFor(() =>
      expect(getByRole('alert')).toHaveTextContent(
        'Something went wrong (BadRequest)'
      )
    )
  })

  test('works with JSON schema in FormContainer', async () => {
    const formSchema = schema({
      $id: 'FormSchema',
      type: 'object',
      properties: {
        [fieldName]: {
          type: 'string',
          minLength: 10,
        },
      },
    } as const)
    const { getByRole, getByLabelText } = renderField(errorText, formSchema)

    await user.type(getByLabelText(testLabel), 'te')

    await user.tab()
    await waitFor(() =>
      expect(getByRole('alert')).toHaveTextContent(
        'must NOT have fewer than 10 characters (unknown)'
      )
    )
  })
})
