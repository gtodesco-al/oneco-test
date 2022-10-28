import CanViewPage, { PagePrivs } from '../CanViewPage'

import { VirtualTerminalPrivs } from './VirtualTerminal'

const AllPaymentPrivs: PagePrivs = {
  'virtual-terminal': VirtualTerminalPrivs,
  confirmation: VirtualTerminalPrivs, //If they can see the VT they can see confirmations from it
}

function CanViewPayments() {
  return <CanViewPage root="payments" pagePrivs={AllPaymentPrivs} />
}

export default CanViewPayments
