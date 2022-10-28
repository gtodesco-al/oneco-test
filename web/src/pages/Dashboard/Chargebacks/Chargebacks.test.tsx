import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/preact'

import { chargebacks } from '../../../mocks/charts/Chargebacks'
import i18n from '../../../i18n'
import {
  RenderWithUser,
  createUserForPermissionTesting,
} from '../../../utils/testing/users'

import Chargebacks, { ChargebackReportPrivs } from './Chargebacks'

describe('Chargebacks', () => {
  const user = createUserForPermissionTesting(...ChargebackReportPrivs)
  const renderElement = (hasCcAccounts = true) =>
    render(
      <RenderWithUser user={user}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Chargebacks
              transactions={chargebacks}
              hasCCAccounts={hasCcAccounts}
            />
          </BrowserRouter>
        </I18nextProvider>
      </RenderWithUser>
    )

  it('should be able to render the header', () => {
    const { getByText, getAllByText } = renderElement()
    expect(getByText(/^chargebacks$/i)).toBeInTheDocument()
    expect(getByText(/displays unresolved chargebacks/i)).toBeInTheDocument()

    //Use getAll and expect 2 because mobile has its own View Report button
    expect(getAllByText(/view report/i)).toHaveLength(2)
  })

  it('should be able to render the details', () => {
    const { getByText } = renderElement()
    expect(getByText(/^open chargebacks$/i)).toBeInTheDocument()
    expect(getByText(/^received in last 7 days$/i)).toBeInTheDocument()
  })

  it('should display a placeholder instead of normal content if the hasCcAccounts attribute is set to false', () => {
    const { getByText } = renderElement(false)
    expect(getByText(/are only applied to cc accounts./i)).toBeInTheDocument()
  })
})
