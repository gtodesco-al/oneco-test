import { flatten, omit, uniqBy } from 'lodash'
import { Contact } from '@fortis/api/src/services/contacts.service'
import { api } from '../../../../api'

/**
 * Provides a layer of abstraction for customer fetching to keep the logic separate from the UI.
 */
export const getCustomerById = async (id = '') => {
  const customer = await api.service('contacts').get(id)

  return customer
}

const findCustomers = async (
  locationId: string,
  filters: { [key: string]: string }
) =>
  await api.service('contacts').find({
    query: {
      filter: {
        location_id: locationId,
        ...filters,
      },
    },
  })

const searchAllCustomerFields = async (locationId: string, filter: string) => {
  //Perform searches for each field.  Promise.all to allow all searches to occur simultaneously.
  const matches = await Promise.all([
    findCustomers(locationId, { first_name: filter }),
    findCustomers(locationId, { last_name: filter }),
    findCustomers(locationId, { account_number: filter }),
  ])

  //Return only unique results based on name and account number
  return uniqBy(
    flatten(matches),
    (value) => `${value.first_name} ${value.last_name} ${value.account_number}`
  )
}

export const searchCustomers = async (locationId: string, filter: string) => {
  const [start, ...rest] = filter.split(' ')

  //If there is a space, assume the first part is first name and the rest is last name
  if (rest.length > 0) {
    return findCustomers(locationId, {
      first_name: start,
      last_name: rest.join(' '),
    })
  }

  //Otherwise search for the data in each field
  return searchAllCustomerFields(locationId, filter)
}

export const deactivateCustomer = async (id: string) =>
  await api.service('contacts').remove(id)

export const activateCustomer = async (id: string) =>
  await api.service('contacts').activate(id)

export const updateCustomer = async (customer: Contact) =>
  api.service('contacts').update(
    customer.id,
    omit(customer, [
      //These fields are not accepted by the API
      'id',
      'created_ts',
      'modified_ts',
      'header_message_type_id',
      'active',
    ]) as Contact
  )
