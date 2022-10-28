import { render, RenderResult } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { noop } from 'lodash'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import { createUserForPermissionTesting } from '../../../utils/testing/users'
import { WalletItemSelector } from './WalletItemSelector'

describe('WalletItemSelector', () => {
  const requiredPermission = 'v2.accountvaults.post'
  const creditCardButtonName = 'Add New Credit Card'
  const bankAccountButtonName = 'Add New Bank Account'

  const renderElement = (...permissions: string[]) =>
    render(
      <I18nextProvider i18n={i18n}>
        <WalletItemSelector
          user={createUserForPermissionTesting(...permissions)}
          walletItems={[]}
          selectedWalletItem={undefined}
          onChangeWalletItem={noop}
          onCreateBankAccount={noop}
          onCreateCreditCard={noop}
        />
      </I18nextProvider>
    )

  const expectHasButton = async (element: RenderResult, buttonName: string) => {
    await user.click(element.getByRole('combobox'))

    expect(
      element.getByRole('button', { name: buttonName })
    ).toBeInTheDocument()
  }

  const expectDoesNotHaveButton = async (
    element: RenderResult,
    buttonName: string
  ) => {
    await user.click(element.getByRole('combobox'))

    expect(
      element.queryByRole('button', { name: buttonName })
    ).not.toBeInTheDocument()
  }

  test('displays new bank account option if the user has the v2.accountvaults.post permission', async () => {
    await expectHasButton(
      renderElement(requiredPermission),
      bankAccountButtonName
    )
  })

  test('displays new credit card option if the user has the v2.accountvaults.post permission', async () => {
    await expectHasButton(
      renderElement(requiredPermission),
      creditCardButtonName
    )
  })

  test('does not display new bank account option if the user does not have the v2.accountvaults.post permission', async () => {
    await expectDoesNotHaveButton(renderElement(), bankAccountButtonName)
  })

  test('does not display new credit card option if the user does not have the v2.accountvaults.post permission', async () => {
    await expectDoesNotHaveButton(renderElement(), creditCardButtonName)
  })
})
