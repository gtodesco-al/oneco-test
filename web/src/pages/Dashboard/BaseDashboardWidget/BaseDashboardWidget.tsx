import classNames from 'classnames'
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Button from '../../../components/Button/Button'
import { HasPermission } from '../../../components/HasPermission/HasPermission'
import { PlaceholderPanel } from '../../../components/PlaceholderPanel/PlaceholderPanel'

interface BaseWidgetProps {
  name: string
  description: string
  children: React.ReactNode
  viewReportPrivs: string[]
  reportURL?: string
  halfWidth?: boolean
  hasTransactions?: boolean
  isLoading?: boolean
}

export const BaseDashboardWidget = ({
  name,
  description,
  children,
  viewReportPrivs,
  reportURL = '',
  halfWidth = false,
  hasTransactions = true,
  isLoading = false,
}: BaseWidgetProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation('Dashboard')

  return (
    <div className="h-full flex flex-col p-6 bg-white rounded-md">
      <div className="flex justify-between gap-16 items-start mb-8 mobile:mb-5">
        <div>
          <h2 className="font-medium text-xl text-gray-600">{name}</h2>
          <p className="font-normal text-xs text-gray-500">{description}</p>
        </div>
        {reportURL && (
          <Button
            className="min-w-[9rem] mobile:hidden border bg-transparent text-gray-700"
            icon={
              <ArrowNarrowRightIcon className="ml-2 w-5 text-primary-700" />
            }
            onClick={() => navigate(reportURL)}
          >
            {t('view report')}
          </Button>
        )}
      </div>
      {hasTransactions ? (
        children
      ) : (
        <PlaceholderPanel halfWidth={halfWidth}>
          <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center mb-5">
            <div
              className={classNames('w-6 h-6 bg-contain bg-no-repeat', {
                'bg-chart': !hasTransactions,
                'bg-start': isLoading,
              })}
            />
          </div>
          <p>
            {isLoading
              ? t('loading data...')
              : t('you currently do not have any data to display.')}
          </p>
        </PlaceholderPanel>
      )}
      <HasPermission allPermissions={viewReportPrivs}>
        <Button
          buttonType="bordered"
          className="mt-4 hidden mobile:flex"
          icon={<ArrowNarrowRightIcon className="ml-2 w-5" />}
          onClick={() => navigate('/reports')}
        >
          {t('view report')}
        </Button>
      </HasPermission>
    </div>
  )
}
