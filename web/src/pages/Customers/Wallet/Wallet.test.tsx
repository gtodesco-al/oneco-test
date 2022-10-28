import { Token } from '@fortis/api/src/services/tokens.service'
import { render } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'

import { createUserForPermissionTesting } from '../../../utils/testing/users'
import { createWalletItemForTesting } from '../../../utils/testing/wallet'
import { UnboundWallet } from './Wallet'

describe('Wallet', () => {
  interface RenderProps {
    permissions?: string[]
    item?: Partial<Token>
    showActive?: boolean
  }

  const renderElement = ({
    permissions = [],
    item = {},
    showActive = false,
  }: RenderProps = {}) =>
    render(
      <I18nextProvider i18n={i18n}>
        <UnboundWallet
          user={createUserForPermissionTesting(...permissions)}
          items={[createWalletItemForTesting(item)]}
          showActive={showActive}
          onToggleShowActive={() => undefined}
          onClickAddCreditCard={() => undefined}
          onClickAddBankAccount={() => undefined}
          onClickView={() => undefined}
          onClickEdit={() => undefined}
          onClickDeactivate={() => undefined}
          onClickActivate={() => undefined}
        />
      </I18nextProvider>
    )

  test('has Add option if user has v2.accountvaults.post permission', async () => {
    const { getByRole } = renderElement({
      permissions: ['v2.accountvaults.post'],
    })

    expect(getByRole('button', { name: 'Add Credit Card' })).toBeInTheDocument()
    expect(
      getByRole('button', { name: 'Add Bank Account' })
    ).toBeInTheDocument()
  })

  test('does not have Add option if user does not have v2.accountvaults.post permission', () => {
    const { queryByRole } = renderElement()

    expect(
      queryByRole('button', { name: 'Add Credit Card' })
    ).not.toBeInTheDocument()
    expect(
      queryByRole('button', { name: 'Add Bank Account' })
    ).not.toBeInTheDocument()
  })

  test('has Edit option if user has v2.accountvaults.put permission', async () => {
    const { getByRole } = renderElement({
      permissions: ['v2.accountvaults.put'],
      item: { active: true },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })

  test('does not have Edit option if user does not have v2.accountvaults.put permission', async () => {
    const { getByRole, queryByRole } = renderElement({
      item: { active: true },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument()
  })

  test('does not have Edit option if item is not active', async () => {
    const { getByRole, queryByRole } = renderElement({
      permissions: ['v2.accountvaults.put'],
      item: { active: false },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument()
  })

  test('has Deactivate option if user has v2.accountvaults.delete permission and wallet item is active', async () => {
    const { getByRole } = renderElement({
      permissions: ['v2.accountvaults.delete'],
      item: { active: true },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(getByRole('button', { name: 'Deactivate' })).toBeInTheDocument()
  })

  test('does not have Deactivate option if user does not have v2.accountvaults.delete permission and wallet item is active', async () => {
    const { getByRole, queryByRole } = renderElement({
      item: { active: true },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(
      queryByRole('button', { name: 'Deactivate' })
    ).not.toBeInTheDocument()
  })

  test('does not have Deactivate option if user has v2.accountvaults.delete permission and wallet item is inactive', async () => {
    const { getByRole, queryByRole } = renderElement({
      permissions: ['v2.accountvaults.delete'],
      item: { active: false },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(
      queryByRole('button', { name: 'Deactivate' })
    ).not.toBeInTheDocument()
  })

  test('has Reactivate option if user has v2.accountvaults.post.activate permission and wallet item is inactive', async () => {
    const { getByRole } = renderElement({
      permissions: ['v2.accountvaults.post.activate'],
      item: { active: false },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(getByRole('button', { name: 'Reactivate' })).toBeInTheDocument()
  })

  test('does not have Reactivate option if user does not have v2.accountvaults.post.activate permission and wallet item is inactive', async () => {
    const { getByRole, queryByRole } = renderElement({
      item: { active: false },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(
      queryByRole('button', { name: 'Reactivate' })
    ).not.toBeInTheDocument()
  })

  test('does not have Reactivate option if user has v2.accountvaults.post.activate permission and wallet item is active', async () => {
    const { getByRole, queryByRole } = renderElement({
      permissions: ['v2.accountvaults.post.activate'],
      item: { active: true },
    })

    await user.click(getByRole('button', { name: 'Show options' }))

    expect(
      queryByRole('button', { name: 'Reactivate' })
    ).not.toBeInTheDocument()
  })
})
