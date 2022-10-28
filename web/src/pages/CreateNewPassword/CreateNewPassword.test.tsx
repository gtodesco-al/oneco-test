import { render, RenderResult, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import * as router from 'react-router'
import i18n from '../../i18n'
import CreateNewPassword, { CreateNewPasswordProps } from './CreateNewPassword'

//The password input is complex enough to require its own suite of tests.
describe('CreateNewPassword', () => {
  const renderCreateNewPassword = ({
    onSubmit,
  }: Partial<CreateNewPasswordProps> = {}) =>
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <CreateNewPassword onSubmit={onSubmit ?? (() => Promise.resolve())} />
        </I18nextProvider>
      </BrowserRouter>
    )
  const useLocation = jest.spyOn(router, 'useLocation')
  const testEmail = 'hello@example.com'
  const testCode = '123456'

  beforeEach(() => {
    useLocation.mockReturnValue({
      search: `email=${testEmail}&code=${testCode}`,
    } as any)
  })

  afterEach(() => useLocation.mockClear())

  const submitFormWith = async (
    form: RenderResult,
    password: string,
    confirmedPassword = password
  ) => {
    const { getByRole, getByLabelText } = form

    await user.type(getByLabelText(/^new password/i), password)
    await user.type(getByLabelText(/confirm new password/i), confirmedPassword)

    await user.click(getByRole('button'))
  }

  test('Submits valid password when continue button is clicked', async () => {
    const expectedPassword = 'Test Password 1!'

    const onSubmit = jest.fn()

    const form = renderCreateNewPassword({ onSubmit })

    await submitFormWith(form, expectedPassword)

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        testEmail,
        testCode,
        expectedPassword
      )
    )
  })

  test('Displays a validation message if the password fields are empty', async () => {
    const { getByRole, getByText } = renderCreateNewPassword()

    await user.click(getByRole('button'))

    await waitFor(() =>
      expect(getByText(/a password must be provided/i)).toBeInTheDocument()
    )
  })

  test('Displays a validation message if the password fields do not match', async () => {
    const expectedPassword = 'Test Password 1!'

    const form = renderCreateNewPassword()

    await submitFormWith(form, expectedPassword, expectedPassword + 1)

    await waitFor(() =>
      expect(form.getByText(/a password must be provided/i)).toBeInTheDocument()
    )
  })
})
