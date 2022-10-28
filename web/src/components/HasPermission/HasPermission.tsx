import { Dictionary, intersection } from 'lodash'
import { useEffect, useState } from 'react'

import { useUserProfile } from '../../hooks/useUserProfile'
import { getPermissionsMap } from '../../utils/permissions'

export type HasPermissionProps = {
  children: JSX.Element
  permission?: string
  somePermissions?: string[]
  allPermissions?: string[]
}

function hasPermission(
  permissions?: Dictionary<string>,
  permission?: string,
  allPermissions?: string[],
  somePermissions?: string[]
): boolean {
  if (!permissions) return false
  if (permission && !permissions[permission]) return false

  const perms = Object.keys(permissions)
  if (
    allPermissions &&
    intersection(perms, allPermissions).length !== allPermissions.length
  )
    return false
  if (
    somePermissions &&
    !somePermissions.some((s: string) => perms.includes(s))
  )
    return false

  return true
}

export function HasPermission({
  children,
  permission,
  allPermissions,
  somePermissions,
}: HasPermissionProps) {
  const { userProfile } = useUserProfile()
  const [permissions, setPermissions] = useState<Dictionary<string>>()

  useEffect(() => {
    const permissions = getPermissionsMap(userProfile)
    setPermissions(permissions)
  }, [userProfile])

  return hasPermission(permissions, permission, allPermissions, somePermissions)
    ? children
    : null
}
