import { render } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import FormContainer from '../../../components/FormContainer/FormContainer'
import i18n from '../../../i18n'
import { createDepositAccountForTesting } from '../utils/testing/depositAccounts'
import { DepositAccount } from '../virtualTerminalTypes'
import VirtualTerminalBillingInformation from './VirtualTerminalBillingInformation'

describe('Virtual Terminal Billing Information', () => {
  const renderBillingInformation = ({
    account = createDepositAccountForTesting(),
  }: Partial<Parameters<typeof VirtualTerminalBillingInformation>[0]>) =>
    render(
      <I18nextProvider i18n={i18n}>
        <FormContainer initialValues={{}} onSubmit={() => undefined}>
          <VirtualTerminalBillingInformation account={account} />
        </FormContainer>
      </I18nextProvider>
    )

  test('displays billing info if account.vt_require_street is true', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createDepositAccountForTesting({
        vt_require_street: true,
      }),
    })

    expect(queryByLabelText('City')).toBeInTheDocument()
  })

  test('displays billing info if account.vt_require_zip is true', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createDepositAccountForTesting({
        vt_require_zip: true,
      }),
    })

    expect(queryByLabelText('City')).toBeInTheDocument()
  })

  test('does not display billing info if account.vt_require_zip and vt_require_street are false', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createDepositAccountForTesting({
        vt_require_street: false,
        vt_require_zip: false,
      }),
    })

    expect(queryByLabelText('City')).not.toBeInTheDocument()
  })

  /**
   * Creates an account with vt_require_street set to true to ensure the billing info section is expanded.
   */
  const createAccountWithVisibleBillingInfo = (
    props: Partial<DepositAccount> = {}
  ) => createDepositAccountForTesting({ ...props, vt_require_street: true })

  test('displays Street if the account vt_street is true', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createAccountWithVisibleBillingInfo({
        vt_street: true,
      }),
    })

    expect(queryByLabelText('Street')).toBeInTheDocument()
  })

  test('does not display Street if the account vt_street is false', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createAccountWithVisibleBillingInfo({
        vt_street: false,
      }),
    })

    expect(queryByLabelText('Street')).not.toBeInTheDocument()
  })

  test('displays Zip Code if the account vt_zip is true', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createAccountWithVisibleBillingInfo({
        vt_zip: true,
      }),
    })

    expect(queryByLabelText('Zip Code')).toBeInTheDocument()
  })

  test('does not display Zip Code if the account vt_zip is false', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createAccountWithVisibleBillingInfo({
        vt_zip: false,
      }),
    })

    expect(queryByLabelText('Zip Code')).not.toBeInTheDocument()
  })

  test('displays Phone if the account vt_billing_phone is true', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createAccountWithVisibleBillingInfo({
        vt_billing_phone: true,
      }),
    })

    expect(queryByLabelText('Phone')).toBeInTheDocument()
  })

  test('does not display Phone if the account vt_billing_phone is false', () => {
    const { queryByLabelText } = renderBillingInformation({
      account: createAccountWithVisibleBillingInfo({
        vt_billing_phone: false,
      }),
    })

    expect(queryByLabelText('Phone')).not.toBeInTheDocument()
  })
})
