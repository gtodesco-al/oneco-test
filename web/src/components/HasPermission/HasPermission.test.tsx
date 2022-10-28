import { render } from '@testing-library/preact'

import {
  createUserForPermissionTesting,
  RenderWithUser,
} from '../../utils/testing/users'

import { HasPermission } from './HasPermission'

describe('HasPermission', () => {
  const content = 'This is the content'

  it('shows content when user has permission', () => {
    const user = createUserForPermissionTesting('v2.accountvaults.get')
    const { getByText } = render(
      <RenderWithUser user={user}>
        <HasPermission permission="v2.accountvaults.get">
          <div>{content}</div>
        </HasPermission>
      </RenderWithUser>
    )

    expect(getByText(content)).toBeInTheDocument()
  })

  it('SHOULD NOT show content when the user DOES NOT have the permission', () => {
    const user = createUserForPermissionTesting('v2.accountvaults.get')
    const { queryByText } = render(
      <RenderWithUser user={user}>
        <HasPermission permission="hello.world">
          <div>{content}</div>
        </HasPermission>
      </RenderWithUser>
    )

    expect(queryByText(content)).not.toBeInTheDocument()
  })

  it('should show content if ALL permissions are met', () => {
    const user = createUserForPermissionTesting(
      'v2.accountvaults.get',
      'v2.transactions.get'
    )
    const { queryByText } = render(
      <RenderWithUser user={user}>
        <HasPermission
          allPermissions={['v2.accountvaults.get', 'v2.transactions.get']}
        >
          <div>{content}</div>
        </HasPermission>
      </RenderWithUser>
    )

    expect(queryByText(content)).toBeInTheDocument()
  })

  it('should show content if SOME permissions are met', () => {
    const user = createUserForPermissionTesting(
      'v2.accountvaults.get',
      'v2.transactions.post'
    )
    const { queryByText } = render(
      <RenderWithUser user={user}>
        <HasPermission
          somePermissions={['v2.accountvaults.get', 'v2.transactions.get']}
        >
          <div>{content}</div>
        </HasPermission>
      </RenderWithUser>
    )

    expect(queryByText(content)).toBeInTheDocument()
  })

  it('should show content if ALL permission properties are true', () => {
    const user = createUserForPermissionTesting(
      'v2.accountvaults.get',
      'v2.transactions.post',
      'v2.transactions.get'
    )
    const { queryByText } = render(
      <RenderWithUser user={user}>
        <HasPermission
          permission={'v2.accountvaults.get'}
          allPermissions={['v2.transactions.post', 'v2.transactions.get']}
          somePermissions={['v2.accountvaults.get', 'hello.world']}
        >
          <div>{content}</div>
        </HasPermission>
      </RenderWithUser>
    )

    expect(queryByText(content)).toBeInTheDocument()
  })
})
