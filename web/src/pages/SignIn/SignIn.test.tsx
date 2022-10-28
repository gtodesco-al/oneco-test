import { render, screen, fireEvent } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import i18n from '../../i18n'

import SignIn from './SignIn'

describe('SignIn', () => {
  const { getByText, getByRole, getByLabelText } = screen

  beforeEach(() => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <SignIn />
        </I18nextProvider>
      </BrowserRouter>
    )
  })

  it('should be able to render the texts', () => {
    expect(getByText(/sign in to your account/i)).toBeInTheDocument()
    expect(
      getByText(/welcome back! please enter you account details./i)
    ).toBeInTheDocument()
  })

  it('should be able to render the components', () => {
    expect(getByText('Email')).toBeInTheDocument()
    expect(getByText('Password')).toBeInTheDocument()
    expect(getByText(/forgot your password/i)).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
  })

  it.skip('should be able to click on the `Sign In` button', () => {
    fireEvent.change(getByLabelText('Email'), {
      target: {
        value: 'hello@example.com',
      },
    })
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'foobarbaz' },
    })

    const buttonSignIn = getByRole('button')
    expect(fireEvent.click(buttonSignIn)).toBeTruthy()
  })

  it('should be able to click on the `Forgot your password` link', () => {
    const forgotPassword = getByText(/forgot your password/i)

    expect(fireEvent.click(forgotPassword)).toBeTruthy()
  })
})
