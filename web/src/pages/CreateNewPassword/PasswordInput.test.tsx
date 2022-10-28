import { fireEvent, render, RenderResult } from '@testing-library/preact'
import { Formik } from 'formik'
import user from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n'
import { PasswordInput, PasswordInputIndicatorColors } from './PasswordInput'

describe('PasswordInput', () => {
  const renderPasswordInput = () =>
    render(
      <I18nextProvider i18n={i18n}>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          onSubmit={() => Promise.resolve()}
        >
          <PasswordInput name="password" label="password" />
        </Formik>
      </I18nextProvider>
    )

  const rules = {
    oneLetter: /at least one letter/i,
    oneNumber: /at least one number/i,
    eightChars: /at least 8 characters/i,
    oneSpecial: /at least 1 special character/i,
  }

  // This tests for both aria-hidden and the neutral color.
  // It uses the neutral color because that indicates errors while field has focus.
  const expectHasErrors = (form: RenderResult, failedRules: RegExp[]) => {
    const baseRules = Object.values(rules)
    for (const rule of baseRules) {
      const element = form.queryByText(rule)?.querySelector('div')

      if (failedRules.includes(rule)) {
        expect(element?.parentElement).toHaveAttribute('aria-hidden', 'false')
        expect(element).toHaveClass(PasswordInputIndicatorColors.neutral)
      } else {
        expect(element?.parentElement).toHaveAttribute('aria-hidden', 'true')
        expect(element).toHaveClass(PasswordInputIndicatorColors.pass)
      }
    }
  }

  ;[
    {
      password: 'Test Password 1!',
      failedRules: [],
    },
    {
      password: ' ',
      failedRules: Object.values(rules),
    },
    {
      password: '1234567!',
      failedRules: [rules.oneLetter],
    },
    {
      password: 'abcdefg1',
      failedRules: [rules.oneSpecial],
    },
    {
      password: 'abcdefg!',
      failedRules: [rules.oneNumber],
    },
    {
      password: 'a1!',
      failedRules: [rules.eightChars],
    },
    {
      password: '1',
      failedRules: [rules.oneLetter, rules.oneSpecial, rules.eightChars],
    },
  ].forEach(({ password, failedRules }) =>
    test(`Triggers only the appropriate rules for ${password}`, async () => {
      const form = renderPasswordInput()

      await user.type(form.getByLabelText(/^password/i), password)
      fireEvent.blur(form.getByLabelText(/^password/i))

      expectHasErrors(form, failedRules)
    })
  )
})
