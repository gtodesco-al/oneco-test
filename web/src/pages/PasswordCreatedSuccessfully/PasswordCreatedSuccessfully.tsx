import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { AuthenticationPanel } from '../AuthenticationPanel/AuthenticationPanel'

export const PasswordCreatedSuccessfully = () => {
  const { t } = useTranslation('PasswordCreatedSuccessfully')
  const navigate = useNavigate()

  return (
    <AuthenticationPanel title={t('new password successfully created')}>
      <p className="mb-8">
        {t('click the button below to sign in to your account.')}
      </p>

      <Button
        type="submit"
        icon={<ArrowNarrowRightIcon className="ml-2 w-4" />}
        className="w-full"
        onClick={() => navigate('/signin')}
      >
        {t('sign in')}
      </Button>
    </AuthenticationPanel>
  )
}

export default PasswordCreatedSuccessfully
