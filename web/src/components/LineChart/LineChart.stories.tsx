import { ComponentStory, ComponentMeta } from '@storybook/react'
import { transactionsMock } from '../../mocks/charts/Transactions'
import { currency } from '../../utils/format'
import LineChart from './LineChart'

export default {
  title: 'LineChart',
  component: LineChart,
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
} as ComponentMeta<typeof LineChart>

const Template: ComponentStory<typeof LineChart> = () => (
  <div className="w-full h-80">
    <LineChart
      data={transactionsMock}
      axisLeft={{
        format: (value: number) => {
          return currency(value)
        },
      }}
      yFormat={(value) => {
        return currency(Number(value))
      }}
    />
  </div>
)

export const LineChartWorld = Template.bind({})
