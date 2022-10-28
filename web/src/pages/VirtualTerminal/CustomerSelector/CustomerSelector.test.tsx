import { render } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { noop } from 'lodash'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import CustomerSelector from './CustomerSelector'

describe('CustomerSelector', () => {
  const requiredPermission = 'v2.contacts.post'
  const createCustomerButtonName = 'Add New Customer'

  const renderElement = (...permissions: string[]) =>
    render(
      <I18nextProvider i18n={i18n}>
        <CustomerSelector
          user={createUserForPermissionTesting(...permissions)}
          customer={undefined}
          source={[]}
          onChange={noop}
          onAddNew={noop}
        />
      </I18nextProvider>
    )

  test('can create customer if user has v2.contacts.post permission', async () => {
    const element = renderElement(requiredPermission)

    await user.click(element.getByRole('combobox'))

    expect(
      element.queryByRole('button', { name: createCustomerButtonName })
    ).toBeInTheDocument()
  })

  test('cannot create customer if user does not have v2.contacts.post permission', async () => {
    const element = renderElement()

    await user.click(element.getByRole('combobox'))

    expect(
      element.queryByRole('button', { name: createCustomerButtonName })
    ).not.toBeInTheDocument()
  })
})
