import { render, waitFor } from '@testing-library/preact'
import user from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'
import TransactionChartWidget from './TransactionChartWidget'

describe('TransactionChartWidget', () => {
  const filters = ['filter 1', 'filter 2', 'filter 3']

  const bodyText = 'Body Text'

  const renderWidget = (onSelect = () => undefined) =>
    render(
      <I18nextProvider i18n={i18n}>
        <TransactionChartWidget
          filters={filters}
          selectedFilter={'filter 1'}
          onSelect={onSelect}
          totalAmount={0}
          totalTransactions={0}
        >
          <span>{bodyText}</span>
        </TransactionChartWidget>
      </I18nextProvider>
    )

  test('Renders the body', () => {
    const { getByText } = renderWidget()

    expect(getByText(bodyText)).toBeInTheDocument()
  })

  test('renders buttons for all filters', () => {
    const { getByRole } = renderWidget()

    for (const filter of filters) {
      expect(getByRole('button', { name: filter })).toBeInTheDocument()
    }
  })

  test('clicking a filter provides that filter value to onSelect', async () => {
    const selectHandler = jest.fn()

    const { getByRole } = renderWidget(selectHandler)

    const expectedFilter = filters[1]

    await user.click(getByRole('button', { name: expectedFilter }))

    await waitFor(() =>
      expect(selectHandler).toHaveBeenCalledWith(expectedFilter)
    )
  })
})
