import { render } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import FormContainer from '../../../components/FormContainer/FormContainer'
import i18n from '../../../i18n'
import { createDepositAccountForTesting } from '../utils/testing/depositAccounts'
import { createLocationForTesting } from '../utils/testing/locations'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import { DepositAccount } from '../virtualTerminalTypes'
import TransactionInformation from './TransactionInformation'

describe('TransactionInformation', () => {
  const renderTransactionInformation = ({
    location = createLocationForTesting(),
    user = createUserForPermissionTesting(),
    transactionType = 'sale',
    onChangeTransactionType = () => undefined,
    depositAccount = undefined,
    onChangeDepositAccount = () => undefined,
  }: Partial<Parameters<typeof TransactionInformation>[0]>) =>
    render(
      <I18nextProvider i18n={i18n}>
        <FormContainer initialValues={{}} onSubmit={() => undefined}>
          <TransactionInformation
            location={location}
            user={user}
            depositAccount={depositAccount}
            onChangeDepositAccount={onChangeDepositAccount}
            transactionType={transactionType}
            onChangeTransactionType={onChangeTransactionType}
          />
        </FormContainer>
      </I18nextProvider>
    )

  const renderWithAccounts = (...accounts: DepositAccount[]) =>
    renderTransactionInformation({
      location: createLocationForTesting({
        product_transactions: accounts,
      }),
    })

  test('Select a Deposit Account is displayed if at least two accounts have vt_enable', () => {
    const { getAllByLabelText } = renderWithAccounts(
      createDepositAccountForTesting({ vt_enable: true }),
      createDepositAccountForTesting({ vt_enable: true })
    )

    expect(
      getAllByLabelText('Select a Deposit Account').length
    ).toBeGreaterThan(0)
  })

  test('Select a Deposit Account is not displayed if only one account has vt_enable', () => {
    const { queryByLabelText } = renderWithAccounts(
      createDepositAccountForTesting({ vt_enable: true }),
      createDepositAccountForTesting({ vt_enable: false })
    )

    expect(queryByLabelText('Select a Deposit Account')).not.toBeInTheDocument()
  })

  test('Select a Deposit Account is not displayed if no accounts have vt_enable', () => {
    const { queryByLabelText } = renderWithAccounts(
      createDepositAccountForTesting({ vt_enable: false }),
      createDepositAccountForTesting({ vt_enable: false })
    )

    expect(queryByLabelText('Select a Deposit Account')).not.toBeInTheDocument()
  })

  test('Tip field is displayed if selected account has vt_enable_tip set to true', () => {
    const { getByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({ vt_enable_tip: true }),
    })

    expect(getByLabelText('Tip')).toBeInTheDocument()
  })

  test('Tip field is displayed if selected account has vt_enable_tip set to true', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({ vt_enable_tip: false }),
    })

    expect(queryByLabelText('Tip')).not.toBeInTheDocument()
  })

  test('Tax field is displayed if vt_enable_sales_tax and vt_override_sales_tax_allowed are both true.', () => {
    const { getByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        vt_enable_sales_tax: true,
        vt_override_sales_tax_allowed: true,
      }),
    })

    expect(getByLabelText('Tax')).toBeInTheDocument()
  })

  test('Tax field is hidden if vt_enable_sales_tax is false and vt_override_sales_tax_allowed is true.', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        vt_enable_sales_tax: false,
        vt_override_sales_tax_allowed: true,
      }),
    })

    expect(queryByLabelText('Tax')).not.toBeInTheDocument()
  })

  test('Tax field is hidden if vt_enable_sales_tax is true and vt_override_sales_tax_allowed is false.', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        vt_enable_sales_tax: true,
        vt_override_sales_tax_allowed: false,
      }),
    })

    expect(queryByLabelText('Tax')).not.toBeInTheDocument()
  })

  test('Tax field is displayed if vt_enable_sales_tax and vt_override_sales_tax_allowed are both false.', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        vt_enable_sales_tax: false,
        vt_override_sales_tax_allowed: false,
      }),
    })

    expect(queryByLabelText('Tax')).not.toBeInTheDocument()
  })

  test('No amount fields are displayed if payment_method is avsonly', () => {
    const { queryByLabelText } = renderTransactionInformation({
      transactionType: 'avsonly',
    })

    expect(queryByLabelText('Amount')).not.toBeInTheDocument()
  })

  test('Clerk number field is displayed if vt_clerk_number is true and account is cc', () => {
    const { getByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        payment_method: 'cc',
        vt_clerk_number: true,
      }),
    })

    expect(getByLabelText('Clerk Number')).toBeInTheDocument()
  })

  test('Clerk number field is not displayed if vt_clerk_number is false', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        payment_method: 'cc',
        vt_clerk_number: false,
      }),
    })

    expect(queryByLabelText('Clerk Number')).not.toBeInTheDocument()
  })

  test('Clerk number field is not displayed if account is ach', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        payment_method: 'ach',
        vt_clerk_number: true,
      }),
    })

    expect(queryByLabelText('Clerk Number')).not.toBeInTheDocument()
  })

  test('Order number field is displayed if vt_order_number is true, account is cc, and industry_type is not lodging', () => {
    const { getByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        payment_method: 'cc',
        vt_order_number: true,
        industry_type: 'other',
      }),
    })

    expect(getByLabelText('Order Number')).toBeInTheDocument()
  })

  test('Folio number field is displayed if vt_order_number is true, account is cc, and industry_type is lodging', () => {
    const { getByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        payment_method: 'cc',
        vt_order_number: true,
        industry_type: 'lodging',
      }),
    })

    expect(getByLabelText('Folio Number')).toBeInTheDocument()
  })

  test('Order number field is not displayed if vt_order_number is false', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        payment_method: 'cc',
        vt_order_number: false,
        industry_type: 'other',
      }),
    })

    expect(queryByLabelText('Order Number')).not.toBeInTheDocument()
  })

  test('Order number field is not displayed if account is ach', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        payment_method: 'ach',
        vt_order_number: true,
        industry_type: 'other',
      }),
    })

    expect(queryByLabelText('Order Number')).not.toBeInTheDocument()
  })

  test('four custom fields display if vt_show_custom_fields is true', () => {
    const { queryAllByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        vt_show_custom_fields: true,
      }),
    })

    expect(queryAllByLabelText(/Custom Field/i)).toHaveLength(4)
  })

  test('no custom fields display if vt_show_custom_fields is false', () => {
    const { queryByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        vt_show_custom_fields: false,
      }),
    })

    expect(queryByLabelText(/Custom Field/i)).not.toBeInTheDocument()
  })

  test('third custom field label is "Service Date" if account partner is vericle', () => {
    const { getByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        vt_show_custom_fields: true,
        partner: 'vericle',
      }),
    })

    expect(getByLabelText('Service Date')).toBeInTheDocument()
  })

  test('third custom field label is "Service Date" if account partner is vericle-statement', () => {
    const { getByLabelText } = renderTransactionInformation({
      depositAccount: createDepositAccountForTesting({
        vt_show_custom_fields: true,
        partner: 'vericle-statement',
      }),
    })

    expect(getByLabelText('Service Date')).toBeInTheDocument()
  })
})
