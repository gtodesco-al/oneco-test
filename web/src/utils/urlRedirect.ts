export type UserPrefsProps = {
  [key: string]: string
}

export default {
  virtualterminal: '/payments/virtual-terminal',
  dashboard: '/dashboard',
  contacts: '/dashboard',
  locations: '/dashboard',
} as UserPrefsProps

export const urlRedirectLabels = {
  virtualterminal: 'virtual terminal',
  dashboard: 'dashboard',
  contacts: 'dashboard',
  locations: 'dashboard',
} as UserPrefsProps
