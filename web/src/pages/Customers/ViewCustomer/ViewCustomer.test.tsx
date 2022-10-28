import { Location } from '@fortis/api'
import { ContactPost } from '@fortis/api/src/services/contacts.service'
import { render } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import { createCustomerForTesting } from '../../../utils/testing/customers'
import { createLocationForTesting } from '../utils/testing/locations'
import { UnboundViewCustomer } from './ViewCustomer'
import { MemoryRouter } from 'react-router-dom'

describe('ViewCustomer', () => {
  interface RenderProps {
    location?: Partial<Location>
    permissions?: string[]
    customer?: Partial<ContactPost>
  }

  const renderElement = ({
    location = {},
    permissions = [],
    customer = {},
  }: RenderProps = {}) =>
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <UnboundViewCustomer
            user={createUserForPermissionTesting(...permissions)}
            customer={createCustomerForTesting(customer)}
            location={createLocationForTesting(location)}
            setShowActivationModal={() => undefined}
            setShowTransactionModal={() => undefined}
          />
        </I18nextProvider>
      </MemoryRouter>
    )

  test('displays wallet if location has a product_accountvault value', () => {
    const { getByText } = renderElement({
      location: {
        product_accountvault: {},
      },
    })

    expect(getByText('Wallet')).toBeInTheDocument()
  })

  test('does not display wallet if location does not have product_accountvalue value', () => {
    const { queryByText } = renderElement()

    expect(queryByText('Wallet')).not.toBeInTheDocument()
  })

  test('displays Deactivate button if user has v2.contacts.delete permission and customer is activated', () => {
    const { getByText } = renderElement({
      customer: {
        active: true,
      },
      permissions: ['v2.contacts.delete'],
    })

    expect(getByText('Deactivate')).toBeInTheDocument()
  })

  test('does not display Deactivate button if user does not have v2.contacts.delete and customer is activated', () => {
    const { queryByText } = renderElement({
      customer: {
        active: true,
      },
      permissions: [],
    })

    expect(queryByText('Deactivate')).not.toBeInTheDocument()
  })

  test('displays Reactivate button if user has v2.contacts.post.activate permission and customer is deactivated', () => {
    const { getByText } = renderElement({
      customer: {
        active: false,
      },
      permissions: ['v2.contacts.post.activate'],
    })

    expect(getByText('Reactivate')).toBeInTheDocument()
  })

  test('does not display Reactivate button if user does not have v2.contacts.post.activate and customer is deactivated', () => {
    const { queryByText } = renderElement({
      customer: {
        active: false,
      },
      permissions: [],
    })

    expect(queryByText('Reactivate')).not.toBeInTheDocument()
  })
})
