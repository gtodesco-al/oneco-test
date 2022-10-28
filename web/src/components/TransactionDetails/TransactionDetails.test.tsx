import { Transaction, User } from '@fortis/api'
import { render } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import i18n from '../../i18n'
import {
  createUserForPermissionTesting,
  RenderWithUser,
} from '../../utils/testing/users'

import TransactionDetails from './TransactionDetails'

describe('TransactionDetails', () => {
  const baseTransaction: Transaction = {
    id: '',
    created_ts: 0,
    modified_ts: 0,
    payment_method: 'cc',
  }

  const renderTransactionDetails = (transaction: Transaction, user: User) =>
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <RenderWithUser user={user}>
            <TransactionDetails
              transaction={transaction}
              handleClose={jest.fn()}
            />
          </RenderWithUser>
        </I18nextProvider>
      </BrowserRouter>
    )

  test('renders type cc', async () => {
    const user = createUserForPermissionTesting('v2.notifications.post')
    const { getByText } = renderTransactionDetails(
      {
        ...baseTransaction,
        payment_method: 'cc',
        tax: 1,
      },
      user
    )

    expect(getByText('Transaction Details')).toBeInTheDocument()
    expect(getByText('Transaction Amount')).toBeInTheDocument()
    expect(getByText('Tax')).toBeInTheDocument()
    expect(getByText('Transaction Type')).toBeInTheDocument()
    expect(getByText('Transaction Status')).toBeInTheDocument()
    expect(getByText('Transaction Verbiage')).toBeInTheDocument()
    expect(getByText('Reason')).toBeInTheDocument()
    expect(getByText('Auth Code')).toBeInTheDocument()
    expect(getByText('Account Holder')).toBeInTheDocument()
    expect(getByText('Account Type / Last 4')).toBeInTheDocument()
    expect(getByText('Entry Mode')).toBeInTheDocument()
    expect(getByText('Description')).toBeInTheDocument()
    expect(getByText('Date / Time')).toBeInTheDocument()
    expect(getByText('Transaction ID')).toBeInTheDocument()
    expect(getByText('Transaction History')).toBeInTheDocument()
    expect(getByText('Transaction Status')).toBeInTheDocument()
  })

  test('renders type ach', async () => {
    const user = createUserForPermissionTesting('v2.notifications.post')
    const { getByText } = renderTransactionDetails(
      {
        ...baseTransaction,
        payment_method: 'ach',
      },
      user
    )
    expect(getByText('Send Email Receipt')).toBeInTheDocument()
  })

  test('renders void transaction button', async () => {
    const user = createUserForPermissionTesting('v2.transactions.put.void')
    const { getByText } = renderTransactionDetails(
      {
        ...baseTransaction,
        is_voidable: true,
      },
      user
    )
    expect(getByText('Void Transaction')).toBeInTheDocument()
  })
})
