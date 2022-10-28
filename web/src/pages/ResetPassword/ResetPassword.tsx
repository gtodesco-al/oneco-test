import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'

import Button from '../../components/Button/Button'
import { AuthenticationPanel } from '../AuthenticationPanel/AuthenticationPanel'
import FormTextInput from '../../components/FormTextInput/FormTextInput'
import { useLoading } from '../../hooks/useLoading'
import { api } from '../../api'

interface ResetPasswordProps {
  onSubmit?: (email: string) => Promise<void>
}

const defaultSubmit = async (email: string) => {
  await api.service('public/users').create_code(email)
}

export function ResetPassword({
  onSubmit = defaultSubmit,
}: ResetPasswordProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('ForgotPassword')

  const invalidEmailMessage = t('invalid email address')
  const showLoading = useLoading()

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(invalidEmailMessage)
      .required(invalidEmailMessage),
  })

  return (
    <AuthenticationPanel title={t('reset password')}>
      <p>
        {t(
          'please enter the email associated with your account. we will email you a'
        )}
        <strong>{t('password reset code')}</strong>
        {t("so you can proceed and set your account's new password.")}
      </p>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={async ({ email }) => {
          await showLoading(onSubmit(email))
          navigate(`/signin/enter-code?email=${email}`)
        }}
      >
        <Form className="flex flex-col mt-8 gap-8">
          <FormTextInput
            name="email"
            label={t('email')}
            placeholder={t('enter your email address')}
          />

          {/* TODO: When clicked, we should spin the label of this button while onSubmit is working */}
          <Button
            type="submit"
            icon={<ArrowNarrowRightIcon className="ml-2 w-4" />}
            className="w-full"
          >
            {t('send code')}
          </Button>
        </Form>
      </Formik>
    </AuthenticationPanel>
  )
}

export default ResetPassword
