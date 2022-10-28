import { User } from '@fortis/api'
import { getPermissionsMap } from '../../../utils/permissions'

const hasCustomerPermission = (user: User, permission: string) =>
  Boolean(getPermissionsMap(user)[`v2.contacts.${permission}`])

export const canViewCustomer = (user: User) =>
  hasCustomerPermission(user, 'get')

export const canCreateCustomer = (user: User) =>
  hasCustomerPermission(user, 'post')

export const canEditCustomer = (user: User) =>
  hasCustomerPermission(user, 'put')

export const canDeactivateCustomer = (user: User) =>
  hasCustomerPermission(user, 'delete')

export const canReactivateCustomer = (user: User) =>
  hasCustomerPermission(user, 'post.activate')

export const canChargeCustomer = (user: User) =>
  Boolean(getPermissionsMap(user)['v2.transactions.post'])

const hasWalletPermission = (user: User, permission: string) =>
  Boolean(getPermissionsMap(user)[`v2.accountvaults.${permission}`])

export const canCreateWallet = (user: User) => hasWalletPermission(user, 'post')

export const canEditWallet = (user: User) => hasWalletPermission(user, 'put')

export const canDeactivateWallet = (user: User) =>
  hasWalletPermission(user, 'delete')

export const canReactivateWallet = (user: User) =>
  hasWalletPermission(user, 'post.activate')
