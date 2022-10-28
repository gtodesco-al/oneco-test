import { useTranslation } from 'react-i18next'

export type AccountTypeProps = {
  type: string
}

const typeToCardText: { [key: string]: string } = {
  amex: 'amex-card',
  diners: 'diners-club-card',
  disc: 'discover-card',
  jcb: 'jcb-card',
  mc: 'mastercard',
  visa: 'visa-card',
  checking: 'ach-card',
  savings: 'ach-card',
  debit: 'debit-card',
}

function AccountType({ type }: AccountTypeProps) {
  const { t } = useTranslation('AccountType')
  const bgImage = typeToCardText[type] || ''

  return (
    <div className="flex">
      <div
        className={`w-8 bg-${bgImage} bg-center bg-no-repeat bg-white border-gray-300 border-[0.5px] rounded-sm mr-[7px]`}
      ></div>
      {t(type)}
    </div>
  )
}

export default AccountType
