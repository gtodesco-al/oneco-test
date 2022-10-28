import { User } from '@fortis/api'
import { render } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import FormContainer from '../../../components/FormContainer/FormContainer'

import i18n from '../../../i18n'
import { createDepositAccountForTesting } from '../utils/testing/depositAccounts'
import { createUserForTesting } from '../../../utils/testing/users'
import {
  DepositAccount,
  TransactionType,
  VirtualTerminalTransaction,
} from '../virtualTerminalTypes'

import TransactionSummary from './TransactionSummary'

describe('TransactionSummary', () => {
  interface TestRenderArgs {
    account?: Partial<DepositAccount>
    values?: Partial<VirtualTerminalTransaction>
    user?: Partial<User>
    transactionType?: TransactionType
  }

  const renderTransactionSummary = ({
    account = {},
    values = {},
    user = {},
    transactionType = 'sale',
  }: TestRenderArgs = {}) =>
    render(
      <I18nextProvider i18n={i18n}>
        <FormContainer initialValues={values} onSubmit={() => undefined}>
          <TransactionSummary
            user={createUserForTesting(user)}
            account={createDepositAccountForTesting(account)}
            transactionType={transactionType}
          />
        </FormContainer>
      </I18nextProvider>
    )

  interface FieldTestCase {
    fieldName: string
    accountFields: Partial<DepositAccount>
  }

  ;[
    {
      fieldName: 'Tax',
      accountFields: { vt_enable_sales_tax: true },
    },
    {
      fieldName: 'Tip',
      accountFields: { vt_enable_tip: true },
    },
    {
      fieldName: 'Surcharge',
      accountFields: { surcharge: {} },
    },
    {
      fieldName: 'Subtotal amount',
      accountFields: { vt_enable_sales_tax: true },
    },
    {
      fieldName: 'Subtotal amount',
      accountFields: { vt_enable_tip: true },
    },
    {
      fieldName: 'Subtotal amount',
      accountFields: { surcharge: {} },
    },
  ].forEach(({ fieldName, accountFields }: FieldTestCase) => {
    const stringFields = JSON.stringify(accountFields)

    test(`shows ${fieldName} field if account includes ${stringFields}`, () => {
      const { getByLabelText } = renderTransactionSummary({
        account: accountFields,
      })

      expect(getByLabelText(fieldName)).toBeInTheDocument()
    })

    test(`shows total if account includes ${stringFields}`, () => {
      const { getByLabelText } = renderTransactionSummary({
        account: accountFields,
      })

      expect(getByLabelText('Total Amount')).toBeInTheDocument()
    })
  })
  ;[
    {
      fieldName: 'Tax',
      accountFields: { vt_enable_sales_tax: false },
    },
    {
      fieldName: 'Tip',
      accountFields: { vt_enable_tip: false },
    },
    {
      fieldName: 'Surcharge',
      accountFields: { surcharge: undefined },
    },
    {
      fieldName: 'Subtotal amount',
      accountFields: {
        vt_enable_sales_tax: false,
        vt_enable_tip: false,
        surcharge: undefined,
      },
    },
  ].forEach(({ fieldName, accountFields }: FieldTestCase) => {
    const stringFields = JSON.stringify(accountFields)

    test(`hides ${fieldName} field if account includes ${stringFields}`, () => {
      const { queryByLabelText } = renderTransactionSummary({
        account: accountFields,
      })

      expect(queryByLabelText(fieldName)).not.toBeInTheDocument()
    })

    test(`shows total if account includes ${stringFields}`, () => {
      const { getByLabelText } = renderTransactionSummary({
        account: accountFields,
      })

      expect(getByLabelText('Total Amount')).toBeInTheDocument()
    })
  })

  const renderWithSurcharge = (surcharge: DepositAccount['surcharge'] = {}) =>
    renderTransactionSummary({ account: { surcharge } })

  test('surcharge label is "Surcharge" if surcharge_label field is not set', () => {
    const { getByLabelText } = renderWithSurcharge({
      surcharge_label: undefined,
    })

    expect(getByLabelText('Surcharge')).toBeInTheDocument()
  })

  test('surcharge label matches surcharge_label if it is provided', () => {
    const label = 'Test Label'

    const { getByLabelText } = renderWithSurcharge({ surcharge_label: label })

    expect(getByLabelText(label)).toBeInTheDocument()
  })

  test('surcharge displays if it has an apply_to_user_type_id matching the user_type_id of the user', () => {
    const { queryByLabelText } = renderTransactionSummary({
      account: { surcharge: { apply_to_user_type_id: 200 } },
      user: { user_type_id: 200 },
    })

    expect(queryByLabelText('Surcharge')).toBeInTheDocument()
  })

  test('surcharge does not display if it has an apply_to_user_type_id not matching the user_type_id of the user', () => {
    const { queryByLabelText } = renderTransactionSummary({
      account: { surcharge: { apply_to_user_type_id: 200 } },
      user: { user_type_id: 300 },
    })

    expect(queryByLabelText('Surcharge')).not.toBeInTheDocument()
  })

  test('surcharge does not show if action is refund and surcharge.refund_surcharges is false', () => {
    const { queryByLabelText } = renderTransactionSummary({
      account: { surcharge: { refund_surcharges: false } },
      transactionType: 'refund',
    })

    expect(queryByLabelText('Surcharge')).not.toBeInTheDocument()
  })

  test('surcharge shows if action is refund and surcharge.refund_surcharges is test', () => {
    const { queryByLabelText } = renderTransactionSummary({
      account: { surcharge: { refund_surcharges: true } },
      transactionType: 'refund',
    })

    expect(queryByLabelText('Surcharge')).toBeInTheDocument()
  })
})
