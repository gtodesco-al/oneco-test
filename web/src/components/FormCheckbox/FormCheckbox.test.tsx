import { render, waitFor } from '@testing-library/preact'
import FormContainer from '../FormContainer/FormContainer'
import user from '@testing-library/user-event'

import { FormCheckbox } from './FormCheckbox'

describe('FormCheckbox', () => {
  test('binds to form field', async () => {
    const spy = jest.fn()

    const testFieldLabel = 'Test Field'
    const { getByLabelText, getByRole } = render(
      <FormContainer initialValues={{ test_field: false }} onSubmit={spy}>
        <FormCheckbox label={testFieldLabel} name="test_field" />
        <button type="submit">Submit</button>
      </FormContainer>
    )

    await user.click(getByLabelText(testFieldLabel))

    await user.click(getByRole('button'))

    await waitFor(
      () => expect(spy).toHaveBeenCalledWith({ test_field: true }),
      { timeout: 100 }
    )
  })
})
