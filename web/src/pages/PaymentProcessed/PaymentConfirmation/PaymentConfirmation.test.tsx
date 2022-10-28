import { Transaction } from '@fortis/api'
import { render } from '@testing-library/preact'
import { noop } from 'lodash'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import i18n from '../../../i18n'
import { UnwrappedPaymentConfirmation } from './PaymentConfirmation'

describe('PaymentConfirmation', () => {
  const renderPaymentConfirmation = (transaction: Transaction) =>
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <UnwrappedPaymentConfirmation
            transaction={transaction}
            onClickVoid={noop}
            onVoid={noop}
          />
        </I18nextProvider>
      </BrowserRouter>
    )

  const baseTransaction: Transaction = {
    id: 'test',
    created_ts: 0,
    modified_ts: 0,
    payment_method: 'cc',
  }

  test('renders type cc', async () => {
    const { getByText } = renderPaymentConfirmation({
      ...baseTransaction,
      payment_method: 'cc',
      terminal_id: '12345',
    })

    expect(getByText('Payment successfully processed.')).toBeInTheDocument()
    expect(getByText(/Auth Code/i)).toBeInTheDocument()
    expect(getByText(/You can view/i)).toBeInTheDocument()
    expect(getByText('Email Receipt')).toBeInTheDocument()
    expect(getByText('Paper Transaction')).toBeInTheDocument()
  })

  test('renders type ach', async () => {
    const { queryByAltText } = renderPaymentConfirmation({
      ...baseTransaction,
      payment_method: 'ach',
    })

    expect(queryByAltText('Print Authorization')).not.toBeInTheDocument()

    expect(queryByAltText(/Auth Code/i)).not.toBeInTheDocument()
  })

  test('renders type ach with no terminal', async () => {
    const { queryByAltText } = renderPaymentConfirmation({
      ...baseTransaction,
      payment_method: 'ach',
    })

    expect(queryByAltText('Print Authorization')).not.toBeInTheDocument()
    expect(queryByAltText('Paper Transaction')).not.toBeInTheDocument()
  })
})
