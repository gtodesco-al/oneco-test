import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import * as router from 'react-router'
import i18n from '../../i18n'
import PasswordResetCode from './PasswordResetCode'

describe('PasswordResetCode', () => {
  const renderPasswordResetCode = (handleSubmit = () => Promise.resolve()) =>
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <PasswordResetCode onSubmit={handleSubmit} />
        </I18nextProvider>
      </BrowserRouter>
    )

  const useLocation = jest.spyOn(router, 'useLocation')
  const testEmail = 'hello@example.com'

  beforeEach(() => {
    useLocation.mockReturnValue({ search: `email=${testEmail}` } as any)
  })

  afterEach(() => useLocation.mockClear())

  test('Provides valid code field contents to onSubmit when continue button is clicked', async () => {
    const expectedCode = 'testcode'

    const handleSubmit = jest.fn()

    const { getByRole, getByText } = renderPasswordResetCode(handleSubmit)

    await user.type(getByRole('textbox'), expectedCode)

    await user.click(getByText(/continue/i))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(expectedCode, testEmail)
    )
  })

  test('Navigates to Reset Password page when user clicks Resend Email', async () => {
    const navigationSpy = jest.fn()

    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigationSpy)

    const { getByText } = renderPasswordResetCode()

    await user.click(getByText(/resend email/i))

    expect(navigationSpy).toHaveBeenCalledWith('/signin/forgot-password')
  })

  test('Displays validation message when no code is provided', async () => {
    const { getByText } = renderPasswordResetCode()

    await user.click(getByText(/continue/i))

    await waitFor(() =>
      expect(getByText(/a code must be provided/i)).toBeInTheDocument()
    )
  })
})
