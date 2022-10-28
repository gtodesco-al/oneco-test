import { Location } from '@fortis/api'
import { render } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { createLocationForTesting } from '../utils/testing/locations'
import { UnboundNewCustomer } from './NewCustomer'

describe('New Customer', () => {
  const renderElement = (location: Partial<Location>) =>
    render(
      <I18nextProvider i18n={i18n}>
        <UnboundNewCustomer
          location={createLocationForTesting(location)}
          onSubmit={() => undefined}
        />
      </I18nextProvider>
    )

  test('displays wallet placeholder if location has a product_accountvault value', () => {
    const { getByText } = renderElement({ product_accountvault: {} })

    expect(getByText('Wallet')).toBeInTheDocument()
  })

  test('does not display wallet placeholder if location does not have product_accountvalue value', () => {
    const { queryByText } = renderElement({})

    expect(queryByText('Wallet')).not.toBeInTheDocument()
  })
})
