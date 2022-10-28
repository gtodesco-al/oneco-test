import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/preact'
import '@testing-library/jest-dom'

import { User } from '@fortis/api'
import i18n from '../../../i18n'
import {
  createUserForPermissionTesting,
  RenderWithUser,
} from '../../../utils/testing/users'

import Header from './Header'

const user: User = {
  id: '11ecca4dfef6ec7cac89ad3e',
  domain_id: '11ec5c443bf240da92d2b558',
  contact_id: '11ecca4dfef9a73c80f96acc',
  username: 'hprotagonist@fortispay.com',
  email: 'hprotagonist@fortispay.com',
  locale: 'en-US',
  tz: 'America/New_York',
  login_attempts: 0,
  current_login_ip: '127.0.0.1',
  current_login: 1659109207,
  last_login_ts: 1659108826,
  requires_new_password: '',
  created_ts: 1651519258,
  modified_ts: 1659109207,
  primary_location_id: '11ec5c443c147e16b6cc46e8',
  branding_domain_url: 'bitfaceincbqox1k.sandbox.zeamster.com',
  created_user_id: '11e63957470f4b4a80511acc',
  terms_accepted_ts: 1651774675,
  terms_agree_ip: '127.0.0.1',
  current_date_time: '2022-07-29T11:40:08-0400',
  ui_prefs: {
    entry_page: 'dashboard',
    page_size: 15,
    report_export_type: 'csv',
    process_method: 'virtual_terminal',
    default_terminal: null,
  },
  user_api_key: '1...4',
  user_hash_key: '1...3',
  log_api_response_body_ts: null,
  first_name: 'Hiro',
  last_name: 'Protagonist',
  address: null,
  city: null,
  state: null,
  zip: null,
  account_number: null,
  date_of_birth: null,
  email_trx_receipt: false,
  company_name: null,
  home_phone: null,
  cell_phone: null,
  office_phone: null,
  office_ext_phone: null,
  country: 'USA',
  status_code: 1,
  terms_condition_code: '20220308.00',
  user_type_code: 250,
  status: true,
}

test('BPW-4 - The “Add New” dropdown shall include the following items:', async () => {
  const u = createUserForPermissionTesting(
    'v2.transactions.post',
    'v2.recurrings.post',
    'v2.quickinvoices.post'
  )
  const { getByText, getByTestId } = renderI18NHeader(
    <Header
      user={u}
      showAppDrawer={false}
      setShowAppDrawer={() => undefined}
    />,
    u
  )
  const addNewButton = getByTestId('quick-access-button')
  fireEvent.click(addNewButton)

  const items = [
    'Run Transaction',
    'Create Recurring Payment',
    'Create Quick Invoice',
  ]
  items.map((i) => expect(getByText(i)).toBeInTheDocument())
})

test('BPW-4 - The profile dropdown shall include the following items:', async () => {
  const { getByText, getByTestId } = renderI18NHeader(
    <Header
      user={user}
      showAppDrawer={false}
      setShowAppDrawer={() => undefined}
    />,
    user
  )
  const addNewButton = getByTestId('open-user-menu')
  fireEvent.click(addNewButton)

  const items = [
    'Hiro Protagonist',
    'hprotagonist@fortispay.com',
    'Profile Settings',
    'Log Out',
  ]
  items.map((i) => expect(getByText(i)).toBeInTheDocument())
})

function renderI18NHeader(header: React.ReactElement, user: User) {
  return render(
    <RenderWithUser user={user}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>{header}</BrowserRouter>
      </I18nextProvider>
    </RenderWithUser>
  )
}
