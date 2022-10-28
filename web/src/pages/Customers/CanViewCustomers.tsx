import CanViewPage, { PagePrivs } from '../CanViewPage'

import { EditCustomerPrivs } from './EditCustomer/EditCustomer'
import { GetCustomersPrivs } from './GetCustomers/GetCustomers'
import { NewCustomerPrivs } from './NewCustomer/NewCustomer'
import { ViewCustomerPrivs } from './ViewCustomer/ViewCustomer'

const AllCustomerPrivs: PagePrivs = {
  new: NewCustomerPrivs,
  edit: EditCustomerPrivs,
  view: ViewCustomerPrivs,
  '': GetCustomersPrivs,
}

function CanViewCustomers() {
  return <CanViewPage root="customers" pagePrivs={AllCustomerPrivs} />
}

export default CanViewCustomers
