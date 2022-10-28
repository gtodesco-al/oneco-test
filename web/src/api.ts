import { init } from '@fortis/api'

export * from '@fortis/api'

export const api = init({
  fetch:
    typeof window !== 'undefined' && window.fetch
      ? window.fetch.bind(window)
      : require('node-fetch'),
  root: process.env.API_ROOT as string,
  apiDomain: process.env.API_DOMAIN as string,
  developerId: process.env.API_DEVELOPER_ID as string,
})
