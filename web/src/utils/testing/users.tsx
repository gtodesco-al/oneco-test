import { useEffect } from 'react'

import { Resource, User } from '@fortis/api'
import { UserProfileProvider, useUserProfile } from '../../hooks/useUserProfile'

const baseUser: User = {
  id: '11ecca4dfef6ec7cac89ad3e',
  domain_id: '11ec5c443bf240da92d2b558',
  contact_id: '11ecca4dfef9a73c80f96acc',
  username: 'user@zeamster.com',
  email: 'users@zeamster.com',
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
  first_name: 'k1v26h8',
  last_name: 'i36v0ua',
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

export const createUserForTesting = (
  props: Partial<Omit<User, 'resources'> & { resources: any }> = {}
) => ({
  ...baseUser,
  ...props,
})

export const createUserResourceForTesting = (
  resource_name: string
): Resource => ({
  resource_name,
  id: 1,
  title: '',
  priv: '',
  last_used_date: '',
  created_ts: 0,
  modified_ts: 0,
})

//Creates a user object containing resources matching the provided strings.
//Tests using resource names for permissions don't care about other fields so those resource fields are left blank.
export const createUserForPermissionTesting = (...names: string[]): User =>
  createUserForTesting({
    resources: names.reduce<{ [id: string]: Resource }>(
      (set, resource_name, i) =>
        Object.assign(set, {
          [i]: createUserResourceForTesting(resource_name),
        }),
      {}
    ),
  })

const permissionPath = 'v2.transactions.post.'

export const createUserWithTransactionPermissions = (
  ...names: string[]
): User =>
  createUserForPermissionTesting(...names.map((name) => permissionPath + name))

type RenderWithUserProps = {
  user: User
  children: JSX.Element
}

export function RenderWithUser({ children, user }: RenderWithUserProps) {
  return (
    <UserProfileProvider>
      <__RenderWithUser children={children} user={user} />
    </UserProfileProvider>
  )
}

function __RenderWithUser({ children, user }: RenderWithUserProps) {
  const { setUserProfile } = useUserProfile()
  useEffect(() => setUserProfile(user), [])
  return children
}
