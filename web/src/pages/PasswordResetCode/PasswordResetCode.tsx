import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Link from '../../components/Link/Link'
import { AuthenticationPanel } from '../AuthenticationPanel/AuthenticationPanel'
import FormTextInput from '../../components/FormTextInput/FormTextInput'
import { api } from '../../api'
import Notification from '../../components/Notification/Notification'
import { useLoading } from '../../hooks/useLoading'

interface PasswordResetCodeProps {
  onSubmit?: (code: string, email: string) => Promise<void>
}

const defaultSubmit = async (code: string, email: string) => {
  const { data } = await api.service('public/users').check_code(email, code)

  if (!data.ok) {
    const error = new Error('Your reset code is invalid')
    api.emit('apiError', error)
    throw error
  }
}

export function PasswordResetCode({
  onSubmit = defaultSubmit,
}: PasswordResetCodeProps) {
  const location = useLocation()
  const email = new URLSearchParams(location.search).get('email')
  const { t } = useTranslation('PasswordResetCode')

  const navigate = useNavigate()
  const showLoading = useLoading()

  const validationSchema = yup.object({
    code: yup.string().required(t('a code must be provided')),
  })

  return (
    <AuthenticationPanel title={t('enter password reset code')}>
      {email && (
        <Notification type="success">
          {t('Notification email sent to ') + email}
        </Notification>
      )}
      <p>
        {t(
          'if the email address provided is associated with an existing user account, you will receive an email with a'
        )}
        <strong>{t('password reset code')}</strong>
        {t('please check your email and return here to enter the code below.')}
      </p>

      <Formik
        initialValues={{ code: '' }}
        onSubmit={async ({ code }) => {
          if (email !== null) {
            await showLoading(
              onSubmit(code, email).then(() =>
                navigate(`/signin/change-password?email=${email}&code=${code}`)
              )
            )
          }
        }}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col mt-8 gap-8">
          <FormTextInput
            name="code"
            label={t('password reset code')}
            placeholder={t('enter your reset code')}
          />

          {/* TODO: When clicked, we should spin the label of this button while onSubmit is working */}
          <Button
            type="submit"
            icon={<ArrowNarrowRightIcon className="ml-2 w-4" />}
            className="w-full"
          >
            {t('continue')}
          </Button>
        </Form>
      </Formik>

      <p className="mt-8 mb-4">
        <strong>{t('did not receive an email?')}</strong>
      </p>

      <p className="mb-4">
        {t(
          'please check your spam folder before contacting support or resending the email. if you need additional assistance please call 855-465-9999.'
        )}
      </p>

      <Button
        buttonType="outline"
        className="w-full mb-5 bg-gray-50 border border-gray-200"
        onClick={() => navigate('/signin/forgot-password')}
      >
        {t('resend email')}
      </Button>

      <Link
        className="block w-fit mx-auto"
        text={t('go back to sign in')}
        to="/signin"
      />
    </AuthenticationPanel>
  )
}

export default PasswordResetCode
