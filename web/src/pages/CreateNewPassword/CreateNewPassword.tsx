import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import Button from '../../components/Button/Button'
import { AuthenticationPanel } from '../AuthenticationPanel/AuthenticationPanel'
import FormTextInput from '../../components/FormTextInput/FormTextInput'
import { api } from '../../api'
import { useLoading } from '../../hooks/useLoading'
import { PasswordInput } from './PasswordInput'

export interface CreateNewPasswordProps {
  onSubmit?: (email: string, code: string, password: string) => Promise<void>
}

const defaultSubmit = async (email: string, code: string, password: string) => {
  const { data } = await api
    .service('public/users')
    .update_password(email, code, password)

  if (!data.ok) {
    const error = new Error('Could not reset password')
    api.emit('apiError', error)
    throw error
  }
}

export function CreateNewPassword({
  onSubmit = defaultSubmit,
}: CreateNewPasswordProps) {
  const { t } = useTranslation('CreateNewPassword')
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const email = params.get('email')
  const code = params.get('code')
  const showLoading = useLoading()

  /**
   * Because the password field is more complex, the validation schema here does not include its validation rules.
   */
  const validationSchema = yup.object({
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('passwords must match'))
      .required(t('a password must be provided')),
  })

  return (
    <AuthenticationPanel title={t('create new password')}>
      <p>
        {t('please enter a new password for your account')}
        <strong>{email}</strong>
        {t('make sure to not re-use any of your last 4 passwords.')}
      </p>

      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={async ({ password }) => {
          if (email !== null && code !== null) {
            await showLoading(
              onSubmit(email, code, password).then(() =>
                navigate('/signin/change-successful')
              )
            )
          }
        }}
      >
        {({ touched }) => (
          <Form className="flex flex-col mt-8 gap-8">
            <PasswordInput
              name="password"
              label={t('new password')}
              placeholder={t('enter your password')}
              touched={touched.password}
            />

            <FormTextInput
              type="password"
              name="confirmPassword"
              label={t('confirm new password')}
              placeholder={t('re-enter your password')}
            />

            {/* TODO: When clicked, we should spin the label of this button while onSubmit is working */}
            <Button
              type="submit"
              icon={<ArrowNarrowRightIcon className="ml-2 w-4" />}
              className="w-full"
            >
              {t('save new password')}
            </Button>
          </Form>
        )}
      </Formik>
    </AuthenticationPanel>
  )
}

/** TODO test coverage */

export default CreateNewPassword
