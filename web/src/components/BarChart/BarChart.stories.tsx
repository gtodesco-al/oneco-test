import { ComponentStory, ComponentMeta } from '@storybook/react'
import { transactionVolumeForecast } from '../../mocks/charts/TransactionVolumeForecast'
import { currency } from '../../utils/format'
import BarChart from './BarChart'

export default {
  title: 'BarChart',
  component: BarChart,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: 'white',
        },
      ],
    },
  },
} as ComponentMeta<typeof BarChart>

const Template: ComponentStory<typeof BarChart> = () => (
  <div className="w-full h-80">
    <BarChart
      data={transactionVolumeForecast}
      axisLeft={{
        format: (value: number) => {
          return currency(value)
        },
      }}
      keys={['amount']}
      indexBy="date"
      valueFormat={(value) => {
        return currency(Number(value))
      }}
    />
  </div>
)

export const BarChartWorld = Template.bind({})
