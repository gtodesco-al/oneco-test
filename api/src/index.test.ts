import { init } from './index'
import { Location } from './schemas/types'

import '../setUpTests'

describe('client services', () => {
  const app = init({
    fetch: require('node-fetch'),
    root: process.env.API_ROOT as string,
    apiDomain: process.env.API_DOMAIN as string,
    developerId: process.env.API_DEVELOPER_ID as string,
  })

  it('errors on invalid login', async () => {
    try {
      await app.authenticate({
        email: 'somet@thing.com',
        password: 'superwrong',
      })

      expect(false).toBeTruthy()
    } catch (error: any) {
      expect(error.name).toEqual('NotAuthenticated')
    }
  })

  it('authenticates and can get user and transactions with pagination', async () => {
    const authResult = await app.authenticate({
      email: process.env.TEST_API_USERNAME,
      password: process.env.TEST_API_PASSWORD,
    })
    expect(authResult.accessToken).toBeTruthy()

    const me = await app.service('users').get('me')

    expect(me.resources).toBeDefined()
    expect(me.username).toEqual(process.env.TEST_API_USERNAME)

    await app.authentication.reset()
    await app.reAuthenticate()

    const paginatedTxs = await app.service('transactions').find({
      paginate: true,
      query: {
        page: { number: 2, size: 3 },
      },
    })

    expect(paginatedTxs.list.length).toEqual(3)
    expect(paginatedTxs.pagination.page_number).toEqual(2)

    const txs = await app.service('transactions').find()

    expect(txs.length).toBeGreaterThan(0)

    await app.logout()
  })

  it('authenticates and can get locations and create and delete contact', async () => {
    await app.authenticate({
      email: process.env.TEST_API_USERNAME,
      password: process.env.TEST_API_PASSWORD,
    })

    const locations = (await app.service('locations').find()) as Location[]

    const contact = await app.service('contacts').create({
      location_id: locations[0].id,
      account_number: '1234',
      first_name: 'John',
      last_name: 'Smith',
      cell_phone: '1234567890',
    })

    await app.service('contacts').remove(contact.id)
    await app.logout()
  })
})
