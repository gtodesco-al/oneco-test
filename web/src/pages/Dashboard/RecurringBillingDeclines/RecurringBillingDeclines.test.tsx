import { I18nextProvider } from 'react-i18next'
import { render, fireEvent } from '@testing-library/preact'
import { BrowserRouter } from 'react-router-dom'
import * as ReactRouterDomModule from 'react-router'
import RecurringBillingDeclines, {
  RecurringBillingDeclinesReportPrivs,
} from './RecurringBillingDeclines'

import {
  RenderWithUser,
  createUserForPermissionTesting,
} from '../../../utils/testing/users'
import { recurringBillingDeclines } from '../../../mocks/charts/RecurringBillingDeclines'
import i18n from '../../../i18n'

describe('RecurringBillingDeclines', () => {
  const useNavigateSpy = jest.spyOn(ReactRouterDomModule, 'useNavigate')
  const user = createUserForPermissionTesting(
    ...RecurringBillingDeclinesReportPrivs
  )

  const renderElement = (hasCcAccounts = true) =>
    render(
      <RenderWithUser user={user}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <RecurringBillingDeclines
              transactions={recurringBillingDeclines}
              hasCCAccounts={hasCcAccounts}
            />
          </BrowserRouter>
        </I18nextProvider>
      </RenderWithUser>
    )

  it('should be able to render the header', () => {
    const { getByText, getAllByText } = renderElement()
    expect(getByText('Recurring Billing Declines')).toBeInTheDocument()
    expect(
      getByText('Displays the outstanding Recurring Billing Declines')
    ).toBeInTheDocument()

    //Use getAll and expect 2 because mobile has its own View Report button
    expect(getAllByText(/view report/i)).toHaveLength(2)
  })

  it('should be able to render the details', () => {
    const { getByText } = renderElement()
    expect(getByText(/today/i)).toBeInTheDocument()
    expect(getByText(/yesterday/i)).toBeInTheDocument()
    expect(getByText(/last 30 days/i)).toBeInTheDocument()
  })

  it('should be able to click on the button `View report`', () => {
    const { getAllByRole } = renderElement(false)
    fireEvent.click(getAllByRole('button')[0])
    expect(useNavigateSpy).toHaveBeenCalled()
  })

  it('should display a placeholder instead of normal content if the hasCcAccounts attribute is set to false', () => {
    const { getByText } = renderElement(false)
    expect(getByText(/are only applied to cc accounts./i)).toBeInTheDocument()
  })
})
