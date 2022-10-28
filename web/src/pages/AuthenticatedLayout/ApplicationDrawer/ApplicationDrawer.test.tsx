import { FC, ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent, waitFor } from '@testing-library/preact'
import '@testing-library/jest-dom'

import { Location, User } from '@fortis/api'

import packageJSON from '../../../../package.json'
import i18n from '../../../i18n'
import ApplicationDrawer from './ApplicationDrawer'
import {
  createUserForPermissionTesting,
  RenderWithUser,
} from '../../../utils/testing/users'
describe('ApplicationDrawer', () => {
  test('BPW-5 - The Application Drawer shall render the following sections:', async () => {
    const user = createUserForPermissionTesting(
      'v2.transactions.post',
      'v2.recurrings.get',
      'v2.quickinvoices.get',
      'v2.contacts.get',
      'v2.reports.get',
      'v2.transactions.get',
      'v2.transactionbatches.get',
      'v2.recurrings.get'
    )
    const { getByText } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />
    )
    const sections = [
      'Dashboard',
      'Customers',
      'Payments',
      'Reports',
      // 'Statements',
      // 'Settings',
    ]
    sections.map((s) => expect(getByText(s)).toBeInTheDocument())
  })

  test('BPW-5 - The Application Drawer shall render a secondary section consisting of:', async () => {
    const user = createUserForPermissionTesting()
    const { getByText } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />
    )
    const sections = [
      'Terms of Service',
      'Privacy Policies',
      `v${packageJSON.version}`,
    ]
    sections.map((s) => expect(getByText(s)).toBeInTheDocument())
  })

  test('BPW-5 - If the User is currently in the area of the Application related to the Section, a vertical bar shall be rendered to the left of the brand icon', async () => {
    const user = createUserForPermissionTesting()
    const { container } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />
    )
    // Dashboard
    const anchor = container.querySelector('a')
    expect(anchor?.classList.contains('border-l-4'))
  })

  test('BPW-5 - If a section is expandable and is not displaying its subsection (it is closed), then a triangle, pointing right is rendered to the right of the section name.', async () => {
    const user = createUserForPermissionTesting(
      'v2.transactions.post',
      'v2.recurrings.get',
      'v2.quickinvoices.get'
    )
    const { container } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />
    )
    // Payments
    const arrows = container.querySelectorAll('.closed-arrow')
    expect(arrows.length).toBeGreaterThan(0)
  })

  test('BPW-5 - If a section is expandable and is displaying its subsection (it is open), then a triangle, pointing down is rendered to the right of the section name.', async () => {
    const user = createUserForPermissionTesting(
      'v2.transactions.post',
      'v2.recurrings.get',
      'v2.quickinvoices.get'
    )
    const { getByText, container } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />
    )
    fireEvent.click(getByText('Payments'))

    await waitFor(() => getByText('Virtual Terminal'))

    const arrows = container.querySelectorAll('.open-arrow')
    expect(arrows.length).toBeGreaterThan(0)
  })

  test.skip('BPW-5 - If not on the Statements page, clicking on the Statements section name shall change the application route to /statements.', async () => {
    const user = createUserForPermissionTesting()
    const { getByText } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />
    )
    fireEvent.click(getByText('Statements'))
    await waitFor(() => getByText('Statements'))
    expect(window.location.pathname).toBe('/statements')
  })

  test('BPW-5 - If not on the Dashboard page, clicking on Dashboard section name shall change the application route to /dashboard.', async () => {
    const user = createUserForPermissionTesting()
    const { getByText } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />,
      {
        route: '/statements',
      }
    )

    fireEvent.click(getByText('Dashboard'))
    await waitFor(() => getByText('Dashboard'))
    expect(window.location.pathname).toBe('/dashboard')
  })

  test('BPW-5 - Payments and Payments subsections', async () => {
    const user = createUserForPermissionTesting(
      'v2.transactions.post',
      'v2.recurrings.get',
      'v2.quickinvoices.get'
    )
    const { getByText } = renderWithRoute(
      user,
      <RenderWithUser user={user}>
        <ApplicationDrawer
          showAppDrawer={true}
          setShowAppDrawer={() => undefined}
          locations={[] as Location[]}
        />
      </RenderWithUser>
    )

    // Clicking on the closed Payments section shall toggle the section open and display the Payments subsection.
    fireEvent.click(getByText('Payments'))
    await waitFor(() => getByText('Virtual Terminal'))

    const subsections = [
      { name: 'Virtual Terminal', route: '/payments/virtual-terminal' },
      // { name: 'Recurring Payments', route: '/payments/recurring' },
      // { name: 'Quick Invoice', route: '/payments/quick-invoice' },
    ]
    subsections.forEach(async (s) => {
      // An open Payments section shall render the following subsections:
      const gotten = getByText(s.name)
      expect(gotten).toBeInTheDocument()

      // Clicking on a subsection shall change the application route to the associated route.
      fireEvent.click(gotten)
      await waitFor(() => expect(window.location.pathname).toBe(s.route))
    })
  })

  test.skip('BPW-5 - Settings and Settings subsections', async () => {
    const user = createUserForPermissionTesting()
    const { getByText } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />
    )

    // Clicking on the closed Settings section shall toggle the section open and display the Reports subsection.
    fireEvent.click(getByText('Settings'))
    await waitFor(() => getByText('User Settings'))

    const subsections = [
      { name: 'User Settings', route: '/settings/user' },
      { name: 'Portal Settings', route: '/settings/portal' },
      { name: 'Manage Users', route: '/settings/manage-users' },
      { name: 'Account Linking', route: '/settings/account-linking' },
    ]
    subsections.forEach(async (s) => {
      // An open Settings section shall render the following subsections:
      const gotten = getByText(s.name)
      expect(gotten).toBeInTheDocument()

      // Clicking on a subsection shall change the application route to the associated route.
      fireEvent.click(gotten)
      await waitFor(() => expect(window.location.pathname).toBe(s.route))
    })
  })

  test.skip('BPW-5 - Reports and Reports subsections', async () => {
    const user = createUserForPermissionTesting(
      'v2.reports.get',
      'v2.transactions.get',
      'v2.transactionbatches.get',
      'v2.recurrings.get'
    )
    const { getByText } = renderWithRoute(
      user,
      <ApplicationDrawer
        showAppDrawer={true}
        setShowAppDrawer={() => undefined}
        locations={[] as Location[]}
      />
    )

    // Clicking on the closed Reports section shall toggle the section open and display the Reports subsection.
    fireEvent.click(getByText('Reports'))
    await waitFor(() => getByText('Live Transactions'))

    const subsections = [
      { name: 'Live Transactions', route: '/reports/live-transactions' },
      { name: 'Settled Transactions', route: '/reports/settled-transactions' },
      { name: 'Charge Back', route: '/reports/charge-back' },
      { name: 'Batches', route: '/reports/batches' },
      { name: 'Deposits', route: '/reports/deposits' },
    ]
    subsections.forEach(async (s) => {
      // An open Reports section shall render the following subsections:
      const gotten = getByText(s.name)
      expect(gotten).toBeInTheDocument()

      // Clicking on a subsection shall change the application route to the associated route.
      fireEvent.click(gotten)
      await waitFor(() => expect(window.location.pathname).toBe(s.route))
    })
  })
})

function wrapComponentWithRouter(user: User): FC {
  return ({ children }) => (
    <RenderWithUser user={user}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>{children}</BrowserRouter>
      </I18nextProvider>
    </RenderWithUser>
  )
}

function renderWithRoute(user: User, ui: ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Application Drawer', route)
  return {
    ...render(ui, {
      wrapper: wrapComponentWithRouter(user),
    }),
  }
}
