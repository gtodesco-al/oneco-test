import { I18nextProvider } from 'react-i18next'
import { render, fireEvent } from '@testing-library/preact'
import { BrowserRouter } from 'react-router-dom'
import * as ReactRouterDomModule from 'react-router'
import RecurringTransactionForecast, {
  RecurringTransactionForecastReportPrivs,
} from './RecurringTransactionForecast'

import { recurringTransactionForecast } from '../../../mocks/charts/RecurringTransactionForecast'
import i18n from '../../../i18n'
import {
  RenderWithUser,
  createUserForPermissionTesting,
} from '../../../utils/testing/users'

describe('RecurringTransactionForecast', () => {
  const useNavigateSpy = jest.spyOn(ReactRouterDomModule, 'useNavigate')
  const user = createUserForPermissionTesting(
    ...RecurringTransactionForecastReportPrivs
  )
  const renderElement = (hasCcAccounts = true) =>
    render(
      <RenderWithUser user={user}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <RecurringTransactionForecast
              transactions={recurringTransactionForecast}
              hasCCAccounts={hasCcAccounts}
            />
          </BrowserRouter>
        </I18nextProvider>
      </RenderWithUser>
    )

  it('should be able to render the header', () => {
    const { getByText, queryAllByText } = renderElement()
    expect(getByText(/Recurring Transaction Forecast/i)).toBeInTheDocument()
    expect(
      getByText(/Forecast is calculated based on the Recurring billing set/i)
    ).toBeInTheDocument()
    expect(queryAllByText(/next 30 days/i).length).toBe(2)
    expect(queryAllByText(/next 12 months/i).length).toBe(1)
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
