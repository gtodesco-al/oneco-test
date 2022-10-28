import { Token } from '@fortis/api/src/services/tokens.service'
import { render } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { createUserForTesting } from '../../../utils/testing/users'
import { createWalletItemForTesting } from '../../../utils/testing/wallet'
import { WalletItem } from './WalletItem'

describe('WalletItem', () => {
  const renderElement = (props: Partial<Token>) =>
    render(
      <I18nextProvider i18n={i18n}>
        <WalletItem
          item={createWalletItemForTesting(props)}
          user={createUserForTesting()}
          onView={() => undefined}
          onEdit={() => undefined}
          onDeactivate={() => undefined}
          onActivate={() => undefined}
        />
      </I18nextProvider>
    )

  ;[0, 1, 2, 3].forEach((amount) => {
    test(`contains an Expiring Soon tag if the expiring_in_months value is equal to ${amount} and the payment method is cc`, () => {
      const { getByText } = renderElement({
        payment_method: 'cc',
        expiring_in_months: amount,
      })

      expect(getByText('Expiring Soon')).toBeInTheDocument()
    })
  })

  test('contains an expired tag if the expiring_in_months value is less than 0', () => {
    const { queryByText } = renderElement({
      payment_method: 'cc',
      expiring_in_months: -1,
    })

    expect(queryByText('Expired')).toBeInTheDocument()
  })

  test('does not contain expiration info if the payment_method is ach', () => {
    const { queryByText } = renderElement({
      payment_method: 'ach',
      expiring_in_months: 1,
    })

    expect(queryByText(/Expires/)).not.toBeInTheDocument()
  })

  test('contains an Active tag is active is "1"', () => {
    const { getByText } = renderElement({ active: true })

    expect(getByText('Active')).toBeInTheDocument()
  })

  test('contains an Inactive tag is active is "0"', () => {
    const { getByText } = renderElement({ active: false })

    expect(getByText('Inactive')).toBeInTheDocument()
  })
})
