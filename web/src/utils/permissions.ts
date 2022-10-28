import { User } from '@fortis/api'
import { Dictionary, keyBy, intersection } from 'lodash'

export const checkPermission = (user: User, permission: string) =>
  !!Object.values(user.resources ?? {}).find((resource) =>
    typeof resource === 'object' && resource !== null
      ? resource.resource_name === permission
      : resource === permission
  )

export const checkAllPermissions = (
  user: User,
  ...allPermissions: string[]
) => {
  const perms = Object.keys(getPermissionsMap(user))
  return intersection(perms, allPermissions).length === allPermissions.length
}

export const checkSomePermissions = (
  user: User,
  ...somePermissions: string[]
) => {
  const perms = Object.keys(getPermissionsMap(user))
  return somePermissions.some((s: string) => perms.includes(s))
}

export const getPermissionsMap = (user: User): Dictionary<string> =>
  keyBy(user.resources ?? {}, 'resource_name')
