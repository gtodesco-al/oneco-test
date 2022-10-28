import {
  CashIcon,
  ChartBarIcon,
  ChartPieIcon,
  UsersIcon,
} from '@heroicons/react/solid'

const ApplicationDrawerOptions = () => {
  const iconClasses = 'fill-secondary-color h-5 w-5'

  const navigation = [
    {
      name: 'dashboard',
      href: '/dashboard',
      icon: <ChartPieIcon className={iconClasses} />,
    },
    {
      name: 'payments',
      icon: <CashIcon className={iconClasses} />,
      somePrivs: [
        'v2.transactions.post',
        'v2.recurrings.get',
        'v2.quickinvoices.get',
      ],
      children: [
        {
          name: 'virtual terminal',
          href: '/payments/virtual-terminal',
          allPrivs: ['v2.transactions.post'],
        },
        // { name: 'recurring payments', href: '/payments/recurring', allPrivs: ['v2.recurrings.get'] },
        // { name: 'quick invoice', href: '/payments/quick-invoice', allPrivs:  ['v2.quickinvoices.get'] },
      ],
    },
    {
      name: 'customers',
      href: '/customers',
      icon: <UsersIcon className={iconClasses} />,
      somePrivs: ['v2.contacts.get'],
    },
    // {
    //   name: 'statements',
    //   href: '/statements',
    //   icon: <DocumentTextIcon className={iconClasses} />,
    // },
    {
      name: 'reports',
      icon: <ChartBarIcon className={iconClasses} />,
      somePrivs: [
        'v2.reports.get',
        'v2.transactions.get',
        'v2.transactionbatches.get',
        'v2.recurrings.get',
      ],
      children: [
        {
          name: 'transactions',
          href: '/reports/transactions',
          allPrivs: ['v2.reports.get', 'v2.transactions.get'],
        },
        {
          name: 'batches',
          href: '/reports/batches',
          allPrivs: ['v2.reports.get', 'v2.transactionbatches.get'],
        },
        {
          name: 'deposits',
          href: '/reports/deposits',
          allPrivs: ['v2.reports.get', 'v2.transactions.get'],
        },
        // TODO removed for MVP
        // {
        //   name: 'chargebacks',
        //   href: '/reports/chargebacks',
        //   allPrivs: ['v2.reports.get', 'v2.transactions.get'],
        // },
        {
          name: 'recurring billing declines',
          href: '/reports/recurring-billing-declines',
          allPrivs: [
            'v2.reports.get',
            'v2.transactions.get',
            'v2.recurrings.get',
          ],
        },
        {
          name: 'ach rejects',
          href: '/reports/ach-rejects',
          allPrivs: ['v2.reports.get', 'v2.transactions.get'],
        },
      ],
    },
    // {
    //   name: 'settings',
    //   children: [
    //     { name: 'user settings', href: '/settings/user' },
    //     { name: 'portal settings', href: '/settings/portal' },
    //     { name: 'manage users', href: '/settings/manage-users' },
    //     { name: 'account linking', href: '/settings/account-linking' },
    //   ],
    //   icon: <CogIcon className={iconClasses} />,
    // },
  ]

  const secondaryNavigation = [
    { name: 'terms of service', href: '#' },
    {
      name: 'privacy policies',
      href: 'https://fortispay.com/wp-content/uploads/2022/03/Privacy-Policy-Final-V4.09152021-v1.pdf',
    },
  ]

  return {
    navigation,
    secondaryNavigation,
  }
}

export default ApplicationDrawerOptions
