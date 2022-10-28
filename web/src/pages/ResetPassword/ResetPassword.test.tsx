import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import i18n from '../../i18n'
import ResetPassword from './ResetPassword'

describe('Reset Password', () => {
  const renderPasswordReset = (handleSubmit = () => Promise.resolve()) =>
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <ResetPassword onSubmit={handleSubmit} />
        </I18nextProvider>
      </BrowserRouter>
    )

  test('Provides valid email field contents to onSubmit when submit button is clicked', async () => {
    const expectedEmail = 'test@email.com'

    const handleSubmit = jest.fn()

    const { getByRole } = renderPasswordReset(handleSubmit)

    await user.type(getByRole('textbox'), expectedEmail)

    await user.click(getByRole('button'))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(expectedEmail)
    )
  })

  test('Displays validation message for no email', async () => {
    const { getByRole, getByText } = renderPasswordReset()

    await user.click(getByRole('button'))

    await waitFor(() =>
      expect(getByText(/invalid email address/i)).toBeInTheDocument()
    )
  })
})
