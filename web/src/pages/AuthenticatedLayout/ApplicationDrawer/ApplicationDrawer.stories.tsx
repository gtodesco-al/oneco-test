/* eslint-disable @typescript-eslint/no-empty-function */
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { ComponentMeta } from '@storybook/react'

import i18n from '../../../i18n'
import ApplicationDrawer from './ApplicationDrawer'

export default {
  title: 'Application Drawer',
  component: ApplicationDrawer,
} as ComponentMeta<typeof ApplicationDrawer>

export const Default = () => (
  <I18nextProvider i18n={i18n}>
    <MemoryRouter initialEntries={['/']}>
      <ApplicationDrawer
        locations={[]}
        showAppDrawer={true}
        setShowAppDrawer={() => {}}
      />
    </MemoryRouter>
  </I18nextProvider>
)
