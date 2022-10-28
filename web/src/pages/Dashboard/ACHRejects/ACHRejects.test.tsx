import { render } from '@testing-library/preact'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import { achRejects } from '../../../mocks/charts/ACHRejects'
import i18n from '../../../i18n'
import {
  RenderWithUser,
  createUserForPermissionTesting,
} from '../../../utils/testing/users'

import ACHRejects, { ACHRejectsReportPrivs } from './ACHRejects'

describe('ACHRejects', () => {
  const user = createUserForPermissionTesting(...ACHRejectsReportPrivs)
  const renderElement = (hasCcAccounts = true) =>
    render(
      <RenderWithUser user={user}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <ACHRejects
              transactions={achRejects}
              hasACHAccounts={hasCcAccounts}
            />
          </BrowserRouter>
        </I18nextProvider>
      </RenderWithUser>
    )

  // ///ach rejects/i).length
  it('should be able to render the header', () => {
    const { getAllByText, getByText } = renderElement()
    expect(getByText(/^ach rejects$/i)).toBeInTheDocument()
    expect(
      getByText(/displays the number of ach rejects received./i)
    ).toBeInTheDocument()

    //Use getAll and expect 2 because mobile has its own View Report button
    expect(getAllByText(/view report/i)).toHaveLength(2)
  })

  it('should be able to render the details', () => {
    const { queryAllByText } = renderElement()
    expect(queryAllByText(/today/i).length).toBeGreaterThanOrEqual(1)
    expect(queryAllByText(/last 7 days/i).length).toBeGreaterThanOrEqual(1)
    expect(queryAllByText(/\$/i).length).toBeGreaterThanOrEqual(1)
  })

  it('should display a placeholder instead of normal content if the hasCcAccounts attribute is set to false', () => {
    const { getByText } = renderElement(false)
    expect(getByText(/are only applied to ach accounts./i)).toBeInTheDocument()
  })
})
