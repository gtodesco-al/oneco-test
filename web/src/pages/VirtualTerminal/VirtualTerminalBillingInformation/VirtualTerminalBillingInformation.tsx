import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BillingInformation } from '../../../components/BillingInformation/BillingInformation'
import VirtualTerminalSection from '../VirtualTerminalSection/VirtualTerminalSection'
import { DepositAccount } from '../virtualTerminalTypes'

interface VirtualTerminalBillingInformationProps {
  account: DepositAccount
}

export const VirtualTerminalBillingInformation = ({
  account,
}: VirtualTerminalBillingInformationProps) => {
  const { t } = useTranslation('VirtualTerminal')

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(
      Boolean(account.vt_require_street) || Boolean(account.vt_require_zip)
    )
  }, [account])

  return (
    <VirtualTerminalSection
      header={t('billing information')}
      open={open}
      setOpen={setOpen}
    >
      <BillingInformation
        showStreet={Boolean(account.vt_street)}
        showZip={Boolean(account.vt_zip)}
        showPhone={Boolean(account.vt_billing_phone)}
        translator={t}
      />
    </VirtualTerminalSection>
  )
}

export default VirtualTerminalBillingInformation
