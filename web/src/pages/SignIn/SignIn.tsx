import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'

import { api, loginSchema, LoginData } from '../../api'

import Link from '../../components/Link/Link'
import Button from '../../components/Button/Button'
import { useLoading } from '../../hooks/useLoading'
import urlsRedirect from '../../utils/urlRedirect'
import FormContainer from '../../components/FormContainer/FormContainer'
import FormTextInput from '../../components/FormTextInput/FormTextInput'

export function SignIn() {
  const navigate = useNavigate()
  const { t } = useTranslation('SignIn')

  const showLoadingWhile = useLoading()

  const initialValues: LoginData = { email: '', password: '' }

  const getUrlFromUserPrefs = (url: string) => {
    const userUrlRedirect = urlsRedirect[url]

    if (!userUrlRedirect) return `/${url}`

    return userUrlRedirect
  }

  return (
    <div className="SignIn">
      <h1 className="text-2xl font-semibold	text-gray-900 mt-10 mb-4">
        {t('sign in to your account')}
      </h1>
      <h2 className="text-base font-normal text-gray-600">
        {t('welcome back! please enter you account details.')}
      </h2>
      <FormContainer<LoginData>
        initialValues={initialValues}
        enableReinitialize={true}
        jsonSchema={loginSchema}
        onSubmit={async ({ email, password }) => {
          const { value: result } = await showLoadingWhile(
            api.authenticate({ email, password })
          )
          if (result) {
            navigate(getUrlFromUserPrefs(result.token.ui_prefs.entry_page), {
              replace: true,
            })
          }
        }}
      >
        <div className="flex w-full mt-10 flex-col mb-8">
          <FormTextInput
            label={t('email')}
            placeholder={t('email')}
            name="email"
            errorMessage={t('email invalid')}
          />
          <FormTextInput
            label={t('password')}
            placeholder={t('password')}
            type="password"
            name="password"
            errorMessage={t('password required')}
          />
          <div className="flex justify-end w-full mt-4">
            <Link
              text={t('forget your password?')}
              to="/signin/forgot-password"
            />
          </div>
        </div>
        <Button
          type="submit"
          icon={<ArrowNarrowRightIcon className="ml-2 w-4" />}
          className="w-full text-base"
        >
          {t('sign in')}
        </Button>
      </FormContainer>
    </div>
  )
}

export default SignIn
