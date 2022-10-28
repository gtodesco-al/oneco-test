import { render } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import FormContainer from '../../../components/FormContainer/FormContainer'
import i18n from '../../../i18n'

import { createDepositAccountForTesting } from '../utils/testing/depositAccounts'
import { createLocationForTesting } from '../utils/testing/locations'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import PaymentAccountDetails, {
  UnboundPaymentAccountDetails,
} from './PaymentAccountDetails'

describe('PaymentAccountDetails', () => {
  const terminalOptionName = 'Terminal'
  const manualOptionName = 'Manual/Swipe'

  const renderPaymentAccountDetails = ({
    account = createDepositAccountForTesting(),
    user = createUserForPermissionTesting(),
    location = createLocationForTesting(),
    processMethod = 'manual',
    accountType = 'personal',
    routingNumberService = undefined,
  }: Partial<Parameters<typeof UnboundPaymentAccountDetails>[0]> = {}) =>
    render(
      <I18nextProvider i18n={i18n}>
        <FormContainer initialValues={{}} onSubmit={() => undefined}>
          <UnboundPaymentAccountDetails
            account={account}
            user={user}
            location={location}
            processMethod={processMethod}
            setProcessMethod={() => undefined}
            accountType={accountType}
            setAccountType={() => undefined}
            routingNumberService={routingNumberService}
            customer={undefined}
            walletItems={[]}
            selectedWalletItem={undefined}
            onChangeWalletItem={() => undefined}
            onCreateBankAccount={() => undefined}
            onCreateCreditCard={() => undefined}
          />
        </FormContainer>
      </I18nextProvider>
    )

  const bluetoothTerminal = {
    id: '1',
    title: 'Bluetooth',
    terminal_manufacturer_id: '4',
  }
  const fakeTerminal = {
    id: '2',
    title: 'Fake',
    terminal_manufacturer_id: '100',
  }
  const validTerminal = {
    id: '3',
    title: 'Valid',
    terminal_manufacturer_id: '1',
  }

  const validLocation = createLocationForTesting({
    terminals: [bluetoothTerminal, fakeTerminal, validTerminal],
  })

  const validCcRetailAccount = createDepositAccountForTesting({
    payment_method: 'cc',
    industry_type: 'retail',
  })

  const validTerminalUser = createUserForPermissionTesting(
    'v2.terminaltransactions.post'
  )
  const validRouterUser = createUserForPermissionTesting(
    'v2.routertransactions.post'
  )

  const terminalShownParams: Partial<
    Parameters<typeof PaymentAccountDetails>[0]
  > = {
    account: validCcRetailAccount,
    location: validLocation,
    user: validRouterUser,
  }

  //Custom assert functions to reduce code duplication.
  const expectFieldToShow = (
    fieldLabel: string,
    params: Partial<Parameters<typeof PaymentAccountDetails>[0]>
  ) => {
    const { queryByLabelText } = renderPaymentAccountDetails(params)
    expect(queryByLabelText(fieldLabel)).toBeInTheDocument()
  }

  const expectFieldNotToShow = (
    fieldLabel: string,
    params: Partial<Parameters<typeof PaymentAccountDetails>[0]>
  ) => {
    const { queryByLabelText } = renderPaymentAccountDetails(params)
    expect(queryByLabelText(fieldLabel)).not.toBeInTheDocument()
  }

  const expectTerminalOptionNotToShow = (
    params: Partial<Parameters<typeof PaymentAccountDetails>[0]>
  ) => expectFieldNotToShow(terminalOptionName, params)

  test('Terminal option shows if location has at least one real non-bluetooth terminal, account is cc and not an invalid industry type, and user has v2.terminaltransactions.post', () => {
    expectFieldToShow(terminalOptionName, {
      ...terminalShownParams,
      user: validTerminalUser,
    })
  })

  test('Terminal option shows if location has at least one real non-bluetooth terminal, account is cc and not an invalid industry type, and user has v2.routertransactions.post', () => {
    expectFieldToShow(terminalOptionName, {
      ...terminalShownParams,
      user: validRouterUser,
    })
  })

  test('Terminal option does not show if the user has no permissions', () => {
    expectTerminalOptionNotToShow({
      ...terminalShownParams,
      user: createUserForPermissionTesting(),
    })
  })

  test('Terminal option does not show if the location only has fake or bluetooth terminals', () => {
    expectTerminalOptionNotToShow({
      ...terminalShownParams,
      location: createLocationForTesting({
        terminals: [fakeTerminal, bluetoothTerminal],
      }),
    })
  })

  test('Terminal option does not show if the account industry_type is moto', () => {
    expectTerminalOptionNotToShow({
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        industry_type: 'moto',
      }),
    })
  })

  test('Terminal option does not show if the account industry_type is ecommerce', () => {
    expectTerminalOptionNotToShow({
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        industry_type: 'ecommerce',
      }),
    })
  })

  test('Terminal option does not show if the account payment_method is ach', () => {
    expectTerminalOptionNotToShow({
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        payment_method: 'ach',
      }),
    })
  })

  test('Manual/Swipe option is shown if Terminal option is shown', () => {
    expectFieldToShow(manualOptionName, terminalShownParams)
  })

  test('Manual/Swipe option is not shown if it is the only option', () => {
    expectFieldNotToShow(manualOptionName, {})
  })

  test('defaults to Manual/Swipe if no preference is provided on the user', () => {
    const { getByLabelText } = renderPaymentAccountDetails(terminalShownParams)

    expect(getByLabelText('Manual/Swipe')).toBeChecked()
  })

  test('displays Card Holder Name field if account is CC and payment method is manual', () => {
    expectFieldToShow('Card Holder Name', {
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        payment_method: 'cc',
      }),
    })
  })

  test('does not display Card Holder Name field if account is ACH', () => {
    expectFieldNotToShow('Card Holder Name', {
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        payment_method: 'ach',
      }),
    })
  })

  test('does not display Card Holder Name field if payment method is terminal', () => {
    expectFieldNotToShow('Card Holder Name', {
      ...terminalShownParams,
      processMethod: 'terminal',
      account: createDepositAccountForTesting({
        payment_method: 'cc',
      }),
    })
  })

  test('displays Card number field if account is CC and payment method is manual', () => {
    expectFieldToShow('Card number', {
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        payment_method: 'cc',
      }),
    })
  })

  test('does not display Card number field if account is ACH', () => {
    expectFieldNotToShow('Card number', {
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        payment_method: 'ach',
      }),
    })
  })

  test('does not display Card number field if process method is terminal', () => {
    expectFieldNotToShow('Card number', {
      ...terminalShownParams,
      processMethod: 'terminal',
      account: createDepositAccountForTesting({
        payment_method: 'cc',
      }),
    })
  })

  test('displays CVV if account is CC, payment method is manual and vt_cvv is true', () => {
    expectFieldToShow('CVV', {
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        payment_method: 'cc',
        vt_cvv: true,
      }),
    })
  })

  test('does not display CVV if vt_cvv is false', () => {
    expectFieldNotToShow('CVV', {
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        payment_method: 'cc',
      }),
    })
  })

  test('does not display CVV field if account is ACH', () => {
    expectFieldNotToShow('CVV', {
      ...terminalShownParams,
      account: createDepositAccountForTesting({
        payment_method: 'ach',
        vt_cvv: true,
      }),
    })
  })

  test('does not display CVV field if process method is terminal', () => {
    expectFieldNotToShow('CVV', {
      ...terminalShownParams,
      processMethod: 'terminal',
      account: createDepositAccountForTesting({
        payment_method: 'cc',
        vt_cvv: true,
      }),
    })
  })

  describe('ACH fields', () => {
    const achShownParams: Partial<Parameters<typeof PaymentAccountDetails>[0]> =
      {
        ...terminalShownParams,
        processMethod: 'manual',
        account: createDepositAccountForTesting({
          payment_method: 'ach',
        }),
      }

    test('ACH fields display when account is ACH and process method is manual', () => {
      const { queryByText } = renderPaymentAccountDetails(achShownParams)

      expect(queryByText('Account Options')).toBeInTheDocument()
    })

    test('ACH fields do not display when account is cc', () => {
      const { queryByText } = renderPaymentAccountDetails({
        ...achShownParams,
        account: createDepositAccountForTesting({
          payment_method: 'cc',
        }),
      })

      expect(queryByText('Account Options')).not.toBeInTheDocument()
    })

    test('ACH fields do not display when payment method is terminal', () => {
      const { queryByText } = renderPaymentAccountDetails({
        ...achShownParams,
        processMethod: 'terminal',
      })

      expect(queryByText('Account Options')).not.toBeInTheDocument()
    })

    test('Checking account option is available', () => {
      expectFieldToShow('Checking', achShownParams)
    })

    test('Saving account option is available', () => {
      expectFieldToShow('Saving', achShownParams)
    })

    test('Personal account type is available', () => {
      expectFieldToShow('Personal', achShownParams)
    })

    test('Business account type is available', () => {
      expectFieldToShow('Business', achShownParams)
    })
    ;['PPD', 'TEL', 'WEB'].forEach((code) =>
      test(`SEC Code has ${code} if Personal account type selected`, async () => {
        const { getByText } = renderPaymentAccountDetails(achShownParams)

        await user.click(getByText('Select an SEC Code'))

        expect(getByText(code)).toBeInTheDocument()
      })
    )

    test('SEC Code has CCD if Business account type selected.', async () => {
      const { getByText } = renderPaymentAccountDetails({
        ...achShownParams,
        accountType: 'business',
      })

      await user.click(getByText('Select an SEC Code'))

      expect(getByText('CCD')).toBeInTheDocument()
    })

    test('Account Holder Name field is shown', () => {
      expectFieldToShow('Account Holder Name', achShownParams)
    })

    test('Account Number field is shown', () => {
      expectFieldToShow('Account Number', achShownParams)
    })

    test('Routing Number field is a typeahead if a routing number service is provided', () => {
      const { getByRole } = renderPaymentAccountDetails({
        ...achShownParams,
        routingNumberService: () => Promise.resolve([]),
      })

      expect(
        getByRole('combobox', { name: 'Routing Number' })
      ).toBeInTheDocument()
    })

    test('Routing Number field is a text input if a routing number service is not provided.', () => {
      const { getByRole } = renderPaymentAccountDetails(achShownParams)

      expect(
        getByRole('textbox', { name: 'Routing Number' })
      ).toBeInTheDocument()
    })
  })
})
