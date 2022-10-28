import { I18nextProvider } from 'react-i18next'
import { render, fireEvent } from '@testing-library/preact'
import { BrowserRouter } from 'react-router-dom'
import * as ReactRouterDomModule from 'react-router'
import RecurringTransactionHistory, {
  RecurringTransactionHistoryReportPrivs,
} from './RecurringTransactionHistory'

import { recurringTransactionHistory } from '../../../mocks/charts/RecurringTransactionHistory'
import i18n from '../../../i18n'
import {
  RenderWithUser,
  createUserForPermissionTesting,
} from '../../../utils/testing/users'

describe('RecurringTransactionHistory', () => {
  const useNavigateSpy = jest.spyOn(ReactRouterDomModule, 'useNavigate')
  const user = createUserForPermissionTesting(
    ...RecurringTransactionHistoryReportPrivs
  )
  const renderElement = (hasCcAccounts = true) =>
    render(
      <RenderWithUser user={user}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <RecurringTransactionHistory
              hasCCAccounts={hasCcAccounts}
              transactions={recurringTransactionHistory}
            />
          </BrowserRouter>
        </I18nextProvider>
      </RenderWithUser>
    )

  it('should be able to render the header', () => {
    const { getByText, queryAllByText } = renderElement()
    expect(getByText(/Recurring Transaction History/i)).toBeInTheDocument()
    expect(
      getByText(/displays past recurring billings, paid and unpaid/i)
    ).toBeInTheDocument()
    expect(queryAllByText(/view report/i).length).toBe(2) //Button appears twice
    expect(queryAllByText(/last 30 days/i).length).toBe(2) //Appears in mobile and non-mobile layout
    expect(getByText(/last 12 months/i)).toBeInTheDocument()
    expect(getByText(/total transactions/i)).toBeInTheDocument()
    expect(getByText(/total amount/i)).toBeInTheDocument()
  })

  it('should be able to click on the button `View report`', () => {
    const { queryAllByText } = renderElement()
    fireEvent.click(queryAllByText(/view report/i)[0])
    expect(useNavigateSpy).toHaveBeenCalled()
  })

  it('should display a placeholder instead of normal content if the hasCcAccounts attribute is set to false', () => {
    const { getByText } = renderElement(false)
    expect(getByText(/are only applied to cc accounts./i)).toBeInTheDocument()
  })
})
